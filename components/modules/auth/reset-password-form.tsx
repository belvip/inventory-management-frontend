"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Logo, SubmitButton, FormLoadingState } from "@/components/global"
import { useResetPassword } from "@/hooks/usePasswordReset"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string().min(1, "Confirmation requise"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const resetPasswordMutation = useResetPassword()
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  })

  useEffect(() => {
    if (!token) {
      router.push('/forgot-password')
    }
  }, [token, router])

  async function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    if (!token) return
    resetPasswordMutation.mutate({
      token,
      newPassword: data.newPassword
    })
  }

  useEffect(() => {
    if (resetPasswordMutation.isSuccess) {
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }, [resetPasswordMutation.isSuccess, router])

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo size="lg" />
          </div>
          <div className="p-6 bg-card rounded-xl border-2 border-border/40 shadow-sm text-center space-y-4">
            <h2 className="text-2xl font-bold text-destructive">Token manquant</h2>
            <p className="text-muted-foreground">
              Le lien de réinitialisation est invalide ou a expiré.
            </p>
            <Button asChild className="w-full hover:bg-muted/50 hover:text-primary transition-colors">
              <Link href="/forgot-password" className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Demander un nouveau lien
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (resetPasswordMutation.isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo size="lg" />
          </div>
          <div className="p-6 bg-card rounded-xl border-2 border-border/40 shadow-sm text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Mot de passe réinitialisé !</h2>
            <p className="text-muted-foreground">
              Votre mot de passe a été modifié avec succès. Redirection automatique...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <Logo size="lg" />
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200 p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Nouveau mot de passe</h2>
            <p className="text-muted-foreground">
              Choisissez un nouveau mot de passe sécurisé
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={resetPasswordMutation.isPending}
                          className="h-12 pl-4 pr-12 bg-background/50 border-2 border-border/40 focus:border-primary/60 focus:bg-background transition-all duration-300 rounded-xl hover:border-border/60"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-muted/50 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={resetPasswordMutation.isPending}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={resetPasswordMutation.isPending}
                          className="h-12 pl-4 pr-12 bg-background/50 border-2 border-border/40 focus:border-primary/60 focus:bg-background transition-all duration-300 rounded-xl hover:border-border/60"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-muted/50 transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={resetPasswordMutation.isPending}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton 
                isLoading={resetPasswordMutation.isPending} 
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium mt-6"
              >
                Réinitialiser le mot de passe
              </SubmitButton>
            </form>
          </Form>
          <Button variant="ghost" asChild className="w-full hover:bg-muted/50 hover:text-primary transition-colors">
            <Link href="/login" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<FormLoadingState isLoading={true}><div /></FormLoadingState>}>
      <ResetPasswordContent />
    </Suspense>
  )
}