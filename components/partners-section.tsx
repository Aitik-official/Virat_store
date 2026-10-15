import Image from 'next/image'
import { partnerLogos } from '@/lib/partner-logos'

export function PartnersSection() {
  return (
    <section id="partners" className="border-b border-slate-200 bg-[#f9fafb] px-4 py-6 sm:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-lg font-black uppercase tracking-tight text-[#080d2d] sm:text-xl md:text-2xl">
          OUR PROUD PARTNERS
        </h2>

        {/* 6-column grid on desktop, 3-column on tablet, 2-column on mobile */}
        <div className="mt-4 grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-6 md:gap-x-6 md:gap-y-6">
          {partnerLogos.map((partner) => (
            <div
              key={partner.id}
              className="group flex size-full items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative flex h-24 w-full max-w-[130px] items-center justify-center sm:h-28 sm:max-w-[140px] md:h-28 md:max-w-[150px]">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={150}
                  height={150}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-300 group-hover:brightness-105"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
