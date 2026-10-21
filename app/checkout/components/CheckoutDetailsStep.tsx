'use client'

import { User, ArrowRight } from 'lucide-react'
import { DeliveryDetails, CheckoutField } from './CheckoutTypes'

export interface CheckoutDetailsStepProps {
  details: DeliveryDetails
  onChange: (field: keyof DeliveryDetails, value: string) => void
  onNext: () => void
}

export function CheckoutDetailsStep({
  details,
  onChange,
  onNext,
}: CheckoutDetailsStepProps) {
  const isValid =
    details.firstName.trim() &&
    details.lastName.trim() &&
    details.email.trim() &&
    details.phone.trim() &&
    details.address.trim() &&
    details.city.trim() &&
    details.state.trim() &&
    details.pincode.trim()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-[#080d2d]">
          <User className="size-5 text-[#e51717]" />
          Contact &amp; Delivery Details
        </h2>
        <p className="mt-1 text-xs text-slate-500">Where should we deliver your performance gear?</p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CheckoutField
          label="First Name"
          id="firstName"
          value={details.firstName}
          placeholder="Virat"
          onChange={(v) => onChange('firstName', v)}
        />
        <CheckoutField
          label="Last Name"
          id="lastName"
          value={details.lastName}
          placeholder="Kohli"
          onChange={(v) => onChange('lastName', v)}
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CheckoutField
          label="Email Address"
          id="email"
          type="email"
          value={details.email}
          placeholder="you@example.com"
          onChange={(v) => onChange('email', v)}
        />
        <CheckoutField
          label="Phone Number"
          id="phone"
          type="tel"
          value={details.phone}
          placeholder="+91 98765 43210"
          onChange={(v) => onChange('phone', v)}
        />
      </div>

      {/* Address */}
      <CheckoutField
        label="Street Address"
        id="address"
        value={details.address}
        placeholder="Flat / House No., Street, Locality"
        onChange={(v) => onChange('address', v)}
      />

      {/* City / State / Pincode */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <CheckoutField
          label="City"
          id="city"
          value={details.city}
          placeholder="Mumbai"
          onChange={(v) => onChange('city', v)}
        />
        <CheckoutField
          label="State"
          id="state"
          value={details.state}
          placeholder="Maharashtra"
          onChange={(v) => onChange('state', v)}
        />
        <CheckoutField
          label="Pincode"
          id="pincode"
          value={details.pincode}
          placeholder="400001"
          onChange={(v) => onChange('pincode', v)}
        />
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e51717] py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 transition-all hover:bg-[#c81010] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>Continue to Payment</span>
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}
