'use client'

export interface ProductStockRatingSectionProps {
  formInStock: boolean
  setFormInStock: (val: boolean) => void
  formRating: number
  setFormRating: (val: number) => void
  formReviewsCount: number
  setFormReviewsCount: (val: number) => void
}

export function ProductStockRatingSection({
  formInStock,
  setFormInStock,
  formRating,
  setFormRating,
  formReviewsCount,
  setFormReviewsCount,
}: ProductStockRatingSectionProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={formInStock}
          onChange={(e) => setFormInStock(e.target.checked)}
          className="h-4 w-4 rounded accent-[#e51717]"
        />
        <div>
          <span className="font-bold text-xs text-[#080d2d] block">In Stock &amp; Ready to Ship</span>
          <span className="text-[11px] text-slate-400">Shoppers can purchase this item immediately</span>
        </div>
      </label>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-slate-600">Star Rating:</span>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={formRating}
            onChange={(e) => setFormRating(Number(e.target.value))}
            className="w-14 rounded border border-slate-300 bg-white px-2 py-1 text-center font-bold text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-slate-600">Review Count:</span>
          <input
            type="number"
            min="0"
            value={formReviewsCount}
            onChange={(e) => setFormReviewsCount(Number(e.target.value))}
            className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-bold text-xs"
          />
        </div>
      </div>
    </div>
  )
}
