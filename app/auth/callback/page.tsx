"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { LoadingContent } from "@/components/global"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function AuthCallback() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { login, isLoginLoading } = useAuth()
    const [processed, setProcessed] = useState(false)

    useEffect(() => {
        if (processed) return
        
        const token = searchParams.get('token')
        
        if (token) {
            console.log('Token reçu:', token)
            setProcessed(true)
            login(token)
        } else {
            toast.error("Token manquant")
            router.push('/')
        }
    }, [searchParams, login, processed, router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoadingContent message={isLoginLoading ? "Finalisation de la connexion..." : "Traitement..."} />
        </div>
    )
}