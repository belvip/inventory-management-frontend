"use client"

import { Package, ShoppingCart, Users, Receipt, Truck, Eye } from "lucide-react"
import { MetricCard, DashboardHeader, ControlsSection, DashboardLayout } from "@/components/shared/dashboard"
import { useState, useEffect } from "react"

export function SaleDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData] = useState({
    totalArticles: 1247,
    totalOrders: 89,
    totalClients: 156,
    totalSales: 45,
    totalSuppliers: 23,
    supplierOrders: 34
  })
  
  useEffect(() => {
    // Simulation de données basées sur les endpoints Sales
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Tableau de Bord Ventes"
        subtitle="Gérez les ventes, clients et consultez les informations produits"
        badgeText="Sales"
        actions={[
          {
            label: "Nouvelle vente",
            mobileLabel: "Vente",
            icon: Receipt,
            variant: "default"
          },
          {
            label: "Voir clients",
            mobileLabel: "Clients",
            icon: Eye,
            variant: "outline"
          }
        ]}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Articles"
          value={dashboardData.totalArticles}
          description="Produits disponibles"
          icon={Package}
          iconColor="text-green-500"
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Commandes"
          value={dashboardData.totalOrders}
          description="Commandes clients"
          icon={ShoppingCart}
          iconColor="text-purple-500"
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Clients"
          value={dashboardData.totalClients}
          description="Base clients"
          icon={Users}
          iconColor="text-blue-500"
          isLoading={isLoading}
        />
      </div>

      <ControlsSection
        title="Gestion Commerciale"
        titleIcon={Receipt}
        titleIconColor="text-green-500"
        isLoading={isLoading}
        gridCols="3"
        metrics={[
          {
            title: "Ventes",
            value: dashboardData.totalSales,
            description: "Transactions réalisées",
            icon: Receipt,
            iconColor: "text-green-500"
          },
          {
            title: "Fournisseurs",
            value: dashboardData.totalSuppliers,
            description: "Partenaires disponibles",
            icon: Truck,
            iconColor: "text-orange-500"
          },
          {
            title: "Commandes Fournisseurs",
            value: dashboardData.supplierOrders,
            description: "Commandes consultables",
            icon: Package,
            iconColor: "text-blue-500"
          }
        ]}
      />
    </DashboardLayout>
  )
}