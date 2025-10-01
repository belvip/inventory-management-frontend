import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from "lucide-react"

interface DashboardHeaderProps {
  title: string
  subtitle: string
  badgeText?: string
  onNewUser?: () => void
  onViewReports?: () => void
}

export function DashboardHeader({
  title,
  subtitle,
  badgeText,
  onNewUser,
  onViewReports
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 flex-wrap">
          <span className="truncate">{title}</span>
          {badgeText && <Badge variant="secondary" className="text-xs flex-shrink-0">{badgeText}</Badge>}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{subtitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button 
          size="sm" 
          className="gap-2 transition-all hover:scale-105 active:scale-95" 
          onClick={onNewUser}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nouvel utilisateur</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 transition-all hover:scale-105 active:scale-95" 
          onClick={onViewReports}
        >
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">Voir rapports</span>
          <span className="sm:hidden">Rapports</span>
        </Button>
      </div>
    </div>
  )
}