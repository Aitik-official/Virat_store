import { CartClient } from './cart-client'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata = {
  title: 'Shopping Bag | Virat Sports',
  description: 'Review your selected Virat Sports performance apparel and checkout.',
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#080d2d]">
      <SiteHeader />
      <CartClient />
      <SiteFooter />
    </div>
  )
}
