"use client"

import { useAuth } from "@/hooks/useAuth"

interface SimpleProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SimpleProfileModal({ open, onOpenChange }: SimpleProfileModalProps) {
  const { user, isLoading } = useAuth()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Profil Utilisateur</h2>
        <div className="space-y-2">
          {isLoading ? (
            <p>Chargement...</p>
          ) : user ? (
            <>
              <p><strong>Nom:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Rôle:</strong> {user.roles.join(', ')}</p>
            </>
          ) : (
            <p>Utilisateur non connecté</p>
          )}
        </div>
        <button 
          onClick={() => onOpenChange(false)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}