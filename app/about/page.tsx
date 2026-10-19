import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'About Virat | Built for Movement, Built for the Game',
  description:
    'Virat is a sportswear and cricket-focused brand built for people who live around the game. From training sessions and match days to everything after.',
}

const corePillars = [
  {
    number: '01',
    title: 'BUILT FOR CRICKET',
    description:
      'Designed around the demands of the game, from practice sessions to match day.',
  },
  {
    number: '02',
    title: 'MADE TO MOVE',
    description:
      'Comfort, flexibility and function come together in everything we create.',
  },
  {
    number: '03',
    title: 'BEYOND THE FIELD',
    description:
      'Sportswear that fits into everyday life just as naturally as it fits into sport.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#080d2d]">
      <SiteHeader />

      <main className="relative overflow-hidden">
        {/* Top Section */}
        <section className="relative mx-auto max-w-[1440px] px-6 pt-10 pb-20 md:px-12 lg:px-16 lg:pt-14 lg:pb-28">
          {/* Subtle Watermark Number '08' in top right matching design */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 select-none font-black text-[#080d2d]/[0.035] sm:right-10 sm:top-2 text-[140px] sm:text-[220px] md:text-[300px] lg:text-[380px] leading-none tracking-tighter"
          >
            08
          </div>

          {/* Breadcrumb / Top Header Label Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-200/80 pb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#6b7280]">
            <span className="text-[#080d2d]">ABOUT VIRAT</span>
            <span className="tracking-[0.25em] text-[#9ca3af]">THE BRAND</span>
          </div>

          {/* Hero Statement Block */}
          <div className="relative z-10 mt-14 grid grid-cols-1 items-end gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              {/* Category pill / tag */}
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-6 bg-[#e51717]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#e51717]">
                  BUILT FOR MOVEMENT
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-6xl md:text-7xl lg:text-[86px] lg:leading-[0.92]">
                BUILT FOR
                <br />
                THE GAME.
              </h1>
            </div>

            {/* Intro paragraph with left accent border */}
            <div className="lg:col-span-4 lg:pb-3">
              <div className="border-l-2 border-[#e51717] pl-6">
                <p className="text-base font-medium leading-relaxed text-[#4b5563] sm:text-lg">
                  <strong className="font-semibold text-[#080d2d]">Virat was built around a simple idea</strong> — create sportswear that moves with you, on the field and beyond it.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="relative z-10 mt-24 border-t border-neutral-200/80 pt-16 lg:mt-32 lg:pt-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Section Sub-label */}
              <div className="lg:col-span-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#9ca3af]">
                  01 — OUR STORY
                </span>
              </div>

              {/* Main Headline & Two-column narrative */}
              <div className="lg:col-span-9">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#080d2d] sm:text-4xl md:text-5xl lg:leading-[1.1]">
                  SPORT IS WHERE WE START.
                  <br />
                  <span className="text-[#e51717]">MOVEMENT IS WHERE WE GO.</span>
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-8 text-[15px] leading-relaxed text-[#4b5563] sm:grid-cols-2 lg:mt-10 lg:gap-12">
                  <p>
                    Virat is a sportswear and cricket-focused brand built for people who live around the game. From training sessions and match days to everything that happens away from the field, our products are designed to keep up with movement.
                  </p>
                  <p>
                    We believe sportswear should feel natural — functional enough for performance, comfortable enough for everyday life, and distinctive enough to feel like your own.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div className="relative z-10 mt-20 border-t border-neutral-200/80 pt-14 lg:mt-28">
            <div className="grid grid-cols-1 divide-y divide-neutral-200/80 md:grid-cols-3 md:divide-x md:divide-y-0">
              {corePillars.map((pillar, idx) => (
                <div
                  key={pillar.number}
                  className={`flex flex-col justify-between py-8 md:py-6 ${
                    idx === 0
                      ? 'md:pr-8'
                      : idx === 1
                      ? 'md:px-8'
                      : 'md:pl-8'
                  }`}
                >
                  <div>
                    <span className="text-[12px] font-black tracking-wider text-[#e51717]">
                      {pillar.number}
                    </span>
                    <h3 className="mt-4 text-base font-black uppercase tracking-tight text-[#080d2d] sm:text-lg">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bold Statement & CTA */}
          <div className="relative z-10 mt-24 border-t border-neutral-200/80 pt-16 lg:mt-32 lg:pt-20">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]">
                  SPORT IS THE STARTING
                  <br />
                  POINT.
                  <br />
                  <span className="text-[#e51717]">
                    MOVEMENT IS THE
                    <br />
                    MINDSET.
                  </span>
                </h2>
              </div>

              <div className="pb-2">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#080d2d] transition-colors duration-200 hover:text-[#e51717]"
                >
                  <span>KEEP MOVING</span>
                  <ArrowUpRight className="size-4 text-[#e51717] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
