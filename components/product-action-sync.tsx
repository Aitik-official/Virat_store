'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  Check,
  Sparkles,
  ChevronRight,
  Star,
  Activity,
  Layers,
  Wind,
} from 'lucide-react'

interface ProductClip {
  id: string
  title: string
  label: string
  duration: string
  src: string
  focusMetric: string
}

interface ProductShowcaseItem {
  id: string
  name: string
  category: string
  price: string
  originalPrice: string
  discount: string
  rating: number
  reviewsCount: number
  image: string
  tag: string
  description: string
  sizes: string[]
  specs: { icon: 'wind' | 'layers' | 'activity'; label: string }[]
  clips: ProductClip[]
}

const showcaseProducts: ProductShowcaseItem[] = [
  {
    id: 'prod-jersey',
    name: 'VK Pro Match-Day Jersey',
    category: 'Official Match Wear',
    price: '₹2,499',
    originalPrice: '₹3,299',
    discount: '24% OFF',
    rating: 4.9,
    reviewsCount: 342,
    image: '/images/category/mens.png',
    tag: 'Worn by Virat',
    description:
      'Ultra-breathable micro-mesh engineered for high-intensity cricket matches. Built with anti-chafing ergonomic seams.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    specs: [
      { icon: 'wind', label: 'AirFlow 360° Mesh' },
      { icon: 'layers', label: 'Zero-Chafe Flatlock Seams' },
      { icon: 'activity', label: 'Moisture Dispersal Tech' },
    ],
    clips: [
      {
        id: 'clip-j1',
        title: 'Power Cover Drive Drill',
        label: 'Batting Motion',
        duration: '0:28',
        src: '/videos/display_video.mp4',
        focusMetric: 'Full Shoulder Flex & Zero Pull',
      },
      {
        id: 'clip-j2',
        title: 'Boundary Sprint & Sliding Stop',
        label: 'Fielding Agility',
        duration: '0:22',
        src: '/videos/display_video.mp4',
        focusMetric: 'Friction-Resistant Poly-Shield',
      },
      {
        id: 'clip-j3',
        title: 'Sweat Evaporation Lab Test',
        label: 'Lab Simulation',
        duration: '0:35',
        src: '/videos/display_video.mp4',
        focusMetric: '2.4x Faster Vapor Release',
      },
    ],
  },
  {
    id: 'prod-pant',
    name: 'Aero-Stretch Team Track Pant',
    category: 'Team & Training Wear',
    price: '₹1,999',
    originalPrice: '₹2,499',
    discount: '20% OFF',
    rating: 4.8,
    reviewsCount: 198,
    image: '/images/TeamWear/TeamWear1.png',
    tag: '4-Way Stretch',
    description:
      'Engineered with gusseted 4-way stretch panels to support explosive sprint accelerations and deep crouching behind stumps.',
    sizes: ['M', 'L', 'XL'],
    specs: [
      { icon: 'layers', label: '4-Way Elastic Micro-Weave' },
      { icon: 'activity', label: 'Reinforced Knees & Seams' },
      { icon: 'wind', label: 'Tapered Aerodynamic Ankle' },
    ],
    clips: [
      {
        id: 'clip-p1',
        title: 'Deep Wicketkeeping Squats',
        label: 'Flexibility Test',
        duration: '0:24',
        src: '/videos/display_video.mp4',
        focusMetric: 'Zero Seam Tension At Max Extension',
      },
      {
        id: 'clip-p2',
        title: '20-Meter Shuttle Sprints',
        label: 'Agility Drill',
        duration: '0:19',
        src: '/videos/display_video.mp4',
        focusMetric: 'Zero Ankle Drag & Flutter',
      },
    ],
  },
  {
    id: 'prod-whites',
    name: 'Classic Test Match Whites',
    category: 'Heritage Match Range',
    price: '₹2,299',
    originalPrice: '₹2,999',
    discount: '23% OFF',
    rating: 4.9,
    reviewsCount: 145,
    image: '/images/TeamWear/TeamWear3.png',
    tag: 'Test Match Spec',
    description:
      'Traditional pristine cricket whites upgraded with anti-grass-stain nanotechnology and breathable perforated collar placket.',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { icon: 'activity', label: 'Stain-Guard Nanotech' },
      { icon: 'wind', label: 'Dual-Zone Collar Breathability' },
      { icon: 'layers', label: 'Heavy-Duty Ball-Scuff Seams' },
    ],
    clips: [
      {
        id: 'clip-w1',
        title: '5-Day Durability & Ball Scuffing',
        label: 'Endurance Test',
        duration: '0:32',
        src: '/videos/display_video.mp4',
        focusMetric: 'Resists Red Ball Dye & Ground Scuffs',
      },
      {
        id: 'clip-w2',
        title: 'Full Day Sun Heat Dissipation',
        label: 'Thermal Test',
        duration: '0:26',
        src: '/videos/display_video.mp4',
        focusMetric: 'Reflects 94% Surface Solar Heat',
      },
    ],
  },
  {
    id: 'prod-cap',
    name: 'VK Signature Edition Cap',
    category: 'Official Accessories',
    price: '₹899',
    originalPrice: '₹1,199',
    discount: '25% OFF',
    rating: 5.0,
    reviewsCount: 520,
    image: '/images/category/cap.png',
    tag: 'Official Merchandise',
    description:
      'UV 50+ blocking curved visor with anti-microbial interior sweatband. Features high-density 3D embossed logo.',
    sizes: ['Adjustable Fit'],
    specs: [
      { icon: 'wind', label: 'UPF 50+ Solar Block' },
      { icon: 'activity', label: 'Hydro-Lock Sweat Band' },
      { icon: 'layers', label: 'Ergonomic Snapback Closure' },
    ],
    clips: [
      {
        id: 'clip-c1',
        title: 'Mid-Day Sun High Catch Drill',
        label: 'Glare & Visibility',
        duration: '0:18',
        src: '/videos/display_video.mp4',
        focusMetric: 'Anti-Glare Under-Visor Coating',
      },
      {
        id: 'clip-c2',
        title: 'Intense Sweat Saturated Spin',
        label: 'Moisture Lock',
        duration: '0:21',
        src: '/videos/display_video.mp4',
        focusMetric: 'Dries in Under 8 Minutes',
      },
    ],
  },
]

