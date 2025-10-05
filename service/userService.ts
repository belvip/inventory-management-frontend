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
    create: async (data: RegisterRequest) => {
        return apiClient.post<User>(`${BASE_URL}/create`, data);
    },

    // UPDATE USER
    update: async (id: number, data: UpdateUserRequest): Promise<User> => {
        return apiClient.put<User>(`${BASE_URL}/update/${id}`, data)
    },

    // UPDATE USER ROLE
    updateRole: async (data: UpdateRoleRequest): Promise<string> => {
        const validRoles = Object.values(UserRoles)
        if (!validRoles.includes(data.roleName as any)) {
            throw new Error(`Rôle invalide: ${data.roleName}. Rôles valides: ${validRoles.join(', ')}`)
        }
        return apiClient.put<string>(`${BASE_URL}/update/role`, data)
    },

    // GET USER BY ID
    getById: async (id: number): Promise<User> => {
        return apiClient.get<User>(`${BASE_URL}/${id}`)
    },

    // DELETE USER
    delete: async (id: number): Promise<{id: number, userName: string, email: string, message: string}> => {
        return apiClient.delete<{id: number, userName: string, email: string, message: string}>(`${BASE_URL}/${id}`)
    },

    // SEARCH USERS
    search: async (keyword: string): Promise<User[]> => {
        return apiClient.get<User[]>(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`)
    },

    // GET ALL USERS
    getAll: async (): Promise<User[]> => {
        return apiClient.get<User[]>(`${BASE_URL}/all`)
    },

    // UPDATE USER IMAGE (PUBLIC)
    updateImage: async (userId: number, image: File): Promise<{id: number, userName: string, imageUrl: string}> => {
        const formData = new FormData()
        formData.append('image', image)
        return apiClient.put<{id: number, userName: string, imageUrl: string}>(`${BASE_URL}/${userId}/image`, formData)
    },

    // UPDATE OWN PASSWORD (PUBLIC)
    updatePassword: async (password: string): Promise<string> => {
        return apiClient.put<string>(`${BASE_URL}/update-password`, { password })
    },

    // GET ALL ROLES
    getRoles: async (): Promise<Array<{id: number, roleName: string}>> => {
        return apiClient.get<Array<{id: number, roleName: string}>>(`${BASE_URL}/roles`)
    },

    // STATUS UPDATE METHODS (all return string messages)
    updateLockStatus: async (data: UpdateLockStatusRequest): Promise<string> => {
        return apiClient.put<string>(`${BASE_URL}/update-lock-status`, data)
    },

    updateCredentialsExpiryStatus: async (data: UpdateExpiryStatusRequest): Promise<string> => {
        return apiClient.put<string>(`${BASE_URL}/update-credentials-expiry-status`, data)
    },

    updateEnabledStatus: async (data: UpdateEnabledStatusRequest): Promise<string> => {
        return apiClient.put<string>(`${BASE_URL}/update-enabled-status`, data)
    },

    updateExpiryStatus: async (data: UpdateExpiryStatusRequest): Promise<string> => {
        return apiClient.put<string>(`${BASE_URL}/update-expiry-status`, data)
    }
}