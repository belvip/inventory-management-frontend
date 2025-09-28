export function getEnv() {
    return {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        authSecret: process.env.NEXTAUTH_SECRET,
        authUrl: process.env.NEXTAUTH_URL,
    }
}