'use client'

import { useState } from 'react'
import { Maximize2, Plus, Trash2 } from 'lucide-react'
import type { StoreTaxonomyConfig } from '@/lib/store-taxonomy'

export interface TaxonomySizesSubtabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
}

export function TaxonomySizesSubtab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
}: TaxonomySizesSubtabProps) {
  const [newSizeInput, setNewSizeInput] = useState('')

  const handleAddSize = () => {
    const trimmed = newSizeInput.trim()
    if (!trimmed) return
    if (taxonomyConfig.sizes.includes(trimmed)) {
      triggerToast(`Size "${trimmed}" is already in the list.`)
      return
    }
    const updated = {
      ...taxonomyConfig,
      sizes: [...taxonomyConfig.sizes, trimmed],
    }
    saveTaxonomyConfig(updated)
    setNewSizeInput('')
    triggerToast(`Size "${trimmed}" added!`)
  }

  const handleDeleteSize = (sizeVal: string) => {
    if (taxonomyConfig.sizes.length <= 1) {
      triggerToast('At least one size is required.')
      return
    }
    const updated = {
      ...taxonomyConfig,
      sizes: taxonomyConfig.sizes.filter((s) => s !== sizeVal),
    }
    saveTaxonomyConfig(updated)
    triggerToast(`Size "${sizeVal}" removed.`)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <Maximize2 className="h-4 w-4 text-[#e51717]" />
          <span>Global Size Standards</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Add standard apparel sizes (e.g. XS, 4XL) or ball/equipment dimensions (e.g. 156g, Harrow, Full Size SH).
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <input
            type="text"
            placeholder="Enter size label (e.g. 4XL, 156g, Size 6)..."
            value={newSizeInput}
            onChange={(e) => setNewSizeInput(e.target.value)}
            className="w-full sm:max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
          />
          <button
            type="button"
            onClick={handleAddSize}
            disabled={!newSizeInput.trim()}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Size</span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {taxonomyConfig.sizes.map((sz, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#080d2d]"
            >
              <span>{sz}</span>
              <button
                type="button"
                onClick={() => handleDeleteSize(sz)}
                className="text-slate-400 hover:text-rose-600 transition"
                title={`Delete size ${sz}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
