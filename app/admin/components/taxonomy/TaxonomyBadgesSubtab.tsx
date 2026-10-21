'use client'

import { useState } from 'react'
import { Sparkles, Plus, Trash2 } from 'lucide-react'
import type { StoreTaxonomyConfig, TagBadgeItem } from '@/lib/store-taxonomy'

export interface TaxonomyBadgesSubtabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
}

export function TaxonomyBadgesSubtab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
}: TaxonomyBadgesSubtabProps) {
  const [newBadgeName, setNewBadgeName] = useState('')
  const [newBadgeBg, setNewBadgeBg] = useState('#e51717')
  const [newBadgeText, setNewBadgeText] = useState('#ffffff')

  const handleAddBadge = () => {
    if (!newBadgeName.trim()) {
      triggerToast('Please enter a badge/tag name.')
      return
    }
    const nameUpper = newBadgeName.trim().toUpperCase()
    if (taxonomyConfig.badges.some((b) => b.name === nameUpper)) {
      triggerToast(`Badge "${nameUpper}" already exists.`)
      return
    }

    const newBadge: TagBadgeItem = {
      id: `badge-${Date.now()}`,
      name: nameUpper,
      bgColor: newBadgeBg,
      textColor: newBadgeText,
    }

    const updated = {
      ...taxonomyConfig,
      badges: [...taxonomyConfig.badges, newBadge],
    }
    saveTaxonomyConfig(updated)
    setNewBadgeName('')
    triggerToast(`Promotional Badge "${nameUpper}" added!`)
  }

  const handleDeleteBadge = (badgeId: string) => {
    if (taxonomyConfig.badges.length <= 1) {
      triggerToast('At least one badge must remain.')
      return
    }
    const updated = {
      ...taxonomyConfig,
      badges: taxonomyConfig.badges.filter((b) => b.id !== badgeId),
    }
    saveTaxonomyConfig(updated)
    triggerToast('Badge removed.')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#e51717]" />
          <span>Create Promotional Badge or Tag</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Add custom tags like FLASH SALE, LIMITED, TEST GRADE with custom background and text colors.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Badge Text *
            </label>
            <input
              type="text"
              placeholder="e.g. FLASH SALE, BESTSELLER"
              value={newBadgeName}
              onChange={(e) => setNewBadgeName(e.target.value.toUpperCase())}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase text-[#080d2d] outline-none focus:border-[#e51717]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Background Color
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 shadow-xs focus-within:border-[#e51717] focus-within:ring-1 focus-within:ring-[#e51717]">
              <label
                className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 overflow-hidden shadow-inner shrink-0 hover:scale-105 transition"
                title="Click to pick background color"
              >
                <input
                  type="color"
                  value={newBadgeBg}
                  onChange={(e) => setNewBadgeBg(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  className="h-full w-full"
                  style={{ backgroundColor: newBadgeBg }}
                />
              </label>
              <input
                type="text"
                value={newBadgeBg}
                onChange={(e) => setNewBadgeBg(e.target.value)}
                className="w-20 font-mono text-xs font-bold uppercase text-[#080d2d] outline-none"
                placeholder="#E51717"
              />
              <div className="flex items-center gap-1 ml-auto">
                {['#e51717', '#080d2d', '#10b981', '#f59e0b', '#8b5cf6'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewBadgeBg(c)}
                    className="h-4 w-4 rounded-full border border-white shadow-xs hover:scale-125 transition"
                    style={{ backgroundColor: c }}
                    title={`Select ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Text Color
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 shadow-xs focus-within:border-[#e51717] focus-within:ring-1 focus-within:ring-[#e51717]">
              <label
                className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 overflow-hidden shadow-inner shrink-0 hover:scale-105 transition"
                title="Click to pick text color"
              >
                <input
                  type="color"
                  value={newBadgeText}
                  onChange={(e) => setNewBadgeText(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  className="h-full w-full"
                  style={{ backgroundColor: newBadgeText }}
                />
              </label>
              <input
                type="text"
                value={newBadgeText}
                onChange={(e) => setNewBadgeText(e.target.value)}
                className="w-20 font-mono text-xs font-bold uppercase text-[#080d2d] outline-none"
                placeholder="#FFFFFF"
              />
              <div className="flex items-center gap-1 ml-auto">
                {['#ffffff', '#080d2d', '#f8fafc', '#1e293b'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewBadgeText(c)}
                    className="h-4 w-4 rounded-full border border-slate-300 shadow-xs hover:scale-125 transition"
                    style={{ backgroundColor: c }}
                    title={`Select ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddBadge}
              className="flex items-center gap-1.5 rounded-lg bg-[#e51717] px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Add Badge</span>
            </button>
          </div>
        </div>

        {/* Live Badge Preview */}
        {newBadgeName && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Live Preview:</span>
            <span
              className="rounded-full px-3 py-1 text-xs font-black tracking-wider shadow-xs"
              style={{ backgroundColor: newBadgeBg, color: newBadgeText }}
            >
              {newBadgeName}
            </span>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-wider text-[#080d2d]">
          Active Promotional Badges ({taxonomyConfig.badges.length})
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Available in the product editor dropdown to highlight hero products.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {taxonomyConfig.badges.map((badge, idx) => (
            <div
              key={badge.id || idx}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <span
                className="rounded-full px-3 py-1 text-[11px] font-black tracking-wider shadow-xs"
                style={{ backgroundColor: badge.bgColor, color: badge.textColor }}
              >
                {badge.name}
              </span>

              <button
                type="button"
                onClick={() => handleDeleteBadge(badge.id)}
                className="text-slate-400 hover:text-rose-600 transition"
                title={`Delete badge ${badge.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
