"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { Logo, SubmitButton } from "@/components/global"
import { useForgotPassword } from "@/hooks/usePasswordReset"

const ForgotPasswordSchema = z.object({
  email: z.string().email("Email invalide").min(1, "Email requis"),
})

export function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPassword()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    forgotPasswordMutation.mutate(data)
  }

  if (forgotPasswordMutation.isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo size="lg" />
          </div>
          <div className="p-6 bg-card rounded-xl border-2 border-border/40 shadow-sm text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Email envoyé !</h2>
            <p className="text-muted-foreground">
              Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
            </p>
            <Button asChild className="w-full hover:bg-muted/50 hover:text-primary transition-colors">
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <Logo size="lg" />
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200 p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Mot de passe oublié ?</h2>
            <p className="text-muted-foreground">
              Saisissez votre email pour recevoir un lien de réinitialisation
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          {...field}
                          disabled={forgotPasswordMutation.isPending}
                          className="h-12 pl-4 pr-4 bg-background/50 border-2 border-border/40 focus:border-primary/60 focus:bg-background transition-all duration-300 rounded-xl hover:border-border/60"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton 
                isLoading={forgotPasswordMutation.isPending} 
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium mt-6"
              >
                Envoyer le lien de réinitialisation
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