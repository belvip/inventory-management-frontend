"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/global/avatar"
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev + slidesToShow >= testimonials.length ? 0 : prev + 1
    )
  }, [slidesToShow, testimonials.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - slidesToShow) : prev - 1
    )
  }, [slidesToShow, testimonials.length])

  // Auto-play avec pause au hover
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [isHovered, nextSlide])

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

  const visibleTestimonials = testimonials.slice(currentSlide, currentSlide + slidesToShow)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground">
            Découvrez pourquoi plus de 121+ entreprises nous font confiance
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
                  className="group flex-shrink-0 w-full md:w-1/2 lg:w-1/3 relative overflow-hidden border-2 border-border/30 hover:border-primary/40 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/90 backdrop-blur-sm rounded-xl hover:scale-[1.02] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="relative p-6 h-full flex flex-col">
                    <div className="absolute top-3 right-3 text-primary/20 group-hover:text-primary/30 transition-colors">
                      <Quote className="h-8 w-8" />
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-200" 
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                      <span className="ml-2 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    <blockquote className="flex-1 text-foreground/90 mb-6 leading-relaxed text-base font-medium relative">
                      <span className="text-primary/60 text-2xl absolute -top-2 -left-1">&ldquo;</span>
                      <span className="pl-4">{testimonial.content}</span>
                      <span className="text-primary/60 text-2xl">&rdquo;</span>
                    </blockquote>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                      <div className="relative">
                        <Avatar
                          fallback={testimonial.avatar}
                          size="md"
                          className="ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          {testimonial.role}
                        </p>
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

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex -space-x-3">
              {["MD", "JN", "FB", "SK", "AD"].map((avatar, i) => (
                <Avatar
                  key={i}
                  fallback={avatar}
                  size="sm"
                  className="border-3 border-background ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300 hover:scale-110 hover:z-10 relative"
                />
              ))}
              <div className="flex items-center justify-center w-8 h-8 bg-primary/20 border-3 border-background rounded-full text-xs font-bold text-primary">
                +
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                121+ entreprises
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                nous font confiance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}