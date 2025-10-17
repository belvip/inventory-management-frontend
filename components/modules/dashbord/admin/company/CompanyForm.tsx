"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Building2 } from "lucide-react"
import { useCompanies } from "@/hooks/useCompany"
import { Company } from "@/types"

const companySchema = z.object({
  name: z.string().min(4, "Le nom doit contenir au moins 4 caractères").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères").max(200, "La description ne peut pas dépasser 200 caractères"),
  email: z.string().email("Email invalide"),
  phoneNumber: z.string().regex(/^(?:(?:\+237|237)[-.\\s]?)?(?:(?:[67][25-9]\\d{7})|(?:2\\d{2}\\d{6}))$/, "Numéro de téléphone camerounais invalide"),
  fiscalCode: z.string().min(5, "Le code fiscal doit contenir au moins 5 caractères").max(20, "Le code fiscal ne peut pas dépasser 20 caractères"),
  website: z.string().max(150, "Le site web ne peut pas dépasser 150 caractères").optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
})

interface CompanyFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  company?: Company | null
  mode?: 'create' | 'edit'
}

export function CompanyForm({ open, onOpenChange, company, mode = 'create' }: CompanyFormProps) {
  const { createCompany, updateCompany, isCreating, isUpdating } = useCompanies()
  const isEditMode = mode === 'edit' && company
  
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      name: company?.name || "",
      description: company?.description || "",
      email: company?.email || "",
      phoneNumber: company?.phoneNumber || "",
      fiscalCode: company?.fiscalCode || "",
      website: company?.website || "",
      image: company?.image || "",
      address1: company?.address?.address1 || "",
      address2: company?.address?.address2 || "",
      city: company?.address?.city || "",
      postalCode: company?.address?.postalCode || "",
      country: company?.address?.country || "",
    },
  })

  // Vérifier si tous les champs obligatoires sont remplis
  const watchedValues = form.watch()
  const isFormValid = form.formState.isValid
  const hasRequiredFields = watchedValues.name && watchedValues.description && watchedValues.email && 
                           watchedValues.phoneNumber && watchedValues.fiscalCode
  
  const isSubmitDisabled = !isFormValid || !hasRequiredFields || isCreating || isUpdating

  async function onSubmit(data: z.infer<typeof companySchema>) {
    const { address1, address2, city, postalCode, country, ...baseData } = data
    
    const hasAddressData = address1 || address2 || city || postalCode || country
    const address = hasAddressData ? {
      address1: address1 || "",
      address2: address2 || "",
      city: city || "",
      postalCode: postalCode || "",
      country: country || "",
    } : undefined

    const companyData = {
      ...baseData,
      ...(address && { address }),
    }
    
    if (isEditMode) {
      updateCompany({
        id: company.id,
        data: companyData
      })
    } else {
      createCompany(companyData)
    }
    
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {isEditMode ? "Modifier l'entreprise" : 'Créer une entreprise'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Modifiez les informations de l'entreprise." 
              : 'Ajoutez une nouvelle entreprise au système.'
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Informations principales */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Nom de l'entreprise</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Ets. Ngomna & Fils"
                          {...field}
                          disabled={isCreating || isUpdating}
                          className={`h-10 pl-4 pr-10 bg-background/50 border-2 transition-all duration-300 rounded-lg hover:border-border/60 ${
                            form.formState.errors.name 
                              ? "border-red-400 focus:border-red-500 bg-red-50/50" 
                              : field.value && !form.formState.errors.name 
                              ? "border-green-400 focus:border-green-500 bg-green-50/50" 
                              : "border-border/40 focus:border-primary/60 focus:bg-background"
                          }`}
                        />
                        {field.value && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {form.formState.errors.name ? (
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
                name="description"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Leader de l'import-export de produits agroalimentaires..."
                        {...field}
                        disabled={isCreating || isUpdating}
                        className="min-h-[80px] bg-background/50 border-2 border-border/40 focus:border-primary/60 transition-all duration-300 rounded-lg hover:border-border/60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            placeholder="contact@entreprise.com"
                            {...field}
                            disabled={isCreating || isUpdating}
                            className={`h-10 pl-4 pr-10 bg-background/50 border-2 transition-all duration-300 rounded-lg hover:border-border/60 ${
                              form.formState.errors.email 
                                ? "border-red-400 focus:border-red-500 bg-red-50/50" 
                                : field.value && !form.formState.errors.email 
                                ? "border-green-400 focus:border-green-500 bg-green-50/50" 
                                : "border-border/40 focus:border-primary/60 focus:bg-background"
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Téléphone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="+237671234567"
                            {...field}
                            disabled={isCreating || isUpdating}
                            className={`h-10 pl-4 pr-10 bg-background/50 border-2 transition-all duration-300 rounded-lg hover:border-border/60 ${
                              form.formState.errors.phoneNumber 
                                ? "border-red-400 focus:border-red-500 bg-red-50/50" 
                                : field.value && !form.formState.errors.phoneNumber 
                                ? "border-green-400 focus:border-green-500 bg-green-50/50" 
                                : "border-border/40 focus:border-primary/60 focus:bg-background"
                            }`}
                          />
                          {field.value && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {form.formState.errors.phoneNumber ? (
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fiscalCode"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Code fiscal</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="237-YAO-0123-A"
                            {...field}
                            disabled={isCreating || isUpdating}
                            className={`h-10 pl-4 pr-10 bg-background/50 border-2 transition-all duration-300 rounded-lg hover:border-border/60 ${
                              form.formState.errors.fiscalCode 
                                ? "border-red-400 focus:border-red-500 bg-red-50/50" 
                                : field.value && !form.formState.errors.fiscalCode 
                                ? "border-green-400 focus:border-green-500 bg-green-50/50" 
                                : "border-border/40 focus:border-primary/60 focus:bg-background"
                            }`}
                          />
                          {field.value && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {form.formState.errors.fiscalCode ? (
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
                  name="website"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Site web (optionnel)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="www.entreprise.com"
                          {...field}
                          disabled={isCreating || isUpdating}
                          className="h-10 pl-4 pr-4 bg-background/50 border-2 border-border/40 focus:border-primary/60 focus:bg-background transition-all duration-300 rounded-lg hover:border-border/60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full" />
                <h3 className="text-sm font-medium text-foreground/80">Adresse (optionnel)</h3>
              </div>
              
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Avenue Ahmadou Ahidjo"
                        {...field}
                        disabled={isCreating || isUpdating}
                        className="h-10"
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
                        placeholder="BP 580"
                        {...field}
                        disabled={isCreating || isUpdating}
                        className="h-10"
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
                          disabled={isCreating || isUpdating}
                          className="h-10"
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
                          placeholder="23701"
                          {...field}
                          disabled={isCreating || isUpdating}
                          className="h-10"
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
                        disabled={isCreating || isUpdating}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating || isUpdating} className="relative">
                <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  <X className="h-3 w-3" />
                </Badge>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitDisabled} className="relative">
                {isEditMode ? (
                  <>
                    <Badge variant="outline" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-yellow-100 text-yellow-800 border-yellow-200">
                      <span className="text-xs">✏️</span>
                    </Badge>
                    {isUpdating ? "Modification..." : "Modifier l'entreprise"}
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-100 text-green-800 border-green-200">
                      <span className="text-xs">+</span>
                    </Badge>
                    {isCreating ? "Création..." : "Créer l'entreprise"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}