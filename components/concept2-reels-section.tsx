'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX, ShoppingBag, ChevronLeft, ChevronRight, Check, Flame } from 'lucide-react'

interface ActionReel {
  id: string
  title: string
  category: string
  videoSrc: string
  views: string
  product: {
    id: string
    name: string
    price: string
    originalPrice?: string
    image: string
    tag: string
  }
}

const actionReels: ActionReel[] = [
  {
    id: 'reel-1',
    title: 'Net Practice & Drive Mechanics',
    category: 'Batting Mastery',
    videoSrc: '/videos/display_video.mp4',
    views: '124K',
    product: {
      id: 'p-1',
      name: 'VK Pro Match Jersey',
      price: '₹2,499',
      originalPrice: '₹3,299',
      image: '/images/category/mens.png',
      tag: 'Match Fit',
    },
  },
  {
    id: 'reel-2',
    title: 'Agility & Fielding Quick-Drill',
    category: 'Speed Training',
    videoSrc: '/videos/display_video.mp4',
    views: '89K',
    product: {
      id: 'p-2',
      name: 'Aero-Stretch Team Wear',
      price: '₹1,999',
      originalPrice: '₹2,499',
      image: '/images/TeamWear/TeamWear1.png',
      tag: '4-Way Stretch',
    },
  },
  {
    id: 'reel-3',
    title: 'Sweat-Wicking Tech in Intense Heat',
    category: 'Lab & Pitch Testing',
    videoSrc: '/videos/display_video.mp4',
    views: '210K',
    product: {
      id: 'p-3',
      name: 'Signature Crown Cap',
      price: '₹899',
      image: '/images/category/cap.png',
      tag: 'Moisture Wicking',
    },
  },
  {
    id: 'reel-4',
    title: 'High-Impact Sprint Drills',
    category: 'Conditioning',
    videoSrc: '/videos/display_video.mp4',
    views: '95K',
    product: {
      id: 'p-4',
      name: 'VK Club Training Wear',
      price: '₹2,199',
      originalPrice: '₹2,799',
      image: '/images/TeamWear/TeamWear2.png',
      tag: 'Elite Aeration',
    },
  },
]

export function Concept2ReelsSection() {
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [playingMap, setPlayingMap] = useState<Record<string, boolean>>({
    'reel-1': true,
  })
  const [muted, setMuted] = useState(true)
  const [addedItem, setAddedItem] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id]
    if (!video) return

    if (video.paused) {
      video.play()
      setPlayingMap((prev) => ({ ...prev, [id]: true }))
    } else {
      video.pause()
      setPlayingMap((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleQuickBuy = (id: string) => {
    setAddedItem(id)
    setTimeout(() => setAddedItem(null), 1800)
  }

  const scrollPrev = () => {
    setActiveReelIndex((prev) => (prev > 0 ? prev - 1 : actionReels.length - 1))
  }

  const scrollNext = () => {
    setActiveReelIndex((prev) => (prev < actionReels.length - 1 ? prev + 1 : 0))
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f6f7fa] px-4 py-8 sm:px-6 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Header with Navigation Controls */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#e51717]" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                SHORT-FORM ACTION
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl md:text-4xl">
              See It In Action<span className="text-[#e51717]">.</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Watch reels of gear pushed to its limits. Tap tagged products to buy directly.
            </p>
          </div>

          {/* Action buttons & Mute toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:text-[#e51717]"
            >
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-[#e51717]" />}
              <span>{muted ? 'Sound Off' : 'Sound On'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous reel"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next reel"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Reels Carousel Grid: 4 Cards (1 on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actionReels.map((reel) => {
            const isPlaying = playingMap[reel.id] ?? false
            const isAdded = addedItem === reel.product.id

            return (
              <div
                key={reel.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#080d2d] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-400"
              >
                {/* 9:16 Aspect Ratio Reel Screen */}
                <div className="relative aspect-[9/15] w-full overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[reel.id] = el
                    }}
                    src={reel.videoSrc}
                    autoPlay
                    loop
                    muted={muted}
                    playsInline
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Overlay details */}
                  <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white border border-white/10">
                      <Flame className="size-3 text-[#e51717] fill-[#e51717]" />
                      {reel.views}
                    </span>

                    <button
                      onClick={() => togglePlay(reel.id)}
                      className="flex size-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-[#e51717]"
                    >
                      {isPlaying ? <Pause className="size-3 fill-white" /> : <Play className="ml-0.5 size-3 fill-white" />}
                    </button>
                  </div>

                  {/* Middle: Title & category */}
                  <div className="absolute inset-x-0 bottom-24 p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#e51717]">
                      {reel.category}
                    </p>
                    <h3 className="text-sm font-black leading-snug text-white line-clamp-1">
                      {reel.title}
                    </h3>
                  </div>

                  {/* Bottom: Shoppable Tagged Product Pill (Glassmorphism card) */}
                  <div className="absolute inset-x-2.5 bottom-2.5 rounded-xl border border-white/20 bg-black/60 p-2.5 backdrop-blur-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-center gap-2.5">
                      {/* Product thumbnail */}
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white/95 p-1">
                        <Image
                          src={reel.product.image}
                          alt={reel.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">
                          {reel.product.name}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#e51717]">
                            {reel.product.price}
                          </span>
                          {reel.product.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through">
                              {reel.product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={() => handleQuickBuy(reel.product.id)}
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                          isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#e51717] text-white hover:bg-white hover:text-[#080d2d]'
                        }`}
                        title="Quick Buy"
                      >
                        {isAdded ? <Check className="size-3.5 stroke-[3]" /> : <ShoppingBag className="size-3.5" />}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
