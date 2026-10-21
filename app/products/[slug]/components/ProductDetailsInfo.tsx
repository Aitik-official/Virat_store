'use client'

import Link from 'next/link'
import {
  Star,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Heart,
  Bell,
  Truck,
  ShieldCheck,
} from 'lucide-react'
import type { Product } from '@/lib/products-data'

export interface ProductDetailsInfoProps {
  product: Product
  allImages: string[]
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  selectedImage: number
  setSelectedImage: (idx: number) => void
  quantity: number
  setQuantity: (q: number) => void
  onAddToCart: () => void
  onBuyNow: () => void
  addedSuccess: boolean
  notifyEmail: string
  setNotifyEmail: (email: string) => void
  notifySubmitted: boolean
  onNotifyMe: (e: React.FormEvent) => void
}

export function ProductDetailsInfo({
  product,
  allImages,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedImage,
  setSelectedImage,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
  addedSuccess,
  notifyEmail,
  setNotifyEmail,
  notifySubmitted,
  onNotifyMe,
}: ProductDetailsInfoProps) {
  return (
    <div className="lg:col-span-6 flex flex-col">
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
        {product.inStock ? (
          <span className="flex items-center gap-1.5 font-bold text-emerald-600">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            In Stock &amp; Ready to Ship
          </span>
        ) : (
          <span className="flex items-center gap-1.5 font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <span className="size-2 rounded-full bg-rose-600" />
            Currently Out of Stock
          </span>
        )}
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
          {product.colors.map((c, colorIdx) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setSelectedColor(c.name)
                if (c.image) {
                  const foundIdx = allImages.findIndex((img) => img === c.image)
                  if (foundIdx >= 0) {
                    setSelectedImage(foundIdx)
                  } else {
                    setSelectedImage(0)
                  }
                } else if (allImages[colorIdx]) {
                  setSelectedImage(colorIdx)
                }
              }}
              className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                selectedColor === c.name
                  ? 'border-[#080d2d] scale-110 shadow-sm'
                  : 'border-slate-200 hover:border-slate-400'
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

      {/* Quantity & Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Quantity Stepper */}
          <div className="flex items-center self-start sm:self-auto rounded-xl border border-slate-300 bg-white p-1">
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
            onClick={onAddToCart}
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#080d2d] bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-[#080d2d] transition-all hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="size-4" />
            <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={onBuyNow}
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e51717] px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="size-4 fill-white" />
            <span>Buy Now</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            className="flex size-11 items-center justify-center self-start sm:self-auto rounded-xl border border-slate-300 text-slate-600 transition hover:border-[#e51717] hover:text-[#e51717]"
            aria-label="Add to wishlist"
          >
            <Heart className="size-4" />
          </button>
        </div>

        {/* Restock Notification */}
        {!product.inStock && (
          <div className="mt-3 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/70 to-white p-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-rose-100 text-[#e51717]">
                <Bell className="size-3.5" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-wider text-[#080d2d]">
                  Notify Me When Back in Stock
                </h4>
                <p className="text-[11px] text-slate-500">
                  Leave your email address to receive priority notification when new batches arrive.
                </p>
              </div>
            </div>

            {notifySubmitted ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-100/70 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
                <Check className="size-4 text-emerald-600" />
                <span>Thanks! We'll notify you as soon as {product.name} is restocked.</span>
              </div>
            ) : (
              <form onSubmit={onNotifyMe} className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Enter your email for restock alert..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-[#080d2d] outline-none focus:border-[#e51717]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#080d2d] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#e51717] shrink-0"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        )}
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
  )
}
