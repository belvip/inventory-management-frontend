"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { FormLoadingState } from "@/components/global"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

function AuthCallbackContent() {
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
            <FormLoadingState isLoading={true}>
                <div className="text-center space-y-4">
                    <div className="text-lg font-medium">
                        {isLoginLoading ? "Finalisation de la connexion..." : "Traitement..."}
                    </div>
                </div>
            </FormLoadingState>
        </div>
    )
}

export default function AuthCallback() {
    return (
        <Suspense fallback={<FormLoadingState isLoading={true}><div /></FormLoadingState>}>
            <AuthCallbackContent />
        </Suspense>
    )
}