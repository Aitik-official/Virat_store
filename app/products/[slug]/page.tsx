import { notFound } from 'next/navigation'
import { products } from '@/lib/products-data'
import { ProductDetailsClient } from './product-details-client'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Product Not Found | Virat Sports' }

  return {
    title: `${product.name} | Virat Sports`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.sport === product.sport))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white text-[#080d2d]">
      <SiteHeader />
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
      <SiteFooter />
    </div>
  )
}
