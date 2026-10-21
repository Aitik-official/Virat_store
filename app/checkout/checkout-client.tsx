'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import {
  Step,
  DeliveryDetails,
  PaymentChoice,
  PROMO_CODE,
} from './components/CheckoutTypes'
import { CheckoutStepIndicator } from './components/CheckoutStepIndicator'
import { CheckoutOrderSummary } from './components/CheckoutOrderSummary'
import { CheckoutDetailsStep } from './components/CheckoutDetailsStep'
import { CheckoutPaymentStep } from './components/CheckoutPaymentStep'
import { CheckoutConfirmedStep } from './components/CheckoutConfirmedStep'

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

  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('')

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    setGrandTotalSnapshot(grandTotal)

    const generatedOrderNumber = `VS${Date.now().toString().slice(-8).toUpperCase()}`
    const orderPayload = {
      orderNumber: generatedOrderNumber,
      customer: details,
      items: items.map((item) => ({
        productId: item.product.id || item.product.slug,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.colorImage || item.product.image,
      })),
      subtotal,
      discount,
      shipping,
      codFee: payment.method === 'cod' ? 50 : 0,
      grandTotal: grandTotal + (payment.method === 'cod' ? 50 : 0),
      paymentMethod: payment.method,
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })
      const data = await res.json()
      if (data?.orderNumber) {
        setConfirmedOrderNumber(data.orderNumber)
      } else {
        setConfirmedOrderNumber(generatedOrderNumber)
      }
    } catch {
      setConfirmedOrderNumber(generatedOrderNumber)
    }

    // Offline backup for admin order management
    try {
      const existing = JSON.parse(localStorage.getItem('virat_store_orders_v1') || '[]')
      localStorage.setItem(
        'virat_store_orders_v1',
        JSON.stringify([
          {
            ...orderPayload,
            _id: generatedOrderNumber,
            createdAt: new Date().toISOString(),
            orderStatus: 'placed',
          },
          ...existing,
        ])
      )
    } catch {}

    setTimeout(() => {
      setIsPlacing(false)
      clearCart()
      setStep('confirmed')
    }, 1200)
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
    <div className="mx-auto max-w-[1200px] px-4 py-5 sm:px-6 lg:px-12">
      {/* Breadcrumb */}
      {step !== 'confirmed' && (
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-[#080d2d]">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#080d2d]">Cart</Link>
          <span>/</span>
          <span className="text-[#e51717]">Checkout</span>
        </div>
      )}

      {/* Step indicator */}
      <CheckoutStepIndicator current={step} />

      {step === 'confirmed' ? (
        <CheckoutConfirmedStep
          details={details}
          grandTotal={grandTotalSnapshot}
          orderNumber={confirmedOrderNumber}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: active step */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {step === 'details' && (
              <CheckoutDetailsStep
                details={details}
                onChange={(field, value) => setDetails((prev) => ({ ...prev, [field]: value }))}
                onNext={() => setStep('payment')}
              />
            )}
            {step === 'payment' && (
              <CheckoutPaymentStep
                payment={payment}
                onPaymentChange={(field, value) => setPayment((prev) => ({ ...prev, [field]: value }))}
                onBack={() => setStep('details')}
                onPlace={handlePlaceOrder}
                isPlacing={isPlacing}
              />
            )}
          </div>

          {/* Right: order summary */}
          <CheckoutOrderSummary
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
