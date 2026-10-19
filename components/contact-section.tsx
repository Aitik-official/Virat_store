'use client'

import { FormEvent, useState, useEffect } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import {
  defaultContactInfo,
  getStoredTaxonomyConfig,
  type StoreContactInfo,
} from '@/lib/store-taxonomy'

export function ContactSection() {
  const [contact, setContact] = useState<StoreContactInfo>(defaultContactInfo)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  const email = contact.email || defaultContactInfo.email
  const phone = contact.phone || defaultContactInfo.phone
  const address = contact.address || defaultContactInfo.address
  const hours = contact.hours || defaultContactInfo.hours

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(false)
    setError('')
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)
    setError('Message sending is not connected yet. Connect this form to an API or email service before enabling submissions.')
  }

  return (
    <section id="contact-us" className="border-b border-[#dcdcd8] bg-white px-4 py-6 sm:px-6 md:px-12 md:py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
        <div>
          <h2 className="text-xl font-black uppercase sm:text-2xl md:text-3xl">
            Contact us<span className="text-[#e51717]">.</span>
          </h2>
          <p className="mt-2 max-w-md text-xs leading-5 text-[#777a75]">
            Reach out for order inquiries, bespoke club sportswear, bulk institutional orders, or athlete sponsorships.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-xs text-[#555752]">
            {email && (
              <p className="flex items-center gap-2.5">
                <Mail className="size-3.5 text-[#e51717]" />
                <a href={`mailto:${email}`} className="hover:text-[#e51717] transition-colors">{email}</a>
              </p>
            )}
            {phone && (
              <p className="flex items-center gap-2.5">
                <Phone className="size-3.5 text-[#e51717]" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#e51717] transition-colors">{phone}</a>
              </p>
            )}
            {address && (
              <p className="flex items-center gap-2.5">
                <MapPin className="size-3.5 text-[#e51717]" />
                <span>{address}</span>
              </p>
            )}
            {hours && (
              <p className="flex items-center gap-2.5">
                <Clock3 className="size-3.5 text-[#e51717]" />
                <span>{hours}</span>
              </p>
            )}
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-3" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              Full name
              <input required name="name" className="border border-[#cfcfca] px-3 py-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-[#e51717]" />
            </label>
            <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              Email address
              <input required type="email" name="email" className="border border-[#cfcfca] px-3 py-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-[#e51717]" />
            </label>
          </div>
          <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.14em]">
            Subject
            <input required name="subject" className="border border-[#cfcfca] px-3 py-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-[#e51717]" />
          </label>
          <label className="grid gap-1 text-[11px] font-bold uppercase tracking-[0.14em]">
            Message
            <textarea required name="message" rows={3} className="resize-y border border-[#cfcfca] px-3 py-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-[#e51717]" />
          </label>
          <button disabled={loading} className="w-fit bg-[#080d2d] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#e51717] disabled:opacity-50">
            {loading ? 'Sending...' : 'Send message'}
          </button>
          {submitted && <p role="status" className="text-xs text-green-700">Message sent.</p>}
          {error && <p role="alert" className="text-xs text-[#b42318]">{error}</p>}
        </form>
      </div>
    </section>
  )
}
