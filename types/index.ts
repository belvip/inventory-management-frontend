export const UserRoles = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    SALES: "SALES",
    USER: "USERS"
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface AddressDto {
    address1?: string;
    address2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface UserInfoResponseData {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image?: string;
    address?: AddressDto;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    credentialsExpiryDate?: string;
    accountExpiryDate?: string;
    isTwoFactorEnabled: boolean;
    signUpMethod?: string;
    roles: string[];
}


export interface ApiError {
    response?: {
        data?: {
            timestamp?: string;
            message?: string;
            details?: string;
        };
    };
}

export interface ErrorResponse {
    timestamp: string;
    message: string;
    details: string;
}

export interface TestAccount {
    readonly role: string;
    readonly username: string;
    readonly password: string;
    readonly name: string;
    readonly icon: React.ComponentType<{ className?: string }>;
}

export interface MessageResponse {
    message: string;
}

// export type
export * from "./user"
export type { ForgotPasswordRequest } from "./forgotPassword"
export type { ResetPasswordRequest } from "./resetPassword"
export type { SignupRequest, SignupResponse } from "./signup"