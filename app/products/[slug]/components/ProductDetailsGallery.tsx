'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'

export interface ProductDetailsGalleryProps {
  productName: string
  productImage?: string
  productBadge?: string
  allImages: string[]
  selectedImage: number
  setSelectedImage: (idx: number | ((prev: number) => number)) => void
}

export function ProductDetailsGallery({
  productName,
  productImage,
  productBadge,
  allImages,
  selectedImage,
  setSelectedImage,
}: ProductDetailsGalleryProps) {
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
    if (!touchStart || !touchEnd || allImages.length <= 1) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      setSelectedImage((prev) => (prev + 1) % allImages.length)
    } else if (distance < -minSwipeDistance) {
      setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div className="lg:col-span-6 flex flex-col gap-3">
      {/* Main Selected Image Card */}
      <div
        className="relative aspect-[4/3] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f6] shadow-sm select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allImages[selectedImage] || productImage ? (
          <Image
            src={allImages[selectedImage] || productImage || ''}
            alt={productName}
            fill
            priority
            className="object-contain p-4 sm:p-6 transition-all duration-300 pointer-events-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
            <ShoppingBag className="w-12 h-12 text-slate-300" />
            <span className="text-xs font-semibold">Image to be uploaded</span>
          </div>
        )}
        {productBadge && (
          <span className="absolute left-3.5 top-3.5 rounded-md bg-[#e51717] px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-md">
            {productBadge}
          </span>
        )}

        {/* Mobile swipe indicator dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex sm:hidden justify-center gap-1.5 z-10">
            {allImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  selectedImage === idx ? 'w-4 bg-[#e51717]' : 'w-1.5 bg-black/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails below the main image */}
      {allImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className={`relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition-all ${
                selectedImage === idx
                  ? 'border-[#e51717] ring-2 ring-[#e51717]/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image src={img} alt="" fill className="object-contain p-1.5" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
