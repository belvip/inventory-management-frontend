import { LucideIcon } from "lucide-react"
import { MetricCard } from "./MetricCard"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

export type IconColor = "text-blue-500" | "text-green-500" | "text-red-500" | "text-purple-500" | "text-orange-500" | "text-gray-500" | "text-muted-foreground"

export interface ControlMetric {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconColor?: IconColor
  onClick?: () => void
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  className?: string
  isEmpty?: boolean
  emptyMessage?: string
  progress?: number
  change?: string
  changeColor?: "text-green-600" | "text-red-600" | "text-yellow-600" | "text-blue-600" | "text-gray-600"
}

export interface ControlsSectionProps {
  title: string
  titleIcon?: LucideIcon
  titleIconColor?: IconColor
  metrics: ControlMetric[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  gridCols?: "1" | "2" | "3" | "4"
  className?: string
}

export function ControlsSection({
  title,
  titleIcon: TitleIcon,
  titleIconColor = "text-muted-foreground",
  metrics,
  isLoading = false,
  isError = false,
  onRetry,
  gridCols = "4",
  className
}: ControlsSectionProps) {
  const gridClassName = useMemo(() => {
    const gridClasses = {
      "1": "grid-cols-1",
      "2": "grid-cols-1 sm:grid-cols-2",
      "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    } as const
    
    return `grid gap-4 ${gridClasses[gridCols]}`
  }, [gridCols])

  // État vide global
  const isEmptySection = !isLoading && !isError && metrics.length === 0

  return (
    <section className={className} aria-labelledby="controls-section-title">
      <div className="flex items-center gap-2 mb-4">
        <h2 id="controls-section-title" className="text-xl font-semibold">
          {title}
        </h2>
        {TitleIcon && (
          <TitleIcon 
            className={`h-5 w-5 ${titleIconColor}`} 
            aria-hidden="true" 
          />
        )}
      </div>

      {isError && (
        <div 
          className="text-center py-8 border rounded-lg" 
          role="alert"
          aria-live="assertive"
        >
          <p className="text-red-500 mb-2">Erreur de chargement des contrôles</p>
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              Réessayer
            </Button>
          )}
        </div>
      )}

      {isEmptySection && (
        <div 
          className="text-center py-8 text-muted-foreground border rounded-lg"
          aria-live="polite"
        >
          Aucun contrôle disponible
        </div>
      )}

      {!isError && !isEmptySection && (
        <div className={gridClassName}>
          {metrics.map((metric, index) => (
            <MetricCard
              key={`${metric.title}-${index}`}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              iconColor={metric.iconColor}
              isLoading={isLoading}
              isError={isError}
              onRetry={onRetry}
              onClick={metric.onClick}
              badge={metric.badge}
              badgeVariant={metric.badgeVariant}
              className={metric.className}
              isEmpty={metric.isEmpty}
              emptyMessage={metric.emptyMessage}
              progress={metric.progress}
              change={metric.change}
              changeColor={metric.changeColor}
            />
          ))}
        </div>
      )}
    </section>
  )
}