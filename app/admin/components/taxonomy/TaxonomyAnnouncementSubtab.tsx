'use client'

import { Megaphone, Plus, Trash2 } from 'lucide-react'
import type { StoreTaxonomyConfig } from '@/lib/store-taxonomy'
import { defaultTaxonomyConfig } from '@/lib/store-taxonomy'

export interface TaxonomyAnnouncementSubtabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
}

export function TaxonomyAnnouncementSubtab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
}: TaxonomyAnnouncementSubtabProps) {
  const announcementData = taxonomyConfig.announcement || defaultTaxonomyConfig.announcement
  const items =
    Array.isArray(announcementData.items) && announcementData.items.length > 0
      ? announcementData.items
      : announcementData.text
      ? [
          {
            id: 'ann-1',
            text: announcementData.text,
            linkText: announcementData.linkText || '',
            linkHref: announcementData.linkHref || '',
          },
        ]
      : defaultTaxonomyConfig.announcement.items || []

  const updateItems = (newItems: typeof items) => {
    const firstItem = newItems[0] || { text: '', linkText: '', linkHref: '' }
    saveTaxonomyConfig({
      ...taxonomyConfig,
      announcement: {
        ...announcementData,
        text: firstItem.text,
        linkText: firstItem.linkText,
        linkHref: firstItem.linkHref,
        items: newItems,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-[#e51717]" />
              <span>Top Promotional Announcements Slider ({items.length} Slides)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Multi-slide banner shown at the top of every storefront page. Slides on desktop/tablet; animated moving words ticker on mobile devices.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementData.enabled}
                onChange={(e) => {
                  const updated = {
                    ...taxonomyConfig,
                    announcement: {
                      ...announcementData,
                      enabled: e.target.checked,
                    },
                  }
                  saveTaxonomyConfig(updated)
                  triggerToast(`Announcement bar ${e.target.checked ? 'enabled' : 'disabled'}.`)
                }}
                className="h-4 w-4 rounded accent-[#e51717]"
              />
              <span className="font-bold text-xs text-[#080d2d]">Enable Top Bar</span>
            </label>

            <button
              type="button"
              onClick={() => {
                const newItem = {
                  id: `ann-${Date.now()}`,
                  text: '🔥 NEW PROMOTION: ENJOY EXCLUSIVE SAVINGS ON ALL SPORT GEAR',
                  linkText: 'Shop Now',
                  linkHref: '/products',
                }
                updateItems([...items, newItem])
                triggerToast('New announcement slide added.')
              }}
              className="flex items-center gap-1.5 rounded-lg bg-[#080d2d] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#e51717] transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Slide</span>
            </button>
          </div>
        </div>

        {/* Announcement Slides List */}
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#080d2d] text-[10px] text-white">
                    {index + 1}
                  </span>
                  Announcement Slide #{index + 1}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = items.filter((_, i) => i !== index)
                      updateItems(filtered)
                      triggerToast('Announcement slide removed.')
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Announcement Message Text
                </label>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const updated = [...items]
                    updated[index] = { ...item, text: e.target.value }
                    updateItems(updated)
                  }}
                  placeholder="e.g. FREE SHIPPING ON ALL ORDERS OVER ₹1,999 • USE CODE VIRAT10"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Call-to-Action Link Text
                  </label>
                  <input
                    type="text"
                    value={item.linkText || ''}
                    onChange={(e) => {
                      const updated = [...items]
                      updated[index] = { ...item, linkText: e.target.value }
                      updateItems(updated)
                    }}
                    placeholder="e.g. Shop New Arrivals"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#e51717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={item.linkHref || ''}
                    onChange={(e) => {
                      const updated = [...items]
                      updated[index] = { ...item, linkHref: e.target.value }
                      updateItems(updated)
                    }}
                    placeholder="e.g. /products?badge=new"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#e51717]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Styling colors & Live Preview Bar */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Live Top Bar Preview:</span>
              <span className="text-[11px] text-slate-400">
                {items.length} announcements configured
              </span>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-bold text-center rounded-xl transition"
                  style={{
                    backgroundColor: announcementData.bgColor || '#080d2d',
                    color: announcementData.textColor || '#ffffff',
                  }}
                >
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
                    Slide {idx + 1}
                  </span>
                  <span>{item.text || '(Empty text)'}</span>
                  {item.linkText && (
                    <span className="underline font-black text-[#e51717]">
                      {item.linkText} →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
