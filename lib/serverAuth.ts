import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface AuthenticatedUser {
    user: User;
    accessToken: string;
}

// Get user from API using token
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        }

        const user = await response.json();
        return { user, accessToken };
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

// Centralized authentication logic
export async function authenticate(redirectPath = "/login"): Promise<AuthenticatedUser> {
    const authUser = await getCurrentUser();

    if (!authUser) {
        redirect(redirectPath);
    }

    return authUser;
}

// Centralized authorization logic
export async function authorize(
    user: User,
    allowedRoles: string[],
    redirectPath = "/unauthorized"
): Promise<boolean> {
    const hasPermission = user.roles.some(role => allowedRoles.includes(role));

    if (!hasPermission) {
        console.warn("Unauthorized access by roles:", user.roles);
        redirect(redirectPath);
        return false;
    }
    return true;
}

// Combined authentication + authorization
export async function getAuthenticatedUser(options?: {
    allowedRoles?: string[];
    authRedirect?: string;
    authzRedirect?: string;
}) {
    const authUser = await authenticate(options?.authRedirect);

    if (options?.allowedRoles) {
        await authorize(authUser.user, options.allowedRoles, options?.authzRedirect);
    }

    return authUser;
}