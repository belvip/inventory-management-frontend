// lib/apiClient.ts
import { toast } from "sonner"
import { useUserStore } from '@/stores/userStore'

interface ApiClientOptions {
  showErrorToast?: boolean
  showSuccessToast?: boolean
  successMessage?: string
  skipAuth?: boolean // 👈 Nouvelle option pour endpoints publics
}

class ApiClient {
  private readonly baseURL: string
  private onUnauthorized?: () => void

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ""
  }

  setUnauthorizedHandler(handler: () => void) {
    this.onUnauthorized = handler
  }

  // Récupérer le token depuis Zustand
  private getToken(): string | null {
    return useUserStore.getState().accessToken
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    clientOptions: ApiClientOptions = {}
  ): Promise<T> {
    const { 
      showErrorToast = true, 
      showSuccessToast = false, 
      successMessage,
      skipAuth = false 
    } = clientOptions

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    }

    // Ajouter le token seulement si nécessaire et disponible
    const token = this.getToken()
    if (!skipAuth && token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    // Gestion des erreurs d'authentification
    if (response.status === 401 || response.status === 403) {
      const { clearUser } = useUserStore.getState()
      clearUser() // 👈 Nettoyage automatique du store
      this.onUnauthorized?.()
      
      if (showErrorToast) {
        toast.error("Session expirée", { 
          description: "Veuillez vous reconnecter" 
        })
      }
      
      throw new Error("Non autorisé")
    }

    if (!response.ok) {
      const errorRes = await response.json().catch(() => ({}))
      const errorMessage = errorRes.message || `Erreur ${response.status}`
      
      if (showErrorToast) {
        toast.error("Erreur", { description: errorMessage })
      }
      
      throw new Error(errorMessage)
    }

    const data = await response.json().catch(() => ({}))

    if (showSuccessToast && successMessage) {
      toast.success(successMessage)
    }

    return data
  }

  async get<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" }, options)
  }

  async post<T>(endpoint: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      options
    )
  }

  async put<T>(endpoint: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      options
    )
  }

  async patch<T>(endpoint: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      options
    )
  }

  async delete<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" }, options)
  }
}

export const apiClient = new ApiClient()

// Hook personnalisé pour l'authentification
export function useAuth() {
  const { user, accessToken, isAuthenticated, clearUser } = useUserStore()
  
  return {
    user,
    token: accessToken,
    isAuthenticated: isAuthenticated(),
    logout: clearUser,
  }
}