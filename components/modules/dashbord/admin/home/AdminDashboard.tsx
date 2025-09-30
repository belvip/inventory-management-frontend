"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Package, ShoppingCart, TrendingUp, Settings, Archive, UserCheck, Lock, Plus, Eye, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { UserRoles } from "@/types"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LoadingContent } from "@/components/global"

export function AdminDashboard() {
    // Mock data - replace with actual hooks when available
    const isLoading = false;
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
        <div className="space-y-6 mt-0 sm:mt-0 md:mt-12">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        Administration
                        <Badge variant="secondary" className="text-xs">Admin</Badge>
                    </h1>
                    <p className="text-muted-foreground mt-1">Bienvenue ! Voici un aperçu de votre système d'inventaire.</p>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nouvel utilisateur
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Voir rapports
                    </Button>
                </div>
            </div>

            {/* Main Admin Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{totalUsers}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Progress value={75} className="flex-1 h-2" />
                                    <span className="text-xs text-green-600">+12%</span>
                                </div>
                            </>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Tous les utilisateurs système</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produits</CardTitle>
                        <Package className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{totalProducts}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Progress value={85} className="flex-1 h-2" />
                                    <span className="text-xs text-green-600">+8%</span>
                                </div>
                            </>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Articles en inventaire</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{totalOrders}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Progress value={60} className="flex-1 h-2" />
                                    <span className="text-xs text-green-600">+15%</span>
                                </div>
                            </>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Commandes ce mois</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : isError ? (
                            <div className="text-2xl font-bold text-red-500">Erreur</div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-emerald-600">{monthlyRevenue.toLocaleString()} fcfa</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Progress value={90} className="flex-1 h-2" />
                                    <span className="text-xs text-green-600">+22%</span>
                                </div>
                            </>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Revenus {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Admin-Specific Controls */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold">Contrôles Administrateur</h2>
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

                <Card className="hover:shadow-md transition-shadow cursor-pointer border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Comptes Verrouillés</CardTitle>
                        <Lock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-orange-600">{lockedAccounts}</div>
                            {lockedAccounts > 0 && <Badge variant="destructive" className="text-xs">Action requise</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Nécessitent attention</p>
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
        </div>
    )
}