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

export interface ReelVideo {
  id: string
  title: string
  label: string
  src: string
  instagramUrl?: string
}

export interface SynchronizedProductItem {
  product: Product
  tag: string
  quickDescription: string
  reels: [ReelVideo, ReelVideo]
}

const syncShowcaseData: SynchronizedProductItem[] = [
  {
    product: products.find((p) => p.slug === 'virat-pro-match-cricket-jersey') || products[0],
    tag: 'Worn by Virat',
    quickDescription: 'Ultra-breathable micro-mesh engineered for maximum airflow and match intensity.',
    reels: [
      {
        id: 'jersey-reel-1',
        title: 'Cover Drive & Bat Speed Drill',
        label: 'Batting Reel',
        src: '/videos/display_video.mp4',
      },
      {
        id: 'jersey-reel-2',
        title: 'Pitch Intensity & All-Round Agility',
        label: 'Action Reel',
        src: '/videos/jadeja.mp4',
      },
    ],
  },
  {
    product: products.find((p) => p.slug === 'virat-all-weather-performance-tracksuit') || products[1],
    tag: 'All-Weather Kit',
    quickDescription: '4-way ergonomic stretch for sprint acceleration and weather resistance.',
    reels: [
      {
        id: 'tracksuit-reel-1',
        title: 'Pre-Match Warmups & Sprints',
        label: 'Agility Reel',
        src: '/videos/display_video.mp4',
      },
      {
        id: 'tracksuit-reel-2',
        title: 'On-Field Sprint & Slide',
        label: 'Fielding Action',
        src: '/videos/jadeja.mp4',
      },
    ],
  },
  {
    product: products.find((p) => p.slug === 'virat-championship-curved-peak-cap') || products[2],
    tag: 'Official Merch',
    quickDescription: 'Curved visor with UV 50+ protection and moisture-wicking sweatband.',
    reels: [
      {
        id: 'cap-reel-1',
        title: 'Sunny Outfield High-Catch Drill',
        label: 'Fielding Reel',
        src: '/videos/display_video.mp4',
      },
      {
        id: 'cap-reel-2',
        title: 'Dynamic Pitch Movement',
        label: 'Match Action',
        src: '/videos/jadeja.mp4',
      },
    ],
  },
  {
    product: products.find((p) => p.slug === 'virat-test-match-white-trousers') || products[3] || products[0],
    tag: 'Test Match Spec',
    quickDescription: 'Reinforced knee construction with anti-grass-stain finish for 5-day matches.',
    reels: [
      {
        id: 'trouser-reel-1',
        title: 'Boundary Slide & Friction Test',
        label: 'Dive Drill',
        src: '/videos/display_video.mp4',
      },
      {
        id: 'trouser-reel-2',
        title: 'High-Speed Fielding Pickup & Throw',
        label: 'Fielding Action',
        src: '/videos/jadeja.mp4',
      },
    ],
  },
]

export function SeeItInActionSection() {
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [playing1, setPlaying1] = useState(true)
  const [playing2, setPlaying2] = useState(true)

  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  const currentItem = syncShowcaseData[activeProductIndex]
  const currentProduct = currentItem.product

  // Restart video playback when product index changes
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0
      video1Ref.current.play().catch(() => { })
      setPlaying1(true)
    }
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0
      video2Ref.current.play().catch(() => { })
      setPlaying2(true)
    }
  }, [activeProductIndex])

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
    setActiveProductIndex((prev) => (prev + 1) % syncShowcaseData.length)
  }

  const handlePrevProduct = () => {
    setActiveProductIndex((prev) => (prev - 1 + syncShowcaseData.length) % syncShowcaseData.length)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f8f9fc] px-4 py-8 sm:px-6 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header - clean with no buttons */}
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

        {/* MAIN SPLIT: 2 Vertical Reels on LEFT (7 cols) + Clean Compact Product Card on RIGHT (5 cols) */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">

          {/* ======================================================== */}
          {/* LEFT: 2 REELS IN 9:16 FORMAT (7 Columns)                 */}
          {/* Scaled down by an additional 5% (w-[90%] mx-auto)        */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* REEL 1 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl">
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <video
                    ref={video1Ref}
                    src={currentItem.reels[0].src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-102"
                    onPlay={() => setPlaying1(true)}
                    onPause={() => setPlaying1(false)}
                  />

                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* Top info badge */}
                  <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                      <Sparkles className="size-3 text-[#e51717]" />
                      {currentItem.reels[0].label}
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
                      {currentItem.reels[0].title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* REEL 2 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl">
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <video
                    ref={video2Ref}
                    src={currentItem.reels[1].src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-102"
                    onPlay={() => setPlaying2(true)}
                    onPause={() => setPlaying2(false)}
                  />

                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* Top info badge */}
                  <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                      <Sparkles className="size-3 text-[#e51717]" />
                      {currentItem.reels[1].label}
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
                      {currentItem.reels[1].title}
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: CLEAN COMPACT PRODUCT CARD (5 Columns)            */}
          {/* Height matches the video height exactly via flex-col     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#e51717]/40 hover:shadow-xl">

              {/* Product Category, Tag & Integrated Slider Navigation Buttons */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#080d2d] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                    {currentItem.tag}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e51717]">
                    {currentProduct.category}
                  </span>
                </div>

                {/* Slider navigation buttons directly inside the card */}
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
                    <span className="text-[#e51717]">{String(activeProductIndex + 1).padStart(2, '0')}</span>/{String(syncShowcaseData.length).padStart(2, '0')}
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
                {/* Product Visual Box: Expands flex-1 to fill the vertical space cleanly */}
                <div className="relative flex-1 min-h-[220px] w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover/link:scale-105"
                  />
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
                    {currentItem.quickDescription}
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
