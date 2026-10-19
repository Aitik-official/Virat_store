import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  ShieldCheck,
  Scale,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Virat Sports',
  description:
    'Terms of service, purchasing agreements, warranty disclaimers, and user obligations when using Virat Sports online store and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#080d2d]">
      <SiteHeader />

      <main className="relative overflow-hidden">
        {/* Top Header */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e51717]">
              <Link href="/contact" className="hover:underline">Legal &amp; Compliance</Link>
              <ChevronRight className="size-3 text-neutral-400" />
              <span className="text-neutral-500">Terms of Service</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              TERMS &amp; <span className="text-[#e51717]">CONDITIONS</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Please read these terms carefully before utilizing our services, placing gear orders, or commissioning custom teamwear designs.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-8 border border-neutral-200 bg-white p-8 sm:p-10 lg:col-span-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  1. Agreement to Terms
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  By accessing or purchasing from Virat Sports (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to abide by these Terms and all applicable laws and regulations in India. If you do not agree, you are prohibited from utilizing our platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  2. Pricing and Product Information
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  We strive to ensure accurate pricing, imagery, and specifications for all cricket bats, protective equipment, and apparel. However, errors may occasionally occur. In the event of a pricing or inventory discrepancy, Virat Sports reserves the right to cancel affected orders and issue a full prompt refund.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  3. Custom Teamwear &amp; Sublimation Orders
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Orders manufactured with bespoke player names, numbers, club insignias, or customized dimensions enter production immediately upon client design approval. Once printed, custom items are final sale and exempt from size exchanges or voluntary returns, except in cases of manufacturing flaws.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  4. Natural Willow Disclaimer (Cricket Bats)
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  English and Kashmir willow are natural fibrous timbers subject to extreme impacts from hard leather balls traveling at 120+ km/h. While our bats are crafted to the highest international safety and performance standards, surface indentation, edge bruising, or seam cracks can naturally occur during match play. Proper oiling and knocking-in is required prior to game usage.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  5. Governing Law and Jurisdiction
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  These terms are governed by the laws of India. Any legal dispute arising out of or related to our products or services shall be subject to the exclusive jurisdiction of the competent courts in Noida, Uttar Pradesh, India.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e51717]">
                  <Scale className="size-4" />
                  <span>Fair Trade Policy</span>
                </div>
                <h3 className="mt-2 text-base font-black uppercase tracking-tight text-[#080d2d]">
                  Player-First Philosophy
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  Our policies are transparently crafted to support athletes, clubs, and grassroot cricket communities.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                  Related Policies
                </h4>
                <div className="mt-4 divide-y divide-neutral-100 text-xs font-bold">
                  <Link href="/privacy" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Privacy Policy</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/returns" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Exchange &amp; Returns</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/shipping" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Shipping Guidelines</span>
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
