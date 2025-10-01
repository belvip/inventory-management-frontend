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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          {title}
          {badgeText && <Badge variant="secondary" className="text-xs">{badgeText}</Badge>}
        </h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="gap-2" onClick={onNewUser}>
          <Plus className="h-4 w-4" />
          Nouvel utilisateur
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={onViewReports}>
          <Eye className="h-4 w-4" />
          Voir rapports
        </Button>
      </div>
    </div>
  )
}