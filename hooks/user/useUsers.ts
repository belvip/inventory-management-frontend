import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { userService } from "@/service/userService";
import { 
    User, 
    RegisterRequest, 
    UpdateUserRequest, 
    UpdateRoleRequest,
    UpdatePasswordRequest,
    UpdateLockStatusRequest,
    UpdateEnabledStatusRequest,
    UpdateExpiryStatusRequest,
    ApiError 
} from '@/types';
import { UsersCacheKeys } from "@/lib/const";

// Helpers pour réduire la duplication
const handleMutationError = (error: ApiError, defaultMessage: string) => {
    const errorData = error.response?.data;
    
    // Si on a des erreurs de validation spécifiques
    if (errorData?.errors && Object.keys(errorData.errors).length > 0) {
        const validationErrors = Object.entries(errorData.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join('\n');
        toast.error("Erreurs de validation", { 
            description: validationErrors,
            duration: 5000
        });
        return;
    }
    
    // Sinon, utiliser le message d'erreur général
    const errorMessage = errorData?.message || errorData?.error || defaultMessage;
    toast.error("Erreur", { description: errorMessage });
};

const handleMutationSuccess = (
    queryClient: ReturnType<typeof useQueryClient>,
    message: string, 
    invalidateKeys: (keyof typeof UsersCacheKeys)[] = []
) => {
    invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({ 
            queryKey: [UsersCacheKeys[key]] 
        });
    });
    
    toast.success("Succès", { description: message });
};

// Hook de base avec toutes les fonctionnalités
export const useUsers = () => {
    const queryClient = useQueryClient();

    // ==================== QUERIES ====================

    const getAllUsers = useQuery({
        queryKey: [UsersCacheKeys.Users],
        queryFn: userService.getAll,
        staleTime: 2 * 60 * 1000, // 2 minutes de cache
    });

    const getRoles = useQuery({
        queryKey: [UsersCacheKeys.Roles],
        queryFn: userService.getRoles,
        staleTime: 10 * 60 * 1000, // 10 minutes (données très stables)
    });

    const useUserById = (userId?: User['userId']) => 
        useQuery({
            queryKey: [UsersCacheKeys.Users, userId],
            queryFn: () => userService.getById(userId!),
            enabled: !!userId,
            staleTime: 5 * 60 * 1000, // 5 minutes (données utilisateur spécifique)
        });

    const useSearchUsers = (keyword: string) =>
        useQuery({
            queryKey: [UsersCacheKeys.Users, 'search', keyword],
            queryFn: () => userService.search(keyword),
            enabled: keyword.length > 0,
            staleTime: 30 * 1000, // Cache court pour recherches
        });

    // ==================== MUTATIONS ====================

    const createUser = useMutation({
        mutationFn: (data: RegisterRequest) => userService.create(data),
        onSuccess: () => handleMutationSuccess(
            queryClient,
            "Utilisateur créé avec succès", 
            ['Users']
        ),
        onError: (error: ApiError) => 
            handleMutationError(error, "Impossible de créer l'utilisateur")
    });

    const updateUser = useMutation({
        mutationFn: ({ id, data }: { id: User['userId']; data: UpdateUserRequest }) => 
            userService.update(id, data),
        onSuccess: (updatedUser, variables) => {
            handleMutationSuccess(
                queryClient,
                "Utilisateur mis à jour avec succès", 
                ['Users']
            );
            
            // Mise à jour optimiste du cache de l'utilisateur spécifique
            queryClient.setQueryData(
                [UsersCacheKeys.Users, variables.id],
                updatedUser
            );
        },
        onError: (error: ApiError) => 
            handleMutationError(error, "Impossible de mettre à jour l'utilisateur")
    });

    const updateRole = useMutation({
        mutationFn: (data: UpdateRoleRequest) => userService.updateRole(data),
        onSuccess: (_, variables) => {
            handleMutationSuccess(
                queryClient,
                "Rôle mis à jour avec succès", 
                ['Users']
            );
            
            // Invalidation de l'utilisateur modifié
            queryClient.invalidateQueries({
                queryKey: [UsersCacheKeys.Users, variables.userId]
            });
        },
        onError: (error: ApiError) => 
            handleMutationError(error, "Impossible de mettre à jour le rôle")
    });

    const deleteUser = useMutation({
        mutationFn: userService.delete,
        onSuccess: (_, deletedUserId) => {
            handleMutationSuccess(
                queryClient,
                "Utilisateur supprimé avec succès", 
                ['Users']
            );
            
            // Suppression de l'utilisateur du cache
            queryClient.removeQueries({
                queryKey: [UsersCacheKeys.Users, deletedUserId]
            });
        },
        onError: (error: ApiError) => 
            handleMutationError(error, "Impossible de supprimer l'utilisateur")
    });

    const updatePassword = useMutation({
        mutationFn: (password: string) => userService.updatePassword(password),
        onSuccess: () => handleMutationSuccess(
            queryClient,
            "Mot de passe mis à jour avec succès"
        ),
        onError: (error: ApiError) => 
            handleMutationError(error, "Impossible de mettre à jour le mot de passe")
    });

    // Factory pour les mutations de statut
    const createStatusMutation = <T extends { userId: number }>(
        mutationFn: (data: T) => Promise<unknown>,
        successMessage: string
    ) => 
        useMutation({
            mutationFn,
            onSuccess: (_, variables) => {
                handleMutationSuccess(
                    queryClient,
                    successMessage, 
                    ['Users']
                );
                
                // Invalidation de l'utilisateur modifié
                queryClient.invalidateQueries({
                    queryKey: [UsersCacheKeys.Users, variables.userId]
                });
            },
            onError: (error: ApiError) => 
                handleMutationError(error, "Impossible de mettre à jour le statut")
        });

    // Mutations de statut
    const updateLockStatus = createStatusMutation<UpdateLockStatusRequest>(
        userService.updateLockStatus,
        "Statut de verrouillage mis à jour"
    );

    const updateEnabledStatus = createStatusMutation<UpdateEnabledStatusRequest>(
        userService.updateEnabledStatus,
        "Statut d'activation mis à jour"
    );

    const updateExpiryStatus = createStatusMutation<UpdateExpiryStatusRequest>(
        userService.updateExpiryStatus,
        "Statut d'expiration mis à jour"
    );

    const updateCredentialsExpiryStatus = createStatusMutation<UpdateExpiryStatusRequest>(
        userService.updateCredentialsExpiryStatus,
        "Statut d'expiration des identifiants mis à jour"
    );

    return {
        // Queries
        getAllUsers,
        getRoles,
        useUserById,
        useSearchUsers,
        
        // Mutations
        createUser,
        updateUser,
        updateRole,
        deleteUser,
        updatePassword,
        updateLockStatus,
        updateEnabledStatus,
        updateExpiryStatus,
        updateCredentialsExpiryStatus,
    };
};

