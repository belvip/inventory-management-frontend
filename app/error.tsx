"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Home, RefreshCw, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

type ErrorType = 'network' | 'not_found' | 'generic'

const getErrorType = (error: Error): ErrorType => {
  const message = error.message?.toLowerCase() || ''
  
  if (message.includes('failed to fetch') || message.includes('network error') || message.includes('offline')) {
    return 'network'
  }
  if (message.includes('404') || message.includes('not found')) {
    return 'not_found'
  }
  return 'generic'
}

const ERROR_CONFIG = {
  network: {
    icon: WifiOff,
    title: "Problème de connexion",
    message: "Vérifiez votre connexion internet et réessayez.",
    gradient: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
    color: "text-orange-700 dark:text-orange-300"
  },
  not_found: {
    icon: AlertTriangle, 
    title: "Page non trouvée",
    message: "La page que vous recherchez n'existe pas.",
    gradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
    color: "text-blue-700 dark:text-blue-300"
  },
  generic: {
    icon: AlertTriangle,
    title: "Une erreur s'est produite",
    message: "Une erreur inattendue s'est produite.",
    gradient: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900", 
    color: "text-red-700 dark:text-red-300"
  }
}

export default function Error({ error, reset }: ErrorProps) {
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()
  const errorType = getErrorType(error)
  const config = ERROR_CONFIG[errorType]
  const IconComponent = config.icon

  useEffect(() => {
    console.error("Application error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      type: errorType,
      timestamp: new Date().toISOString(),
      url: window.location.href
    })
  }, [error, errorType])

  const handleReset = async () => {
    setIsResetting(true)
    try {
      await reset()
    } finally {
      setIsResetting(false)
    }
  }

  const goHome = () => {
    router.push("/")
  }

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
      role="alert"
      aria-live="assertive"
      aria-label="Page d'erreur"
    >
      <div className="max-w-md w-full mx-4 text-center space-y-6">
        <div className="flex justify-center">
          <IconComponent className={`h-16 w-16 ${config.color}`} />
        </div>
        
        <div className="space-y-2">
          <h1 className={`text-2xl font-bold ${config.color}`}>
            {config.title}
          </h1>
          <p className={`${config.color.replace('700', '600').replace('300', '400')} text-sm`}>
            {error.message || config.message}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-2">
              Référence: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={handleReset}
            disabled={isResetting}
            variant="default"
            className="gap-2"
            aria-label="Réessayer de charger la page"
          >
            {isResetting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {isResetting ? "Chargement..." : "Réessayer"}
          </Button>
          
          <Button 
            onClick={goHome}
            variant="outline"
            className="gap-2"
            aria-label="Retour à la page d'accueil"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  )
}