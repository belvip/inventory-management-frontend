import { UseMutationResult } from "@tanstack/react-query";
import { AddressDto } from "./common";
import type { ApiError } from "./common";

export type User = {
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
};

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    image?: string;
    signUpMethod?: string;
    address?: AddressDto;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SigninResponse {
    username: string;
    roles: string[];
    jwtToken: string;
    refreshToken: string;
}

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    image?: string;
    address?: AddressDto;
}

// Types spécifiques pour les requêtes utilisateur
export interface UpdateRoleRequest {
    userId: number
    roleName: string
}

export interface UpdatePasswordRequest {
    currentPassword: string
    newPassword: string
}

export interface UpdateLockStatusRequest {
    userId: number
    lock: boolean
}

export interface UpdateEnabledStatusRequest {
    userId: number
    enabled: boolean
}

export interface UpdateExpiryStatusRequest {
    userId: number
    expire: boolean
}

export type CreateUserMutation = UseMutationResult<User, ApiError, { data: RegisterRequest }, unknown>;
export type UpdateUserMutation = UseMutationResult<User, ApiError, { id: number; data: UpdateUserRequest }, unknown>;
export type DeleteUserMutation = UseMutationResult<unknown, ApiError, number, unknown>;