'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Upload, Trash2 } from 'lucide-react'
import { compressImage } from '@/lib/image-compression'

export interface ColorSwatchItemProps {
  idx: number
  colorItem: { name: string; hex: string; image?: string }
  formColors: { name: string; hex: string; image?: string }[]
  setFormColors: (colors: { name: string; hex: string; image?: string }[]) => void
  onRemoveColor: (idx: number) => void
  formGalleryImages: string[]
  onAddGalleryImage: (img: string) => void
}

export function ColorSwatchItem({
  idx,
  colorItem,
  formColors,
  setFormColors,
  onRemoveColor,
  formGalleryImages,
  onAddGalleryImage,
}: ColorSwatchItemProps) {
  const [localHex, setLocalHex] = useState(colorItem.hex)
  const [localName, setLocalName] = useState(colorItem.name)

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-2 shadow-xs">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={localHex}
          onChange={(e) => setLocalHex(e.target.value)}
          onBlur={() => {
            if (localHex !== colorItem.hex) {
              const updated = [...formColors]
              updated[idx] = { ...updated[idx], hex: localHex }
              setFormColors(updated)
            }
          }}
          title="Click to change color shade"
          className="h-6 w-6 cursor-pointer rounded-full border border-slate-300 bg-transparent p-0 overflow-hidden"
        />
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={() => {
            if (localName !== colorItem.name) {
              const updated = [...formColors]
              updated[idx] = { ...updated[idx], name: localName }
              setFormColors(updated)
            }
          }}
          className="w-24 text-xs font-bold text-[#080d2d] outline-none"
        />
        <button
          type="button"
          onClick={() => onRemoveColor(idx)}
          className="text-slate-400 hover:text-rose-600 p-0.5 transition"
          title="Remove color"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Optional Color Specific Image */}
      <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100">
        {colorItem.image ? (
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg p-1 border border-slate-200 w-full justify-between">
            <div className="relative h-6 w-6 rounded overflow-hidden bg-white shrink-0 border border-slate-200">
              <Image
                src={colorItem.image}
                alt={colorItem.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] text-slate-500 truncate max-w-[70px]">Image set</span>
            <div className="flex items-center gap-1">
              <label className="cursor-pointer text-[10px] text-[#e51717] font-bold hover:underline">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      try {
                        const res = await compressImage(file)
                        const updated = [...formColors]
                        updated[idx] = { ...updated[idx], image: res }
                        if (typeof setFormColors === 'function') {
                          setFormColors(updated)
                        }
                        if (!formGalleryImages.includes(res)) {
                          onAddGalleryImage(res)
                        }
                      } catch (err) {
                        console.error('Image compression failed:', err)
                      }
                    }
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  const updated = [...formColors]
                  delete updated[idx].image
                  if (typeof setFormColors === 'function') {
                    setFormColors(updated)
                  }
                }}
                className="text-slate-400 hover:text-rose-500 p-0.5"
                title="Remove color photo"
              >
                <Trash2 className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex items-center gap-1 cursor-pointer text-[10px] font-bold text-slate-500 hover:text-[#080d2d] bg-slate-50 hover:bg-slate-100 rounded-md px-2 py-1 w-full justify-center transition border border-dashed border-slate-300">
            <Upload className="h-2.5 w-2.5 text-[#e51717]" />
            <span>Add Color Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  try {
                    const res = await compressImage(file)
                    const updated = [...formColors]
                    updated[idx] = { ...updated[idx], image: res }
                    if (typeof setFormColors === 'function') {
                      setFormColors(updated)
                    }
                    if (!formGalleryImages.includes(res)) {
                      onAddGalleryImage(res)
                    }
                  } catch (err) {
                    console.error('Image compression failed:', err)
                  }
                }
              }}
            />
          </label>
        )}
      </div>
    </div>
  )
}

export interface ProductColorsSectionProps {
  formColors: { name: string; hex: string; image?: string }[]
  setFormColors: (colors: { name: string; hex: string; image?: string }[]) => void
  onRemoveColor: (idx: number) => void
  newColorName: string
  setNewColorName: (val: string) => void
  newColorHex: string
  setNewColorHex: (val: string) => void
  onAddColor: () => void
  formGalleryImages: string[]
  onAddGalleryImage: (img: string) => void
}

import { Palette, Plus } from 'lucide-react'

export function ProductColorsSection({
  formColors,
  setFormColors,
  onRemoveColor,
  newColorName,
  setNewColorName,
  newColorHex,
  setNewColorHex,
  onAddColor,
  formGalleryImages,
  onAddGalleryImage,
}: ProductColorsSectionProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
          <Palette className="h-3.5 w-3.5 text-[#e51717]" />
          <span>Product Colors (Choose with Color Picker)</span>
        </h4>
        <span className="text-[11px] text-slate-400 font-medium">
          {formColors.length} color{formColors.length > 1 ? 's' : ''} available
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {formColors.map((colorItem, idx) => (
          <ColorSwatchItem
            key={idx}
            idx={idx}
            colorItem={colorItem}
            formColors={formColors}
            setFormColors={setFormColors}
            onRemoveColor={onRemoveColor}
            formGalleryImages={formGalleryImages}
            onAddGalleryImage={onAddGalleryImage}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/80">
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1">
          <input
            type="color"
            value={newColorHex}
            onChange={(e) => setNewColorHex(e.target.value)}
            className="h-6 w-6 cursor-pointer rounded-full border-0 bg-transparent p-0"
          />
          <input
            type="text"
            placeholder="Color Name (e.g. Royal Blue)"
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            className="text-xs font-medium text-[#080d2d] outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onAddColor}
          className="flex items-center gap-1 rounded-lg bg-[#080d2d] px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Color</span>
        </button>
      </div>
    </div>
  )
}
