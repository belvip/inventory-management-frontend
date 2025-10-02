import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/global"
import { Logo } from "@/components/global/logo"

export function HomeNav() {
    return (
        <nav className="border-b bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center min-w-0">
                        <Logo size="sm" className="sm:hidden" showText={false} />
                        <Logo className="hidden sm:flex" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <ModeToggle />
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary px-2 sm:px-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                                    <span className="hidden sm:inline">Connexion</span>
                                    <span className="sm:hidden">Connexion</span>
                                </span>
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary px-2 sm:px-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 font-medium text-xs sm:text-sm">
                                    <span className="hidden sm:inline">S&apos;inscrire</span>
                                    <span className="sm:hidden">S&apos;inscrire</span>
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}