'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { siteAssets, validSources, type ImageSlot, type PromotionalSlide } from '@/lib/site-assets'

function AssetSlot({ src, alt, className = '', contain = false }: { src?: string; alt: string; className?: string; contain?: boolean }) {
  if (!src?.trim()) return <div aria-label={`${alt} image placeholder`} className={`bg-[#f3f4f6] ${className}`} />
  return <Image src={src} alt={alt} fill className={`${contain ? 'object-contain' : 'object-cover'} ${className}`} sizes="100vw" />
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function useAutoplay(next: () => void, delay: number, enabled: boolean, paused = false) {
  useEffect(() => {
    if (!enabled || paused) return
    let timer: number | undefined
    const start = () => { if (document.visibilityState === 'visible' && timer === undefined) timer = window.setInterval(next, delay) }
    const stop = () => { if (timer !== undefined) { window.clearInterval(timer); timer = undefined } }
    start()
    const onVisibility = () => { if (document.visibilityState === 'hidden') stop(); else start() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [next, delay, enabled, paused])
}

export function Header() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      setHidden(current > 80 && current > last + 6)
      last = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: 'NEW ARRIVALS', href: '#trending-products' },
    { name: 'MEN', href: '#shop-by-category', hasDropdown: true },
    { name: 'WOMEN', href: '#shop-by-category', hasDropdown: true },
    { name: 'CRICKET', href: '#shop-by-category', hasDropdown: true },
    { name: 'ACCESSORIES', href: '#shop-by-category', hasDropdown: true },
    { name: 'DESIGN YOUR OWN', href: '#team-wear' },
    { name: 'ABOUT', href: '#see-it-in-action' },
  ]

  return (
    <header className={`sticky top-0 z-50 border-b border-[#e5e7eb] bg-[#f8f9fa] transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* Brand Logo from public/images/virat logo.png */}
        <Link href="#top" className="relative flex h-14 w-32 shrink-0 items-center sm:w-36" aria-label="Virat Sports home">
          <Image
            src={siteAssets.logo}
            alt="Virat Sports"
            width={160}
            height={60}
            className="max-h-full w-auto object-contain"
            priority
          />
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#374151] transition-colors hover:text-[#111827]"
            >
              <span>{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="size-3.5 text-[#6b7280] transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-[#111827]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons: Search + Cart with Badge count */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            type="button"
            aria-label="Search"
            className="text-[#1f2937] transition-colors hover:text-[#ef4b23]"
          >
            <Search className="size-5 stroke-[1.8]" />
          </button>

          <Link
            href="#trending-products"
            aria-label="Shopping Cart"
            className="relative flex items-center justify-center text-[#1f2937] transition-colors hover:text-[#ef4b23]"
          >
            <ShoppingBag className="size-5 stroke-[1.8]" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#ef4b23] text-[9px] font-bold text-white shadow-sm">
              0
            </span>
          </Link>

          <button
            type="button"
            className="text-[#1f2937] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-6 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                onClick={() => setMenuOpen(false)}
                href={item.href}
                className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-[#374151] hover:text-[#111827]"
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="size-4 text-slate-400" />}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex items-center justify-center gap-2">
        <span className="h-[2px] w-6 bg-[#e51717]" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#e51717]">
          VIRAT PERFORMANCE
        </span>
        <span className="h-[2px] w-6 bg-[#e51717]" />
      </div>
      <h2 className="relative inline-block text-2xl font-black uppercase tracking-tight text-[#080d2d] md:text-4xl">
        {children}
        <span className="text-[#e51717]">.</span>
      </h2>
      {subtitle && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{subtitle}</p>}
    </div>
  )
}

export function HeroSlider() {
  const slides = validSources(siteAssets.heroBanners)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const next = () => setActive((current) => (current + 1) % slides.length)
  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length)
  useAutoplay(next, 5000, slides.length > 1 && !reduced)

  return (
    <section className="group relative aspect-[2.4/1] w-full overflow-hidden border-b border-slate-200 bg-[#080d2d]" aria-label="Hero banner">
      {slides.length ? slides.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${index === active
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0 pointer-events-none'
            }`}
        >
          <Image
            src={src}
            alt={`Virat Sports Performance Campaign ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )) : (
        <div aria-label="Hero banner image placeholder" className="absolute inset-0 bg-[#080d2d]" />
      )}

      {/* Hero Badge Tagline matching logo */}
      <div className="absolute left-6 top-6 z-10 hidden sm:flex items-center gap-2 rounded-full border border-white/40 bg-[#080d2d]/85 px-4 py-1.5 backdrop-blur-md shadow-md">
        <span className="size-2 rounded-full bg-[#e51717] animate-pulse" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
          NEVER GIVE UP
        </span>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 z-10 hidden md:flex items-center gap-3 rounded-full border border-white/20 bg-[#080d2d]/85 px-3 py-1.5 text-white shadow-xl backdrop-blur-md md:bottom-6 md:right-8">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous hero banner"
            className="rounded-full p-1.5 transition hover:bg-[#e51717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-14 text-center text-xs font-black tracking-wider tabular-nums text-white" aria-live="polite">
            <span className="text-[#e51717]">{String(active + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next hero banner"
            className="rounded-full p-1.5 transition hover:bg-[#e51717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </section>
  )
}

function PromoSlide({ slide }: { slide: PromotionalSlide }) {
  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-[25%_30%_15%_30%]">
      {/* Text block 1 */}
      <Link
        href="#cricket"
        className="group flex min-h-16 items-center justify-center border-b border-r border-slate-200 p-4 text-center text-base font-black uppercase text-[#080d2d] transition-colors duration-300 hover:bg-[#080d2d] hover:text-white sm:min-h-20 md:border-b-0 md:text-xl"
      >
        <span className="relative inline-block transition-transform duration-300 group-hover:scale-105">
          Find your game
          <span className="block h-0.5 w-0 bg-[#e51717] transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
      {/* Image panel 1 */}
      <div className="group relative min-h-48 overflow-hidden border-b border-slate-200 bg-[#f9fafb] sm:border-r md:border-b-0">
        <div className="flex size-full">
          <div className="relative h-full w-1/2 overflow-hidden border-r border-slate-200 transition-transform duration-500 group-hover:scale-105">
            <Image src={slide.findGame || '/images/1A.jpg'} alt="Find your game" fill className="object-cover" sizes="(max-width:768px) 50vw, 15vw" />
          </div>
          <div className="relative h-full w-1/2 overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <Image src="/images/banner1.jpeg" alt="Find your game action" fill className="object-cover" sizes="(max-width:768px) 50vw, 15vw" />
          </div>
        </div>
      </div>
      {/* Text block 2 */}
      <Link
        href="#cricket"
        className="group flex min-h-16 items-center justify-center border-b border-r border-slate-200 p-4 text-center text-base font-black uppercase text-[#080d2d] transition-colors duration-300 hover:bg-[#e51717] hover:text-white sm:min-h-20 md:border-b-0 md:text-xl"
      >
        <span className="relative inline-block transition-transform duration-300 group-hover:scale-105">
          Cricket
        </span>
      </Link>
      {/* Image panel 2 */}
      <div className="group relative min-h-48 overflow-hidden bg-[#f9fafb]">
        <div className="flex size-full">
          <div className="relative h-full w-1/2 overflow-hidden border-r border-slate-200 transition-transform duration-500 group-hover:scale-105">
            <Image src={slide.cricketAction || '/images/1B.jpg'} alt="Cricket action" fill className="object-cover" sizes="(max-width:768px) 50vw, 15vw" />
          </div>
          <div className="relative h-full w-1/2 overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <Image src="/images/banner2.jpeg" alt="Cricket action 2" fill className="object-cover" sizes="(max-width:768px) 50vw, 15vw" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PromotionalSlider() {
  const slides = siteAssets.promotionalSlides.filter((slide) => slide.findGame?.trim() || slide.cricketAction?.trim() || siteAssets.promotionalSlides.length === 1)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const next = () => setActive((current) => (current + 1) % Math.max(slides.length, 1))
  useAutoplay(next, 6000, slides.length > 1 && !reduced)
  return (
    <section id="find-your-game" className="relative overflow-hidden border-b border-slate-200">
      <div
        className={`flex ${reduced ? '' : 'transition-transform duration-700 ease-out'}`}
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.length ? slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0">
            <PromoSlide slide={slide} />
          </div>
        )) : (
          <div className="w-full shrink-0">
            <PromoSlide slide={{}} />
          </div>
        )}
      </div>
    </section>
  )
}

export function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const categories = [
    ['MEN’S', siteAssets.categories.men],
    ['WOMEN', siteAssets.categories.women],
    ['YOUTH', siteAssets.categories.youth],
    ['CAP', siteAssets.categories.cap],
    ['BAG & KITBAG RANGE', siteAssets.categories.kitbags],
    ['ACCESSORIES', siteAssets.categories.accessories],
  ] as const

  return (
    <section ref={sectionRef} id="shop-by-category" className="border-b border-slate-200 bg-white">
      <div
        className={`flex min-h-20 items-center justify-center border-b border-slate-200 px-5 py-6 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
      >
        <SectionHeading subtitle="Crafted for Champions">Shop by category</SectionHeading>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 md:gap-5 md:p-6 lg:gap-6">
        {categories.map(([name, src], index) => (
          <Link
            href={`#${name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
            key={name}
            style={{ transitionDelay: `${visible ? index * 90 : 0}ms` }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-transparent p-4 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
          >
            {/* Background container without lines */}
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f6]">
              <div className="relative size-full transition-transform duration-500 ease-out group-hover:scale-105">
                <AssetSlot src={src} alt={name} contain />
              </div>
            </div>

            {/* Logo-themed Crimson Red Accent bar on hover */}
            <span className="absolute left-0 top-0 h-1 w-0 bg-[#e51717] transition-all duration-300 ease-out group-hover:w-full" />

            {/* Bottom-right subtle red glow pulse on hover */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 size-28 rounded-full bg-[#e51717]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            {/* Typography matching theme: Deep Navy + hover to Crimson */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-block rounded bg-white/90 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-[#080d2d] shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:bg-[#080d2d] group-hover:text-white md:text-sm">
                {name}
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#e51717] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ActionGalleryCarousel() {
  const items = siteAssets.actionGallery.filter((item: ImageSlot) => item.src?.trim())
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3)
      } else {
        setVisibleCount(4)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const maxIndex = Math.max(0, items.length - visibleCount)

  useEffect(() => {
    if (active > maxIndex) {
      setActive(maxIndex)
    }
  }, [maxIndex, active])

  const next = () => setActive((current) => (current >= maxIndex ? 0 : current + 1))
  const previous = () => setActive((current) => (current <= 0 ? maxIndex : current - 1))
  useAutoplay(next, 4500, items.length > visibleCount && !reduced, paused)

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f7f8f5] px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#e51717]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e51717]">
                ON THE PITCH
              </span>
            </div>
            <h2 className="max-w-xs text-2xl font-black uppercase leading-[0.9] text-[#080d2d] md:text-4xl">
              See it<br />in action<span className="text-[#e51717]">.</span>
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-wider text-slate-500 md:block">
            Built for movement.<br />
            <span className="text-[#080d2d]">Never Give Up.</span>
          </div>
        </div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * (100 / visibleCount)}%)` }}
            >
              {items.length ? items.map((item, index) => (
                <div key={`${item.src}-${index}`} className="w-full shrink-0 px-2 sm:w-1/3 md:w-1/4">
                  <div className="group relative aspect-[0.68] overflow-hidden rounded-xl bg-[#e9ece7]">
                    <div className="relative size-full transition-transform duration-300 group-hover:scale-105">
                      <AssetSlot src={item.src} alt={item.alt || `Action gallery image ${index + 1}`} contain />
                    </div>
                  </div>
                  <p className="mt-1 bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#080d2d]">
                    {item.caption}
                  </p>
                </div>
              )) : (
                <div className="w-full">
                  <div className="aspect-[0.68] rounded-xl bg-[#e9ece7]" />
                </div>
              )}
            </div>
          </div>
          {items.length > visibleCount && (
            <>
              <button
                onClick={previous}
                aria-label="Previous gallery image"
                className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full border border-slate-300 bg-white/95 p-2 shadow-md transition hover:bg-[#080d2d] hover:text-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next gallery image"
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full border border-slate-300 bg-white/95 p-2 shadow-md transition hover:bg-[#080d2d] hover:text-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

import { partnerLogos } from '@/lib/partner-logos'

export function CricketHome() {
  return <div id="top" className="min-h-screen bg-white text-[#101828]"><Header /><main><HeroSlider /><PromotionalSlider /><CategoryGrid /><section id="video" className="border-b border-slate-200 bg-[#f9fafb] px-5 py-12 md:py-16"><SectionHeading subtitle="Unstoppable Spirit">VIRAT IN ACTION</SectionHeading><div className="relative mx-auto mt-6 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-[#080d2d] shadow-2xl"><video src="/videos/display_video.mp4" autoPlay loop muted playsInline className="size-full object-cover" /></div></section><section id="team-wear" className="grid border-b border-slate-300 md:grid-cols-[75%_25%]"><div className="relative aspect-[2.2/1] border-b border-slate-300 md:border-b-0 md:border-r"><AssetSlot src={siteAssets.teamwearBanner} alt="Teamwear campaign" contain /></div><Link href="#trending-products" className="flex min-h-40 items-center justify-center p-6 text-center text-2xl font-black uppercase md:min-h-0 md:text-3xl">Trending products</Link></section><ActionGalleryCarousel /><section id="partners" className="border-b border-slate-300 bg-[#f9fafb] px-4 py-16 sm:px-6 md:py-24"><SectionHeading>OUR PROUD PARTNERS</SectionHeading><div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-6 md:gap-x-8 md:gap-y-12">{partnerLogos.map((partner) => (<div key={partner.id} className="group flex size-full items-center justify-center p-2 transition-transform duration-300 hover:scale-105"><div className="relative flex h-24 w-full max-w-[130px] items-center justify-center sm:h-28 sm:max-w-[140px] md:h-28 md:max-w-[150px]"><Image src={partner.src} alt={partner.name} width={150} height={150} className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-300 group-hover:brightness-105" /></div></div>))}</div></section><section id="contact-us" className="px-5 py-20 text-center md:py-28"><SectionHeading>Contact us</SectionHeading><div className="mx-auto mt-12 grid max-w-5xl gap-10 text-left text-sm md:grid-cols-4"><div><p className="font-bold uppercase">Contact</p><p className="mt-3 text-slate-500">Email and phone details coming soon.</p></div><div><p className="font-bold uppercase">Explore</p><div className="mt-3 flex flex-col gap-2 text-slate-500"><Link href="#shop-by-category">Categories</Link><Link href="#team-wear">Team wear</Link></div></div><div><p className="font-bold uppercase">Follow</p><p className="mt-3 text-slate-500">Social links coming soon.</p></div><div><p className="font-bold uppercase">Legal</p><p className="mt-3 text-slate-500">Privacy policy · Terms & conditions</p></div></div></section></main><footer className="border-t border-slate-300 px-5 py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Virat Sports. All rights reserved.</footer></div>
}
