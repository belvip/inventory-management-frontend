"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/global/mode-toggle"
import { Package } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et nom */}
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Inventory</span>
          </div>

          {/* Boutons de droite */}
          <div className="flex items-center gap-4">
            <Button variant="ghost">Se connecter</Button>
            <Button>S'inscrire</Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}