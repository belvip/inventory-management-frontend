import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface ActionButtonProps {
  label: string
  mobileLabel?: string
  icon: LucideIcon
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
}

export function ActionButton({
  label,
  mobileLabel,
  icon: Icon,
  onClick,
  variant = "default",
  size = "sm",
  className = "",
  disabled = false
}: ActionButtonProps) {
  return (
    <Button 
      variant={variant}
      size={size}
      className={`gap-2 transition-all hover:scale-105 active:scale-95 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      {mobileLabel && <span className="sm:hidden">{mobileLabel}</span>}
    </Button>
  )
}