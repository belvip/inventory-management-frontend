"use client"

import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LoadingContent } from "@/components/global"
import { MetricCard } from "@/components/modules/dashbord/admin/components/MetricCard"
import { DashboardHeader } from "@/components/modules/dashbord/admin/components/DashboardHeader"
import { AdminControlsSection } from "@/components/modules/dashbord/admin/components/AdminControlsSection"

export function AdminDashboard() {
    // Vérification des permissions admin
    const { user, isLoading: authLoading, hasRequiredRole } = useAuthGuard(['ROLE_ADMIN'])
    
    // Mock data - replace with actual hooks when available
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [retryCount, setRetryCount] = useState(0)
    
    const handleRetry = () => {
        setIsLoading(true)
        setIsError(false)
        setRetryCount(prev => prev + 1)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Simulate occasional error for demo
            setIsError(Math.random() > 0.7)
        }, 1000)
    }
    
    // Gérer les états de chargement d'authentification
    if (authLoading) {
        return <LoadingContent />
    }
    
    // Vérifier les permissions avant d'afficher le dashboard
    if (!hasRequiredRole) {
        return <LoadingContent />
    }
    
    // Admin-specific metrics - in real app, these would come from API
    const [totalUsers] = useState(156)
    const totalProducts = 1247;
    const totalOrders = 89;
    const monthlyRevenue = 125000;
    const systemUptime = 99.9;
    const archivedItems = 23;
    const lockedAccounts = 3;
    const activeManagers = 8;

    return (
        <div className="space-y-6 mt-0 sm:mt-0 md:mt-12">
            <DashboardHeader
                title="Administration"
                subtitle="Bienvenue ! Voici un aperçu de votre système d'inventaire."
                badgeText="Admin"
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Utilisateurs"
                    value={totalUsers}
                    description="Tous les utilisateurs système"
                    icon={Users}
                    iconColor="text-blue-500"
                    isLoading={isLoading}
                    isError={isError}
                    errorMessage="Impossible de charger les données utilisateurs"
                    progress={75}
                    change="+12%"
                    onRetry={handleRetry}
                    onClick={() => console.log('Navigate to users')}
                    isEmpty={totalUsers === 0}
                    emptyMessage="Aucun utilisateur enregistré"
                />
                
                <MetricCard
                    title="Produits"
                    value={totalProducts}
                    description="Articles en inventaire"
                    icon={Package}
                    iconColor="text-green-500"
                    isLoading={isLoading}
                    isError={isError}
                    progress={85}
                    change="+8%"
                />
                
                <MetricCard
                    title="Commandes"
                    value={totalOrders}
                    description="Commandes ce mois"
                    icon={ShoppingCart}
                    iconColor="text-purple-500"
                    isLoading={isLoading}
                    isError={isError}
                    progress={60}
                    change="+15%"
                />
                
                <MetricCard
                    title="Revenus du mois"
                    value={`${monthlyRevenue.toLocaleString()} fcfa`}
                    description={`Revenus ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`}
                    icon={TrendingUp}
                    iconColor="text-emerald-500"
                    isLoading={isLoading}
                    isError={isError}
                    progress={90}
                    change="+22%"
                />
            </div>

            <AdminControlsSection
                activeManagers={activeManagers}
                archivedItems={archivedItems}
                lockedAccounts={lockedAccounts}
                systemUptime={systemUptime}
                isLoading={isLoading}
                isError={isError}
            />
        </div>
    )
}