import type { Metadata } from 'next'
import Link from 'next/link'
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  Truck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Returns & Exchange Policy | Virat Sports',
  description:
    'Hassle-free 7-day returns and size exchange policy for Virat Sports activewear, cricket clothing, and gear. Easy door pickup and refund guidelines.',
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#080d2d]">
      <SiteHeader />

      <main className="relative overflow-hidden">
        {/* Top Header */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e51717]">
              <Link href="/contact" className="hover:underline">Support</Link>
              <ChevronRight className="size-3 text-neutral-400" />
              <span className="text-neutral-500">Returns &amp; Exchanges</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              EASY RETURNS &amp; <span className="text-[#e51717]">EXCHANGE</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              We stand behind the engineering of our products. If you receive an improper fit, defective piece, or need an alternate size, our 7-day hassle-free exchange has you covered.
            </p>
          </div>
        </section>

        {/* 3 Step Process Grid */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-neutral-400">
            How The Return Process Works
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative border border-neutral-200 bg-white p-6 shadow-sm">
              <span className="text-3xl font-black text-neutral-300">01</span>
              <h3 className="mt-2 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Initiate Request
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Contact our customer support team within <strong>7 days</strong> of delivery with your order ID, product name, and reason for return or replacement size.
              </p>
            </div>

            <div className="relative border border-neutral-200 bg-white p-6 shadow-sm">
              <span className="text-3xl font-black text-neutral-300">02</span>
              <h3 className="mt-2 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Doorstep Reverse Pickup
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Our logistics partner will arrange a reverse pickup from your address within 24 to 48 hours. Ensure original tags and packaging are intact.
              </p>
            </div>

            <div className="relative border border-neutral-200 bg-white p-6 shadow-sm">
              <span className="text-3xl font-black text-neutral-300">03</span>
              <h3 className="mt-2 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Quality Inspection &amp; Refund
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Upon passing warehouse inspection, your exchange size is immediately dispatched, or your full refund is credited within 3-5 business days.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility & Guidelines Content */}
        <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-8 lg:col-span-8">
              {/* Eligible vs Non-eligible Checklist */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-emerald-200 bg-emerald-50/50 p-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <span>Eligible For Return / Exchange</span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-xs text-neutral-700 font-medium">
                    <li>• Unused tops, jerseys, tracksuits with original tags attached</li>
                    <li>• Standard sized cricket gear in original pristine packaging</li>
                    <li>• Manufacturing flaws, stitching defects, or damaged items on arrival</li>
                    <li>• Size misfit requests initiated within 7 calendar days</li>
                  </ul>
                </div>

                <div className="border border-amber-200 bg-amber-50/50 p-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                    <AlertTriangle className="size-4 text-amber-600" />
                    <span>Non-Returnable Items</span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-xs text-neutral-700 font-medium">
                    <li>• Custom sublimated teamwear with printed player names/numbers</li>
                    <li>• Intimate sportswear (supporters, inner compression briefs, socks) due to hygiene standards</li>
                    <li>• Bats with applied knocking service or visible ball marks from nets</li>
                    <li>• Items returned without original tags, barcodes, or packaging</li>
                  </ul>
                </div>
              </div>

              {/* Refund Methods */}
              <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  Refund Processing Timelines
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Refunds are processed back to the original payment method:
                </p>
                <div className="space-y-3 text-xs text-neutral-700">
                  <div className="flex items-start gap-3">
                    <div className="size-2 mt-1.5 shrink-0 rounded-full bg-[#e51717]" />
                    <div>
                      <strong>Prepaid Orders (UPI, NetBanking, Debit/Credit Card):</strong> Refund is initiated immediately upon item receipt at our warehouse and credits back to source in 3 to 5 business days.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-2 mt-1.5 shrink-0 rounded-full bg-[#e51717]" />
                    <div>
                      <strong>Cash on Delivery (COD) Orders:</strong> A secure refund link will be shared via email/SMS allowing you to receive instant NEFT or UPI bank transfer.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                  Start Your Request
                </span>
                <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  Need An Exchange Or Return?
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                  Our customer care desk is ready to organize your door pickup and replacement size.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#e51717] py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#080d2d]"
                >
                  Contact Support Desk <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                  Helpful Resources
                </h4>
                <div className="mt-4 divide-y divide-neutral-100 text-xs font-bold">
                  <Link href="/size-guide" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Check Sizing Guide Before Exchanging</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/shipping" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Shipping Timelines &amp; Rates</span>
                    <ChevronRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
