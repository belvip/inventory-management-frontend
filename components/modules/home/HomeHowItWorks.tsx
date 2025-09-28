import { Shield, Users, Package, BarChart3, FileText, Search, Bell } from "lucide-react"

export function HomeHowItWorks() {
    const howItWorks = [
        {
            step: "1",
            title: "Configurez votre inventaire",
            description:
                "Ajoutez vos articles, catégories et fournisseurs. Définissez les seuils d'alerte pour chaque produit.",
            icon: Shield,
        },
        {
            step: "2",
            title: "Gérez vos opérations",
            description: "Traitez les commandes, enregistrez les ventes et suivez les mouvements de stock en temps réel.",
            icon: Users,
        },
        {
            step: "3",
            title: "Analysez vos performances",
            description:
                "Consultez vos tableaux de bord, générez des rapports et optimisez votre rentabilité.",
            icon: Package,
        },
        {
            step: "4",
            title: "Statistiques avancées",
            description: "Visualisez les performances de vos produits, chiffre d'affaires quotidien et tendances. Exportez vos rapports en PDF ou Excel.",
            icon: BarChart3,
        },
        {
            step: "5",
            title: "Génération de factures",
            description: "Créez et personnalisez vos factures automatiquement. Téléchargement instantané en format PDF professionnel.",
            icon: FileText,
        },
        {
            step: "6",
            title: "Audit et traçabilité",
            description: "Suivez tous les mouvements de stock et modifications. Historique complet pour la conformité et le contrôle.",
            icon: Search,
        },
        {
            step: "7",
            title: "Notifications intelligentes",
            description: "Recevez des alertes en temps réel : commandes à confirmer, stocks faibles, échéances importantes.",
            icon: Bell,
        }
    ]

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Comment ça marche</h2>
                    <p className="text-muted-foreground">Optimisez votre gestion d'inventaire avec nos 7 fonctionnalités clés</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {howItWorks.map((step, index) => (
                        <div key={step.step} className="text-center animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                    {step.step}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}