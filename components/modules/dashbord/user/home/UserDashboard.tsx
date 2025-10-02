"use client"

import { Package, Tags, Eye } from "lucide-react"
import { MetricCard, DashboardHeader, ControlsSection, DashboardLayout } from "@/components/shared/dashboard"
import { useState, useEffect } from "react"

export function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData] = useState({
    totalArticles: 1247,
    totalCategories: 45
  })
  
  useEffect(() => {
    // Simulation de données basées sur les endpoints User (consultation uniquement)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Tableau de Bord Utilisateur"
        subtitle="Consultez les informations sur les articles, commandes et entreprises"
        badgeText="User"
        actions={[
          {
            label: "Voir articles",
            mobileLabel: "Articles",
            icon: Eye,
            variant: "outline"
          }
        ]}
      />
      
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard
          title="Articles"
          value={dashboardData.totalArticles}
          description="Produits consultables"
          icon={Package}
          iconColor="text-green-500"
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Catégories"
          value={dashboardData.totalCategories}
          description="Catégories disponibles"
          icon={Tags}
          iconColor="text-orange-500"
          isLoading={isLoading}
        />
      </div>

      <ControlsSection
        title="Consultation"
        titleIcon={Eye}
        titleIconColor="text-gray-500"
        isLoading={isLoading}
        gridCols="2"
        metrics={[
          {
            title: "Articles par Code",
            value: "Recherche",
            description: "Consultation par code article",
            icon: Package,
            iconColor: "text-green-500"
          },
          {
            title: "Catégories par Entreprise",
            value: "Filtrage",
            description: "Consultation par entreprise",
            icon: Tags,
            iconColor: "text-orange-500"
          }
        ]}
      />
    </DashboardLayout>
  )
}