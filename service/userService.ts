import { apiClient } from "@/lib/apiClient"
import { UserRoles, MessageResponse } from "@/types/common"
import { 
    RegisterRequest, UpdateUserRequest, User,
    UpdateRoleRequest, UpdatePasswordRequest,
    UpdateLockStatusRequest, UpdateEnabledStatusRequest,
    UpdateExpiryStatusRequest
} from "@/types"

const BASE_URL = "/users"

export const userService = {
    // CREATE USER
    create: async (data: RegisterRequest): Promise<User> => {
        return apiClient.post<User>(`${BASE_URL}/create`, data)
    },

    // UPDATE USER
    update: async (id: number, data: UpdateUserRequest): Promise<User> => {
        return apiClient.put<User>(`${BASE_URL}/update/${id}`, data)
    },

    // UPDATE USER ROLE
    updateRole: async (data: UpdateRoleRequest): Promise<MessageResponse> => {
        const validRoles = Object.values(UserRoles)
        if (!validRoles.includes(data.roleName as any)) {
            throw new Error(`Rôle invalide: ${data.roleName}. Rôles valides: ${validRoles.join(', ')}`)
        }
        return apiClient.put<MessageResponse>(`${BASE_URL}/update/role`, data)
    },

    // GET USER BY ID
    getById: async (id: number): Promise<User> => {
        return apiClient.get<User>(`${BASE_URL}/${id}`)
    },

    // DELETE USER
    delete: async (id: number): Promise<MessageResponse> => {
        return apiClient.delete<MessageResponse>(`${BASE_URL}/${id}`)
    },

    // SEARCH USERS
    search: async (keyword: string): Promise<User[]> => {
        return apiClient.get<User[]>(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`)
    },

    // GET ALL USERS
    getAll: async (): Promise<User[]> => {
        return apiClient.get<User[]>(`${BASE_URL}/all`)
    },

    // UPDATE USER IMAGE (Corrigé pour FormData)
    updateImage: async (userId: number, image: File): Promise<User> => {
        const formData = new FormData()
        formData.append('image', image)
        
        // ✅ Fonctionnera parfaitement maintenant !
        return apiClient.put<User>(`${BASE_URL}/${userId}/image`, formData)
    },

    // UPDATE OWN PASSWORD
    updatePassword: async (data: UpdatePasswordRequest): Promise<MessageResponse> => {
        return apiClient.put<MessageResponse>(`${BASE_URL}/update-password`, data)
    },

    // GET ALL ROLES
    getRoles: async (): Promise<string[]> => {
        return apiClient.get<string[]>(`${BASE_URL}/roles`)
    },

    // STATUS UPDATE METHODS
    updateLockStatus: async (data: UpdateLockStatusRequest): Promise<MessageResponse> => {
        return apiClient.put<MessageResponse>(`${BASE_URL}/update-lock-status`, data)
    },

    updateCredentialsExpiryStatus: async (data: UpdateExpiryStatusRequest): Promise<MessageResponse> => {
        return apiClient.put<MessageResponse>(`${BASE_URL}/update-credentials-expiry-status`, data)
    },

    updateEnabledStatus: async (data: UpdateEnabledStatusRequest): Promise<MessageResponse> => {
        return apiClient.put<MessageResponse>(`${BASE_URL}/update-enabled-status`, data)
    },

    updateExpiryStatus: async (data: UpdateExpiryStatusRequest): Promise<MessageResponse> => {
        return apiClient.put<MessageResponse>(`${BASE_URL}/update-expiry-status`, data)
    }
}