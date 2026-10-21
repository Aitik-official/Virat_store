'use client'

import { CheckCircle2, CreditCard, User } from 'lucide-react'
import type { Step } from './CheckoutTypes'

export function CheckoutStepIndicator({ current }: { current: Step }) {
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
                className={`mx-1.5 sm:mx-3 h-0.5 w-8 sm:w-20 transition-all duration-500 ${
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
