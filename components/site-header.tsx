'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { megaMenus } from '@/lib/mega-menu-data'
import { useCart } from '@/lib/cart-context'
import {
  getStoredTaxonomyConfig,
  type SiteAnnouncement,
  type StoreTaxonomyConfig,
  defaultTaxonomyConfig,
} from '@/lib/store-taxonomy'

export function SiteHeader() {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalCount } = useCart()
  const [taxonomyConfig, setTaxonomyConfig] = useState<StoreTaxonomyConfig>(defaultTaxonomyConfig)
  const [announcement, setAnnouncement] = useState<SiteAnnouncement | null>(null)
  const [desktopAnnouncementIndex, setDesktopAnnouncementIndex] = useState(0)
  const [mobileAnnouncementIndex, setMobileAnnouncementIndex] = useState(0)
  const [mobilePassCount, setMobilePassCount] = useState(0)
  const [mobileTickerKey, setMobileTickerKey] = useState(0)

  // Derive list of announcements
  const announcementItems = (announcement?.items && announcement.items.length > 0)
    ? announcement.items
    : (announcement?.text ? [{ text: announcement.text, linkText: announcement.linkText, linkHref: announcement.linkHref }] : [])

  // Auto-slide on desktop/tablet every 4.5 seconds
  useEffect(() => {
    if (announcementItems.length <= 1) return
    const timer = setInterval(() => {
      setDesktopAnnouncementIndex((prev) => (prev + 1) % announcementItems.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [announcementItems.length])

  // Reset indices if out of bounds
  useEffect(() => {
    if (desktopAnnouncementIndex >= announcementItems.length && announcementItems.length > 0) {
      setDesktopAnnouncementIndex(0)
    }
    if (mobileAnnouncementIndex >= announcementItems.length && announcementItems.length > 0) {
      setMobileAnnouncementIndex(0)
      setMobilePassCount(0)
    }
  }, [announcementItems.length, desktopAnnouncementIndex, mobileAnnouncementIndex])

  useEffect(() => {
    // Initial read
    const conf = getStoredTaxonomyConfig()
    setTaxonomyConfig(conf)
    if (conf?.announcement) setAnnouncement(conf.announcement)

    // Listen to changes from Admin
    const handleStorageChange = () => {
      const updatedConf = getStoredTaxonomyConfig()
      setTaxonomyConfig(updatedConf)
      if (updatedConf?.announcement) setAnnouncement(updatedConf.announcement)
    }
    window.addEventListener('storage', handleStorageChange)

    // Also fetch latest from API in background
    fetch('/api/taxonomy')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.taxonomy) {
          const apiAnnouncement = data.taxonomy.announcement || {}
          const merged: StoreTaxonomyConfig = {
            ...defaultTaxonomyConfig,
            ...data.taxonomy,
            mainCategories: data.taxonomy.mainCategories?.length ? data.taxonomy.mainCategories : defaultTaxonomyConfig.mainCategories,
            categories: data.taxonomy.categories?.length ? data.taxonomy.categories : defaultTaxonomyConfig.categories,
            announcement: {
              ...defaultTaxonomyConfig.announcement,
              ...apiAnnouncement,
              items: Array.isArray(apiAnnouncement.items) && apiAnnouncement.items.length > 0
                ? apiAnnouncement.items
                : (apiAnnouncement.text ? [{ text: apiAnnouncement.text, linkText: apiAnnouncement.linkText, linkHref: apiAnnouncement.linkHref }] : defaultTaxonomyConfig.announcement.items),
            },
          }
          setTaxonomyConfig(merged)
          if (merged.announcement) setAnnouncement(merged.announcement)
        }
      })
      .catch(() => {})

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Build dynamic navigation items
  interface NavItem {
    name: string
    href: string
    hasDropdown: boolean
    value?: string
    isAccent?: boolean
  }

  const mainCatsOnNav = (taxonomyConfig.mainCategories || [])
    .filter((mc) => mc.showOnNavbar !== false)

  const dynamicNavItems: NavItem[] = [
    { name: 'NEW ARRIVALS', href: '/products?badge=new', hasDropdown: false },
    ...mainCatsOnNav.map((mc) => {
      const val = mc.value.toLowerCase()
      let href = `/products?category=${val}`
      if (val === 'men') href = '/products?gender=men'
      else if (val === 'women') href = '/products?gender=women'
      else if (val === 'cricket') href = '/products?sport=cricket'
      else if (val === 'accessories') href = '/products?sport=accessories'
      return {
        name: mc.label.toUpperCase(),
        value: mc.value,
        href,
        hasDropdown: true,
      }
    }),
    { name: 'ABOUT', href: '/about', hasDropdown: false },
  ]

  // Resolve mega-menu content 100% dynamically from Admin Taxonomy sub-categories
  const getMegaDataForActiveMenu = (menuName: string) => {
    // Find matching main category from taxonomyConfig
    const mainCat = taxonomyConfig.mainCategories?.find(
      (m) => m.label.toUpperCase() === menuName || m.value.toUpperCase() === menuName
    )
    if (!mainCat) return null

    // Fetch all sub-categories assigned to this main category
    const subCats = (taxonomyConfig.categories || []).filter(
      (c) => c.parentCategory === mainCat.value || (!c.parentCategory && mainCat.value === 'men')
    )

    // Build sub-category links with proper query params
    const allItems = subCats.map((sc) => {
      let href = `/products?category=${sc.value}`
      if (mainCat.value === 'men') href += '&gender=men'
      else if (mainCat.value === 'women') href += '&gender=women'
      else if (mainCat.value === 'cricket') href += '&sport=cricket'
      return {
        label: sc.label.toUpperCase(),
        href,
      }
    })

    // If no sub-categories added yet, fallback to shop all
    if (allItems.length === 0) {
      allItems.push(
        { label: 'ALL ITEMS', href: `/products?category=${mainCat.value}` },
        { label: 'NEW ARRIVALS', href: `/products?category=${mainCat.value}&badge=new` }
      )
    }

    // Split all sub-categories evenly across 3 columns to reduce height and keep dropdown compact
    const colCount = 3
    const perCol = Math.ceil(allItems.length / colCount)
    const col1 = allItems.slice(0, perCol)
    const col2 = allItems.slice(perCol, perCol * 2)
    const col3 = allItems.slice(perCol * 2)

    const columns = [
      {
        title: `${mainCat.label.toUpperCase()} GEAR`,
        items: col1,
      },
      ...(col2.length > 0
        ? [
            {
              title: `${mainCat.label.toUpperCase()} APPAREL`,
              items: col2,
            },
          ]
        : []),
      ...(col3.length > 0
        ? [
            {
              title: 'MORE STYLES',
              items: col3,
            },
          ]
        : []),
    ]

    return {
      label: mainCat.label.toUpperCase(),
      exploreTitle: mainCat.label.toUpperCase(),
      exploreHref:
        mainCat.value === 'men'
          ? '/products?gender=men'
          : mainCat.value === 'women'
          ? '/products?gender=women'
          : mainCat.value === 'cricket'
          ? '/products?sport=cricket'
          : `/products?category=${mainCat.value}`,
      watermarkText: 'DESIGN\nYOUR OWN.',
      columns,
    }
  }

  const currentMegaData = activeMenu ? getMegaDataForActiveMenu(activeMenu) : null

  return (
    <>
      {/* Dynamic Announcement Bar (Slider on Desktop / Moving Words Ticker on Mobile) */}
      {announcement?.enabled && announcementItems.length > 0 && (
        <div
          className="relative z-50 overflow-hidden px-3 py-2 text-xs font-bold transition-all select-none"
          style={{
            backgroundColor: announcement.bgColor || '#080d2d',
            color: announcement.textColor || '#ffffff',
          }}
        >
          {/* MOBILE VIEW: Moving Words Ticker (plays 2 full rotations before advancing to next announcement) */}
          <div className="relative flex md:hidden items-center overflow-hidden w-full h-5">
            <div
              key={`ticker-${mobileAnnouncementIndex}-${mobileTickerKey}`}
              className="whitespace-nowrap flex items-center gap-2 will-change-transform animate-announcement-ticker"
              style={{
                animationDuration: `${Math.max(6, Math.min(14, (announcementItems[mobileAnnouncementIndex]?.text?.length || 30) * 0.16))}s`,
              }}
              onAnimationEnd={() => {
                // Check if current announcement has completed 2 rotations
                if (mobilePassCount + 1 >= 2) {
                  setMobilePassCount(0)
                  setMobileAnnouncementIndex((prev) => (prev + 1) % announcementItems.length)
                } else {
                  setMobilePassCount((c) => c + 1)
                }
                setMobileTickerKey((k) => k + 1)
              }}
            >
              <span>{announcementItems[mobileAnnouncementIndex]?.text}</span>
              {announcementItems[mobileAnnouncementIndex]?.linkText && (
                <Link
                  href={announcementItems[mobileAnnouncementIndex]?.linkHref || '/products?badge=new'}
                  className="underline font-black text-[#e51717] hover:text-white transition inline-flex items-center gap-0.5 ml-1"
                >
                  {announcementItems[mobileAnnouncementIndex]?.linkText} →
                </Link>
              )}
            </div>
          </div>

          {/* TABLET & DESKTOP VIEW: Clean Animated Slider with Controls */}
          <div className="hidden md:flex items-center justify-between max-w-[1440px] mx-auto px-4">
            {/* Left arrow or spacer */}
            {announcementItems.length > 1 ? (
              <button
                type="button"
                onClick={() =>
                  setDesktopAnnouncementIndex((prev) => (prev - 1 + announcementItems.length) % announcementItems.length)
                }
                aria-label="Previous announcement"
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="w-5" />
            )}

            {/* Announcement Center text */}
            <div className="relative flex-1 flex items-center justify-center min-h-[22px] overflow-hidden text-center">
              {announcementItems.map((item, idx) => {
                const isActive = idx === desktopAnnouncementIndex
                return (
                  <div
                    key={item.id || idx}
                    className={`transition-all duration-500 flex items-center justify-center gap-2.5 ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative'
                        : 'opacity-0 absolute pointer-events-none -translate-y-2'
                    }`}
                  >
                    <span className="tracking-wide">{item.text}</span>
                    {item.linkText && (
                      <Link
                        href={item.linkHref || '/products?badge=new'}
                        className="underline font-black text-[#e51717] hover:text-white transition inline-flex items-center gap-0.5"
                      >
                        {item.linkText} →
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right arrow or slide dots */}
            {announcementItems.length > 1 ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 mr-1">
                  {announcementItems.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDesktopAnnouncementIndex(i)}
                      aria-label={`Go to announcement slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === desktopAnnouncementIndex ? 'w-4 bg-[#e51717]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDesktopAnnouncementIndex((prev) => (prev + 1) % announcementItems.length)
                  }
                  aria-label="Next announcement"
                  className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-5" />
            )}
          </div>
        </div>
      )}

      <header
        className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-[#f8f9fa]/95 backdrop-blur-md shadow-sm transition-all"
        onMouseLeave={() => setActiveMenu(null)}
      >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Brand Logo */}
        <Link href="/" className="relative flex h-14 w-32 shrink-0 items-center sm:w-36" aria-label="Virat Sports home">
          <Image
            src="/images/virat logo.png"
            alt="Virat Sports"
            width={160}
            height={60}
            className="max-h-full w-auto object-contain"
            priority
          />
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
          {dynamicNavItems.map((item) => {
            const isMenuOpen = activeMenu === item.name
            return (
              <div
                key={item.name}
                className="relative py-7"
                onMouseEnter={() => {
                  if (item.hasDropdown) setActiveMenu(item.name)
                  else setActiveMenu(null)
                }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
                    isMenuOpen
                      ? 'text-[#080d2d]'
                      : item.isAccent
                      ? 'text-[#e51717] hover:text-[#c41111] font-black'
                      : 'text-[#374151] hover:text-[#080d2d]'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    isMenuOpen ? (
                      <ChevronUp className="size-3.5 text-[#e51717]" />
                    ) : (
                      <ChevronDown className="size-3.5 text-[#6b7280] transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-[#111827]" />
                    )
                  )}

                  {/* Active bottom red underline indicator matching screenshot */}
                  {isMenuOpen && (
                    <span className="absolute -bottom-2.5 left-0 h-[2.5px] w-full bg-[#e51717]" />
                  )}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Right Action Icons: Search + Cart with Badge count */}
        <div className="flex items-center gap-5 sm:gap-6">
          <div className="relative">
            {searchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchQuery.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                    setSearchOpen(false)
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-32 bg-transparent text-xs text-[#080d2d] outline-none sm:w-48"
                />
                <button type="submit" aria-label="Submit search">
                  <Search className="size-4 text-[#e51717]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="size-3.5 text-slate-400" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-[#1f2937] transition-colors hover:text-[#e51717]"
              >
                <Search className="size-5 stroke-[1.8]" />
              </button>
            )}
          </div>

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative flex items-center justify-center text-[#1f2937] transition-colors hover:text-[#e51717]"
          >
            <ShoppingBag className="size-5 stroke-[1.8]" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#e51717] text-[9px] font-bold text-white shadow-sm">
              {totalCount}
            </span>
          </Link>

          <button
            type="button"
            className="text-[#1f2937] lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {currentMegaData && (
        <div
          className="absolute left-0 top-full w-full border-b border-t border-slate-200 bg-[#f8f9fa] shadow-xl transition-all duration-200"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="relative mx-auto flex max-w-[1440px] items-start overflow-hidden px-8 py-5 lg:px-14 lg:py-6">
            {/* Left Big Watermark Background text "DESIGN YOUR OWN." */}
            <div className="pointer-events-none absolute -bottom-4 left-4 select-none text-[65px] font-black uppercase leading-[0.8] tracking-tighter text-[#080d2d]/[0.03] lg:left-8 lg:text-[85px]">
              {currentMegaData.watermarkText}
            </div>

            {/* Left Column: EXPLORE & Title with Shop Collection link */}
            <div className="relative z-10 w-56 shrink-0 border-r border-slate-200 pr-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e51717]">
                EXPLORE
              </span>
              <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#080d2d] lg:text-3xl">
                {currentMegaData.exploreTitle}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                PERSONALISE IT
              </p>
              <Link
                href={currentMegaData.exploreHref}
                onClick={() => setActiveMenu(null)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#080d2d] transition-colors hover:text-[#e51717]"
              >
                <span>SHOP ALL</span>
                <span className="text-sm">↗</span>
              </Link>
            </div>

            {/* Right Columns: Dynamic Sub-categories split into 3 compact columns */}
            <div
              className={`relative z-10 grid flex-1 gap-6 pl-8 lg:gap-8 lg:pl-10 ${
                currentMegaData.columns.length === 1
                  ? 'grid-cols-1 max-w-xs'
                  : currentMegaData.columns.length === 2
                  ? 'grid-cols-2 max-w-xl'
                  : 'grid-cols-3'
              }`}
            >
              {currentMegaData.columns.map((column, colIdx) => (
                <div key={colIdx} className="space-y-2.5">
                  {/* Column Header with red dot */}
                  <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1.5">
                    <span className="size-1.5 rounded-full bg-[#e51717]" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-[#080d2d]">
                      {column.title}
                    </h3>
                  </div>

                  {/* List of items with red/orange dots */}
                  <ul className="space-y-2">
                    {column.items.map((item, itIdx) => (
                      <li key={itIdx}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#4b5563] transition-colors hover:text-[#080d2d]"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-[#f87171] transition-transform duration-200 group-hover:scale-125 group-hover:bg-[#e51717]" />
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="max-h-[85vh] overflow-y-auto border-t border-slate-200 bg-white px-6 py-6 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            {dynamicNavItems.map((item) => {
              const mega = getMegaDataForActiveMenu(item.name)
              return (
                <div key={item.name} className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      href={item.href}
                      className="text-sm font-black uppercase tracking-wider text-[#080d2d]"
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        type="button"
                        onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                        className="p-1 text-slate-400"
                        aria-label={`Toggle ${item.name} subcategories`}
                      >
                        {activeMenu === item.name ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown Accordion */}
                  {item.hasDropdown && activeMenu === item.name && mega && (
                    <div className="mt-3 space-y-3 rounded-lg bg-[#f8f9fa] p-4 text-xs">
                      {mega.columns.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-1.5">
                          <p className="font-extrabold uppercase text-[#e51717]">{col.title}</p>
                          <div className="flex flex-col gap-1 pl-2">
                            {col.items.map((it, iIdx) => (
                              <Link
                                key={iIdx}
                                href={it.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-slate-600 hover:text-[#080d2d]"
                              >
                                • {it.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="pt-2">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-[#080d2d] px-4 py-3 text-sm font-bold uppercase text-white"
              >
                <span>View Bag</span>
                <span className="rounded-full bg-[#e51717] px-2 py-0.5 text-xs font-black">{totalCount} items</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
    </>
  )
}
