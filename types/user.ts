import { UseMutationResult } from "@tanstack/react-query";
import { AddressDto } from "./index";
import type { ApiError } from "./index";

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

export type CreateUserMutation = UseMutationResult<User, ApiError, { data: RegisterRequest }, unknown>;
export type UpdateUserMutation = UseMutationResult<User, ApiError, { id: number; data: UpdateUserRequest }, unknown>;
export type DeleteUserMutation = UseMutationResult<unknown, ApiError, number, unknown>;