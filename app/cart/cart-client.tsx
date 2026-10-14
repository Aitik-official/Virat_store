'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShieldCheck, Trash2, Truck } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartClient() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99
  const grandTotal = Math.max(0, subtotal - discount + shipping)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'VIRAT10') {
      const disc = Math.round(subtotal * 0.1)
      setDiscount(disc)
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code. Try VIRAT10 for 10% off!')
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Image src="/images/virat logo.png" alt="" width={60} height={30} className="opacity-40" />
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-[#080d2d]">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Explore our latest collection of match jerseys, training wear, and cricket equipment.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#080d2d] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e51717]"
          >
            <span>Shop All Products</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#080d2d]">
            Shopping Bag
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {items.reduce((s, i) => s + i.quantity, 0)} item(s) selected
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-500 hover:text-[#e51717]"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        {/* Items List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/products/${item.product.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-contain p-2"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#e51717]">
                  {item.product.sport}
                </span>
                <Link
                  href={`/products/${item.product.slug}`}
                  className="block text-sm font-black uppercase text-[#080d2d] hover:text-[#e51717]"
                >
                  {item.product.name}
                </Link>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span>Size: <strong className="text-[#080d2d]">{item.size}</strong></span>
                  <span>•</span>
                  <span>Color: <strong className="text-[#080d2d]">{item.color}</strong></span>
                </div>
                <div className="mt-2 text-sm font-black text-[#080d2d]">
                  ₹{item.product.price.toLocaleString()}
                </div>
              </div>

              {/* Quantity Stepper & Remove */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3">
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                    className="flex size-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="min-w-8 text-center text-xs font-black text-[#080d2d]">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                    className="flex size-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.product.id, item.size, item.color)}
                  className="text-xs font-bold text-slate-400 hover:text-[#e51717] flex items-center gap-1"
                >
                  <Trash2 className="size-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
          ))}

          {/* Value callout */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600">
            <Truck className="size-5 text-[#e51717] shrink-0" />
            <span>
              {subtotal > 999
                ? 'You qualify for Free Standard Delivery across India!'
                : `Add ₹${(999 - subtotal).toLocaleString()} more to unlock Free Standard Delivery.`}
            </span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-black uppercase tracking-tight text-[#080d2d]">
              Order Summary
            </h2>

            {/* Price Calculations */}
            <div className="mt-6 space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-[#080d2d]">₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount (VIRAT10)</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-bold text-[#080d2d]">
                  {shipping === 0 ? <span className="text-emerald-600 uppercase">FREE</span> : `₹${shipping}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-[#080d2d]">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="mt-6 border-t border-slate-100 pt-4">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">
                Have a Promo Code?
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. VIRAT10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#080d2d] outline-none focus:border-[#e51717]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#080d2d] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#e51717]"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="mt-1.5 text-[11px] font-bold text-emerald-600">
                  ✓ 10% promotional discount applied!
                </p>
              )}
              {promoError && (
                <p className="mt-1.5 text-[11px] font-bold text-[#e51717]">
                  {promoError}
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e51717] py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-500/20 transition-all hover:bg-[#c81010]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-4" />
            </Link>

            {/* Secure checkout notice */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
