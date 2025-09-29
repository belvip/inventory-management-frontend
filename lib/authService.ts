import { apiClient } from "@/lib/apiClient"
import { LoginRequest, SigninResponse, User } from "@/types/user"

export const authService = {
  async signIn(credentials: LoginRequest): Promise<SigninResponse> {
    return apiClient.post<SigninResponse>("/auth/signin", credentials, {
      showSuccessToast: true,
      successMessage: "🎉 Connexion réussie!"
    })
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiClient.post("/auth/forgot-password", { email }, {
      showSuccessToast: true,
      successMessage: "Email de réinitialisation envoyé!"
    })
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/user", {
      showErrorToast: false
    })
  },

  async signOut(): Promise<{ message: string }> {
    return apiClient.post("/auth/signout", undefined, {
      showSuccessToast: true,
      successMessage: "Déconnexion réussie"
    })
  }
}