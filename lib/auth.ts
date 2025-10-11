// hooks/useAuth.ts
import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"

export function useAuth() {
  const router = useRouter()
  
  // 🔥 CHANGEMENT : Prendre seulement ce dont on a besoin
  const user = useUserStore(state => state.user)
  const accessToken = useUserStore(state => state.accessToken)
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const setUser = useUserStore(state => state.setUser)
  const setTokens = useUserStore(state => state.setTokens)
  const clearUser = useUserStore(state => state.clearUser)
  
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const login = useCallback(async (token: string) => {
    try {
      setIsLoginLoading(true)
      
      // Décoder le token
      const payload = JSON.parse(atob(token.split('.')[1]))
      console.log('JWT Payload:', payload)
      
      // Préparer les données utilisateur
      let roles = ['ROLE_USER']
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
      
      let displayUsername = fullName
      if (!displayUsername && payload.email) {
        displayUsername = payload.email.split('@')[0]
      }
      if (!displayUsername) {
        displayUsername = payload.username || payload.sub
      }
      
      const userData = {
        userId: payload.sub || payload.userId || 0,
        userName: displayUsername,
        email: payload.email,
        firstName: firstName,
        lastName: lastName,
        roleName: roles[0] || 'ROLE_USER',
        accountNonLocked: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        enabled: true
      }
      
      // 🔥 CHANGEMENT : Appel simple et direct
      setUser(userData)
      setTokens(token, token)
      
      toast.success("Connexion réussie !")
      
      // 🔥 CHANGEMENT : Redirection avec timeout pour éviter les conflits
      setTimeout(() => {
        router.push('/dashboard')
      }, 100)
      
    } catch (error) {
      console.error('Erreur lors de la connexion OAuth:', error)
      toast.error("Erreur lors de la connexion")
      router.push('/login')
    } finally {
      setIsLoginLoading(false)
    }
  }, [setUser, setTokens, router])

  const logout = useCallback(async () => {
    console.log('Logout function called')
    clearUser()
    toast.success("Déconnexion réussie")
    // 🔥 CHANGEMENT : Utiliser window.location pour éviter les problèmes de routing
    window.location.href = '/login'
  }, [clearUser])

  return {
    user,
    isLoading: false,
    isAuthenticated, // 🔥 CHANGEMENT : Utiliser la variable directement
    login,
    isLoginLoading,
    logout,
    accessToken,
  }
}