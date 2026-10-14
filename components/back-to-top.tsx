'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      id="back-to-top"
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      className={`fixed bottom-8 right-6 z-50 flex flex-col items-center justify-center gap-1 rounded-2xl border-2 shadow-xl transition-all duration-500 ease-out
        ${visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-16 opacity-0 pointer-events-none'}
        ${hovered
          ? 'bg-[#e51717] border-[#e51717] text-white scale-110 shadow-[0_8px_32px_rgba(229,23,23,0.45)]'
          : 'bg-[#080d2d] border-[#080d2d] text-white shadow-[0_4px_24px_rgba(8,13,45,0.35)]'
        }
      `}
      style={{ width: 52, height: 52 }}
    >
      <ChevronUp
        className={`transition-transform duration-300 ${hovered ? '-translate-y-0.5' : ''}`}
        size={22}
        strokeWidth={2.5}
      />
    </button>
  )
}
