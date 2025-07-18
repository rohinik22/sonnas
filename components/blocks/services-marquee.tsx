"use client"

import { cn } from "@/lib/utils"
import { ServiceCard, type ServiceCardProps } from "@/components/ui/service-card"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface ServicesMarqueeProps {
  title: string
  description: string
  services: Array<Omit<ServiceCardProps, "className" | "onEnquire">>
  className?: string
  onServiceEnquire?: (serviceTitle: string) => void
}

export function ServicesMarquee({ title, description, services, className, onServiceEnquire }: ServicesMarqueeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 3000) // Change every 3 seconds
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, services.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume auto-play after 5 seconds
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume auto-play after 5 seconds
  }

  return (
    <section className={cn("bg-background text-foreground", "py-12 sm:py-24 md:py-32 px-0", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16"
      >
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">{title}</h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">{description}</p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-red-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-110"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-red-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-110"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row">
            <div 
              className="flex shrink-0 justify-around [gap:var(--gap)] flex-row transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / services.length)}%)`,
                width: `${services.length * 100}%`
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {services.map((service, i) => (
                <div key={i} style={{ width: `${100 / services.length}%` }} className="flex justify-center">
                  <ServiceCard 
                    {...service} 
                    onEnquire={onServiceEnquire ? () => onServiceEnquire(service.title) : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-red-600 scale-125"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </motion.div>
    </section>
  )
}
