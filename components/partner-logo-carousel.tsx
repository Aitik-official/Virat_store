'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AssetSlot } from '@/components/site-primitives'

export function PartnerLogoCarousel({ logos }: { logos: readonly string[] }) {
  const [active, setActive] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const total = logos.length

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 2 : 3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const next = () => setActive((current) => (current + 1) % Math.max(total, 1))
  const previous = () => setActive((current) => (current - 1 + Math.max(total, 1)) % Math.max(total, 1))

  useEffect(() => {
    if (total <= visibleCount) return
    const timer = window.setInterval(next, 3500)
    return () => window.clearInterval(timer)
  }, [total, visibleCount])

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

  if (!total) return <div className="aspect-[3/1] w-full bg-[#fafafa]" aria-label="Partner logos image placeholder" />

  return (
    <div
      className="relative mx-auto max-w-6xl px-10 sm:px-12 select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * (100 / visibleCount)}%)` }}>
          {logos.map((src, index) => (
            <div
              key={`${src}-${index}`}
              style={{ width: `${100 / visibleCount}%` }}
              className="shrink-0 px-2 sm:px-3"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-[#fafafa] rounded-lg">
                <AssetSlot src={src} alt={`Partner logo ${index + 1}`} contain />
              </div>
            </div>
          ))}
        </div>
      </div>
      {total > visibleCount && <><button type="button" onClick={previous} aria-label="Previous partner logos" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 shadow-sm transition hover:bg-slate-50"><ChevronLeft className="size-4" /></button><button type="button" onClick={next} aria-label="Next partner logos" className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 shadow-sm transition hover:bg-slate-50"><ChevronRight className="size-4" /></button></>}
    </div>
  )
}

