"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, CheckCircle, Check, X } from "lucide-react"
import Link from "next/link"
import { Logo, SubmitButton } from "@/components/global"
import { useSignup } from "@/hooks/useSignup"
import { useState } from "react"

const SignupSchema = z.object({
  firstName: z.string().min(3, "Le prénom doit contenir au moins 3 caractères").max(20, "Le prénom ne peut pas dépasser 20 caractères"),
  lastName: z.string().min(3, "Le nom doit contenir au moins 3 caractères").max(20, "Le nom ne peut pas dépasser 20 caractères"),
  username: z.string().min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères").max(10, "Le nom d'utilisateur ne peut pas dépasser 10 caractères"),
  email: z.string().email("Email invalide").max(50, "L'email ne peut pas dépasser 50 caractères"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").max(40, "Le mot de passe ne peut pas dépasser 40 caractères"),
  confirmPassword: z.string().min(1, "Confirmation requise"),
  image: z.string().url("URL invalide").optional().or(z.literal("")),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const signupMutation = useSignup()

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      country: "",
    },
  })

  async function onSubmit(data: z.infer<typeof SignupSchema>) {
    const { confirmPassword, address1, address2, city, postalCode, country, ...baseData } = data
    
    const address = (address1 || address2 || city || postalCode || country) ? {
      address1: address1 || undefined,
      address2: address2 || undefined,
      city: city || undefined,
      postalCode: postalCode || undefined,
      country: country || undefined,
    } : undefined
    
    signupMutation.mutate({
      ...baseData,
      image: baseData.image || undefined,
      address,
      signUpMethod: "email"
    })
  }

  if (signupMutation.isSuccess) {
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
            <h2 className="text-2xl font-bold">Compte créé !</h2>
            <p className="text-muted-foreground">
              Votre compte a été créé avec succès. Redirection vers la connexion...
            </p>
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
            <h2 className="text-3xl font-bold">Créer un compte</h2>
            <p className="text-muted-foreground mt-2">
              Rejoignez-nous pour gérer votre inventaire
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Patrick"
                            {...field}
                            disabled={signupMutation.isPending}
                            className={`h-11 transition-colors ${
                              form.formState.errors.firstName 
                                ? "border-red-500 focus:border-red-500" 
                                : field.value && !form.formState.errors.firstName 
                                ? "border-green-500 focus:border-green-500" 
                                : ""
                            }`}
                          />
                          {field.value && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {form.formState.errors.firstName ? (
                                <X className="h-4 w-4 text-red-500" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Djoumessi"
                            {...field}
                            disabled={signupMutation.isPending}
                            className={`h-11 transition-colors ${
                              form.formState.errors.lastName 
                                ? "border-red-500 focus:border-red-500" 
                                : field.value && !form.formState.errors.lastName 
                                ? "border-green-500 focus:border-green-500" 
                                : ""
                            }`}
                          />
                          {field.value && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {form.formState.errors.lastName ? (
                                <X className="h-4 w-4 text-red-500" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="pdjoumessi"
                          {...field}
                          disabled={signupMutation.isPending}
                          className={`h-11 transition-colors ${
                            form.formState.errors.username 
                              ? "border-red-500 focus:border-red-500" 
                              : field.value && !form.formState.errors.username 
                              ? "border-green-500 focus:border-green-500" 
                              : ""
                          }`}
                        />
                        {field.value && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {form.formState.errors.username ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="patrick.djoumessi@gmail.com"
                          {...field}
                          disabled={signupMutation.isPending}
                          className={`h-11 pr-10 transition-colors ${
                            form.formState.errors.email 
                              ? "border-red-500 focus:border-red-500" 
                              : field.value && !form.formState.errors.email 
                              ? "border-green-500 focus:border-green-500" 
                              : ""
                          }`}
                        />
                        {field.value && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {form.formState.errors.email ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
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
                          disabled={signupMutation.isPending}
                          className={`h-11 pr-20 transition-colors ${
                            form.formState.errors.password 
                              ? "border-red-500 focus:border-red-500" 
                              : field.value && !form.formState.errors.password 
                              ? "border-green-500 focus:border-green-500" 
                              : ""
                          }`}
                        />
                        {field.value && (
                          <div className="absolute right-12 top-1/2 -translate-y-1/2">
                            {form.formState.errors.password ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={signupMutation.isPending}
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={signupMutation.isPending}
                          className={`h-11 pr-20 transition-colors ${
                            form.formState.errors.confirmPassword 
                              ? "border-red-500 focus:border-red-500" 
                              : field.value && !form.formState.errors.confirmPassword 
                              ? "border-green-500 focus:border-green-500" 
                              : ""
                          }`}
                        />
                        {field.value && (
                          <div className="absolute right-12 top-1/2 -translate-y-1/2">
                            {form.formState.errors.confirmPassword ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={signupMutation.isPending}
                        >
                          {showConfirmPassword ? (
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo de profil (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://placehold.co/150x150/9b59b6/ffffff?text=PD.jpg"
                        {...field}
                        disabled={signupMutation.isPending}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Adresse (optionnel)</h3>
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Avenue Charles Atangana"
                          {...field}
                          disabled={signupMutation.isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quartier Mvog-Ada"
                          {...field}
                          disabled={signupMutation.isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Yaoundé"
                            {...field}
                            disabled={signupMutation.isPending}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="23703"
                            {...field}
                            disabled={signupMutation.isPending}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cameroon"
                          {...field}
                          disabled={signupMutation.isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SubmitButton 
                isLoading={signupMutation.isPending} 
                className="w-full h-11"
              >
                Créer le compte
              </SubmitButton>
            </form>
          </Form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}