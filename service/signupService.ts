import { apiClient } from "@/lib/apiClient"
import { SignupRequest, SignupResponse } from "@/types"

export const signupService = {
  async register(data: SignupRequest): Promise<SignupResponse> {
    return apiClient.post<SignupResponse>("/auth/signup", data, {
      showSuccessToast: true,
      successMessage: "Compte créé avec succès!"
    })
  }
}