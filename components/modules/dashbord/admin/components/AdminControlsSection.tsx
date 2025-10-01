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
  onRetry?: () => void
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
  onSystemClick,
  onRetry
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
          errorMessage="Impossible de charger les données managers. Vérifiez la connexion."
          onRetry={onRetry}
          onClick={onManagersClick}
          isEmpty={!isLoading && !isError && activeManagers === 0}
          emptyMessage="Aucun manager actif dans le système"
        />
        
        <MetricCard
          title="Articles Archivés"
          value={archivedItems}
          description="Produits archivés"
          icon={Archive}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
          errorMessage="Données d'archivage indisponibles. Réessayez dans quelques instants."
          onRetry={onRetry}
          onClick={onArchivedClick}
          isEmpty={!isLoading && !isError && archivedItems === 0}
          emptyMessage="Aucun élément archivé. Tout est actif !"
        />
        
        <MetricCard
          title="Comptes Verrouillés"
          value={lockedAccounts}
          description="Nécessitent attention"
          icon={Lock}
          iconColor="text-orange-500"
          isLoading={isLoading}
          isError={isError}
          errorMessage="Statut des comptes verrouillés inaccessible. Problème de sécurité."
          onRetry={onRetry}
          onClick={onLockedClick}
          badge={lockedAccounts > 0 ? "Action requise" : undefined}
          className="border-orange-200"
          isEmpty={!isLoading && !isError && lockedAccounts === 0}
          emptyMessage="Aucun compte verrouillé. Sécurité optimale !"
        />
        
        <MetricCard
          title="Système"
          value={`${systemUptime}%`}
          description="Temps de fonctionnement"
          icon={Settings}
          iconColor="text-muted-foreground"
          isLoading={isLoading}
          isError={isError}
          errorMessage="Métriques système indisponibles. Contactez l'administrateur technique."
          onRetry={onRetry}
          onClick={onSystemClick}
          isEmpty={!isLoading && !isError && systemUptime === 0}
          emptyMessage="Système hors ligne. Maintenance en cours."
        />
      </div>
    </div>
  )
}