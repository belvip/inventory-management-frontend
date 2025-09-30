"use client"

import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LoadingContent } from "@/components/global"

export default function ManagerDashboard() {
    const { user, isLoading } = useAuthGuard(['ROLE_MANAGER'])

    if (isLoading) return <LoadingContent />

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard Manager</h1>
            <p className="text-muted-foreground mt-2">Bienvenue {user?.firstName} {user?.lastName}</p>
        </div>
    )
}