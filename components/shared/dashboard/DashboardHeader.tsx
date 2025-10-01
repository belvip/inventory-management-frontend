import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ActionButton {
  label: string
  mobileLabel?: string
  icon: LucideIcon
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  disabled?: boolean
  loading?: boolean
  "aria-label"?: string
}

export interface DashboardHeaderProps {
  title: string
  subtitle: string
  badgeText?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  actions?: ActionButton[]
  className?: string
}

export function DashboardHeader({
  title,
  subtitle,
  badgeText,
  badgeVariant = "secondary",
  actions = [],
  className
}: DashboardHeaderProps) {
  const getAriaLabel = (action: ActionButton) => {
    return action["aria-label"] || (action.mobileLabel ? `${action.label} - ${action.mobileLabel}` : action.label)
  }

  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6",
      className
    )}>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 flex-wrap">
          <span className="truncate max-w-[200px] sm:max-w-none">{title}</span>
          {badgeText && (
            <Badge 
              variant={badgeVariant} 
              className="text-xs flex-shrink-0"
              aria-label={`Statut: ${badgeText}`}
            >
              {badgeText}
            </Badge>
          )}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base" aria-describedby="header-subtitle">
          {subtitle}
        </p>
      </div>
      
      {actions.length > 0 && (
        <div 
          className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto" 
          role="toolbar" 
          aria-label="Actions du dashboard"
        >
          {actions.map((action, index) => (
            <Button 
              key={`${action.label}-${index}`}
              variant={action.variant || "default"}
              size="sm" 
              className="gap-2 transition-transform hover:scale-105 active:scale-95"
              onClick={action.onClick}
              disabled={action.disabled}
              aria-label={getAriaLabel(action)}
              aria-describedby={action.loading ? "button-loading" : undefined}
            >
              <action.icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{action.label}</span>
              <span className="sm:hidden">{action.mobileLabel || action.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}