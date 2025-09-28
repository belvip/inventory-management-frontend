"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

export function HomeTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const testimonials = [
    {
      name: "Fansi Aline",
      role: "Directrice, TechCorp Cameroun",
      content: "Inventory a révolutionné notre gestion de stock. Interface intuitive et fonctionnalités complètes.",
      rating: 5,
      avatar: "MD"
    },
    {
      name: "Tato Jean Pierre",
      role: "Manager, Solutions Plus",
      content: "Excellent outil pour optimiser nos opérations. Le support client est exceptionnel.",
      rating: 5,
      avatar: "JN"
    },
    {
      name: "Fatima Bello",
      role: "CEO, Digital Ventures",
      content: "La meilleure solution de gestion d'inventaire que nous ayons utilisée. Très recommandé!",
      rating: 5,
      avatar: "FB"
    },
    {
      name: "Samuel Kouam",
      role: "CTO, InnovateCorp",
      content: "Une solution robuste qui s'adapte parfaitement à nos besoins. L'équipe technique est très réactive.",
      rating: 5,
      avatar: "SK"
    },
    {
      name: "SAliou Bouba",
      role: "Responsable Logistique, LogiMax",
      content: "Grâce à Inventory, nous avons réduit nos erreurs de stock de 90%. Un investissement rentable!",
      rating: 5,
      avatar: "AD"
    }
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-play avec pause au hover
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [isHovered, currentSlide])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex * slidesToShow)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + slidesToShow >= testimonials.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - slidesToShow) : prev - 1
    )
  }

  const visibleTestimonials = testimonials.slice(currentSlide, currentSlide + slidesToShow)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez pourquoi plus de 120+ entreprises nous font confiance
          </p>
        </div>

        <section aria-label="Carrousel de temoignages clients" className="relative">
          <div
            className="overflow-hidden"
            role="application"
            aria-label="Carrousel interactif"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') prevSlide()
              if (e.key === 'ArrowRight') nextSlide()
            }}
          >
            <div className="flex gap-6 transition-transform duration-500 ease-in-out">
              {visibleTestimonials.map((testimonial, index) => (
                <Card 
                  key={currentSlide + index} 
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 relative overflow-hidden border border-border/20 dark:border-white/10 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.1)] transition-all duration-500 bg-background/70 backdrop-blur-md rounded-2xl hover:scale-105 hover:-translate-y-2"
                >
                  <CardContent className="p-8">
                    <div className="absolute top-4 right-4 text-primary/15">
                      <Quote className="h-10 w-10" />
                    </div>
                    
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-8 leading-relaxed italic text-lg">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {testimonial.avatar}
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-transparent rounded-full -z-10"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {testimonials.length > slidesToShow && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </section>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / slidesToShow) }).map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / slidesToShow) === i 
                  ? 'bg-primary w-8' 
                  : 'bg-primary/30 w-2 hover:bg-primary/50'
              }`}
              onClick={() => goToSlide(i)}
              aria-label={`Aller au slide ${i + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  goToSlide(i)
                }
              }}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full backdrop-blur-sm border border-primary/20 shadow-lg">
            <div className="flex -space-x-3">
              {["MD", "JN", "FB", "SK", "AD", "KM", "LT"].map((avatar, i) => (
                <div key={i} className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold border-3 border-background shadow-md">
                    {avatar}
                  </div>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-full -z-10"></div>
                </div>
              ))}
            </div>
            <span className="text-base font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ml-2">
              +115 entreprises nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}