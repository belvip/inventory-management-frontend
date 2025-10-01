import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface ActionButton {
  label: string
  mobileLabel?: string
  icon: LucideIcon
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

interface DashboardHeaderProps {
  title: string
  subtitle: string
  badgeText?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
  actions?: ActionButton[]
}

export function DashboardHeader({
  title,
  subtitle,
  badgeText,
  badgeVariant = "secondary",
  actions = []
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 flex-wrap">
          <span className="truncate">{title}</span>
          {badgeText && <Badge variant={badgeVariant} className="text-xs flex-shrink-0">{badgeText}</Badge>}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{subtitle}</p>
      </div>
      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant || "default"}
              size="sm" 
              className="gap-2 transition-all hover:scale-105 active:scale-95" 
              onClick={action.onClick}
            >
              <action.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{action.label}</span>
              <span className="sm:hidden">{action.mobileLabel || action.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}