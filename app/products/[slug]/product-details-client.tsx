'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Heart, Minus, Plus, Share2, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import type { Product } from '@/lib/products-data'
import { useCart } from '@/lib/cart-context'

export function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: Product
  relatedProducts: Product[]
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [addedSuccess, setAddedSuccess] = useState(false)

  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    setAddedSuccess(true)
    setTimeout(() => setAddedSuccess(false), 3000)
  }

  const allImages = product.images?.length ? product.images : [product.image]

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Link href="/" className="hover:text-[#080d2d]">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#080d2d]">Products</Link>
        <span>/</span>
        <span className="text-[#080d2d] truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Gallery Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f6] shadow-sm">
            <Image
              src={allImages[selectedImage] || product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-6 transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-md bg-[#e51717] px-3 py-1 text-xs font-black uppercase tracking-widest text-white shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition-all ${
                    selectedImage === idx ? 'border-[#e51717] ring-2 ring-[#e51717]/20' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Buying Options */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#e51717]">
            <span>{product.gender}</span>
            <span>•</span>
            <span>{product.sport}</span>
          </div>

          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#080d2d] sm:text-4xl">
            {product.name}
          </h1>

          {/* Reviews & Stock */}
          <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#080d2d]">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} reviews)</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              In Stock & Ready to Ship
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-6 flex items-baseline gap-3 border-y border-slate-100 py-4">
            <span className="text-3xl font-black text-[#080d2d]">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-base font-semibold text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-black text-[#e51717]">
                  SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                Color: <span className="font-medium text-slate-600">{selectedColor}</span>
              </span>
            </div>
            <div className="mt-2.5 flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                    selectedColor === c.name ? 'border-[#080d2d] scale-110 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className={`size-4 ${c.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#080d2d]">Select Size</span>
              <span className="text-xs font-bold text-[#e51717] hover:underline cursor-pointer">Size Guide</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-12 rounded-lg border-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                    selectedSize === s
                      ? 'border-[#080d2d] bg-[#080d2d] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Action */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Quantity Stepper */}
            <div className="flex items-center rounded-xl border border-slate-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-10 text-center text-sm font-black text-[#080d2d]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#080d2d] px-8 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:bg-[#e51717]"
            >
              <ShoppingBag className="size-4" />
              <span>Add to Bag</span>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-xl border border-slate-300 text-slate-600 transition hover:border-[#e51717] hover:text-[#e51717]"
              aria-label="Add to wishlist"
            >
              <Heart className="size-4" />
            </button>
          </div>

          {/* Success Banner */}
          {addedSuccess && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 border border-emerald-200 animate-in fade-in">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-emerald-600" />
                Added to your bag successfully!
              </span>
              <Link href="/cart" className="underline hover:text-emerald-900">
                View Bag & Checkout →
              </Link>
            </div>
          )}

          {/* Value Props */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="size-5 text-[#e51717]" />
              <div>
                <p className="font-black uppercase text-[#080d2d]">Free Shipping</p>
                <p className="text-[11px] text-slate-400">On all orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#e51717]" />
              <div>
                <p className="font-black uppercase text-[#080d2d]">100% Authentic</p>
                <p className="text-[11px] text-slate-400">Official Virat Sports gear</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features & Specifications */}
      <div className="mt-16 border-t border-slate-200 pt-12">
        <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
          Performance Features
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8f9fa] p-4">
              <span className="mt-0.5 size-2 shrink-0 rounded-full bg-[#e51717]" />
              <span className="text-xs font-bold text-slate-700">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
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
      )}
    </div>
  )
}
