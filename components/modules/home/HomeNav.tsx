import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/global"
import { Logo } from "@/components/global/logo"

export function HomeNav() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <Link href="/login">
                            <Button variant="outline" className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
                                    Connexion
                                </span>
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 font-medium">
                                    S&apos;inscrire
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}