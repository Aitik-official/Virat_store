'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AssetSlot } from '@/components/site-primitives'

export function PartnerLogoCarousel({ logos }: { logos: readonly string[] }) {
  const [active, setActive] = useState(0)
  const visibleCount = 3
  const total = logos.length
  const next = () => setActive((current) => (current + 1) % Math.max(total, 1))
  const previous = () => setActive((current) => (current - 1 + Math.max(total, 1)) % Math.max(total, 1))

  useEffect(() => {
    if (total <= visibleCount) return
    const timer = window.setInterval(next, 3500)
    return () => window.clearInterval(timer)
  }, [total])

  if (!total) return <div className="aspect-[3/1] w-full bg-[#fafafa]" aria-label="Partner logos image placeholder" />

  return <div className="relative mx-auto max-w-6xl px-10 sm:px-12">
    <div className="overflow-hidden">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * (100 / visibleCount)}%)` }}>
        {logos.map((src, index) => <div key={`${src}-${index}`} className="w-1/3 shrink-0 px-2 sm:px-3">
          <div className="relative aspect-square overflow-hidden bg-[#fafafa]"><AssetSlot src={src} alt={`Partner logo ${index + 1}`} contain /></div>
        </div>)}
      </div>
    </div>
    {total > visibleCount && <><button type="button" onClick={previous} aria-label="Previous partner logos" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 shadow-sm transition hover:bg-slate-50"><ChevronLeft className="size-4" /></button><button type="button" onClick={next} aria-label="Next partner logos" className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 shadow-sm transition hover:bg-slate-50"><ChevronRight className="size-4" /></button></>}
  </div>
}

