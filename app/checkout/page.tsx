import { CheckoutClient } from './checkout-client'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Suspense } from 'react'

export const metadata = {
  title: 'Checkout | Virat Sports',
  description: 'Complete your order — enter your details and payment information to confirm your Virat Sports purchase.',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#080d2d]">
      <SiteHeader />
      <Suspense fallback={<div className="py-24 text-center text-sm text-slate-400">Loading checkout…</div>}>
        <CheckoutClient />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
