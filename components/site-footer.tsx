'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react'
import {
  defaultContactInfo,
  getStoredTaxonomyConfig,
  type StoreContactInfo,
} from '@/lib/store-taxonomy'

// Inline SVG social icons (lucide-react doesn't ship brand icons)
function IgIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function XIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.23H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.629 5.905-5.629Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function FbIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/products?badge=new' },
    { label: "Men's Collection", href: '/products?gender=men' },
    { label: "Women's Collection", href: '/products?gender=women' },
    { label: 'Cricket Gear', href: '/products?sport=cricket' },
    { label: 'Teamwear', href: '/#team-wear' },
    { label: 'Outlet & Deals', href: '/products?outlet=true' },
  ],
  categories: [
    { label: 'Tops & Jerseys', href: '/products?category=tops' },
    { label: 'Polos', href: '/products?category=polos' },
    { label: 'Sleeveless', href: '/products?category=sleeveless' },
    { label: 'Jackets & Hoodies', href: '/products?category=jacket-and-hoodies' },
    { label: 'Shorts & Bottoms', href: '/products?category=shorts' },
    { label: 'Tracksuits', href: '/products?category=tracksuits' },
  ],
  company: [
    { label: 'About Virat', href: '/about' },
    { label: 'The Brand Story', href: '/about' },
    { label: 'Custom Teamwear', href: '/#team-wear' },
    { label: 'Action Showcase', href: '/#video' },
    { label: 'Our Partners', href: '/#partners' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-white sm:mb-6">{title}</h3>
      <ul className="flex flex-col gap-2.5 sm:gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center gap-2.5 text-[13px] text-white transition-colors duration-200 hover:text-[#e51717]"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[#e51717] transition-transform duration-200 group-hover:scale-150" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const [contact, setContact] = useState<StoreContactInfo>(defaultContactInfo)

  useEffect(() => {
    // Initial sync from localStorage
    const conf = getStoredTaxonomyConfig()
    if (conf?.contactInfo) {
      setContact(conf.contactInfo)
    }

    // Listen to real-time Admin updates via storage event
    const handleSync = () => {
      const updated = getStoredTaxonomyConfig()
      if (updated?.contactInfo) {
        setContact(updated.contactInfo)
      }
    }
    window.addEventListener('storage', handleSync)

    // Background fetch from MongoDB API
    fetch('/api/taxonomy')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.taxonomy?.contactInfo) {
          setContact({ ...defaultContactInfo, ...data.taxonomy.contactInfo })
        }
      })
      .catch(() => {})

    return () => window.removeEventListener('storage', handleSync)
  }, [])

  const email = contact.email || defaultContactInfo.email
  const phone = contact.phone || defaultContactInfo.phone
  const address = contact.address || defaultContactInfo.address

  return (
    <footer className="bg-[#080d2d] text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10 bg-[#0d1440]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 md:flex-row md:items-center md:px-12 md:py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e51717]">Stay in the game</p>
            <h2 className="mt-0.5 text-base font-black uppercase tracking-tight sm:text-lg md:text-xl">
              Get exclusive drops &amp; offers
            </h2>
          </div>
          <form
            className="flex w-full max-w-md overflow-hidden border border-white/20 transition-colors duration-300 focus-within:border-[#e51717]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-white/30 outline-none sm:px-4"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 bg-[#e51717] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#c41111] sm:px-5"
            >
              Subscribe <ArrowRight className="size-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:px-12 md:py-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand Column - full width on mobile/tablet, single col on lg */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 lg:pr-8">
            <Link href="/" aria-label="Virat Sports home">
              <div className="relative h-12 w-32 overflow-hidden rounded-lg bg-white/95 p-1.5">
                <Image
                  src="/images/virat logo.png"
                  alt="Virat Sports"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </Link>

            <p className="mt-3 max-w-xs text-xs leading-5 text-white">
              Performance wear for the game. Sportswear for everything after it.
            </p>

            {/* Dynamic Contact info from Admin */}
            <ul className="mt-4 flex flex-col gap-2 text-xs text-white">
              <li className="flex items-center gap-2.5">
                <Mail className="size-3.5 shrink-0 text-[#e51717]" />
                <a href={`mailto:${email}`} className="transition-colors hover:text-[#e51717]">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-3.5 shrink-0 text-[#e51717]" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-[#e51717]">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#e51717]" />
                <span>{address}</span>
              </li>
            </ul>

            {/* Social Icons with Dynamic Links */}
            <div className="mt-8 flex gap-3">
              {[
                { Icon: IgIcon, label: 'Instagram', href: contact.instagram || 'https://www.instagram.com/viratsportsofficial/' },
                { Icon: XIcon, label: 'X (Twitter)', href: contact.twitter || 'https://x.com' },
                { Icon: FbIcon, label: 'Facebook', href: contact.facebook || 'https://www.facebook.com/ViratSportsOfficial/' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center border border-white/30 text-white transition-all duration-200 hover:border-[#e51717] hover:bg-[#e51717] hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={footerLinks.shop} />
          <FooterCol title="Categories" links={footerLinks.categories} />
          <FooterCol title="Company" links={footerLinks.company} />
          <FooterCol title="Support" links={footerLinks.support} />
        </div>

        {/* Divider + Bottom Bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white sm:mt-16 sm:gap-5 sm:pt-7 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Virat Sports. Never Give Up.</span>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy" className="transition-colors hover:text-[#e51717]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#e51717]">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-[#e51717]">
              Cookie Policy
            </Link>
          </div>
          <span className="font-black tracking-widest text-[#e51717]">Engineered For Champions</span>
        </div>
      </div>
    </footer>
  )
}
