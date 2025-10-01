import { Button } from "@/components/ui/button"
import { LucideIcon, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface ActionButtonProps {
  label: string
  mobileLabel?: string
  icon?: LucideIcon
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
  loading?: boolean
  tooltip?: string
  iconSize?: "sm" | "md" | "lg"
}

export function ActionButton({
  label,
  mobileLabel,
  icon: Icon,
  onClick,
  variant = "default",
  size = "sm",
  className = "",
  disabled = false,
  loading = false,
  tooltip,
  iconSize = "md"
}: ActionButtonProps) {
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  } as const

  const buttonContent = (
    <Button 
      variant={variant}
      size={size}
      className={cn(
        "gap-2 transition-transform hover:scale-105 active:scale-95",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={mobileLabel ? `${label} - ${mobileLabel}` : label}
      aria-disabled={disabled || loading}
      tabIndex={disabled ? -1 : 0}
    >
      {loading ? (
        <Loader2 className={cn("animate-spin", iconSizes[iconSize])} aria-hidden="true" />
      ) : Icon ? (
        <Icon className={iconSizes[iconSize]} aria-hidden="true" />
      ) : null}
      
      <span className="hidden sm:inline">{label}</span>
      {mobileLabel ? (
        <span className="sm:hidden">{mobileLabel}</span>
      ) : (
        <span className="sm:hidden">{label}</span>
      )}
    </Button>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return buttonContent
}