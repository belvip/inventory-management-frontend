"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { LoadingContent } from "@/components/global"
import { Loader2, ArrowRight } from "lucide-react"

export default function DashboardPage() {
    const router = useRouter()
    const { user, isLoading, isAuthenticated } = useAuth()
    
    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            const role = user.roles[0]
            if (role === 'ROLE_ADMIN') {
                router.push('/dashboard/admin')
            } else if (role === 'ROLE_MANAGER') {
                router.push('/dashboard/manager')
            } else if (role === 'ROLE_SALES') {
                router.push('/dashboard/sales')
            }
        }
    }, [user, isLoading, isAuthenticated, router])
    
    if (isLoading) {
        return <LoadingContent />
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="text-center space-y-6 p-8">
                <div className="flex justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                        Redirection en cours
                        <ArrowRight className="h-5 w-5 animate-pulse" />
                    </h1>
                    <p className="text-muted-foreground animate-pulse">
                        Vous êtes redirigé vers votre dashboard...
                    </p>
                </div>
            </div>
        </div>
    )
}