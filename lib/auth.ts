import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { getEnv } from '@/lib/env'
import { User, LoginRequest, SigninResponse } from '@/types/user'

const secret = new TextEncoder().encode(getEnv().authSecret || 'fallback-secret')

// Login function
export async function signIn(credentials: LoginRequest): Promise<SigninResponse | null> {
  try {
    const response = await fetch(`${getEnv().apiUrl}/api/v1/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      return null
    }

    const result = await response.json()
    
    // Set cookies
    const cookieStore = await cookies()
    cookieStore.set('accessToken', result.jwtToken, {
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
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(`${getEnv().apiUrl}/api/v1/auth/user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
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