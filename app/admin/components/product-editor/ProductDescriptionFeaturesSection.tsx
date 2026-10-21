'use client'

import { ListPlus, Plus, X } from 'lucide-react'

export interface ProductDescriptionFeaturesSectionProps {
  formDescription: string
  setFormDescription: (val: string) => void
  formFeatures: string[]
  newFeatureInput: string
  setNewFeatureInput: (val: string) => void
  onAddFeature: () => void
  onRemoveFeature: (idx: number) => void
}

export function ProductDescriptionFeaturesSection({
  formDescription,
  setFormDescription,
  formFeatures,
  newFeatureInput,
  setNewFeatureInput,
  onAddFeature,
  onRemoveFeature,
}: ProductDescriptionFeaturesSectionProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
        <ListPlus className="h-3.5 w-3.5 text-[#e51717]" />
        <span>Description &amp; Features</span>
      </h4>

      <div>
        <label className="mb-1 block font-bold text-slate-700">
          Product Description *
        </label>
        <textarea
          rows={3}
          required
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Describe the fabric, breathability, match suitability, and feel..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
        />
      </div>

      <div>
        <label className="mb-1 block font-bold text-slate-700">
          Key Performance Bullet Points (Shown on Product Detail Page)
        </label>
        <div className="space-y-1.5 mb-2.5">
          {formFeatures.map((feat, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#e51717]" />
                <span>{feat}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFeature(i)}
                className="text-slate-400 hover:text-rose-600 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add bullet point (e.g. 4-way stretch ergonomic fit)..."
            value={newFeatureInput}
            onChange={(e) => setNewFeatureInput(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-[#e51717]"
          />
          <button
            type="button"
            onClick={onAddFeature}
            disabled={!newFeatureInput.trim()}
            className="flex items-center gap-1 rounded-lg bg-[#080d2d] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 shrink-0 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Feature</span>
          </button>
        </div>
      </div>
    </div>
  )
}
