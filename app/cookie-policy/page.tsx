import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Cookie,
  ShieldCheck,
  CheckCircle,
  Settings,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Virat Sports',
  description:
    'Information on how Virat Sports utilizes cookies, local storage sessions, and caching technologies to elevate your shopping experience.',
}

export default function CookiePolicyPage() {
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
              <span className="text-neutral-500">Browser Storage</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              COOKIE <span className="text-[#e51717]">POLICY</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Understanding how we use cookies, local state caching, and analytics tokens to deliver lightning-fast page transitions and secure cart persistence.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-8 border border-neutral-200 bg-white p-8 sm:p-10 lg:col-span-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  1. What Are Cookies?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, remember your shopping cart items between sessions, and provide anonymized performance metrics to site owners.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  2. The Types of Cookies We Use
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="border border-neutral-200 p-4">
                    <h3 className="text-sm font-bold text-[#080d2d]">Essential / Strictly Necessary Cookies</h3>
                    <p className="mt-1 text-xs text-neutral-600">
                      Required for the fundamental operation of the storefront, such as maintaining items in your shopping bag, preserving checkout state, and validating admin session tokens.
                    </p>
                  </div>

                  <div className="border border-neutral-200 p-4">
                    <h3 className="text-sm font-bold text-[#080d2d]">Performance &amp; Analytics Cookies</h3>
                    <p className="mt-1 text-xs text-neutral-600">
                      Help us understand aggregate visitor flows, popular sports collections, and page loading speeds without recording personally identifying information.
                    </p>
                  </div>

                  <div className="border border-neutral-200 p-4">
                    <h3 className="text-sm font-bold text-[#080d2d]">Preference &amp; Functionality Cookies</h3>
                    <p className="mt-1 text-xs text-neutral-600">
                      Remember your preferred measurement units (inches vs centimeters on size charts) and customized layout views.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  3. Managing and Disabling Cookies
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Note that if you disable or refuse essential cookies, some parts of this website (such as adding items to cart or completing orders) may become inaccessible or fail to function properly.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e51717]">
                  <Cookie className="size-4" />
                  <span>Privacy First</span>
                </div>
                <h3 className="mt-2 text-base font-black uppercase tracking-tight text-[#080d2d]">
                  Zero Intrusive Tracking
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  We value athlete and customer trust. We do not sell tracking profiles to external third-party data brokers.
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
                  <Link href="/terms" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Terms of Service</span>
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
