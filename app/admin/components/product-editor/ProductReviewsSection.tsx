'use client'

import { useState } from 'react'
import { Star, Trash2, Plus } from 'lucide-react'
import type { ReviewItem } from '@/lib/products-data'

export interface ProductReviewsSectionProps {
  formReviews: ReviewItem[]
  setFormReviews?: React.Dispatch<React.SetStateAction<ReviewItem[]>>
  setFormReviewsCount: (val: number) => void
  setFormRating: (val: number) => void
}

export function ProductReviewsSection({
  formReviews = [],
  setFormReviews,
  setFormReviewsCount,
  setFormRating,
}: ProductReviewsSectionProps) {
  const [newReviewAuthor, setNewReviewAuthor] = useState('')
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [newReviewComment, setNewReviewComment] = useState('')

  const handleAddReviewItem = () => {
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: Number(newReviewRating) || 5,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle.trim() || undefined,
      comment: newReviewComment.trim(),
      verified: true,
      helpfulCount: 0,
    }
    const updated = [newRev, ...formReviews]
    if (setFormReviews) setFormReviews(updated)
    setFormReviewsCount(updated.length)
    const avg = Number((updated.reduce((s, r) => s + r.rating, 0) / updated.length).toFixed(1))
    setFormRating(avg)

    setNewReviewAuthor('')
    setNewReviewTitle('')
    setNewReviewComment('')
    setNewReviewRating(5)
  }

  const handleRemoveReviewItem = (revId: string) => {
    const updated = formReviews.filter((r) => r.id !== revId)
    if (setFormReviews) setFormReviews(updated)
    setFormReviewsCount(updated.length)
    if (updated.length > 0) {
      const avg = Number((updated.reduce((s, r) => s + r.rating, 0) / updated.length).toFixed(1))
      setFormRating(avg)
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span>Customer Reviews List ({formReviews.length})</span>
        </h4>
        <span className="text-[11px] text-slate-400">
          Shown under the product details page
        </span>
      </div>

      {/* Existing Reviews List */}
      {formReviews.length === 0 ? (
        <p className="text-xs italic text-slate-400 py-2">
          No customer reviews added yet. Add testimonials below to display on the storefront!
        </p>
      ) : (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {formReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-[#080d2d]">{rev.author}</span>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] font-black uppercase text-emerald-700 border border-emerald-200">
                      Verified Purchase
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                {rev.title && (
                  <p className="font-bold text-[#080d2d] text-xs mt-0.5">{rev.title}</p>
                )}
                <p className="text-slate-600 text-xs mt-1">{rev.comment}</p>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveReviewItem(rev.id)}
                className="text-slate-400 hover:text-rose-600 p-1 shrink-0 transition"
                title="Delete review"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Review Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2.5">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#080d2d] block">
          Add Customer Review / Testimonial
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Author Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={newReviewAuthor}
              onChange={(e) => setNewReviewAuthor(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Rating (1 - 5) *</label>
            <select
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-bold outline-none focus:border-[#e51717] focus:bg-white"
            >
              <option value="5">★★★★★ (5 Stars)</option>
              <option value="4">★★★★☆ (4 Stars)</option>
              <option value="3">★★★☆☆ (3 Stars)</option>
              <option value="2">★★☆☆☆ (2 Stars)</option>
              <option value="1">★☆☆☆☆ (1 Star)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Review Headline</label>
            <input
              type="text"
              placeholder="e.g. Excellent fit and breathability"
              value={newReviewTitle}
              onChange={(e) => setNewReviewTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Customer Comment *</label>
          <textarea
            rows={2}
            placeholder="What did the customer say about performance, comfort, fabric, or sizing?"
            value={newReviewComment}
            onChange={(e) => setNewReviewComment(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717] focus:bg-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddReviewItem}
            disabled={!newReviewAuthor.trim() || !newReviewComment.trim()}
            className="flex items-center gap-1 rounded-lg bg-[#080d2d] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Review</span>
          </button>
        </div>
      </div>
    </div>
  )
}
