'use client'

import { CheckSquare, Check, X, Plus } from 'lucide-react'

export interface ProductSizesSectionProps {
  formSizes: string[]
  onToggleSize: (size: string) => void
  activeSizes: string[]
  customSizeInput: string
  setCustomSizeInput: (val: string) => void
  onAddCustomSize: () => void
}

export function ProductSizesSection({
  formSizes,
  onToggleSize,
  activeSizes,
  customSizeInput,
  setCustomSizeInput,
  onAddCustomSize,
}: ProductSizesSectionProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <CheckSquare className="h-3.5 w-3.5 text-[#e51717]" />
          <span>Available Sizes</span>
        </h4>
        <span className="text-[11px] text-slate-400">
          Click any size to enable or disable
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeSizes.map((size) => {
          const isSelected = formSizes.includes(size)
          return (
            <button
              key={size}
              type="button"
              onClick={() => onToggleSize(size)}
              className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-black transition ${
                isSelected
                  ? 'border-[#080d2d] bg-[#080d2d] text-white shadow-xs'
                  : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
              }`}
            >
              {isSelected && <Check className="h-3 w-3 text-[#e51717]" />}
              <span>{size}</span>
            </button>
          )
        })}

        {formSizes
          .filter((s) => !activeSizes.includes(s))
          .map((customSize) => (
            <button
              key={customSize}
              type="button"
              onClick={() => onToggleSize(customSize)}
              className="flex items-center gap-1.5 rounded-lg border border-[#080d2d] bg-[#080d2d] px-3.5 py-1.5 text-xs font-black text-white"
            >
              <Check className="h-3 w-3 text-[#e51717]" />
              <span>{customSize}</span>
              <X className="h-3 w-3 ml-1 text-slate-400 hover:text-white" />
            </button>
          ))}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
        <input
          type="text"
          placeholder="Add custom size (e.g. 4XL or 156g)..."
          value={customSizeInput}
          onChange={(e) => setCustomSizeInput(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-[#e51717]"
        />
        <button
          type="button"
          onClick={onAddCustomSize}
          disabled={!customSizeInput.trim()}
          className="flex items-center gap-1 rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-300 disabled:opacity-40 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  )
}
