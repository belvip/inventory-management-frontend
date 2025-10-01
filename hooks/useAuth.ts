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
    router.push('/auth/login')
    toast.success("Déconnexion réussie")
  }

  return {
    user,
    isLoading: false,
    isAuthenticated: isAuthenticated(),
    logout,
    accessToken,
  }
}