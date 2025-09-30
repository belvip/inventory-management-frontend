import { toast } from "sonner"
import { ApiError } from "@/types"

interface ApiClientOptions {
  showErrorToast?: boolean
  showSuccessToast?: boolean
  successMessage?: string
}

class ApiClient {
  private readonly baseURL: string
  private token: string | null = null
  private onUnauthorized?: () => void

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ""
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken')
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('accessToken', token)
      } else {
        localStorage.removeItem('accessToken')
      }
    }
  }

  setUnauthorizedHandler(handler: () => void) {
    this.onUnauthorized = handler
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    clientOptions: ApiClientOptions = {}
  ): Promise<T> {
    const { showErrorToast = true, showSuccessToast = false, successMessage } = clientOptions

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401 || response.status === 403) {
      this.onUnauthorized?.()
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

  async patch<T>(endpoint: string, data?: any, options?: ApiClientOptions): Promise<T> {
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