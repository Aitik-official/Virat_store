'use client'

import { Tag } from 'lucide-react'

export interface ProductBasicInfoSectionProps {
  formName: string
  onNameChange: (val: string) => void
  formBadge: string
  setFormBadge: (val: string) => void
  activeBadges: string[]
  formMainCategory?: string
  setFormMainCategory?: (val: string) => void
  setFormGender?: (val: 'men' | 'women' | 'unisex') => void
  formCategory: string
  setFormCategory: (val: string) => void
  activeMainCategories: { label: string; value: string }[]
  activeCategories: { label: string; value: string; parentCategory?: string }[]
  filteredSubCategories: { label: string; value: string }[]
  formPrice: number
  setFormPrice: (val: number) => void
  formOriginalPrice: number | ''
  setFormOriginalPrice: (val: number | '') => void
}

export function ProductBasicInfoSection({
  formName,
  onNameChange,
  formBadge,
  setFormBadge,
  activeBadges,
  formMainCategory,
  setFormMainCategory,
  setFormGender,
  formCategory,
  setFormCategory,
  activeMainCategories,
  activeCategories,
  filteredSubCategories,
  formPrice,
  setFormPrice,
  formOriginalPrice,
  setFormOriginalPrice,
}: ProductBasicInfoSectionProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
        <Tag className="h-3.5 w-3.5 text-[#e51717]" />
        <span>Basic Information</span>
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Product Name *
          </label>
          <input
            type="text"
            required
            value={formName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Virat Men's Pro Series Jersey"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
          />
        </div>

        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Product Badge (Promotional Tag)
          </label>
          <div className="flex items-center gap-2">
            <select
              value={formBadge}
              onChange={(e) => setFormBadge(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#e51717] outline-none focus:border-[#e51717]"
            >
              <option value="">No Badge</option>
              {activeBadges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formBadge}
              onChange={(e) => setFormBadge(e.target.value.toUpperCase())}
              placeholder="Or custom badge..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase text-[#e51717] outline-none focus:border-[#e51717]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Main Category *
          </label>
          <select
            value={formMainCategory || 'men'}
            onChange={(e) => {
              const newMain = e.target.value
              if (setFormMainCategory) setFormMainCategory(newMain)
              if (setFormGender) {
                if (newMain === 'women') setFormGender('women')
                else if (newMain === 'men') setFormGender('men')
                else setFormGender('unisex')
              }
              // Auto-select first matching sub-category if current doesn't match
              const subList = activeCategories.filter(
                (c) => !c.parentCategory || c.parentCategory === newMain
              )
              if (subList.length > 0 && !subList.some((c) => c.value === formCategory)) {
                setFormCategory(subList[0].value)
              }
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
          >
            {activeMainCategories.map((mc) => (
              <option key={mc.value} value={mc.value}>
                {mc.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Sub-Category *
          </label>
          <select
            value={formCategory}
            onChange={(e) => setFormCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
          >
            {filteredSubCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pricing & Discounts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Selling Price (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              required
              value={formPrice}
              onChange={(e) => setFormPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-7 pr-3 font-black text-[#080d2d] outline-none focus:border-[#e51717]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block font-bold text-slate-700">
            Original / MRP Price (₹) (Optional discount line)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formOriginalPrice}
              onChange={(e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 2499"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-7 pr-3 font-medium text-slate-600 outline-none focus:border-[#e51717]"
            />
          </div>
          {formOriginalPrice && Number(formOriginalPrice) > formPrice && (
            <span className="mt-1 block text-[11px] font-bold text-emerald-600">
              Shoppers save {Math.round(((Number(formOriginalPrice) - formPrice) / Number(formOriginalPrice)) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
