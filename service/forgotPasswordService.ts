import { apiClient } from "@/lib/apiClient"
import { ForgotPasswordRequest, MessageResponse } from "@/types/forgotPassword"

export const forgotPasswordService = {
  async sendResetEmail(data: ForgotPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/forgot-password", data, {
      showSuccessToast: true,
      successMessage: "Email de réinitialisation envoyé!"
    })
  }
}