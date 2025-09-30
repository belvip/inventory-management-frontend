"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
    const router = useRouter()
    
    useEffect(() => {
        // Redirect directly to admin dashboard for testing
        router.push('/dashboard/admin')
    }, [router])
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Redirection...</h1>
                <p className="text-muted-foreground">Vous êtes redirigé vers le dashboard admin</p>
            </div>
        </div>
    )
}