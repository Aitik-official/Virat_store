'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getActiveSiteAssets, defaultSiteAssets } from '@/lib/site-assets'

export interface TeamwearSlide {
  image: string
  alt?: string
}

const DEFAULT_SLIDES: TeamwearSlide[] = defaultSiteAssets.teamwearSlides.map((img) => ({
  image: img,
  alt: 'Virat Custom Teamwear Gear',
}))

export function TeamWearSection({
  slides: initialSlides,
}: {
  slides?: TeamwearSlide[]
}) {
  const [slides, setSlides] = useState<TeamwearSlide[]>(initialSlides || DEFAULT_SLIDES)

  useEffect(() => {
    if (initialSlides) return
    const update = () => {
      const active = getActiveSiteAssets()
      if (active.teamwearSlides?.length) {
        setSlides(active.teamwearSlides.map((img) => ({ image: img, alt: 'Virat Custom Teamwear' })))
      }
    }
    update()

    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => {
        if (data.media?.teamwearSlides?.length > 0) {
          setSlides(data.media.teamwearSlides.map((img: string) => ({ image: img, alt: 'Virat Custom Teamwear' })))
        }
      })
      .catch(() => {})

    window.addEventListener('storage', update)
    return () => window.removeEventListener('storage', update)
  }, [initialSlides])

  const [active, setActive] = useState(0)
  const total = slides.length

  const next = () => setActive((curr) => (curr + 1) % total)
  const previous = () => setActive((curr) => (curr - 1 + total) % total)

  // Autoplay hero slider
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [total])

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      next()
    } else if (distance < -minSwipeDistance) {
      previous()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section id="team-wear" className="w-full border-b border-slate-200 bg-[#f9fafb] px-4 py-6 sm:px-6 md:py-8" aria-label="Team Wear Section">
      <div className="mx-auto max-w-6xl">
        {/* 1. Header with minimal gaps matching color theme */}
        <div className="text-center">
          <div className="mx-auto mb-1 flex items-center justify-center gap-1.5">
            <span className="h-[2px] w-5 bg-[#e51717]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e51717]">
              CUSTOM KITS & GEAR
            </span>
            <span className="h-[2px] w-5 bg-[#e51717]" />
          </div>
          <h2 className="relative inline-block text-xl font-black uppercase leading-tight tracking-tight text-[#080d2d] sm:text-2xl md:text-3xl">
            TEAMWEAR
            <span className="text-[#e51717]">.</span>
          </h2>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
            Engineered for clubs, schools & professional squads
          </p>
        </div>

        {/* 2. Scaled-up Responsive Slider Card with minimal top gap */}
        <div
          className="group relative mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200/90 bg-[#080d2d] shadow-xl transition-all duration-500 hover:shadow-2xl sm:mt-4 sm:rounded-2xl select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Aspect ratio precisely tailored to TeamWear4 (1600x1000 = 16:10) so it displays fully without cropping */}
          <div className="relative aspect-[16/10] w-full">
            {slides.map((slide, index) => {
              const isActive = index === active
              return (
                <div
                  key={slide.image + index}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt || 'Virat Teamwear'}
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1152px"
                  />
                </div>
              )
            })}

            {/* Subtly styled pill navigation slider controls */}
            {total > 1 && (
              <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#080d2d]/80 px-2.5 py-1 text-white shadow-xl backdrop-blur-md sm:bottom-4 sm:right-5 sm:gap-2 sm:px-3 sm:py-1.5">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous team wear slide"
                  className="rounded-full p-1 transition hover:bg-[#e51717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft className="size-3.5 sm:size-4" />
                </button>
                <span
                  className="min-w-10 text-center text-[10px] font-black tracking-wider tabular-nums text-white sm:min-w-14 sm:text-xs"
                  aria-live="polite"
                >
                  <span className="text-[#e51717]">{String(active + 1).padStart(2, '0')}</span> /{' '}
                  {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next team wear slide"
                  className="rounded-full p-1 transition hover:bg-[#e51717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight className="size-3.5 sm:size-4" />
                </button>
              </div>
            )}

            {/* Dot indicators for mobile and desktop quick navigation */}
            {total > 1 && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 sm:bottom-4 sm:left-5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? 'w-5 bg-[#e51717] sm:w-6' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
