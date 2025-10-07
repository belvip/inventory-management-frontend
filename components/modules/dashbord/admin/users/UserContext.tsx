"use client"

import { createContext, useContext } from "react"
import { User } from "@/types"

interface UserContextType {
  onEditUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children, onEditUser }: { children: React.ReactNode, onEditUser: (user: User) => void }) {
  return (
    <UserContext.Provider value={{ onEditUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider")
  }
  return context
}