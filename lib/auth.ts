import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { getEnv } from '@/lib/env'
import { User, LoginRequest, SigninResponse } from '@/types/user'

const secret = new TextEncoder().encode(getEnv().authSecret || 'fallback-secret')

// Server-side API client (without localStorage)
class ServerApiClient {
  private readonly baseURL: string

  constructor() {
    this.baseURL = getEnv().apiUrl || ""
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
  }
}

const serverApiClient = new ServerApiClient()

// Login function
export async function signIn(credentials: LoginRequest): Promise<SigninResponse | null> {
  try {
    const result = await serverApiClient.post<SigninResponse>('/auth/signin', credentials)
    
    // Set cookies
    const cookieStore = await cookies()
    cookieStore.set('authToken', result.jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    })
    cookieStore.set('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return result
  } catch (error) {
    console.error('Sign in error:', error)
    return null
  }
}

// Logout function
export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
  cookieStore.delete('refreshToken')
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('authToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    return await serverApiClient.get<User>('/auth/user', accessToken)
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Create JWT token (for client-side if needed)
export async function createToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}