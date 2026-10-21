'use client'

import { Star, Check, ShieldCheck } from 'lucide-react'
import type { ReviewItem } from '@/lib/products-data'

export interface ProductDetailsReviewsProps {
  productName: string
  productRating: number
  productReviewsCount: number
  reviewsList: ReviewItem[]
  showReviewForm: boolean
  setShowReviewForm: (show: boolean) => void
  reviewSuccess: boolean
  reviewAuthor: string
  setReviewAuthor: (author: string) => void
  reviewRating: number
  setReviewRating: (rating: number) => void
  reviewTitle: string
  setReviewTitle: (title: string) => void
  reviewComment: string
  setReviewComment: (comment: string) => void
  onSubmitReview: (e: React.FormEvent) => void
  helpfulVoted: Record<string, boolean>
  onHelpfulClick: (revId: string) => void
}

export function ProductDetailsReviews({
  productName,
  productRating,
  productReviewsCount,
  reviewsList,
  showReviewForm,
  setShowReviewForm,
  reviewSuccess,
  reviewAuthor,
  setReviewAuthor,
  reviewRating,
  setReviewRating,
  reviewTitle,
  setReviewTitle,
  reviewComment,
  setReviewComment,
  onSubmitReview,
  helpfulVoted,
  onHelpfulClick,
}: ProductDetailsReviewsProps) {
  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Verified Feedback
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#080d2d]">
            Customer Reviews ({reviewsList.length || productReviewsCount})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real reviews from cricketers and athletes who train with {productName}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#080d2d] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#e51717] shrink-0 self-start sm:self-auto"
        >
          <Star className="size-4 text-amber-400 fill-amber-400" />
          <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Rating Summary Card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <span className="text-5xl font-black text-[#080d2d] tracking-tighter">
            {productRating ? productRating.toFixed(1) : '4.9'}
          </span>
          <div className="mt-2 flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < Math.round(productRating || 5)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs font-bold text-slate-500">
            Based on {reviewsList.length || productReviewsCount} verified ratings
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-200">
            <Check className="size-3 text-emerald-600" /> 98% recommend this product
          </span>
        </div>

        {/* Rating Distribution Breakdown */}
        <div className="space-y-2 md:col-span-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const countForStar = reviewsList.filter((r) => r.rating === stars).length
            const total = reviewsList.length || 1
            const percentage = Math.round(
              reviewsList.length > 0
                ? (countForStar / total) * 100
                : stars === 5
                ? 80
                : stars === 4
                ? 15
                : 5
            )

            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 w-14 shrink-0 font-bold text-slate-700">
                  <span>{stars}</span>
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] font-bold text-slate-400">
                  {percentage}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Write Review Form Card */}
      {showReviewForm && (
        <div className="mt-6 rounded-2xl border-2 border-slate-900 bg-slate-50 p-6 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#080d2d]">
                Share Your Experience with {productName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Your feedback helps athletes choose the best performance gear.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700"
            >
              ✕ Close
            </button>
          </div>

          {reviewSuccess ? (
            <div className="my-6 flex items-center gap-3 rounded-xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800 border border-emerald-300">
              <Check className="size-5 text-emerald-600 shrink-0" />
              <span>
                Thank you! Your verified review has been submitted and published successfully.
              </span>
            </div>
          ) : (
            <form onSubmit={onSubmitReview} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Tendulkar"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Overall Rating *</label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        className="focus:outline-none transition hover:scale-125"
                      >
                        <Star
                          className={`size-6 ${
                            s <= reviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-black uppercase text-slate-700">
                      {reviewRating === 5
                        ? 'Excellent (5 Stars)'
                        : reviewRating === 4
                        ? 'Very Good (4 Stars)'
                        : reviewRating === 3
                        ? 'Average (3 Stars)'
                        : reviewRating === 2
                        ? 'Fair (2 Stars)'
                        : 'Poor (1 Star)'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Review Headline (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best match jersey I've ever played in"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Review *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the fabric quality, breathability, durability, and fit..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#e51717] px-6 py-2.5 font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="mt-8 space-y-4">
        {reviewsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="size-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
              <Star className="size-6 fill-amber-400" />
            </div>
            <h4 className="font-black text-sm uppercase text-[#080d2d]">No Reviews Yet</h4>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              Be the first cricketer to share your experience with {productName}!
            </p>
            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="mt-4 rounded-xl bg-[#080d2d] px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#e51717] transition"
            >
              Write First Review
            </button>
          </div>
        ) : (
          reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition hover:border-slate-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#080d2d] text-white font-black text-xs shrink-0 uppercase">
                    {rev.author.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-xs sm:text-sm text-[#080d2d]">
                        {rev.author}
                      </span>
                      {rev.verified !== false && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-200">
                          <Check className="size-3 text-emerald-600" />
                          Verified Athlete
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3">
                {rev.title && (
                  <h4 className="font-black text-xs sm:text-sm text-[#080d2d] mb-1">
                    {rev.title}
                  </h4>
                )}
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3.5 text-slate-400" />
                  Verified Customer Purchase
                </span>

                <button
                  type="button"
                  onClick={() => onHelpfulClick(rev.id)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    helpfulVoted[rev.id]
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <span>Helpful?</span>
                  <span className="font-black">({(rev.helpfulCount || 0) + (helpfulVoted[rev.id] ? 1 : 0)})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
