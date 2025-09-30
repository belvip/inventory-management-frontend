import { apiClient } from "@/lib/apiClient"
import { ResetPasswordRequest, MessageResponse } from "@/types"

export const resetPasswordService = {
  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/reset-password", data, {
      showSuccessToast: true,
      successMessage: "Mot de passe réinitialisé avec succès!"
    })
  }
}