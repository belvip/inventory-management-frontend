import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/apiClient"

interface UserProfile {
  userId: number
  firstName: string
  lastName: string
  username: string
  email: string
  roles: string[]
  image?: string
}

export function useAuth() {
  const router = useRouter()
  const { user, accessToken, clearUser, isAuthenticated } = useUserStore()

  // Récupérer les données complètes de l'utilisateur depuis l'API
  const { data: fullUserData, isLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      if (!accessToken) return null
      apiClient.setToken(accessToken)
      return await apiClient.get<UserProfile>('/auth/user')
    },
    enabled: !!accessToken && isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  })

  const logout = () => {
    clearUser()
    router.push('/')
    toast.success("Déconnexion réussie")
  }

  // Utiliser les données complètes si disponibles, sinon les données du store
  const userData = fullUserData || user

  return {
    user: userData,
    isLoading,
    isAuthenticated: isAuthenticated(),
    logout,
    accessToken,
  }
}