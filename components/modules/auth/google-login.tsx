"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export function GoogleLogin() {
    const handleGoogleLogin = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8282'
        window.location.href = `${baseUrl}/oauth2/authorization/google`
    }

    return (
        <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-11 flex items-center justify-center gap-3 hover:bg-muted/50 transition-colors"
        >
            <FcGoogle className="h-5 w-5" />
            <span className="font-medium">Se connecter avec Google</span>
        </Button>
    )
}