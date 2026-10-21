'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ImageIcon,
  Upload,
  Trash2,
  Plus,
  AlertCircle,
} from 'lucide-react'
import { validateAndNormalizeMediaUrl } from '@/lib/media-url'
import { compressImage } from '@/lib/image-compression'

export interface ProductGallerySectionProps {
  formGalleryImages: string[]
  onRemoveGalleryImage: (idx: number) => void
  onAddGalleryImage: (img: string) => void
  onReplaceGalleryImage?: (idx: number, newImg: string) => void
  onSetMainGalleryImage?: (idx: number) => void
}

export function ProductGallerySection({
  formGalleryImages,
  onRemoveGalleryImage,
  onAddGalleryImage,
  onReplaceGalleryImage,
  onSetMainGalleryImage,
}: ProductGallerySectionProps) {
  const [galleryUrlInput, setGalleryUrlInput] = useState('')
  const [galleryUrlError, setGalleryUrlError] = useState<string | null>(null)

  const handleAddUrlImage = () => {
    if (!galleryUrlInput.trim()) return
    const validation = validateAndNormalizeMediaUrl(galleryUrlInput.trim())
    if (!validation.isValid) {
      setGalleryUrlError(validation.error || 'Invalid or untrusted URL')
      return
    }

    onAddGalleryImage(validation.normalizedUrl)
    setGalleryUrlInput('')
    setGalleryUrlError(null)
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5 text-[#e51717]" />
          <span>Product Showcase Photos ({formGalleryImages.length})</span>
        </h4>
        <span className="text-[11px] text-slate-400">
          First image is used as the main display photo
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {formGalleryImages.map((imgSrc, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white p-2 flex flex-col justify-between"
          >
            <Image
              src={imgSrc}
              alt={`Photo ${i + 1}`}
              fill
              className="object-contain p-2"
            />
            {i === 0 ? (
              <span className="absolute left-2 top-2 z-10 rounded bg-[#080d2d] px-1.5 py-0.5 text-[9px] font-black uppercase text-white shadow">
                Main Photo
              </span>
            ) : (
              onSetMainGalleryImage && (
                <button
                  type="button"
                  onClick={() => onSetMainGalleryImage(i)}
                  className="absolute left-2 top-2 z-10 rounded bg-slate-800/80 hover:bg-[#080d2d] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white opacity-0 group-hover:opacity-100 transition shadow"
                  title="Set as main display photo"
                >
                  Set Main
                </button>
              )
            )}

            <div className="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              {onReplaceGalleryImage && (
                <label
                  className="cursor-pointer rounded-full bg-[#080d2d] p-1.5 text-white hover:bg-slate-700 transition shadow"
                  title="Replace this image"
                >
                  <Upload className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        try {
                          const res = await compressImage(file)
                          onReplaceGalleryImage(i, res)
                        } catch (err) {
                          console.error('Image compression failed:', err)
                        }
                      }
                    }}
                  />
                </label>
              )}
              <button
                type="button"
                onClick={() => onRemoveGalleryImage(i)}
                className="rounded-full bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition shadow"
                title="Remove photo"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#080d2d] px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition w-full sm:w-auto">
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Image from Device</span>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  try {
                    const res = await compressImage(file)
                    onAddGalleryImage(res)
                  } catch (err) {
                    console.error('Image compression failed:', err)
                  }
                }
              }}
              className="hidden"
            />
          </label>

          <div className="flex flex-1 items-center gap-1.5 w-full">
            <input
              type="text"
              placeholder="Or paste Google Drive / image link..."
              value={galleryUrlInput}
              onChange={(e) => {
                setGalleryUrlInput(e.target.value)
                if (galleryUrlError) setGalleryUrlError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddUrlImage()
                }
              }}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-xs outline-none transition ${
                galleryUrlError ? 'border-rose-500 text-rose-700' : 'border-slate-300 focus:border-[#e51717]'
              }`}
            />
            <button
              type="button"
              onClick={handleAddUrlImage}
              disabled={!galleryUrlInput.trim()}
              className="flex shrink-0 items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-40 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {galleryUrlError && (
          <div className="flex items-start gap-1.5 rounded-md bg-rose-50 p-2 text-[11px] text-rose-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-500" />
            <span>{galleryUrlError}</span>
          </div>
        )}

        <p className="text-[10px] text-slate-400">
          💡 Paste any Google Drive link (e.g. <code>https://drive.google.com/file/d/...</code>) or trusted CDN link. Google Drive links will be automatically converted to fast streaming direct images.
        </p>
      </div>
    </div>
  )
}
