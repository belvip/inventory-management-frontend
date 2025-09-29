"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Info, Eye, EyeOff } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { SubmitButton, Logo } from "@/components/global"
import { useUserStore } from "@/stores/userStore"
import { LoginRequest } from "@/types/user"
import { TEST_ACCOUNTS } from "@/lib/testAccounts"

const LoginSchema = z.object({
    username: z.string().min(1, "Nom d'utilisateur requis"),
    password: z.string().min(1, "Mot de passe requis"),
})

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { username: "", password: "" },
    })

    const router = useRouter()
    const { setUser, setTokens } = useUserStore()

    const fillTestAccount = (username: string, password: string) => {
        form.setValue("username", username)
        form.setValue("password", password)
    }

    const handleOAuth = (provider: 'google' | 'github') => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/authorization/${provider}`
    }

    const handleForgotPassword = async () => {
        const username = form.getValues('username')
        if (!username) {
            toast.error('Veuillez saisir votre nom d\'utilisateur')
            return
        }

        setForgotPasswordLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username }),
            })

            if (response.ok) {
                toast.success('Email de réinitialisation envoyé!')
            } else {
                throw new Error('Erreur lors de l\'envoi')
            }
        } catch (error) {
            toast.error('Erreur lors de l\'envoi de l\'email')
        } finally {
            setForgotPasswordLoading(false)
        }
    }

    async function onSubmit(data: LoginRequest) {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Identifiants incorrects")
            }

            const result = await response.json()
            
            // Le backend renvoie { username, roles, jwtToken, refreshToken }
            // On doit créer un objet user compatible
            const user = {
                userId: 0, // Sera récupéré via /auth/user
                username: result.username,
                roles: result.roles,
                // Autres champs seront récupérés plus tard
            }
            
            setUser(user as any) // Temporaire
            setTokens(result.jwtToken, result.refreshToken)
            
            toast.success("🎉 Connexion réussie!", {
                description: "Bienvenue sur Inventory Management!",
            })
            router.push("/dashboard")
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue"
            toast.error("Échec de l'authentification", {
                description: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <div className="mb-8">
                        <Logo size="xl" className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Gérez votre inventaire
                        <br />
                        <span className="text-primary-foreground/80">en toute simplicité</span>
                    </h1>
                    <p className="text-xl text-primary-foreground/70 mb-8 leading-relaxed">
                        Une solution moderne et intuitive pour optimiser la gestion de vos stocks et améliorer votre productivité.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-primary-foreground/80">Suivi en temps réel</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-primary-foreground/80">Rapports détaillés</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-primary-foreground/80">Interface moderne</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Logo size="lg" />
                    </div>

                    {/* Login Form */}
                    <div className="p-6 bg-card rounded-xl border-2 border-border/40 shadow-sm space-y-6">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-foreground">Bon retour !</h2>
                            <p className="text-muted-foreground mt-2">Connectez-vous pour accéder à votre tableau de bord</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom d'utilisateur</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="admin"
                                                    {...field}
                                                    disabled={loading}
                                                    className="h-11"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        disabled={loading}
                                                        className="h-11 pr-10"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        disabled={loading}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="px-0 font-normal text-sm"
                                        onClick={handleForgotPassword}
                                        disabled={forgotPasswordLoading}
                                    >
                                        {forgotPasswordLoading ? "Envoi..." : "Mot de passe oublié ?"}
                                    </Button>
                                </div>
                                
                                <SubmitButton isLoading={loading} className="h-11 mt-6">
                                    Se connecter
                                </SubmitButton>
                            </form>
                        </Form>
                        
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => handleOAuth('google')}
                                disabled={loading}
                                className="h-11"
                            >
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleOAuth('github')}
                                disabled={loading}
                                className="h-11"
                            >
                                <FaGithub className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Demo Accounts */}
                    <div className="mt-8 p-5 bg-card rounded-xl border-2 border-border/40 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1 bg-primary/10 rounded-full">
                                    <Info className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm font-semibold text-foreground">Comptes de démonstration</span>
                            </div>
                            <div className="grid gap-3">
                                {TEST_ACCOUNTS.map((account) => {
                                    const IconComponent = account.icon
                                    return (
                                        <button
                                            key={account.username}
                                            onClick={() => fillTestAccount(account.username, account.password)}
                                            disabled={loading}
                                            className="group flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/30 hover:shadow-sm transition-all duration-200 text-left w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                                <IconComponent className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{account.role}</p>
                                                <p className="text-xs text-muted-foreground">{account.name}</p>
                                            </div>
                                            <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                                Cliquer pour utiliser
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}