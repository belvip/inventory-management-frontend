import { AlertTriangle, UserCheck, Archive, Lock, Settings } from "lucide-react"
import { MetricCard } from "./MetricCard"

interface AdminControlsSectionProps {
  activeManagers: number
  archivedItems: number
  lockedAccounts: number
  systemUptime: number
  isLoading?: boolean
  isError?: boolean
  onManagersClick?: () => void
  onArchivedClick?: () => void
  onLockedClick?: () => void
  onSystemClick?: () => void
}

export function AdminControlsSection({
  activeManagers,
  archivedItems,
  lockedAccounts,
  systemUptime,
  isLoading = false,
  isError = false,
  onManagersClick,
  onArchivedClick,
  onLockedClick,
  onSystemClick
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
          icon={UserCheck}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
          onClick={onManagersClick}
          isEmpty={activeManagers === 0}
          emptyMessage="Aucun manager actif"
        />
        
        <MetricCard
          title="Articles Archivés"
          value={archivedItems}
          description="Produits archivés"
          icon={Archive}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
          onClick={onArchivedClick}
          isEmpty={archivedItems === 0}
          emptyMessage="Aucun article archivé"
        />
        
        <MetricCard
          title="Comptes Verrouillés"
          value={lockedAccounts}
          description="Nécessitent attention"
          icon={Lock}
          iconColor="text-orange-500"
          isLoading={isLoading}
          isError={isError}
          onClick={onLockedClick}
          badge={lockedAccounts > 0 ? "Action requise" : undefined}
          className="border-orange-200"
          isEmpty={false}
        />
        
        <MetricCard
          title="Système"
          value={`${systemUptime}%`}
          description="Temps de fonctionnement"
          icon={Settings}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
          onClick={onSystemClick}
          isEmpty={false}
        />
      </div>
    </div>
  )
}