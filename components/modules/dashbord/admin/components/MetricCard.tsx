import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideIcon, RefreshCw } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconColor: string
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  progress?: number
  change?: string
  changeColor?: string
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  className?: string
  onClick?: () => void
  onRetry?: () => void
  isEmpty?: boolean
  emptyMessage?: string
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  isLoading = false,
  isError = false,
  errorMessage = "Erreur de chargement",
  progress,
  change,
  changeColor = "text-green-600",
  badge,
  badgeVariant = "destructive",
  className = "",
  onClick,
  onRetry,
  isEmpty = false,
  emptyMessage = "Aucune donnée disponible"
}: MetricCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Card 
      className={`hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? "button" : "status"}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={onClick ? `Voir détails pour ${title}` : `${title}: ${value}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div role="status" aria-label="Chargement en cours">
            <Skeleton className="h-8 w-16" />
          </div>
        ) : isError ? (
          <div className="space-y-2">
            <div className="text-sm font-medium text-red-500">{errorMessage}</div>
            {onRetry && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                className="gap-2"
                aria-label="Réessayer le chargement"
              >
                <RefreshCw className="h-3 w-3" />
                Réessayer
              </Button>
            )}
          </div>
        ) : isEmpty ? (
          <div className="text-sm text-muted-foreground">{emptyMessage}</div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold" aria-live="polite">{value}</div>
              {badge && <Badge variant={badgeVariant} className="text-xs">{badge}</Badge>}
            </div>
            {progress !== undefined && change && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progress} className="flex-1 h-2" aria-label={`Progression: ${progress}%`} />
                <span className={`text-xs ${changeColor}`} aria-label={`Changement: ${change}`}>{change}</span>
              </div>
            )}
          </>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}