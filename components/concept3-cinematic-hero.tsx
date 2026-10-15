'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Eye, Check, Target, ChevronRight } from 'lucide-react'

interface HotspotProduct {
  id: string
  name: string
  category: string
  price: string
  originalPrice?: string
  image: string
  // coordinates in percentage of the video canvas
  x: number // e.g. 48%
  y: number // e.g. 42%
  tag: string
}

interface DrillScenario {
  id: string
  title: string
  subtitle: string
  duration: string
  products: HotspotProduct[]
}

const drillScenarios: DrillScenario[] = [
  {
    id: 'drill-batting',
    title: 'Cover Drive & Power Arc',
    subtitle: 'Batting Mechanics & Flex Test',
    duration: '0:45',
    products: [
      {
        id: 'hs-cap',
        name: 'VK Signature Edition Cap',
        category: 'Headwear',
        price: '₹899',
        image: '/images/category/cap.png',
        x: 50,
        y: 20,
        tag: 'Official Cap',
      },
      {
        id: 'hs-jersey',
        name: 'VK Pro Match-Day Jersey',
        category: 'Match Wear',
        price: '₹2,499',
        originalPrice: '₹3,299',
        image: '/images/category/mens.png',
        x: 48,
        y: 43,
        tag: 'Breathable Mesh',
      },
      {
        id: 'hs-pant',
        name: 'Aero-Stretch Team Wear',
        category: 'Team Wear',
        price: '₹1,999',
        originalPrice: '₹2,499',
        image: '/images/TeamWear/TeamWear1.png',
        x: 52,
        y: 72,
        tag: '4-Way Stretch',
      },
    ],
  },
  {
    id: 'drill-agility',
    title: 'Boundary Sprint & Dive',
    subtitle: 'Fielding Agility & Friction Resistance',
    duration: '0:38',
    products: [
      {
        id: 'hs-jersey-2',
        name: 'VK Pro Match-Day Jersey',
        category: 'Match Wear',
        price: '₹2,499',
        image: '/images/category/mens.png',
        x: 46,
        y: 38,
        tag: 'Reinforced Seams',
      },
      {
        id: 'hs-club-wear',
        name: 'Club Training Bottoms',
        category: 'Conditioning',
        price: '₹1,899',
        image: '/images/TeamWear/TeamWear2.png',
        x: 54,
        y: 68,
        tag: 'Anti-Abrasion',
      },
    ],
  },
  {
    id: 'drill-heat',
    title: 'High Heat Conditioning',
    subtitle: 'Extreme Climate Sweat Test',
    duration: '0:52',
    products: [
      {
        id: 'hs-training-tee',
        name: 'Elite Aeration Top',
        category: 'Training',
        price: '₹1,799',
        image: '/images/TeamWear/TeamWear3.png',
        x: 49,
        y: 42,
        tag: 'Quick-Dry Microfiber',
      },
    ],
  },
]

export function Concept3CinematicHero() {
  const [activeDrillIndex, setActiveDrillIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null)
  const [addedItem, setAddedItem] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeDrill = drillScenarios[activeDrillIndex]

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleQuickAdd = (productId: string) => {
    setAddedItem(productId)
    setTimeout(() => setAddedItem(null), 1800)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#060a22] px-4 py-8 text-white sm:px-6 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        
        {/* Header with drill selector */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#e51717]" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                CINEMATIC LAB & PITCH TEST
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
              See It In Action<span className="text-[#e51717]">.</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-300 sm:text-sm">
              Explore the gear in motion. Tap the glowing interactive pins directly on the player to inspect items.
            </p>
          </div>

          {/* Drill Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
            {drillScenarios.map((drill, index) => (
              <button
                key={drill.id}
                onClick={() => {
                  setActiveDrillIndex(index)
                  setActiveHotspotId(null)
                }}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-300 ${
                  activeDrillIndex === index
                    ? 'bg-[#e51717] text-white shadow-lg shadow-[#e51717]/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{drill.title}</span>
                <span className="text-[10px] opacity-70">({drill.duration})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Main Screen with Hotspots */}
        <div className="relative mx-auto aspect-video max-h-[580px] w-full overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
          <video
            ref={videoRef}
            src="/videos/display_video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="size-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Subtle dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Top Video HUD Info */}
          <div className="absolute left-5 top-5 right-5 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
              <Target className="size-3.5 text-[#e51717]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {activeDrill.subtitle}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="size-2 rounded-full bg-[#e51717] animate-pulse"></span>
              {activeDrill.products.length} Interactive Tagged Items
            </div>
          </div>

          {/* INTERACTIVE HOTSPOTS OVERLAY */}
          {activeDrill.products.map((item) => {
            const isSelected = activeHotspotId === item.id
            const isAdded = addedItem === item.id

            return (
              <div
                key={item.id}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Glowing Pulse Pin */}
                <button
                  onClick={() => setActiveHotspotId(isSelected ? null : item.id)}
                  aria-label={`View ${item.name}`}
                  className="group/pin relative flex size-10 items-center justify-center"
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e51717] opacity-60"></span>
                  <span className="relative flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#e51717] shadow-xl transition-transform duration-200 group-hover/pin:scale-125">
                    <Eye className="size-3.5 text-white" />
                  </span>
                </button>

                {/* Popover Product Card */}
                {isSelected && (
                  <div className="absolute left-1/2 top-10 -translate-x-1/2 w-64 rounded-2xl border border-white/20 bg-[#080d2d]/95 p-3.5 backdrop-blur-xl shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white p-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="rounded bg-[#e51717]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#e51717]">
                          {item.tag}
                        </span>
                        <h4 className="mt-1 truncate text-xs font-bold text-white">
                          {item.name}
                        </h4>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-xs font-black text-white">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(item.id)}
                      className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#e51717] text-white hover:bg-white hover:text-[#080d2d]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="size-3.5" /> Added to Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="size-3.5" /> Quick Add to Bag
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          {/* Bottom Video Controls & Info Bar */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
                Live Scenario
              </p>
              <h3 className="text-base font-black sm:text-lg text-white">
                {activeDrill.title}
              </h3>
            </div>

            {/* Play/Pause & Sound Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-[#e51717] hover:scale-105"
              >
                {isPlaying ? <Pause className="size-4 fill-white" /> : <Play className="ml-0.5 size-4 fill-white" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-[#e51717] hover:scale-105"
              >
                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Product Strip below cinematic screen */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {activeDrill.products.map((item) => (
            <div
              key={`strip-${item.id}`}
              onClick={() => setActiveHotspotId(item.id)}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:border-[#e51717]/60 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white p-1">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
                <div>
                  <p className="truncate text-xs font-bold text-white group-hover:text-[#e51717] transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs font-black text-slate-300">{item.price}</p>
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
