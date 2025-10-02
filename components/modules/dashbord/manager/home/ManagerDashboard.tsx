"use client"

import { Building2, Package, ShoppingCart, Users, Truck, FileText, Plus } from "lucide-react"
import { MetricCard, DashboardHeader, ControlsSection, DashboardLayout } from "@/components/shared/dashboard"
import { useState, useEffect } from "react"

export function ManagerDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData] = useState({
    totalCompanies: 8,
    totalArticles: 1247,
    totalOrders: 156,
    totalClients: 89,
    totalSuppliers: 23,
    supplierOrders: 45
  })
  
  useEffect(() => {
    // Simulation de données basées sur les endpoints Manager
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Tableau de Bord Manager"
        subtitle="Gérez les entreprises, articles, commandes et fournisseurs"
        badgeText="Manager"
        actions={[
          {
            label: "Nouvel article",
            mobileLabel: "Article",
            icon: Plus,
            variant: "default"
          }
        ]}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Entreprises"
          value={dashboardData.totalCompanies}
          description="Entreprises gérées"
          icon={Building2}
          iconColor="text-blue-500"
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Articles"
          value={dashboardData.totalArticles}
          description="Articles en inventaire"
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
      </div>

      <ControlsSection
        title="Gestion Opérationnelle"
        titleIcon={FileText}
        titleIconColor="text-orange-500"
        isLoading={isLoading}
        gridCols="3"
        metrics={[
          {
            title: "Clients",
            value: dashboardData.totalClients,
            description: "Base clients active",
            icon: Users,
            iconColor: "text-blue-500"
          },
          {
            title: "Fournisseurs",
            value: dashboardData.totalSuppliers,
            description: "Partenaires fournisseurs",
            icon: Truck,
            iconColor: "text-green-500"
          },
          {
            title: "Commandes Fournisseurs",
            value: dashboardData.supplierOrders,
            description: "Commandes en cours",
            icon: FileText,
            iconColor: "text-orange-500"
          }
        ]}
      />
    </DashboardLayout>
  )
}