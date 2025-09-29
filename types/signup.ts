import { AddressDto } from "./index"

export interface SignupRequest {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    image?: string
    address?: AddressDto
    signUpMethod?: string
}

export interface SignupResponse {
    userId: number
    firstName: string
    lastName: string
    userName: string
    email: string
    enabled: boolean
    accountNonLocked: boolean
    accountNonExpired: boolean
    credentialsNonExpired: boolean
    roleName: string
    image?: string
    address?: AddressDto
    createdDate: string
    updatedDate: string
}