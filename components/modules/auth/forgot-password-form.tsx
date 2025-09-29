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
            <Button asChild className="w-full">
              <Link href="/login">Retour à la connexion</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo size="lg" />
        </div>
        <div className="p-6 bg-card rounded-xl border-2 border-border/40 shadow-sm space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Mot de passe oublié ?</h2>
            <p className="text-muted-foreground mt-2">
              Saisissez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        {...field}
                        disabled={forgotPasswordMutation.isPending}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton 
                isLoading={forgotPasswordMutation.isPending} 
                className="w-full h-11"
              >
                Envoyer le lien de réinitialisation
              </SubmitButton>
            </form>
          </Form>
          <Button variant="ghost" asChild className="w-full">
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