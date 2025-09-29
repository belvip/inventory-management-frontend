import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/lib/apiClient"
import { toast } from "sonner"
import { ForgotPasswordRequest, MessageResponse, ResetPasswordRequest } from "@/types"

import { forgotPasswordService } from "@/service/forgotPasswordService"
import { resetPasswordService } from "@/service/resetPasswordService"

export function useForgotPassword() {
  return useMutation<MessageResponse, Error, ForgotPasswordRequest>({
    mutationFn: forgotPasswordService.sendResetEmail,
    onError: (error) => {
      toast.error("Error", { description: error.message })
    }
  })
}

export function useResetPassword() {
  return useMutation<MessageResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPasswordService.resetPassword,
    onError: (error) => {
      toast.error("Error", { description: error.message })
    }
  })
}