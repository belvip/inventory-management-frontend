import { AlertTriangle } from "lucide-react"
import { MetricCard } from "./MetricCard"

interface AdminControlsSectionProps {
  activeManagers: number
  archivedItems: number
  lockedAccounts: number
  systemUptime: number
  isLoading?: boolean
  isError?: boolean
}

export function AdminControlsSection({
  activeManagers,
  archivedItems,
  lockedAccounts,
  systemUptime,
  isLoading = false,
  isError = false
}: AdminControlsSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Contrôles Administrateur</h2>
        <AlertTriangle className="h-5 w-5 text-orange-500" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Managers Actifs"
          value={activeManagers}
          description="Équipe de gestion"
          icon={() => <div />}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
        />
        
        <MetricCard
          title="Articles Archivés"
          value={archivedItems}
          description="Produits archivés"
          icon={() => <div />}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
        />
        
        <MetricCard
          title="Comptes Verrouillés"
          value={lockedAccounts}
          description="Nécessitent attention"
          icon={() => <div />}
          iconColor="text-orange-500"
          isLoading={isLoading}
          isError={isError}
          badge={lockedAccounts > 0 ? "Action requise" : undefined}
          className="border-orange-200"
        />
        
        <MetricCard
          title="Système"
          value={`${systemUptime}%`}
          description="Temps de fonctionnement"
          icon={() => <div />}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  )
}