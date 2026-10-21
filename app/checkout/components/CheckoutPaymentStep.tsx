'use client'

import {
  CreditCard,
  Smartphone,
  Package,
  Truck,
  ArrowLeft,
  ShieldCheck,
  Loader2,
} from 'lucide-react'
import { PaymentChoice, CheckoutField } from './CheckoutTypes'

export interface CheckoutPaymentStepProps {
  payment: PaymentChoice
  onPaymentChange: <K extends keyof PaymentChoice>(field: K, value: PaymentChoice[K]) => void
  onBack: () => void
  onPlace: () => void
  isPlacing: boolean
}

export function CheckoutPaymentStep({
  payment,
  onPaymentChange,
  onBack,
  onPlace,
  isPlacing,
}: CheckoutPaymentStepProps) {
  const methods: { id: PaymentChoice['method']; label: string; icon: React.ReactNode; sub: string }[] = [
    {
      id: 'card',
      label: 'Credit / Debit Card',
      icon: <CreditCard className="size-5" />,
      sub: 'Visa, Mastercard, RuPay',
    },
    {
      id: 'upi',
      label: 'UPI',
      icon: <Smartphone className="size-5" />,
      sub: 'GPay, PhonePe, Paytm',
    },
    {
      id: 'cod',
      label: 'Cash on Delivery',
      icon: <Package className="size-5" />,
      sub: 'Pay when you receive',
    },
  ]

  const isValid =
    payment.method === 'cod'
      ? true
      : payment.method === 'upi'
      ? payment.upiId.trim().includes('@')
      : payment.cardNumber.replace(/\s/g, '').length === 16 &&
        payment.cardName.trim() &&
        payment.cardExpiry.trim() &&
        payment.cardCvv.length === 3

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-[#080d2d]">
          <CreditCard className="size-5 text-[#e51717]" />
          Payment Method
        </h2>
        <p className="mt-1 text-xs text-slate-500">Choose how you&apos;d like to pay for your order.</p>
      </div>

      {/* Method Selector */}
      <div className="space-y-3">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onPaymentChange('method', m.id)}
            className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
              payment.method === m.id
                ? 'border-[#e51717] bg-red-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                payment.method === m.id ? 'bg-[#e51717] text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {m.icon}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-black uppercase tracking-wide ${
                  payment.method === m.id ? 'text-[#080d2d]' : 'text-slate-700'
                }`}
              >
                {m.label}
              </p>
              <p className="text-[10px] text-slate-500">{m.sub}</p>
            </div>
            <div
              className={`size-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
                payment.method === m.id ? 'border-[#e51717] bg-[#e51717]' : 'border-slate-300'
              }`}
            >
              {payment.method === m.id && <div className="size-1.5 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* Card fields */}
      {payment.method === 'card' && (
        <div className="space-y-4 rounded-xl bg-slate-50 border border-slate-200 p-5">
          <CheckoutField
            label="Card Number"
            id="cardNumber"
            value={payment.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            onChange={(v) => {
              const raw = v.replace(/\D/g, '').slice(0, 16)
              const formatted = raw.replace(/(.{4})/g, '$1 ').trim()
              onPaymentChange('cardNumber', formatted)
            }}
          />
          <CheckoutField
            label="Name on Card"
            id="cardName"
            value={payment.cardName}
            placeholder="VIRAT KOHLI"
            onChange={(v) => onPaymentChange('cardName', v.toUpperCase())}
          />
          <div className="grid grid-cols-2 gap-4">
            <CheckoutField
              label="Expiry (MM/YY)"
              id="cardExpiry"
              value={payment.cardExpiry}
              placeholder="08/28"
              maxLength={5}
              onChange={(v) => {
                const raw = v.replace(/\D/g, '').slice(0, 4)
                const formatted = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw
                onPaymentChange('cardExpiry', formatted)
              }}
            />
            <CheckoutField
              label="CVV"
              id="cardCvv"
              value={payment.cardCvv}
              placeholder="•••"
              maxLength={3}
              type="password"
              onChange={(v) => onPaymentChange('cardCvv', v.replace(/\D/g, '').slice(0, 3))}
            />
          </div>
        </div>
      )}

      {/* UPI field */}
      {payment.method === 'upi' && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
          <CheckoutField
            label="UPI ID"
            id="upiId"
            value={payment.upiId}
            placeholder="yourname@upi"
            onChange={(v) => onPaymentChange('upiId', v)}
          />
        </div>
      )}

      {/* COD notice */}
      {payment.method === 'cod' && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800">
          <Truck className="size-5 shrink-0 mt-0.5 text-amber-600" />
          <p>
            Pay ₹<strong>50</strong> extra as Cash on Delivery handling charge. Keep exact change ready at the time of
            delivery.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-[#080d2d] hover:border-[#080d2d]"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onPlace}
          disabled={!isValid || isPlacing}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e51717] py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 transition-all hover:bg-[#c81010] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlacing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Placing Order…</span>
            </>
          ) : (
            <>
              <ShieldCheck className="size-4" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
