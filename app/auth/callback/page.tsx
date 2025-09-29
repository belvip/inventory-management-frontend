"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { LoadingContent } from "@/components/global"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function AuthCallback() {
    const searchParams = useSearchParams()
    const { login, isLoginLoading } = useAuth()

    useEffect(() => {
        const token = searchParams.get('token')
        
        if (token) {
            login(token)
        } else {
            toast.error("Token manquant")
        }
    }, [searchParams, login])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoadingContent message={isLoginLoading ? "Finalisation de la connexion..." : "Redirection..."} />
        </div>
    )
}