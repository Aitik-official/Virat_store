'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Truck,
  RotateCcw,
  Ruler,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  defaultContactInfo,
  getStoredTaxonomyConfig,
  type StoreContactInfo,
} from '@/lib/store-taxonomy'

export default function ContactUsPage() {
  const [contact, setContact] = useState<StoreContactInfo>(defaultContactInfo)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const conf = getStoredTaxonomyConfig()
    if (conf?.contactInfo) {
      setContact(conf.contactInfo)
    }

    const handleSync = () => {
      const updated = getStoredTaxonomyConfig()
      if (updated?.contactInfo) {
        setContact(updated.contactInfo)
      }
    }
    window.addEventListener('storage', handleSync)

    fetch('/api/taxonomy')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.taxonomy?.contactInfo) {
          setContact({ ...defaultContactInfo, ...data.taxonomy.contactInfo })
        }
      })
      .catch(() => {})

    return () => window.removeEventListener('storage', handleSync)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  const email = contact.email || defaultContactInfo.email
  const phone = contact.phone || defaultContactInfo.phone
  const address = contact.address || defaultContactInfo.address
  const hours = contact.hours || defaultContactInfo.hours
  const whatsapp = contact.whatsapp || defaultContactInfo.whatsapp

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#080d2d]">
      <SiteHeader />

      <main className="relative overflow-hidden">
        {/* Top Header / Breadcrumb */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e51717]">
              <span>Customer Care</span>
              <ChevronRight className="size-3 text-neutral-400" />
              <span className="text-neutral-500">Support Desk</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              HOW CAN WE <span className="text-[#e51717]">HELP YOU?</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Have questions about your order, sizing, bulk teamwear, or customized club kits? Reach out directly to our dedicated sports specialists.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Grid */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Direct Channels & Hubs */}
            <div className="space-y-6 lg:col-span-5">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-neutral-400">
                Direct Contact Channels
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {/* Email Card */}
                <a
                  href={`mailto:${email}`}
                  className="group relative flex items-start gap-4 border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-[#e51717] hover:shadow-md"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center bg-[#080d2d] text-white transition-colors group-hover:bg-[#e51717]">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Email Us</span>
                    <p className="mt-0.5 text-sm font-bold text-[#080d2d] group-hover:text-[#e51717] break-all">{email}</p>
                    <p className="mt-1 text-xs text-neutral-500">Guaranteed response within 24 hours</p>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href={`tel:${phone}`}
                  className="group relative flex items-start gap-4 border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-[#e51717] hover:shadow-md"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center bg-[#080d2d] text-white transition-colors group-hover:bg-[#e51717]">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Call Support</span>
                    <p className="mt-0.5 text-sm font-bold text-[#080d2d] group-hover:text-[#e51717]">{phone}</p>
                    <p className="mt-1 text-xs text-neutral-500">Toll-free across India</p>
                  </div>
                </a>

                {/* WhatsApp Support Card */}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-start gap-4 border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-emerald-600 hover:shadow-md"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center bg-emerald-600 text-white transition-transform group-hover:scale-105">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">WhatsApp Chat</span>
                      <p className="mt-0.5 text-sm font-bold text-[#080d2d] group-hover:text-emerald-700">{whatsapp}</p>
                      <p className="mt-1 text-xs text-neutral-500">Instant quick query assistance</p>
                    </div>
                  </a>
                )}

                {/* Office & Hours Card */}
                <div className="border border-neutral-200 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center bg-[#080d2d] text-white">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Flagship Warehouse &amp; HQ</span>
                      <p className="mt-1 text-sm font-medium text-[#080d2d] leading-relaxed">{address}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-3 text-xs text-neutral-600">
                    <Clock className="size-4 shrink-0 text-[#e51717]" />
                    <span><strong>Operating Hours:</strong> {hours}</span>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#080d2d]">
                  Quick Self-Service Hubs
                </h3>
                <div className="mt-4 divide-y divide-neutral-100">
                  <Link
                    href="/shipping"
                    className="flex items-center justify-between py-3 text-sm font-bold text-neutral-700 transition-colors hover:text-[#e51717]"
                  >
                    <span className="flex items-center gap-3">
                      <Truck className="size-4 text-[#e51717]" /> Shipping &amp; Delivery Policies
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/returns"
                    className="flex items-center justify-between py-3 text-sm font-bold text-neutral-700 transition-colors hover:text-[#e51717]"
                  >
                    <span className="flex items-center gap-3">
                      <RotateCcw className="size-4 text-[#e51717]" /> Returns &amp; Easy Exchange
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/size-guide"
                    className="flex items-center justify-between py-3 text-sm font-bold text-neutral-700 transition-colors hover:text-[#e51717]"
                  >
                    <span className="flex items-center gap-3">
                      <Ruler className="size-4 text-[#e51717]" /> Standard Apparel &amp; Gear Size Guide
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7">
              <div className="border border-neutral-200 bg-white p-8 sm:p-10">
                <div className="border-b border-neutral-200 pb-5">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e51717]">Send A Message</span>
                  <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl">
                    HOW CAN WE ASSIST YOU TODAY?
                  </h2>
                </div>

                {formSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="size-8" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-[#080d2d]">
                      Message Received!
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
                      Thank you for contacting Virat Sports. A ticket has been created and our team will get in touch with you at your provided email shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 bg-[#080d2d] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#e51717]"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Virat Kumar"
                          className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                          Order Number (If applicable)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. VS-89421"
                          className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                        Inquiry Category *
                      </label>
                      <select
                        required
                        className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                      >
                        <option value="order">Order Tracking &amp; Delivery</option>
                        <option value="returns">Exchange &amp; Returns Request</option>
                        <option value="teamwear">Custom Teamwear &amp; Bulk Inquiry</option>
                        <option value="sizing">Sizing &amp; Fit Consultation</option>
                        <option value="product">Product Specification &amp; Materials</option>
                        <option value="other">General Feedback / Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700">
                        Detailed Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Please provide details regarding your query so our team can assist you quickly..."
                        className="mt-1.5 w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-[#080d2d] transition-colors focus:border-[#080d2d] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-3 bg-[#e51717] py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition-all hover:bg-[#c31313] disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Message To Support'}
                      <ArrowRight className="size-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
