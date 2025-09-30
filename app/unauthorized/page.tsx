import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Accès non autorisé</h1>
                <p className="text-muted-foreground">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                <Button asChild>
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </div>
        </div>
    )
}