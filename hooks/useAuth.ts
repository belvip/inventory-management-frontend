import { useState, useEffect } from "react"
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
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        apiClient.setToken(token)
        const userData = await apiClient.get<UserProfile>('/auth/user')
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('accessToken')
        apiClient.setToken(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (token: string) => {
    try {
      apiClient.setToken(token)
      const userData = await apiClient.get<UserProfile>('/auth/user')
      setUser(userData)
      
      // Redirection selon le rôle
      const role = userData.roles[0]
      if (role === 'ROLE_ADMIN') router.push('/dashboard/admin')
      else if (role === 'ROLE_MANAGER') router.push('/dashboard/manager')
      else if (role === 'ROLE_SALES') router.push('/dashboard/sales')
      else router.push('/dashboard')
      
      toast.success("Connexion réussie")
    } catch (error) {
      apiClient.setToken(null)
      toast.error("Erreur d'authentification")
      router.push('/')
    }
  }

  const logout = () => {
    setUser(null)
    apiClient.setToken(null)
    router.push('/')
    toast.success("Déconnexion réussie")
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    isLoginLoading: false,
  }
}