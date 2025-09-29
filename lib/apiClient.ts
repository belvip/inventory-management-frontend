import { toast } from "sonner"
import { ApiError } from "@/types"

interface ApiClientOptions {
  showErrorToast?: boolean
  showSuccessToast?: boolean
  successMessage?: string
}

class ApiClient {
  private readonly baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ""
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    clientOptions: ApiClientOptions = {}
  ): Promise<T> {
    const { showErrorToast = true, showSuccessToast = false, successMessage } = clientOptions

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const errorMessage = data.message || `Erreur ${response.status}`
        
        if (showErrorToast) {
          toast.error("Erreur", { description: errorMessage })
        }
        
        const error: ApiError = {
          response: {
            data: {
              message: errorMessage,
              timestamp: data.timestamp,
              details: data.details,
            }
          }
        }
        throw error
      }

      if (showSuccessToast && successMessage) {
        toast.success(successMessage)
      }

      return data
    } catch (error) {
      if (error instanceof Error && showErrorToast) {
        toast.error("Erreur réseau", { 
          description: "Impossible de contacter le serveur" 
        })
      }
      throw error
    }
  }

  // Méthodes HTTP
  async get<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" }, options)
  }

  async post<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      options
    )
  }

  async put<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
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