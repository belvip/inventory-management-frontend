export interface ResetPasswordRequest {
    token: string
    newPassword: string
}

export interface MessageResponse {
    message: string
}