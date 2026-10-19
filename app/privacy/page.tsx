import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Virat Sports',
  description:
    'Our commitment to safeguarding your personal data, transaction security, and cookie transparency at Virat Sports.',
}

export default function PrivacyPolicyPage() {
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
              <span className="text-neutral-500">Data Protection</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              PRIVACY <span className="text-[#e51717]">POLICY</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              We respect your privacy and protect the sensitive personal and payment data you entrust to us when shopping for authentic cricket equipment and sportswear.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-8 border border-neutral-200 bg-white p-8 sm:p-10 lg:col-span-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  1. Information We Collect
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  When you browse, create an account, purchase products, or contact our support team, we may collect the following details:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 space-y-1">
                  <li><strong>Personal Identification:</strong> Name, delivery address, billing address, phone number, and email address.</li>
                  <li><strong>Order History:</strong> Products ordered, sizing preferences, transaction receipts, and return/exchange records.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, and operating system used to optimize our store performance.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  2. Payment Security
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  We <strong>never</strong> store your raw credit/debit card numbers or bank credentials on our servers. All financial transactions are processed securely through PCI-DSS Level 1 certified payment gateways with 256-bit SSL encryption and mandatory multi-factor authentication (OTP).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  3. How We Use Your Data
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Your information is utilized solely to:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 space-y-1">
                  <li>Fulfill and deliver your sportswear and cricket consignments.</li>
                  <li>Provide real-time dispatch tracking notifications via SMS and email.</li>
                  <li>Handle queries, exchange requests, and custom kit printing specifications.</li>
                  <li>Prevent fraudulent transactions and protect site integrity.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  4. Third-Party Disclosures
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  We do not sell, rent, or trade your personal data. We only share essential shipping details with our trusted domestic and international logistics couriers (e.g. BlueDart, Delhivery, DHL) to successfully complete doorstep delivery.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                  5. Contact Our Data Protection Officer
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  If you wish to review, update, or request deletion of your account information, reach out to our privacy grievance desk at{' '}
                  <Link href="/contact" className="font-bold text-[#e51717] underline">
                    our Customer Support portal
                  </Link>.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e51717]">
                  <Lock className="size-4" />
                  <span>Security Guarantee</span>
                </div>
                <h3 className="mt-2 text-base font-black uppercase tracking-tight text-[#080d2d]">
                  Bank-Grade Encryption
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  Every interaction and payment on Virat Sports is safeguarded by strict SSL certificates and verified payment networks.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                  Legal Documents
                </h4>
                <div className="mt-4 divide-y divide-neutral-100 text-xs font-bold">
                  <Link href="/terms" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Terms &amp; Conditions</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/shipping" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Shipping Policies</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/returns" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>Return &amp; Refund Rules</span>
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
