import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideIcon, RefreshCw, FileX } from "lucide-react"
import { EmptyState } from "@/components/global/EmptyState"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

type ChangeColor = "text-green-600" | "text-red-600" | "text-yellow-600" | "text-blue-600" | "text-gray-600"
type IconColor = "text-blue-500" | "text-green-500" | "text-red-500" | "text-purple-500" | "text-orange-500" | "text-gray-500" | "text-muted-foreground"

function MetricLoadingState() {
  return (
    <div role="status" aria-live="polite" aria-label="Chargement des métriques">
      <Skeleton className="h-8 w-16" />
    </div>
  )
}

interface MetricErrorStateProps {
  errorMessage: string
  onRetry?: () => void
}

function MetricErrorState({ errorMessage, onRetry }: MetricErrorStateProps) {
  return (
    <div role="alert" aria-live="assertive" className="space-y-2">
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
  )
}

interface MetricMainContentProps {
  title: string
  value: string
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  progress?: number
  change?: string
  changeColor?: ChangeColor
}

function MetricMainContent({ title, value, badge, badgeVariant, progress, change, changeColor }: MetricMainContentProps) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="text-lg font-bold sm:text-xl md:text-2xl" aria-live="polite">{value}</div>
        {badge && <Badge variant={badgeVariant} className="text-xs flex-shrink-0">{badge}</Badge>}
      </div>
      {progress !== undefined && change && (
        <div className="flex items-center gap-2 mt-2">
          <Progress value={progress} className="flex-1 h-2" aria-label={`Progression de ${title}: ${progress}%`} />
          <span className={`text-xs sm:text-sm ${changeColor} flex-shrink-0`} aria-label={`Évolution: ${change}`}>{change}</span>
        </div>
      )}
    </>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconColor?: IconColor
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  progress?: number
  change?: string
  changeColor?: ChangeColor
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
  const displayValue = useMemo(() => {
    if (typeof value === 'number') return value.toLocaleString()
    return value
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    } else if (e.key === 'Escape' && onClick) {
      (e.currentTarget as HTMLElement).blur()
    }
  }



  const getDataState = () => {
    if (isLoading) return "loading"
    if (isError) return "error"
    if (isEmpty) return "empty"
    return "ready"
  }

  const renderContent = () => {
    if (isLoading) return <MetricLoadingState />
    if (isError) return <MetricErrorState errorMessage={errorMessage} onRetry={onRetry} />
    if (isEmpty) return (
      <EmptyState
        title=""
        description={emptyMessage}
        icon={<FileX className="h-6 w-6 text-muted-foreground" />}
      />
    )
    return (
      <MetricMainContent
        title={title}
        value={displayValue}
        badge={badge}
        badgeVariant={badgeVariant}
        progress={progress}
        change={change}
        changeColor={changeColor}
      />
    )
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        !onClick && "hover:shadow-md",
        className
      )}
      role={onClick ? "button" : "status"}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={onClick ? `Voir détails pour ${title}` : `${title}: ${value}`}
      data-testid="metric-card"
      data-state={getDataState()}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
        <CardTitle className="text-sm font-medium truncate pr-2">{title}</CardTitle>
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor} flex-shrink-0`} aria-hidden="true" />
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {renderContent()}
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}