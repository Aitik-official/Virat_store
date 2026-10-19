'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { partnerLogos as defaultPartners } from '@/lib/partner-logos'
import { getActiveSiteAssets } from '@/lib/site-assets'

export function PartnersSection() {
  const [logos, setLogos] = useState<string[]>(defaultPartners.map((p) => p.src))

  useEffect(() => {
    const update = () => {
      const active = getActiveSiteAssets()
      if (active.partnerLogos?.length) {
        setLogos(active.partnerLogos)
      }
    }
    update()

    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => {
        if (data.media?.partnerLogos?.length > 0) {
          setLogos(data.media.partnerLogos)
        }
      })
      .catch(() => {})

    window.addEventListener('storage', update)
    return () => window.removeEventListener('storage', update)
  }, [])

  return (
    <section id="partners" className="border-b border-slate-200 bg-[#f9fafb] px-4 py-6 sm:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-lg font-black uppercase tracking-tight text-[#080d2d] sm:text-xl md:text-2xl">
          OUR PROUD PARTNERS
        </h2>

        {/* 6-column grid on desktop, 3-column on tablet, 2-column on mobile */}
        <div className="mt-4 grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-6 md:gap-x-6 md:gap-y-6">
          {logos.map((src, index) => (
            <div
              key={index}
              className="group flex size-full items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative flex h-24 w-full max-w-[130px] items-center justify-center sm:h-28 sm:max-w-[140px] md:h-28 md:max-w-[150px]">
                <Image
                  src={src}
                  alt={`Partner ${index + 1}`}
                  width={150}
                  height={150}
                  className="max-h-full max-w-full w-auto h-auto object-contain filter drop-shadow-sm transition-all duration-300 group-hover:brightness-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
