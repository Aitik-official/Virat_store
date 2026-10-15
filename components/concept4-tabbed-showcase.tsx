'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX, ShoppingBag, ArrowRight, Check, ShieldCheck, Flame, Zap } from 'lucide-react'

interface TabProduct {
  id: string
  name: string
  category: string
  price: string
  originalPrice?: string
  image: string
  tag: string
  feature: string
}

interface CategoryActionTab {
  id: string
  tabLabel: string
  title: string
  subtitle: string
  videoSrc: string
  tagline: string
  badgeIcon: 'fire' | 'zap' | 'shield'
  products: TabProduct[]
}

const actionTabs: CategoryActionTab[] = [
  {
    id: 'team-jerseys',
    tabLabel: 'Team Jerseys',
    title: 'Match-Ready Pro Jerseys',
    subtitle: 'Tested at full match velocity with moisture-dispersing airflow fabric.',
    videoSrc: '/videos/display_video.mp4',
    tagline: 'Standard Match Spec',
    badgeIcon: 'fire',
    products: [
      {
        id: 'tj-1',
        name: 'VK Pro Match-Day Jersey',
        category: 'Official Match Wear',
        price: '₹2,499',
        originalPrice: '₹3,299',
        image: '/images/category/mens.png',
        tag: 'Worn on Pitch',
        feature: 'Zero-cling aero-mesh fabric',
      },
      {
        id: 'tj-2',
        name: 'Elite Training Polo',
        category: 'Match Practice',
        price: '₹2,199',
        originalPrice: '₹2,799',
        image: '/images/category/women.png',
        tag: 'Slim Athletic Cut',
        feature: 'Raglan sleeve freedom of motion',
      },
    ],
  },
  {
    id: 'training-wear',
    tabLabel: 'Training & Gym Wear',
    title: 'Dynamic Agility & Gym Tech',
    subtitle: 'Engineered for explosive acceleration, net sessions, and high-rep conditioning.',
    videoSrc: '/videos/display_video.mp4',
    tagline: 'High-Rep Durability',
    badgeIcon: 'zap',
    products: [
      {
        id: 'tw-1',
        name: 'Aero-Stretch Team Wear',
        category: 'Athletic Bottoms',
        price: '₹1,999',
        originalPrice: '₹2,499',
        image: '/images/TeamWear/TeamWear1.png',
        tag: '4-Way Stretch',
        feature: 'Gusseted crotch for deep squats',
      },
      {
        id: 'tw-2',
        name: 'Club Training Tops',
        category: 'Conditioning',
        price: '₹1,799',
        originalPrice: '₹2,299',
        image: '/images/TeamWear/TeamWear2.png',
        tag: 'Thermal Balance',
        feature: 'Rapid evaporative cooling',
      },
    ],
  },
  {
    id: 'match-whites',
    tabLabel: 'Match-Day Whites',
    title: 'Traditional Pure Cricket Whites',
    subtitle: 'Classic heritage styling packed with modern anti-stain and micro-weave tech.',
    videoSrc: '/videos/display_video.mp4',
    tagline: 'Test Match Tradition',
    badgeIcon: 'shield',
    products: [
      {
        id: 'mw-1',
        name: 'Classic Test Match Shirt',
        category: 'Heritage Range',
        price: '₹2,299',
        originalPrice: '₹2,899',
        image: '/images/TeamWear/TeamWear3.png',
        tag: 'Anti-Stain Finish',
        feature: 'Reinforced collar & button placket',
      },
      {
        id: 'mw-2',
        name: 'Aero Match Trousers',
        category: 'Heritage Range',
        price: '₹1,899',
        image: '/images/TeamWear/TeamWear1.png',
        tag: 'Fielding Flex',
        feature: 'Double-knee reinforcement',
      },
    ],
  },
  {
    id: 'accessories',
    tabLabel: 'Accessories & Headwear',
    title: 'On-Pitch Protection & Caps',
    subtitle: 'Finishing touches designed for UV protection, sweat control, and iconic style.',
    videoSrc: '/videos/display_video.mp4',
    tagline: 'Pro Equipment',
    badgeIcon: 'zap',
    products: [
      {
        id: 'acc-1',
        name: 'VK Signature Edition Cap',
        category: 'Headwear',
        price: '₹899',
        image: '/images/category/cap.png',
        tag: 'UV 50+ Shield',
        feature: 'Antimicrobial sweatband interior',
      },
      {
        id: 'acc-2',
        name: 'Pro Tour Cricket Backpack',
        category: 'Gear Bags',
        price: '₹3,499',
        originalPrice: '₹4,499',
        image: '/images/category/bagpack.png',
        tag: 'All-Weather Kit',
        feature: 'Twin bat sleeves & shoe tunnel',
      },
    ],
  },
]

