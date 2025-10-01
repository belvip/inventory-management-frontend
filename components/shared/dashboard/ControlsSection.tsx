import { LucideIcon } from "lucide-react"
import { MetricCard } from "./MetricCard"

interface ControlMetric {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconColor: string
  onClick?: () => void
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  className?: string
  isEmpty?: boolean
  emptyMessage?: string
}

interface ControlsSectionProps {
  title: string
  titleIcon?: LucideIcon
  titleIconColor?: string
  metrics: ControlMetric[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  gridCols?: "1" | "2" | "3" | "4"
}

export function ControlsSection({
  title,
  titleIcon: TitleIcon,
  titleIconColor = "text-muted-foreground",
  metrics,
  isLoading = false,
  isError = false,
  onRetry,
  gridCols = "4"
}: ControlsSectionProps) {
  const gridClasses = {
    "1": "grid-cols-1",
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {TitleIcon && <TitleIcon className={`h-5 w-5 ${titleIconColor}`} />}
      </div>
      <div className={`grid gap-4 ${gridClasses[gridCols]}`}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
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
          />
        ))}
      </div>
    </div>
  )
}