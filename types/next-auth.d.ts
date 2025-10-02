import "next-auth";


interface Address {
    address1?: string;
    address2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

declare module "next-auth" {
    interface User {
        userId: number;
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
        image?: string;
        address?: Address;
        accountNonLocked: boolean;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
        enabled: boolean;
        credentialsExpiryDate?: string;
        accountExpiryDate?: string;
        twoFactorEnabled: boolean;
        signUpMethod?: string;
        roles: string[];
        accessToken?: string;
        refreshToken?: string;
    }

    interface Session {
        user: User;
        accessToken?: string;
        refreshToken?: string;
        expires: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: number;
        userName: string;
        email: string;
        firstName: string;
        lastName: string;
        roles: string[];
        accessToken?: string;
        refreshToken?: string;
    }
}