// Hook spécialisé pour un utilisateur spécifique
export const useUser = (userId?: User['userId']) => {
    const { 
        useUserById, 
        updateUser, 
        updatePassword,
        updateRole,
        updateLockStatus,
        updateEnabledStatus,
        updateExpiryStatus,
        updateCredentialsExpiryStatus
    } = useUsers();
    
    const userQuery = useUserById(userId);
    
    return {
        // Data
        user: userQuery.data,
        
        // Query states
        isLoading: userQuery.isLoading,
        isError: userQuery.isError,
        error: userQuery.error,
        isFetching: userQuery.isFetching,
        refetch: userQuery.refetch,
        
        // Mutations (pré-liées à l'userId)
        updateUser: (data: UpdateUserRequest) => {
            if (!userId) throw new Error("userId requis");
            return updateUser.mutate({ id: userId, data });
        },
        updatePassword: (password: string) => updatePassword.mutate(password),
        updateRole: (roleName: string) => {
            if (!userId) throw new Error("userId requis");
            return updateRole.mutate({ userId, roleName });
        },
        updateLockStatus: (lock: boolean) => {
            if (!userId) throw new Error("userId requis");
            return updateLockStatus.mutate({ userId, lock });
        },
        updateEnabledStatus: (enabled: boolean) => {
            if (!userId) throw new Error("userId requis");
            return updateEnabledStatus.mutate({ userId, enabled });
        },
        updateExpiryStatus: (expire: boolean) => {
            if (!userId) throw new Error("userId requis");
            return updateExpiryStatus.mutate({ userId, expire });
        },
        updateCredentialsExpiryStatus: (expire: boolean) => {
            if (!userId) throw new Error("userId requis");
            return updateCredentialsExpiryStatus.mutate({ userId, expire });
        },
        
        // Mutation states
        isUpdating: updateUser.isPending,
        isUpdatingPassword: updatePassword.isPending,
        isUpdatingRole: updateRole.isPending,
        isUpdatingLockStatus: updateLockStatus.isPending,
        isUpdatingEnabledStatus: updateEnabledStatus.isPending,
        isUpdatingExpiryStatus: updateExpiryStatus.isPending,
        isUpdatingCredentialsExpiryStatus: updateCredentialsExpiryStatus.isPending,
    };
};

