'use client'

import Link from 'next/link'
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Home,
} from 'lucide-react'
import { DeliveryDetails } from './CheckoutTypes'

export interface CheckoutConfirmedStepProps {
  details: DeliveryDetails
  grandTotal: number
  orderNumber: string
}

export function CheckoutConfirmedStep({
  details,
  grandTotal,
  orderNumber,
}: CheckoutConfirmedStepProps) {
  const displayOrderNum = orderNumber || `VS${Date.now().toString().slice(-8).toUpperCase()}`

  return (
    <div className="py-12 text-center space-y-6">
      {/* Animated tick */}
      <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="size-12" strokeWidth={1.5} />
      </div>

      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#080d2d]">Order Confirmed!</h1>
        <p className="mt-2 text-sm text-slate-500">
          Thank you, <strong>{details.firstName}</strong>! Your order has been placed successfully.
        </p>
      </div>

      {/* Order details card */}
      <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
          <Package className="size-3.5" />
          <span>Order Details</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Order Number</span>
          <span className="font-black text-[#080d2d]">#{displayOrderNum}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Amount Paid</span>
          <span className="font-black text-[#080d2d]">₹{grandTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Delivering to</span>
          <span className="font-black text-[#080d2d] text-right max-w-[55%]">
            {details.address}, {details.city}, {details.state} – {details.pincode}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 mt-2">
          <Truck className="size-4 shrink-0 text-emerald-600" />
          <p className="text-[11px] text-emerald-800 font-semibold">
            Expected delivery within <strong>3–5 business days.</strong> Tracking details will be sent to {details.email}.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-[#080d2d] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#e51717]"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-xs font-black uppercase tracking-widest text-[#080d2d] transition hover:border-[#080d2d]"
        >
          <Home className="size-4" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  )
}