export function ProductActionSync() {
  const [activeProductId, setActiveProductId] = useState<string>(showcaseProducts[0].id)
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0)
  const [selectedSize, setSelectedSize] = useState<string>(showcaseProducts[0].sizes[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeProduct =
    showcaseProducts.find((p) => p.id === activeProductId) || showcaseProducts[0]
  const activeClip = activeProduct.clips[activeClipIndex] || activeProduct.clips[0]

  // Reset clip index and selected size when switching product
  const handleProductChange = (prodId: string) => {
    setActiveProductId(prodId)
    setActiveClipIndex(0)
    const product = showcaseProducts.find((p) => p.id === prodId)
    if (product) {
      setSelectedSize(product.sizes[0])
    }
  }

  // Switch or replay video when clip or product changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [activeProductId, activeClipIndex])

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

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f9fafc] px-4 py-8 sm:px-6 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#e51717]" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                SYNCHRONIZED PRODUCT PROOF
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl md:text-4xl">
              See It In Action<span className="text-[#e51717]">.</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Select any piece of gear on the left to immediately load its high-intensity match action videos on the right.
            </p>
          </div>

          {/* Product Quick-Switch Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:pb-0">
            {showcaseProducts.map((p) => {
              const isSelected = p.id === activeProductId
              return (
                <button
                  key={p.id}
                  onClick={() => handleProductChange(p.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#080d2d] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${isSelected ? 'bg-[#e51717]' : 'bg-slate-300'}`} />
                  {p.name.split(' ')[1] || p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2-COLUMN SYNCHRONIZED SPLIT */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* ======================================================== */}
          {/* LEFT: THE SELECTED PRODUCT CARD (5 Columns)             */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-5">
            <div>
              
              {/* Product Header & Tag */}
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-[#e51717]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#e51717]">
                  {activeProduct.tag}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[#080d2d]">{activeProduct.rating}</span>
                  <span className="text-slate-400 font-normal">({activeProduct.reviewsCount})</span>
                </div>
              </div>

              {/* Product Visual Showcase Box */}
              <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-2.5 left-2.5 rounded bg-[#080d2d]/90 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                  {activeProduct.category}
                </span>
                <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white">
                  {activeProduct.discount}
                </span>
              </div>

              {/* Title & Pricing */}
              <div className="mt-4">
                <h3 className="text-lg font-black tracking-tight text-[#080d2d] sm:text-xl">
                  {activeProduct.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-black text-[#080d2d]">
                    {activeProduct.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    {activeProduct.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {activeProduct.description}
                </p>
              </div>

              {/* Technical Spec Bullets */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                {activeProduct.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#e51717]">
                      {spec.icon === 'wind' && <Wind className="size-3.5" />}
                      {spec.icon === 'layers' && <Layers className="size-3.5" />}
                      {spec.icon === 'activity' && <Activity className="size-3.5" />}
                    </div>
                    <span className="font-semibold">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              {activeProduct.sizes.length > 1 && (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Select Size
                    </span>
                    <button className="text-[11px] font-bold text-[#e51717] hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[2.5rem] rounded-lg border py-1.5 px-3 text-xs font-bold transition-all ${
                          selectedSize === size
                            ? 'border-[#080d2d] bg-[#080d2d] text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Direct Add to Bag Button */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <button
                onClick={handleAddToCart}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#e51717] text-white hover:bg-[#c41212]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="size-4 stroke-[3]" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    Add {activeProduct.name.split(' ')[1] || 'Item'} to Bag
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT: SYNCHRONIZED MULTI-VIDEO PLAYER (7 Columns)       */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between lg:col-span-7">
            
            {/* The Video Display Player */}
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl">
              <video
                ref={videoRef}
                src={activeClip.src}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] w-full object-cover transition-opacity duration-300"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d2d]/90 via-transparent to-black/30" />

              {/* Top Video HUD Info */}
              <div className="absolute left-4 top-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#080d2d]/80 border border-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  <Sparkles className="size-3 text-[#e51717]" />
                  {activeClip.label} • Clip {activeClipIndex + 1} of {activeProduct.clips.length}
                </span>

                <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  {activeClip.duration}
                </span>
              </div>

              {/* Bottom Video Details & Controls */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4">
                <div className="text-white max-w-[70%]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
                    Observed Metric
                  </span>
                  <p className="text-sm font-black text-white sm:text-base leading-snug">
                    {activeClip.focusMetric}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300 line-clamp-1">
                    {activeClip.title}
                  </p>
                </div>

                {/* Video controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-[#080d2d] backdrop-blur-md shadow-lg transition-all hover:scale-105 hover:bg-[#e51717] hover:text-white"
                  >
                    {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="flex size-10 items-center justify-center rounded-full bg-[#080d2d]/80 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-105 hover:bg-white hover:text-[#080d2d]"
                  >
                    {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* MULTI-VIDEO CLIP SELECTOR STRIP (Underneath the Video) */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Select Action Angle / Drill ({activeProduct.clips.length} Available)
                </span>
                <span className="text-xs font-semibold text-[#e51717]">
                  Tap clip to switch perspective
                </span>
              </div>

              {/* Clip Thumbnails / Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeProduct.clips.map((clip, index) => {
                  const isCurrentClip = activeClipIndex === index

                  return (
                    <button
                      key={clip.id}
                      onClick={() => setActiveClipIndex(index)}
                      className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all duration-200 border ${
                        isCurrentClip
                          ? 'border-[#e51717] bg-[#080d2d] text-white shadow-md ring-1 ring-[#e51717]'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between mb-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isCurrentClip
                              ? 'bg-[#e51717] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {clip.label}
                        </span>
                        <span className={`text-[10px] font-bold ${isCurrentClip ? 'text-slate-300' : 'text-slate-400'}`}>
                          {clip.duration}
                        </span>
                      </div>

                      <p
                        className={`text-xs font-bold line-clamp-1 ${
                          isCurrentClip ? 'text-white' : 'text-[#080d2d]'
                        }`}
                      >
                        {clip.title}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-[10px] font-medium opacity-80">
                        <Play className={`size-2.5 fill-current ${isCurrentClip ? 'text-[#e51717]' : 'text-slate-400'}`} />
                        <span>{isCurrentClip ? 'Currently Playing' : 'Watch Drill'}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
