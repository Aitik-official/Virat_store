'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products-data'

export interface RelatedProductsSectionProps {
  relatedProducts: Product[]
}

export function RelatedProductsSection({ relatedProducts }: RelatedProductsSectionProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <div className="mt-20 border-t border-slate-200 pt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d] sm:text-2xl">
          You May Also Like
        </h2>
        <Link href="/products" className="text-xs font-black uppercase text-[#e51717] hover:underline">
          View All →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {relatedProducts.map((rel) => (
          <Link
            key={rel.id}
            href={`/products/${rel.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md hover:border-[#080d2d]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
              <Image src={rel.image} alt={rel.name} fill className="object-contain p-2 transition group-hover:scale-105" />
            </div>
            <p className="mt-3 truncate text-xs font-black uppercase text-[#080d2d] group-hover:text-[#e51717]">
              {rel.name}
            </p>
            <p className="mt-1 text-xs font-black text-[#080d2d]">
              ₹{rel.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
