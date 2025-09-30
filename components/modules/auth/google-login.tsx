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
            className="w-full h-12 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-blue-400 bg-gradient-to-r from-background to-muted/20 hover:from-blue-50/50 hover:to-background rounded-xl"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FcGoogle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300 relative z-10">
                Continuer avec Google
            </span>
        </Button>
    )
}