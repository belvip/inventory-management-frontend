"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Info, Eye, EyeOff, Github } from "lucide-react"
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="w-full max-w-md md:max-w-full flex flex-col md:flex-row md:justify-center gap-6">
                <Card className="shadow-lg w-full md:max-w-md grid items-center">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <Logo size="lg" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                        <CardDescription>Connectez-vous à votre compte Inventory</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
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
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleOAuth('github')}
                                disabled={loading}
                                className="h-11"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-lg">Comptes de démonstration</CardTitle>
                        </div>
                        <CardDescription>Utilisez ces comptes pour tester l'application</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {TEST_ACCOUNTS.map((account, index) => {
                            const IconComponent = account.icon
                            return (
                                <div key={account.username}>
                                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                <IconComponent className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{account.role}</p>
                                                <p className="text-xs text-muted-foreground">{account.name}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fillTestAccount(account.username, account.password)}
                                            disabled={loading}
                                            className="shrink-0"
                                        >
                                            Utiliser
                                        </Button>
                                    </div>
                                    {index < TEST_ACCOUNTS.length - 1 && <Separator className="my-3" />}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}