import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/apiClient"

export function useAuth() {
  const router = useRouter()
  const { user, accessToken, clearUser, isAuthenticated } = useUserStore()

  const logout = async () => {
    console.log('Logout function called')
    // Déconnexion locale uniquement (l'API a un problème serveur)
    clearUser()
    toast.success("Déconnexion réussie")
    // Forcer la redirection vers login
    window.location.href = '/login'
  }

  return {
    user,
    isLoading: false,
    isAuthenticated: isAuthenticated(),
    logout,
    accessToken,
  }
}