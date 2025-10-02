import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'

interface UserProfile {
  userId: number
  firstName: string
  lastName: string
  username: string
  email: string
  image: string | null
}

export function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await apiClient.get('/auth/user')
        setUser(response as UserProfile)
      } catch (err) {
        console.error('Error fetching user profile:', err)
        setError('Failed to load user profile')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  return { user, isLoading, error }
}