// Hook spécialisé pour les opérations admin
export const useUsersAdmin = () => {
    const {
        getAllUsers,
        createUser,
        updateUser,
        updateRole,
        deleteUser,
        updateLockStatus,
        updateEnabledStatus,
        updateExpiryStatus,
        updateCredentialsExpiryStatus,
        getRoles
    } = useUsers();
    
    return {
        // Data
        users: getAllUsers.data,
        roles: getRoles.data,
        
        // States
        isLoading: getAllUsers.isLoading,
        isError: getAllUsers.isError,
        isFetching: getAllUsers.isFetching,
        
        // Operations admin
        createUser: createUser.mutate,
        updateUser: updateUser.mutate,
        updateRole: updateRole.mutate,
        deleteUser: deleteUser.mutate,
        updateLockStatus: updateLockStatus.mutate,
        updateEnabledStatus: updateEnabledStatus.mutate,
        updateExpiryStatus: updateExpiryStatus.mutate,
        updateCredentialsExpiryStatus: updateCredentialsExpiryStatus.mutate,
        
        // Mutation states
        isCreating: createUser.isPending,
        isUpdating: updateUser.isPending,
        isDeleting: deleteUser.isPending,
        isUpdatingRole: updateRole.isPending,
    };
};

// Hook spécialisé pour la recherche d'utilisateurs
export const useUserSearch = () => {
    const { useSearchUsers } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchQuery = useSearchUsers(searchTerm);
    
    const executeSearch = (keyword: string) => {
        setSearchTerm(keyword.trim());
    };
    
    const clearSearch = () => {
        setSearchTerm('');
    };
    
    return {
        // Data
        searchResults: searchQuery.data || [],
        
        // Search state
        searchTerm,
        executeSearch,
        clearSearch,
        
        // Query states
        isLoading: searchQuery.isLoading,
        isError: searchQuery.isError,
        isFetching: searchQuery.isFetching,
        
        // Results info
        hasResults: !!searchQuery.data && searchQuery.data.length > 0,
        resultsCount: searchQuery.data?.length || 0,
    };
};

// Hook spécialisé pour les mutations uniquement (forms, etc.)
export const useUserMutations = () => {
    const {
        createUser,
        updateUser,
        updatePassword,
        updateRole,
        deleteUser,
        updateLockStatus,
        updateEnabledStatus,
        updateExpiryStatus,
        updateCredentialsExpiryStatus
    } = useUsers();
    
    return {
        // Mutations
        createUser: createUser.mutate,
        updateUser: updateUser.mutate,
        updatePassword: updatePassword.mutate,
        updateRole: updateRole.mutate,
        deleteUser: deleteUser.mutate,
        updateLockStatus: updateLockStatus.mutate,
        updateEnabledStatus: updateEnabledStatus.mutate,
        updateExpiryStatus: updateExpiryStatus.mutate,
        updateCredentialsExpiryStatus: updateCredentialsExpiryStatus.mutate,
        
        // Mutation states
        isCreating: createUser.isPending,
        isUpdating: updateUser.isPending,
        isUpdatingPassword: updatePassword.isPending,
        isUpdatingRole: updateRole.isPending,
        isDeleting: deleteUser.isPending,
        isUpdatingLockStatus: updateLockStatus.isPending,
        isUpdatingEnabledStatus: updateEnabledStatus.isPending,
        isUpdatingExpiryStatus: updateExpiryStatus.isPending,
        isUpdatingCredentialsExpiryStatus: updateCredentialsExpiryStatus.isPending,
        
        // Errors
        createError: createUser.error,
        updateError: updateUser.error,
        deleteError: deleteUser.error,
    };
};