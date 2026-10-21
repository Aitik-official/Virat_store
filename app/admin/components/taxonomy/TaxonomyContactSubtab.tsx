'use client'

import { Phone, Link2 } from 'lucide-react'
import type { StoreTaxonomyConfig } from '@/lib/store-taxonomy'

export interface TaxonomyContactSubtabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
}

export function TaxonomyContactSubtab({
  taxonomyConfig,
  saveTaxonomyConfig,
}: TaxonomyContactSubtabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#e51717]" />
          <span>Customer Support &amp; Store Contact Information</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Changes here update the live contact section and site footer.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Support Email
            </label>
            <input
              type="email"
              value={taxonomyConfig.contactInfo.email}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, email: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Helpline Phone Number
            </label>
            <input
              type="text"
              value={taxonomyConfig.contactInfo.phone}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, phone: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp Support Number
            </label>
            <input
              type="text"
              value={taxonomyConfig.contactInfo.whatsapp}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, whatsapp: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Support Hours
            </label>
            <input
              type="text"
              value={taxonomyConfig.contactInfo.hours}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, hours: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Store Address &amp; Warehouse Facility
          </label>
          <textarea
            rows={2}
            value={taxonomyConfig.contactInfo.address}
            onChange={(e) => {
              saveTaxonomyConfig({
                ...taxonomyConfig,
                contactInfo: { ...taxonomyConfig.contactInfo, address: e.target.value },
              })
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
          />
        </div>

        <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-[#e51717]" />
          <span>Official Social Media Channels</span>
        </h4>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Instagram URL</label>
            <input
              type="text"
              placeholder="https://www.instagram.com/viratsportsofficial/"
              value={taxonomyConfig.contactInfo.instagram || ''}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, instagram: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">X (Twitter) URL</label>
            <input
              type="text"
              placeholder="https://x.com/viratsports"
              value={taxonomyConfig.contactInfo.twitter || ''}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, twitter: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Facebook URL</label>
            <input
              type="text"
              placeholder="https://www.facebook.com/ViratSportsOfficial/"
              value={taxonomyConfig.contactInfo.facebook || ''}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, facebook: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">YouTube URL</label>
            <input
              type="text"
              placeholder="https://youtube.com/@viratsports"
              value={taxonomyConfig.contactInfo.youtube || ''}
              onChange={(e) => {
                saveTaxonomyConfig({
                  ...taxonomyConfig,
                  contactInfo: { ...taxonomyConfig.contactInfo, youtube: e.target.value },
                })
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
