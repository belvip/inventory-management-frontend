"use client"

import { useAuthGuard } from "@/hooks/useAuthGuard"
import { FormLoadingState } from "@/components/global"

export default function UserDashboard() {
    const { user, isLoading } = useAuthGuard(['ROLE_USER'])

    if (isLoading) return <FormLoadingState isLoading={true}><div /></FormLoadingState>

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard Utilisateur</h1>
            <p className="text-muted-foreground mt-2">Bienvenue {user?.firstName} {user?.lastName}</p>
        </div>
    )
}