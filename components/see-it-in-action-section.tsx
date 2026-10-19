'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { products, type Product } from '@/lib/products-data'
import { getActiveSiteAssets, type ShowcaseProductItem, defaultShowcaseProducts } from '@/lib/site-assets'

export function SeeItInActionSection() {
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [playing1, setPlaying1] = useState(true)
  const [playing2, setPlaying2] = useState(true)

  const [dynamicProducts, setDynamicProducts] = useState<Product[]>(products)
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseProductItem[]>(defaultShowcaseProducts)

  useEffect(() => {
    const update = () => {
      const active = getActiveSiteAssets()
      if (active.showcaseProducts && active.showcaseProducts.length > 0) {
        setShowcaseItems(active.showcaseProducts)
      }
      try {
        const storedProds = localStorage.getItem('virat_admin_products_v1')
        if (storedProds) setDynamicProducts(JSON.parse(storedProds))
      } catch {}
    }
    update()

    // Also pull directly from MongoDB APIs on mount
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => {
        if (data.media?.showcaseProducts?.length > 0) {
          setShowcaseItems(data.media.showcaseProducts)
        }
      })
      .catch(() => {})

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setDynamicProducts(data.products)
        }
      })
      .catch(() => {})

    window.addEventListener('storage', update)
    return () => window.removeEventListener('storage', update)
  }, [])

  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  const safeIndex = activeProductIndex < showcaseItems.length ? activeProductIndex : 0
  const currentShowcase = showcaseItems[safeIndex] || defaultShowcaseProducts[0]

  const currentProduct: Product =
    dynamicProducts.find((p) => p.slug === currentShowcase?.productSlug) ||
    dynamicProducts[0] ||
    products[0]

  // Restart video playback when product index changes
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0
      video1Ref.current.play().catch(() => {})
      setPlaying1(true)
    }
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0
      video2Ref.current.play().catch(() => {})
      setPlaying2(true)
    }
  }, [safeIndex, currentShowcase])

  const togglePlay1 = () => {
    if (!video1Ref.current) return
    if (playing1) {
      video1Ref.current.pause()
      setPlaying1(false)
    } else {
      video1Ref.current.play()
      setPlaying1(true)
    }
  }

  const togglePlay2 = () => {
    if (!video2Ref.current) return
    if (playing2) {
      video2Ref.current.pause()
      setPlaying2(false)
    } else {
      video2Ref.current.play()
      setPlaying2(true)
    }
  }

  const handleNextProduct = () => {
    setActiveProductIndex((prev) => (prev + 1) % showcaseItems.length)
  }

  const handlePrevProduct = () => {
    setActiveProductIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)
  }

  const [mobileReelIndex, setMobileReelIndex] = useState(0) // 0 for Reel 1, 1 for Reel 2
  const [reelTouchStart, setReelTouchStart] = useState<number | null>(null)
  const [reelTouchEnd, setReelTouchEnd] = useState<number | null>(null)

  const [cardTouchStart, setCardTouchStart] = useState<number | null>(null)
  const [cardTouchEnd, setCardTouchEnd] = useState<number | null>(null)

  const handleReelTouchStart = (e: React.TouchEvent) => {
    setReelTouchEnd(null)
    setReelTouchStart(e.targetTouches[0].clientX)
  }

  const handleReelTouchMove = (e: React.TouchEvent) => {
    setReelTouchEnd(e.targetTouches[0].clientX)
  }

  const handleReelTouchEnd = () => {
    if (!reelTouchStart || !reelTouchEnd) return
    const distance = reelTouchStart - reelTouchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      // Swiped left -> if on reel 0 go to reel 1, if already on reel 1, switch to next showcase product
      if (mobileReelIndex === 0) {
        setMobileReelIndex(1)
      } else {
        handleNextProduct()
        setMobileReelIndex(0)
      }
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> if on reel 1 go to reel 0, if on reel 0 go to previous showcase product reel 1
      if (mobileReelIndex === 1) {
        setMobileReelIndex(0)
      } else {
        handlePrevProduct()
        setMobileReelIndex(1)
      }
    }
    setReelTouchStart(null)
    setReelTouchEnd(null)
  }

  const handleCardTouchStart = (e: React.TouchEvent) => {
    setCardTouchEnd(null)
    setCardTouchStart(e.targetTouches[0].clientX)
  }

  const handleCardTouchMove = (e: React.TouchEvent) => {
    setCardTouchEnd(e.targetTouches[0].clientX)
  }

  const handleCardTouchEnd = () => {
    if (!cardTouchStart || !cardTouchEnd) return
    const distance = cardTouchStart - cardTouchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      handleNextProduct()
    } else if (distance < -minSwipeDistance) {
      handlePrevProduct()
    }
    setCardTouchStart(null)
    setCardTouchEnd(null)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f8f9fc] px-4 py-8 sm:px-6 md:px-12 md:py-12 select-none">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-0.5 w-6 bg-[#e51717]" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">
              ON-FIELD ACTION PROOF
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl md:text-4xl">
            See It In Action<span className="text-[#e51717]">.</span>
          </h2>
        </div>

        {/* MAIN SPLIT: Reels on LEFT (7 cols) + Clean Compact Product Card on RIGHT (5 cols) */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: REELS IN 9:16 FORMAT (7 Columns) - 1 Reel at a time on mobile, 2 on sm+ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className="w-full max-w-[340px] sm:max-w-none sm:w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 touch-pan-y"
              onTouchStart={handleReelTouchStart}
              onTouchMove={handleReelTouchMove}
              onTouchEnd={handleReelTouchEnd}
            >
              {/* REEL 1 */}
              <div
                className={`group relative flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl ${
                  mobileReelIndex === 0 ? 'flex' : 'hidden sm:flex'
                }`}
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <video
                    ref={video1Ref}
                    key={currentShowcase.reel1Video}
                    src={currentShowcase.reel1Video || '/videos/display_video.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
                    onPlay={() => setPlaying1(true)}
                    onPause={() => setPlaying1(false)}
                  />

                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* Top info badge */}
                  <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                      <Sparkles className="size-3 text-[#e51717]" />
                      {currentShowcase.reel1Label || 'Batting Reel'}
                    </span>

                    <button
                      onClick={togglePlay1}
                      aria-label={playing1 ? 'Pause Reel 1' : 'Play Reel 1'}
                      className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-[#e51717]"
                    >
                      {playing1 ? <Pause className="size-3.5 fill-current" /> : <Play className="ml-0.5 size-3.5 fill-current" />}
                    </button>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
                      Reel 01
                    </p>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {currentShowcase.reel1Title || 'Cover Drive & Match Agility'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* REEL 2 */}
              <div
                className={`group relative flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl ${
                  mobileReelIndex === 1 ? 'flex' : 'hidden sm:flex'
                }`}
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <video
                    ref={video2Ref}
                    key={currentShowcase.reel2Video}
                    src={currentShowcase.reel2Video || '/videos/jadeja.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
                    onPlay={() => setPlaying2(true)}
                    onPause={() => setPlaying2(false)}
                  />

                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* Top info badge */}
                  <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                      <Sparkles className="size-3 text-[#e51717]" />
                      {currentShowcase.reel2Label || 'Action Reel'}
                    </span>

                    <button
                      onClick={togglePlay2}
                      aria-label={playing2 ? 'Pause Reel 2' : 'Play Reel 2'}
                      className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-[#e51717]"
                    >
                      {playing2 ? <Pause className="size-3.5 fill-current" /> : <Play className="ml-0.5 size-3.5 fill-current" />}
                    </button>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
                      Reel 02
                    </p>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {currentShowcase.reel2Title || 'Pitch Intensity & Sprint Speed'}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Reel Indicators & Prev/Next Toggle Buttons (only visible on mobile < sm) */}
            <div className="mt-3 flex sm:hidden items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setMobileReelIndex(0)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${
                  mobileReelIndex === 0
                    ? 'bg-[#080d2d] text-white shadow-sm ring-1 ring-white/10'
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-[#080d2d]'
                }`}
              >
                <span className={`size-1.5 rounded-full ${mobileReelIndex === 0 ? 'bg-[#e51717]' : 'bg-slate-300'}`} />
                Reel 01
              </button>

              <button
                type="button"
                onClick={() => setMobileReelIndex(1)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${
                  mobileReelIndex === 1
                    ? 'bg-[#080d2d] text-white shadow-sm ring-1 ring-white/10'
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-[#080d2d]'
                }`}
              >
                <span className={`size-1.5 rounded-full ${mobileReelIndex === 1 ? 'bg-[#e51717]' : 'bg-slate-300'}`} />
                Reel 02
              </button>
            </div>
          </div>

          {/* RIGHT: CLEAN COMPACT PRODUCT CARD (5 Columns) */}
          <div
            className="lg:col-span-5 flex flex-col touch-pan-y"
            onTouchStart={handleCardTouchStart}
            onTouchMove={handleCardTouchMove}
            onTouchEnd={handleCardTouchEnd}
          >
            <div className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#e51717]/40 hover:shadow-xl">
              {/* Product Category, Tag & Integrated Slider Navigation Buttons */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#080d2d] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                    {currentShowcase.tag || 'Featured'}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e51717]">
                    {currentProduct.category}
                  </span>
                </div>

                {/* Slider navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevProduct}
                    aria-label="Previous product"
                    className="flex size-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <span className="min-w-[2.5rem] text-center text-xs font-bold tabular-nums text-slate-500">
                    <span className="text-[#e51717]">{String(safeIndex + 1).padStart(2, '0')}</span>/{String(showcaseItems.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextProduct}
                    aria-label="Next product"
                    className="flex size-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Clickable Card Body filling space evenly */}
              <Link
                href={`/products/${currentProduct.slug}`}
                className="group/link flex flex-col flex-1 justify-between mt-3"
              >
                {/* Product Visual Box */}
                <div className="relative flex-1 min-h-[220px] w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                  {currentProduct.image ? (
                    <Image
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover/link:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Sparkles className="w-8 h-8 mb-1 opacity-50" />
                      <span className="text-[10px] uppercase font-bold text-slate-400">Virat Sports</span>
                    </div>
                  )}
                </div>

                {/* Title, Pricing & Quick Description */}
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black tracking-tight text-[#080d2d] sm:text-lg group-hover/link:text-[#e51717] transition-colors">
                      {currentProduct.name}
                    </h3>
                  </div>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-black text-[#080d2d]">
                      ₹{currentProduct.price.toLocaleString('en-IN')}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {currentShowcase.quickDescription || currentProduct.description}
                  </p>
                </div>

                {/* Clean View Product Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#080d2d] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover/link:bg-[#e51717]">
                    <span>Explore Product</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
