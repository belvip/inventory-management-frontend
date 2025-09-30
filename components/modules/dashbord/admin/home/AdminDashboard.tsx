"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, TrendingUp, Settings, Archive, UserCheck, Lock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { UserRoles } from "@/types"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LoadingContent } from "@/components/global"

export function AdminDashboard() {
    const { user, isLoading } = useAuthGuard(['ADMIN'])
    
    if (isLoading) return <LoadingContent />
    
    // Mock data - replace with actual hooks when available
    const isError = false;
    
    // Admin-specific metrics
    const totalUsers = 156;
    const totalProducts = 1247;
    const totalOrders = 89;
    const monthlyRevenue = 125000;
    const systemUptime = 99.9;
    const archivedItems = 23;
    const lockedAccounts = 3;
    const activeManagers = 8;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
                <p className="text-muted-foreground">Contrôle total du système : gestion des utilisateurs, inventaire, commandes, et configuration système.</p>
            </div>

            {/* Main Admin Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <div className="text-2xl font-bold">{totalUsers}</div>
                        )}
                        <p className="text-xs text-muted-foreground">Tous les utilisateurs système</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produits</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <div className="text-2xl font-bold">{totalProducts}</div>
                        )}
                        <p className="text-xs text-muted-foreground">Articles en inventaire</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <div className="text-2xl font-bold">{totalOrders}</div>
                        )}
                        <p className="text-xs text-muted-foreground">Commandes ce mois</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <div className="text-2xl font-bold">{monthlyRevenue.toLocaleString()} €</div>
                        )}
                        <p className="text-xs text-muted-foreground">Revenus {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Admin-Specific Controls */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Managers Actifs</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeManagers}</div>
                        <p className="text-xs text-muted-foreground">Équipe de gestion</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Articles Archivés</CardTitle>
                        <Archive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{archivedItems}</div>
                        <p className="text-xs text-muted-foreground">Produits archivés</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Comptes Verrouillés</CardTitle>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{lockedAccounts}</div>
                        <p className="text-xs text-muted-foreground">Nécessitent attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Système</CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{systemUptime}%</div>
                        <p className="text-xs text-muted-foreground">Temps de fonctionnement</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}