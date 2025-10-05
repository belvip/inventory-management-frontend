import { UseMutationResult } from "@tanstack/react-query";
import { AddressDto } from "./common";
import type { ApiError } from "./common";

export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    roleName: string;
    image?: string;
    address?: AddressDto;
    createdDate?: string;
    updatedDate?: string;
};

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    image?: string;
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
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
}

// Types spécifiques pour les requêtes utilisateur
export interface UpdateRoleRequest {
    userId: number
    roleName: string
}

export interface UpdatePasswordRequest {
    password: string
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

export interface RoleResponse {
  id: number;
  roleName: string;
}

export type CreateUserMutation = UseMutationResult<User, ApiError, { data: RegisterRequest }, unknown>;
export type UpdateUserMutation = UseMutationResult<User, ApiError, { id: number; data: UpdateUserRequest }, unknown>;
export type DeleteUserMutation = UseMutationResult<unknown, ApiError, number, unknown>;