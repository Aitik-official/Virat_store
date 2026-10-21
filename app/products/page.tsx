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
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsClient />
      </Suspense>
      <SiteFooter />
    </div>
  )
}

function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-12 animate-pulse">
      {/* Breadcrumb & Title skeleton */}
      <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="h-3 w-48 rounded bg-slate-200" />
          <div className="h-8 w-64 rounded bg-slate-200" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-44 rounded-lg bg-slate-200" />
          <div className="h-8 w-32 rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar skeleton */}
        <aside className="hidden space-y-6 md:block">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="space-y-3 pt-3">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        </aside>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <div className="aspect-square w-full rounded-xl bg-slate-100" />
              <div className="mt-4 flex items-center justify-between">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-3 w-12 rounded bg-slate-200" />
              </div>
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-full rounded bg-slate-200" />
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="h-5 w-20 rounded bg-slate-200" />
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-slate-200" />
                  <div className="size-3 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
