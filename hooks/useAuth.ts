import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/apiClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserProfile {
  userId: number
  firstName: string
  lastName: string
  userName: string
  email: string
  roles: string[]
}

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: user, isLoading } = useQuery<UserProfile | null>({
    queryKey: ['auth', 'user'],
    queryFn: () => apiClient.get<UserProfile>('/auth/user'),
    retry: false,
    staleTime: 5 * 60 * 1000, 
    enabled: false, 
  })

  const loginMutation = useMutation({
    mutationFn: async (token: string) => {
      apiClient.setToken(token)
      return apiClient.get<UserProfile>('/auth/user')
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['auth', 'user'], userData)
      
      // Redirection selon le rôle
      const role = userData.roles[0]
      if (role === 'ROLE_ADMIN') router.push('/admin/dashboard')
      else if (role === 'ROLE_MANAGER') router.push('/manager/dashboard')
      else if (role === 'ROLE_SALES') router.push('/sales/dashboard')
      else router.push('/user/dashboard')
      
      toast.success("Connexion réussie")
    },
    onError: () => {
      apiClient.setToken(null)
      toast.error("Erreur d'authentification")
      router.push('/')
    }
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      apiClient.setToken(null)
      queryClient.clear()
    },
    onSuccess: () => {
      router.push('/')
      toast.success("Déconnexion réussie")
    }
  })

  // Configuration du handler d'erreur 401/403
  apiClient.setUnauthorizedHandler(() => {
    logoutMutation.mutate()
  })

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
  }
}