"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    console.error("Global application error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    })
  }, [error])

  const handleReset = async () => {
    setIsResetting(true)
    try {
      await reset()
    } catch (resetError) {
      console.error("Error during reset:", resetError)
      // En cas d'échec du reset, recharger complètement la page
      window.location.reload()
    } finally {
      setIsResetting(false)
    }
  }

  const goHome = () => {
    // Utiliser replace pour éviter que l'utilisateur ne revienne sur la page d'erreur avec le bouton retour
    window.location.replace("/")
  }

  return (
    <html>
      <body>
        <div 
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900"
          role="alert"
          aria-live="assertive"
          aria-label="Erreur critique de l'application"
        >
          <div className="max-w-md w-full mx-4 text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="h-16 w-16 text-red-500 dark:text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-red-700 dark:text-red-300">
                Erreur Critique
              </h1>
              <p className="text-red-600 dark:text-red-400 text-sm">
                {error.message || "Une erreur critique s'est produite dans l'application"}
              </p>
              {error.digest && (
                <p className="text-xs text-red-500 dark:text-red-500 font-mono mt-2">
                  Référence: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleReset}
                disabled={isResetting}
                variant="default"
                className="gap-2 bg-red-600 hover:bg-red-700"
                aria-label="Tenter de récupérer l'application"
              >
                {isResetting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {isResetting ? "Récupération..." : "Réessayer"}
              </Button>
              
              <Button 
                onClick={goHome}
                variant="outline"
                className="gap-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                aria-label="Retour à la page d'accueil"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </div>

            {/* Message d'instructions supplémentaires pour les erreurs critiques */}
            <div className="text-xs text-red-500 dark:text-red-400 mt-4">
              <p>Si le problème persiste, veuillez recharger complètement la page.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}