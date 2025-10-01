import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const { user, accessToken, clearUser, isAuthenticated } = useUserStore()

  const logout = () => {
    clearUser()
    router.push('/')
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