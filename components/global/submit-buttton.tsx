import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubmitButtonProps {
  readonly isLoading: boolean
  readonly children: React.ReactNode
  readonly className?: string
  readonly disabled?: boolean
  readonly type?: "button" | "submit" | "reset"
}

export function SubmitButton({ 
  isLoading, 
  children, 
  className,
  disabled,
  type = "submit"
}: SubmitButtonProps) {
  return (
    <Button 
      type={type}
      disabled={isLoading || disabled}
      className={cn("w-full", className)}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}