import { useAuth } from "./useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuthGuard(requiredRoles?: string[]) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
      return
    }

    if (user && requiredRoles && !requiredRoles.some(role => user.roles.includes(role))) {
      router.push('/unauthorized')
      return
    }
  }, [user, isLoading, isAuthenticated, requiredRoles, router])

  return {
    user,
    isLoading,
    isAuthenticated,
    hasRequiredRole: !requiredRoles || (user && requiredRoles.some(role => user.roles.includes(role)))
  }
}