import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/apiClient"
import { useState } from "react"

export function useAuth() {
  const router = useRouter()
  const { user, accessToken, clearUser, isAuthenticated, setUser, setTokens } = useUserStore()
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const login = async (token: string) => {
    try {
      setIsLoginLoading(true)
      
      // Décoder le token pour extraire les informations utilisateur
      const payload = JSON.parse(atob(token.split('.')[1]))
      console.log('JWT Payload:', payload) // Debug temporaire
      
      // Créer l'objet utilisateur à partir du payload
      let roles = ['ROLE_USER'] // Valeur par défaut
      
      if (payload.roles) {
        roles = Array.isArray(payload.roles) ? payload.roles : [payload.roles]
      } else if (payload.role) {
        roles = Array.isArray(payload.role) ? payload.role : [payload.role]
      } else if (payload.authorities) {
        roles = Array.isArray(payload.authorities) ? payload.authorities : [payload.authorities]
      }
      
      const firstName = payload.firstName || payload.given_name || ''
      const lastName = payload.lastName || payload.family_name || ''
      const fullName = `${firstName} ${lastName}`.trim()
      
      // Utiliser le nom complet si disponible, sinon extraire le nom de l'email
      let displayUsername = fullName
      if (!displayUsername && payload.email) {
        // Extraire la partie avant @ de l'email comme fallback
        displayUsername = payload.email.split('@')[0]
      }
      if (!displayUsername) {
        displayUsername = payload.username || payload.sub
      }
      
      const userData = {
        userId: payload.sub || payload.userId || 0,
        username: displayUsername,
        email: payload.email,
        firstName: firstName,
        lastName: lastName,
        roles: roles,
        accountNonLocked: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        enabled: true,
        isTwoFactorEnabled: false
      }
      
      // Stocker l'utilisateur et les tokens
      setUser(userData)
      setTokens(token, token) // Utiliser le même token pour refresh temporairement
      
      toast.success("Connexion réussie !")
      
      // Rediriger vers le dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Erreur lors de la connexion OAuth:', error)
      toast.error("Erreur lors de la connexion")
      router.push('/login')
    } finally {
      setIsLoginLoading(false)
    }
  }

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
    login,
    isLoginLoading,
    logout,
    accessToken,
  }
}