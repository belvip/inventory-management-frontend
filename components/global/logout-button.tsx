import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/stores/userStore"

interface LogoutButtonProps {
  readonly variant?: "default" | "outline" | "ghost"
  readonly size?: "sm" | "lg" | "icon" | "default"
  readonly showText?: boolean
}

export function LogoutButton({ 
  variant = "ghost", 
  size = "sm",
  showText = true 
}: LogoutButtonProps) {
  const clearUser = useUserStore((state) => state.clearUser)

  const handleLogout = () => {
    clearUser()
    // Redirection vers login si nécessaire
    window.location.href = "/login"
  }

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleLogout}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {showText && "Déconnexion"}
    </Button>
  )
}