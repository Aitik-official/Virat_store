'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { megaMenus } from '@/lib/mega-menu-data'
import { useCart } from '@/lib/cart-context'

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalCount } = useCart()

  const navItems = [
    { name: 'NEW ARRIVALS', href: '/products?badge=new' },
    { name: 'MEN', href: '/products?gender=men', hasDropdown: true },
    { name: 'WOMEN', href: '/products?gender=women', hasDropdown: true },
    { name: 'CRICKET', href: '/products?sport=cricket', hasDropdown: true },
    { name: 'ACCESSORIES', href: '/products?sport=accessories', hasDropdown: true },
    { name: 'DESIGN YOUR OWN', href: '/#team-wear' },
    { name: 'ABOUT', href: '/#see-it-in-action' },
  ]

  const currentMegaData = activeMenu ? megaMenus[activeMenu] : null

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-[#f8f9fa] shadow-sm transition-all"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
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
          {navItems.map((item) => {
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
                    isMenuOpen ? 'text-[#080d2d]' : 'text-[#374151] hover:text-[#080d2d]'
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
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
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
          className="absolute left-0 top-full w-full border-b border-t border-slate-200 bg-[#f8f9fa] shadow-2xl transition-all duration-200"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="relative mx-auto flex max-w-[1440px] overflow-hidden px-8 py-10 lg:px-14">
            {/* Left Big Watermark Background text "DESIGN YOUR OWN." */}
            <div className="pointer-events-none absolute -bottom-6 left-4 select-none text-[85px] font-black uppercase leading-[0.8] tracking-tighter text-[#080d2d]/[0.04] lg:left-8 lg:text-[115px]">
              {currentMegaData.watermarkText}
            </div>

            {/* Left Column: EXPLORE & Title with Shop Collection link */}
            <div className="relative z-10 w-64 shrink-0 border-r border-slate-200 pr-8">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e51717]">
                EXPLORE
              </span>
              <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-[#080d2d]">
                {currentMegaData.exploreTitle}
              </h2>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-300">
                PERSONALISE IT
              </p>
              <Link
                href={currentMegaData.exploreHref}
                onClick={() => setActiveMenu(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#080d2d] transition-colors hover:text-[#e51717]"
              >
                <span>SHOP COLLECTION</span>
                <span className="text-sm">↗</span>
              </Link>
            </div>

            {/* Right Columns: Categories, Sports, Accessories with dotted lists matching image */}
            <div className="relative z-10 grid flex-1 grid-cols-3 gap-8 pl-12 lg:gap-12">
              {currentMegaData.columns.map((column, colIdx) => (
                <div key={colIdx} className="space-y-4">
                  {/* Column Header with red dot */}
                  <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                    <span className="size-1.5 rounded-full bg-[#e51717]" />
                    <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#080d2d]">
                      {column.title}
                    </h3>
                  </div>

                  {/* List of items with red/orange dots */}
                  <ul className="space-y-3">
                    {column.items.map((item, itIdx) => (
                      <li key={itIdx}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4b5563] transition-colors hover:text-[#080d2d]"
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
            {navItems.map((item) => {
              const mega = megaMenus[item.name]
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
  )
}
