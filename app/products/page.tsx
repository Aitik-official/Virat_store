import { Suspense } from 'react'
import { ProductsClient } from './products-client'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata = {
  title: 'Products | Virat Sports Sportswear',
  description: 'Explore the latest Virat Sports performance jerseys, tracksuits, cricket whites, kitbags and athletic equipment.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#080d2d]">
      <SiteHeader />
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center font-bold">Loading products...</div>}>
        <ProductsClient />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