export function Concept4TabbedShowcase() {
  const [activeTabId, setActiveTabId] = useState<string>('team-jerseys')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [addedItem, setAddedItem] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeTab = actionTabs.find((t) => t.id === activeTabId) || actionTabs[0]

  useEffect(() => {
    // restart or sync video on tab switch
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [activeTabId])

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

  const handleQuickAdd = (id: string) => {
    setAddedItem(id)
    setTimeout(() => setAddedItem(null), 1800)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white px-4 py-8 sm:px-6 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#e51717]" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                MULTI-CATEGORY ACTION
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl md:text-4xl">
              See It In Action<span className="text-[#e51717]">.</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Select a category to switch the action footage and explore specialized match gear.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm self-start md:self-auto">
            <span className="size-2 rounded-full bg-[#e51717] animate-ping"></span>
            Category Synced View
          </div>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
          {actionTabs.map((tab) => {
            const isActive = tab.id === activeTabId
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 sm:text-sm ${
                  isActive
                    ? 'bg-[#080d2d] text-white shadow-md shadow-[#080d2d]/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <span className="size-1.5 rounded-full bg-[#e51717]" />
                )}
                {tab.tabLabel}
                {isActive && (
                  <span className="ml-1 rounded-full bg-[#e51717] px-1.5 py-0.2 text-[9px] font-black text-white">
                    {tab.products.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* MAIN STAGE: Video & Synchronized Products Drawer */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* VIDEO PLAYER (7 Columns) */}
          <div className="flex flex-col lg:col-span-7">
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-[#080d2d] shadow-xl">
              <video
                ref={videoRef}
                src={activeTab.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[450px] w-full object-cover transition-opacity duration-300"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Gradient Vignette Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d2d]/90 via-transparent to-black/25" />

              {/* Top Video Category Badge */}
              <div className="absolute left-4 top-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#080d2d]/80 border border-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {activeTab.badgeIcon === 'fire' && <Flame className="size-3 text-[#e51717]" />}
                  {activeTab.badgeIcon === 'zap' && <Zap className="size-3 text-[#e51717]" />}
                  {activeTab.badgeIcon === 'shield' && <ShieldCheck className="size-3 text-[#e51717]" />}
                  {activeTab.tagline}
                </span>

                <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Testing Lab
                </span>
              </div>

              {/* Bottom Video Controls & Info */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4">
                <div className="text-white max-w-[70%]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#e51717]">
                    Active Demonstration
                  </p>
                  <h3 className="text-base font-black tracking-tight sm:text-lg leading-tight">
                    {activeTab.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-300">
                    {activeTab.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white text-[#080d2d] backdrop-blur-md shadow-md transition-all hover:scale-105 hover:bg-[#e51717] hover:text-white"
                  >
                    {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#080d2d]/80 text-white border border-white/20 backdrop-blur-md shadow-md transition-all hover:scale-105 hover:bg-white hover:text-[#080d2d]"
                  >
                    {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ACCOMPANYING PRODUCT CARDS (5 Columns) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                  Featured in {activeTab.tabLabel}
                </span>
                <span className="text-xs font-bold text-[#e51717]">
                  {activeTab.products.length} Products
                </span>
              </div>

              {/* Product Cards for this tab */}
              <div className="space-y-3.5">
                {activeTab.products.map((product) => {
                  const isAdded = addedItem === product.id

                  return (
                    <div
                      key={product.id}
                      className="group relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#e51717]/40 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative size-20 sm:size-22 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute left-1 top-1 rounded bg-[#080d2d] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">
                          {product.tag}
                        </span>
                      </div>

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#e51717]">
                          {product.category}
                        </span>
                        <h4 className="truncate text-sm font-bold text-[#080d2d] group-hover:text-[#e51717] transition-colors">
                          {product.name}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                          {product.feature}
                        </p>

                        <div className="mt-1.5 flex items-baseline gap-2">
                          <span className="text-sm font-black text-[#080d2d]">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleQuickAdd(product.id)}
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                          isAdded
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-200 bg-slate-50 text-[#080d2d] hover:border-[#e51717] hover:bg-[#e51717] hover:text-white'
                        }`}
                        title={isAdded ? 'Added' : 'Quick Add to Bag'}
                      >
                        {isAdded ? (
                          <Check className="size-4 stroke-[3]" />
                        ) : (
                          <ShoppingBag className="size-4" />
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Category Banner CTA */}
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#080d2d] p-4 text-white shadow-md">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#e51717]">
                  Browse Entire Category
                </p>
                <p className="text-xs font-semibold text-slate-200">
                  Explore full {activeTab.tabLabel} range & custom team sizing
                </p>
              </div>
              <a
                href="#products"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#e51717] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c41212] shadow-sm"
              >
                Explore
                <ArrowRight className="size-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
