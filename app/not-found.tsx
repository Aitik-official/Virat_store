import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Compass, ShoppingBag, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: '404 - Page Not Found | Virat Sports',
  description: 'The page or product you were looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#080d2d]">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          {/* Badge Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-[#e51717] shadow-sm">
            <ShieldAlert className="size-8" />
          </div>

          {/* Large stylized 404 header */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-[2px] w-8 bg-[#e51717]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#e51717]">
              ERROR 404
            </span>
            <span className="h-[2px] w-8 bg-[#e51717]" />
          </div>

          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#080d2d] sm:text-4xl md:text-5xl">
            OUT OF BOUNDS<span className="text-[#e51717]">.</span>
          </h1>

          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
            The page, category, or product you are looking for has moved, expired, or doesn’t exist on the field.
          </p>

          {/* Quick Action Navigation CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#080d2d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#e51717] sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#080d2d] shadow-sm transition-all hover:border-[#e51717] hover:text-[#e51717] sm:w-auto"
            >
              <ShoppingBag className="size-4" />
              <span>Explore All Gear</span>
            </Link>
          </div>

          {/* Helpful Quick Links */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-left">
            <p className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
              <Compass className="size-4 text-[#e51717]" />
              <span>Popular Destinations</span>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 sm:grid-cols-4">
              <Link href="/products?badge=new" className="hover:text-[#e51717] transition-colors">
                • New Arrivals
              </Link>
              <Link href="/products?gender=men" className="hover:text-[#e51717] transition-colors">
                • Men's Wear
              </Link>
              <Link href="/products?gender=women" className="hover:text-[#e51717] transition-colors">
                • Women's Wear
              </Link>
              <Link href="/products?sport=cricket" className="hover:text-[#e51717] transition-colors">
                • Cricket Gear
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
