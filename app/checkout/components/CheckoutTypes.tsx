'use client'

export interface DeliveryDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface PaymentChoice {
  method: 'card' | 'upi' | 'cod'
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvv: string
  upiId: string
}

export type Step = 'details' | 'payment' | 'confirmed'

export const PROMO_CODE = 'VIRAT10'

export function CheckoutField({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  maxLength,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#080d2d] placeholder:text-slate-300 outline-none transition focus:border-[#e51717] focus:ring-2 focus:ring-[#e51717]/10"
      />
    </div>
  )
}
