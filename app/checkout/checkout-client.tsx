'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Home,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

/* ─── Types ────────────────────────────────────────────────────── */
type Step = 'details' | 'payment' | 'confirmed'

interface DeliveryDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface PaymentChoice {
  method: 'card' | 'upi' | 'cod'
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvv: string
  upiId: string
}

const PROMO_CODE = 'VIRAT10'

/* ─── Step Indicator ───────────────────────────────────────────── */
function StepIndicator({ current }: { current: Step }) {
  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'details', label: 'Details', icon: <User className="size-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="size-4" /> },
    { id: 'confirmed', label: 'Confirmed', icon: <CheckCircle2 className="size-4" /> },
  ]

  const order: Step[] = ['details', 'payment', 'confirmed']
  const currentIndex = order.indexOf(current)

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => {
        const done = i < currentIndex
        const active = step.id === current
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex size-9 items-center justify-center rounded-full border-2 text-xs font-black transition-all duration-300 ${
                  done
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : active
                    ? 'border-[#e51717] bg-[#e51717] text-white shadow-lg shadow-red-500/30'
                    : 'border-slate-300 bg-white text-slate-400'
                }`}
              >
                {done ? <CheckCircle2 className="size-4" /> : step.icon}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${
                  active ? 'text-[#080d2d]' : done ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-3 h-0.5 w-16 sm:w-24 transition-all duration-500 ${
                  done ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Order Summary Panel ──────────────────────────────────────── */
function OrderSummary({
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
}: {
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
}) {
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
              <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase text-[#080d2d] truncate">{item.product.name}</p>
              <p className="text-[10px] text-slate-500">
                {item.size} · {item.color} · Qty {item.quantity}
              </p>
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

/* ─── Step: Details ────────────────────────────────────────────── */
function DetailsStep({
  details,
  onChange,
  onNext,
}: {
  details: DeliveryDetails
  onChange: (field: keyof DeliveryDetails, value: string) => void
  onNext: () => void
}) {
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
          Contact & Delivery Details
        </h2>
        <p className="mt-1 text-xs text-slate-500">Where should we deliver your performance gear?</p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="First Name"
          id="firstName"
          value={details.firstName}
          placeholder="Virat"
          onChange={(v) => onChange('firstName', v)}
        />
        <Field
          label="Last Name"
          id="lastName"
          value={details.lastName}
          placeholder="Kohli"
          onChange={(v) => onChange('lastName', v)}
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Email Address"
          id="email"
          type="email"
          value={details.email}
          placeholder="you@example.com"
          onChange={(v) => onChange('email', v)}
        />
        <Field
          label="Phone Number"
          id="phone"
          type="tel"
          value={details.phone}
          placeholder="+91 98765 43210"
          onChange={(v) => onChange('phone', v)}
        />
      </div>

      {/* Address */}
      <Field
        label="Street Address"
        id="address"
        value={details.address}
        placeholder="Flat / House No., Street, Locality"
        onChange={(v) => onChange('address', v)}
      />

      {/* City / State / Pincode */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field
          label="City"
          id="city"
          value={details.city}
          placeholder="Mumbai"
          onChange={(v) => onChange('city', v)}
        />
        <Field
          label="State"
          id="state"
          value={details.state}
          placeholder="Maharashtra"
          onChange={(v) => onChange('state', v)}
        />
        <Field
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

/* ─── Step: Payment ────────────────────────────────────────────── */
function PaymentStep({
  payment,
  onPaymentChange,
  onBack,
  onPlace,
  isPlacing,
}: {
  payment: PaymentChoice
  onPaymentChange: <K extends keyof PaymentChoice>(field: K, value: PaymentChoice[K]) => void
  onBack: () => void
  onPlace: () => void
  isPlacing: boolean
}) {
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
        <p className="mt-1 text-xs text-slate-500">Choose how you'd like to pay for your order.</p>
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
          <Field
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
          <Field
            label="Name on Card"
            id="cardName"
            value={payment.cardName}
            placeholder="VIRAT KOHLI"
            onChange={(v) => onPaymentChange('cardName', v.toUpperCase())}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
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
            <Field
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
          <Field
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
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-[#080d2d] hover:border-[#080d2d]"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
        <button
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

/* ─── Step: Confirmed ──────────────────────────────────────────── */
function ConfirmedStep({ details, grandTotal }: { details: DeliveryDetails; grandTotal: number }) {
  const orderNumber = `VS${Date.now().toString().slice(-8).toUpperCase()}`
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
          <span className="font-black text-[#080d2d]">#{orderNumber}</span>
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

/* ─── Reusable Field ───────────────────────────────────────────── */
function Field({
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

/* ─── Main Checkout Client ─────────────────────────────────────── */
export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart()

  const [step, setStep] = useState<Step>('details')
  const [isPlacing, setIsPlacing] = useState(false)

  const [details, setDetails] = useState<DeliveryDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [payment, setPayment] = useState<PaymentChoice>({
    method: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  })

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [grandTotalSnapshot, setGrandTotalSnapshot] = useState(0)

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99
  const grandTotal = Math.max(0, subtotal - discount + shipping)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === PROMO_CODE) {
      setDiscount(Math.round(subtotal * 0.1))
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError(`Invalid code. Try "${PROMO_CODE}" for 10% off!`)
    }
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true)
    setGrandTotalSnapshot(grandTotal)
    setTimeout(() => {
      setIsPlacing(false)
      clearCart()
      setStep('confirmed')
    }, 1800)
  }

  /* Empty cart guard */
  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <MapPin className="size-10 text-slate-300" />
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-[#080d2d]">No items to checkout</h1>
        <p className="mt-2 text-sm text-slate-500">Your bag is empty. Add products before checking out.</p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#080d2d] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e51717]"
        >
          <span>Shop All Products</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-12">
      {/* Breadcrumb */}
      {step !== 'confirmed' && (
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-[#080d2d]">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#080d2d]">Cart</Link>
          <span>/</span>
          <span className="text-[#e51717]">Checkout</span>
        </div>
      )}

      {/* Step indicator */}
      <StepIndicator current={step} />

      {step === 'confirmed' ? (
        <ConfirmedStep details={details} grandTotal={grandTotalSnapshot} />
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left: active step */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {step === 'details' && (
              <DetailsStep
                details={details}
                onChange={(field, value) => setDetails((prev) => ({ ...prev, [field]: value }))}
                onNext={() => setStep('payment')}
              />
            )}
            {step === 'payment' && (
              <PaymentStep
                payment={payment}
                onPaymentChange={(field, value) => setPayment((prev) => ({ ...prev, [field]: value }))}
                onBack={() => setStep('details')}
                onPlace={handlePlaceOrder}
                isPlacing={isPlacing}
              />
            )}
          </div>

          {/* Right: order summary */}
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            grandTotal={grandTotal}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            onApplyPromo={handleApplyPromo}
            promoApplied={promoApplied}
            promoError={promoError}
            showPromoInput={step === 'details'}
          />
        </div>
      )}
    </div>
  )
}
