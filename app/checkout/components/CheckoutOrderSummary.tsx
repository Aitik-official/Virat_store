'use client'

import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export interface CheckoutOrderSummaryProps {
  subtotal: number
  discount: number
  shipping: number
  grandTotal: number
  promoCode: string
  setPromoCode: (v: string) => void
  onApplyPromo: (e: React.FormEvent) => void
  promoApplied: boolean
  promoError: string
  showPromoInput: boolean
}

export function CheckoutOrderSummary({
  subtotal,
  discount,
  shipping,
  grandTotal,
  promoCode,
  setPromoCode,
  onApplyPromo,
  promoApplied,
  promoError,
  showPromoInput,
}: CheckoutOrderSummaryProps) {
  const { items } = useCart()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
      <h2 className="text-sm font-black uppercase tracking-tight text-[#080d2d] border-b border-slate-100 pb-3 mb-4">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-3 mb-5">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
              <Image src={item.colorImage || item.product.image} alt={item.product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase text-[#080d2d] truncate">{item.product.name}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="uppercase font-bold">{item.size}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  {item.colorHex && (
                    <span
                      className="size-2 rounded-full border border-slate-300 inline-block"
                      style={{ backgroundColor: item.colorHex }}
                    />
                  )}
                  <span className="capitalize font-semibold text-slate-700">{item.color}</span>
                </span>
                <span>·</span>
                <span>Qty {item.quantity}</span>
              </div>
            </div>
            <span className="text-xs font-black text-[#080d2d]">
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Promo */}
      {showPromoInput && (
        <form onSubmit={onApplyPromo} className="mb-4 border-t border-slate-100 pt-4">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Promo Code</label>
          <div className="mt-1.5 flex gap-2">
            <input
              type="text"
              placeholder="e.g. VIRAT10"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#080d2d] outline-none focus:border-[#e51717] disabled:bg-slate-50 disabled:text-slate-400"
            />
            {!promoApplied && (
              <button
                type="submit"
                className="rounded-lg bg-[#080d2d] px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#e51717]"
              >
                Apply
              </button>
            )}
          </div>
          {promoApplied && <p className="mt-1 text-[10px] font-bold text-emerald-600">✓ 10% discount applied!</p>}
          {promoError && <p className="mt-1 text-[10px] font-bold text-[#e51717]">{promoError}</p>}
        </form>
      )}

      {/* Totals */}
      <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-bold text-[#080d2d]">₹{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-bold text-emerald-600">
            <span>Promo (VIRAT10)</span>
            <span>-₹{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span className="font-bold">
            {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-[#080d2d]">
          <span>Total</span>
          <span>₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Trust badge */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
        <ShieldCheck className="size-3.5 text-emerald-500" />
        <span>256-bit SSL Encrypted Checkout</span>
      </div>
    </div>
  )
}
