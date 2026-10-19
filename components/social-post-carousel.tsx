'use client'

import { useEffect, useState } from 'react'
import { Heart, AtSign, MessageCircle, Play, X as XIcon } from 'lucide-react'
import type { SocialPlatform, SocialPost } from '@/lib/social-posts'
import { platformLabels } from '@/lib/social-posts'

/* ─── Platform colours & icons ───────────────────────────── */
const platformConfig: Record<SocialPlatform, { icon: typeof AtSign; color: string; bg: string }> = {
  instagram: { icon: AtSign,        color: '#e51717', bg: '#fff0f0' },
  facebook:  { icon: MessageCircle, color: '#080d2d', bg: '#eef0f8' },
  x:         { icon: XIcon,         color: '#080d2d', bg: '#f0f0f0' },
}

/* ─── Single Card ────────────────────────────────────────── */
export function SocialPostCard({ post }: { post: SocialPost }) {
  const { icon: Icon, color, bg } = platformConfig[post.platform]

  const card = (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e51717]/40 hover:shadow-xl hover:shadow-[#e51717]/10">
      {/* Header */}
      <header className="flex items-center gap-3 rounded-t-2xl border-b border-slate-700 bg-[#080d2d] px-4 py-3">
        {post.profileImage ? (
          <img src={post.profileImage} alt="" className="size-9 rounded-full object-cover ring-2 ring-[#e51717]/60" />
        ) : (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full ring-2 ring-white/10" style={{ background: bg }}>
            <Icon className="size-4" style={{ color }} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{post.accountName}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{platformLabels[post.platform]}</p>
        </div>
        <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest" style={{ background: bg, color }}>
          {platformLabels[post.platform]}
        </span>
      </header>

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.caption || `${post.accountName} post`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="size-full" aria-label="Social post media placeholder" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d2d]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {post.mediaType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#e51717] shadow-lg shadow-[#e51717]/40">
              <Play className="ml-1 size-5 fill-white text-white" />
            </span>
          </div>
        )}
      </div>

      {/* Caption + meta */}
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {post.caption || 'Add a caption in lib/social-posts.ts'}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span className="font-medium text-slate-400">{post.publishedAt || ''}</span>
          {post.likeCount ? (
            <span className="flex items-center gap-1 font-bold text-[#e51717]">
              <Heart className="size-3.5 fill-[#e51717]" />
              {post.likeCount.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )

  return post.postUrl ? (
    <a href={post.postUrl} target="_blank" rel="noreferrer" aria-label={`Open ${platformLabels[post.platform]} post from ${post.accountName}`}>
      {card}
    </a>
  ) : card
}

/* ─── Carousel wrapper ───────────────────────────────────── */
export function SocialPostCarousel({ posts }: { posts: SocialPost[] }) {
  const [active, setActive] = useState(0)
  const total = posts.length

  // Number of visible cards per breakpoint:
  // Mobile (<640px): 1 card visible
  // Tablet (640px - 767px): 2 cards visible
  // Desktop (>=768px): 4 cards visible
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(4)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Limit PC and tablet view so when the user slides, it stops when the last card is aligned on the right
  const maxIndex = Math.max(0, total - visibleCount)

  // Ensure active doesn't exceed maxIndex if screen resized
  useEffect(() => {
    if (active > maxIndex) {
      setActive(maxIndex)
    }
  }, [maxIndex, active])

  const next = () => {
    setActive((c) => (c >= maxIndex ? 0 : c + 1))
  }

  const previous = () => {
    setActive((c) => (c <= 0 ? maxIndex : c - 1))
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      next()
    } else if (distance < -minSwipeDistance) {
      previous()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section id="see-it-in-action" className="border-b border-slate-200 bg-[#f7f8f5] px-4 py-6 sm:px-6 md:px-12 md:py-10 select-none">
      <div className="mx-auto max-w-6xl">

        {/* Section header + nav arrows on same row (arrows hidden on mobile) */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 md:items-end">
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <span className="h-0.5 w-5 bg-[#e51717]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e51717]">ON THE PITCH</span>
            </div>
            <h2 className="text-xl font-black uppercase leading-[0.95] text-[#080d2d] sm:text-2xl md:text-3xl">
              See it<br />in action<span className="text-[#e51717]">.</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">Follow the action. Share the passion.</p>
          </div>

          {/* Slider buttons hidden on mobile, visible on desktop / tablet */}
          {total > visibleCount && (
            <div className="hidden md:flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={previous}
                aria-label="Previous social post"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white md:size-10"
              >
                <svg className="size-3.5 md:size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 12L6 8l4-4"/></svg>
              </button>
              <span className="min-w-[2.5rem] text-center text-xs font-bold tabular-nums text-slate-400">
                <span className="text-[#e51717]">{String(active + 1).padStart(2, '0')}</span>/{String(total).padStart(2, '0')}
              </span>
              <button
                onClick={next}
                aria-label="Next social post"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#080d2d] shadow-sm transition hover:border-[#e51717] hover:bg-[#080d2d] hover:text-white md:size-10"
              >
                <svg className="size-3.5 md:size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l4 4-4 4"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* Slide track — mobile: 1 card at a time (w-full); sm: 2 cards; md+: 4 cards */}
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${active * (100 / visibleCount)}%)`,
            }}
          >
            {total ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="w-full shrink-0 px-2 sm:w-1/2 md:w-1/4"
                >
                  <SocialPostCard post={post} />
                </div>
              ))
            ) : (
              <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500">
                Add Instagram, Facebook, or X posts in{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">lib/social-posts.ts</code>{' '}
                to populate this gallery.
              </div>
            )}
          </div>
        </div>

        {/* Mobile dot indicators (swipe/tap indicators) */}
        {total > 1 && (
          <div className="mt-6 flex justify-center gap-1.5 md:hidden">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(Math.min(i, maxIndex))}
                aria-label={`Go to post ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-[#e51717]' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}


