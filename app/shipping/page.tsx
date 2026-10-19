import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Virat Sports',
  description:
    'Learn about Virat Sports shipping rates, domestic delivery times across India, international courier partners, order tracking, and delivery guarantees.',
}

export default function ShippingPage() {
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
              <span className="text-neutral-500">Shipping &amp; Logistics</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              SHIPPING &amp; <span className="text-[#e51717]">DELIVERY</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Engineered gear dispatched promptly with real-time tracking, tamper-proof packaging, and insured courier partners across all Indian pincodes and worldwide.
            </p>
          </div>
        </section>

        {/* Core Shipping Highlights Grid */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center bg-[#080d2d] text-white">
                <Truck className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Free Shipping
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Complimentary standard express shipping across India on all prepaid orders exceeding ₹1,999.
              </p>
            </div>

            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center bg-[#080d2d] text-white">
                <Clock className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-black uppercase tracking-wider text-[#080d2d]">
                24-48hr Dispatch
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Orders are processed and verified within 24 to 48 business hours from our central logistics warehouse.
              </p>
            </div>

            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center bg-[#080d2d] text-white">
                <Package className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Insured Packaging
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Premium multi-layer waterproof and tamper-evident packaging protects bats, jerseys, and equipment in transit.
              </p>
            </div>

            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center bg-[#080d2d] text-white">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-black uppercase tracking-wider text-[#080d2d]">
                Verified Couriers
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Partnered with BlueDart, Delhivery, DTDC, and DHL for pinpoint end-to-end SMS &amp; WhatsApp tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Shipping Breakdown Table & Policy */}
        <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Main Policy Content */}
            <div className="space-y-10 lg:col-span-8">
              {/* Delivery Timelines Table */}
              <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  Domestic Delivery Timelines (India)
                </h2>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        <th className="py-3 px-4">Region / Destination</th>
                        <th className="py-3 px-4">Estimated Transit</th>
                        <th className="py-3 px-4">Standard Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-[#080d2d]">Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata)</td>
                        <td className="py-3.5 px-4">2 – 4 Business Days</td>
                        <td className="py-3.5 px-4">Free above ₹1,999 (₹99 otherwise)</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-[#080d2d]">Tier 2 &amp; Tier 3 Cities</td>
                        <td className="py-3.5 px-4">4 – 6 Business Days</td>
                        <td className="py-3.5 px-4">Free above ₹1,999 (₹120 otherwise)</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-[#080d2d]">North East, J&amp;K, Islands &amp; Remote Pincodes</td>
                        <td className="py-3.5 px-4">6 – 8 Business Days</td>
                        <td className="py-3.5 px-4">₹150 Flat</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-[#080d2d]">Customized Match Kits &amp; Sublimated Teamwear</td>
                        <td className="py-3.5 px-4">7 – 10 Days (Includes custom printing)</td>
                        <td className="py-3.5 px-4">Calculated based on bulk weight</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Tracking & FAQs */}
              <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  Tracking Your Consignment
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  As soon as your package leaves our fulfillment center, an automated dispatch confirmation containing your direct AWB tracking number and real-time live link is delivered via SMS and email.
                </p>
                <div className="border-l-2 border-[#e51717] pl-4">
                  <p className="text-xs font-semibold text-[#080d2d]">
                    Please inspect all outer seals upon delivery. In the rare event that the outer carton appears punctured or tampered with, kindly record an unboxing video and mention remarks on the courier manifest before accepting.
                  </p>
                </div>
              </div>

              {/* International Shipping Info */}
              <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  International Shipping (Global Cricket Community)
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  We export match-grade English willow bats, protective gear, and sportswear to clubs and players across the UK, Australia, USA, UAE, New Zealand, and South Africa via DHL Express. International delivery takes approximately 5–9 working days.
                </p>
                <p className="text-xs text-neutral-500">
                  * Customs import duties and taxes (if applicable by destination country laws) are payable by the consignee at customs clearance.
                </p>
              </div>
            </div>

            {/* Right Column: Assistance Card */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-[#080d2d] p-6 text-white sm:p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#e51717]">
                  Need Delivery Help?
                </span>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">
                  Track An Existing Package
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  Provide your order ID or tracking code to our support team and we will liaise directly with our logistics partners to accelerate your delivery.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#e51717] py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#080d2d]"
                >
                  Contact Shipping Desk <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                  Related Policies
                </h4>
                <div className="mt-4 divide-y divide-neutral-100 text-xs font-bold">
                  <Link href="/returns" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Exchange &amp; Return Policy</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/size-guide" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Apparel &amp; Cricket Size Guide</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/terms" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Terms &amp; Conditions</span>
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
