'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  X,
  Tag,
  Palette,
  CheckSquare,
  Check,
  ImageIcon,
  Trash2,
  Upload,
  ListPlus,
  Plus,
  AlertCircle,
  Link as LinkIcon,
  Star,
} from 'lucide-react'
import {
  categoryOptions,
  sportOptions,
  type Product,
} from '@/lib/products-data'
import { validateAndNormalizeMediaUrl } from '@/lib/media-url'
import { compressImage } from '@/lib/image-compression'

export const PRESET_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size']
export const PRESET_BADGES = ['', 'NEW', 'BESTSELLER', 'HOT', 'LIMITED', 'SALE', 'PRO']

function ColorSwatchItem({
  idx,
  colorItem,
  formColors,
  setFormColors,
  onRemoveColor,
  formGalleryImages,
  onAddGalleryImage,
}: {
  idx: number
  colorItem: { name: string; hex: string; image?: string }
  formColors: { name: string; hex: string; image?: string }[]
  setFormColors: (colors: { name: string; hex: string; image?: string }[]) => void
  onRemoveColor: (idx: number) => void
  formGalleryImages: string[]
  onAddGalleryImage: (img: string) => void
}) {
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

export interface ProductEditorModalProps {
  mainCategoriesList?: { label: string; value: string }[]
  categoriesList?: { label: string; value: string; parentCategory?: string }[]
  sportsList?: { label: string; value: string }[]
  badgesList?: string[]
  sizesList?: string[]
  isOpen: boolean
  onClose: () => void
  editingProduct: Product | null
  onSubmit: (e: React.FormEvent) => void
  formName: string
  onNameChange: (val: string) => void
  formBadge: string
  setFormBadge: (val: string) => void
  formGender: 'men' | 'women' | 'unisex'
  setFormGender: (val: 'men' | 'women' | 'unisex') => void
  formMainCategory?: string
  setFormMainCategory?: (val: string) => void
  formCategory: string
  setFormCategory: (val: string) => void
  formSport?: string
  setFormSport?: (val: string) => void
  formPrice: number
  setFormPrice: (val: number) => void
  formOriginalPrice: number | ''
  setFormOriginalPrice: (val: number | '') => void
  formColors: { name: string; hex: string; image?: string }[]
  setFormColors: (colors: { name: string; hex: string; image?: string }[]) => void
  onRemoveColor: (idx: number) => void
  newColorName: string
  setNewColorName: (val: string) => void
  newColorHex: string
  setNewColorHex: (val: string) => void
  onAddColor: () => void
  formSizes: string[]
  onToggleSize: (size: string) => void
  customSizeInput: string
  setCustomSizeInput: (val: string) => void
  onAddCustomSize: () => void
  formGalleryImages: string[]
  onRemoveGalleryImage: (idx: number) => void
  onAddGalleryImage: (img: string) => void
  onReplaceGalleryImage?: (idx: number, newImg: string) => void
  onSetMainGalleryImage?: (idx: number) => void
  formDescription: string
  setFormDescription: (val: string) => void
  formFeatures: string[]
  newFeatureInput: string
  setNewFeatureInput: (val: string) => void
  onAddFeature: () => void
  onRemoveFeature: (idx: number) => void
  formInStock: boolean
  setFormInStock: (val: boolean) => void
  formRating: number
  setFormRating: (val: number) => void
  formReviewsCount: number
  setFormReviewsCount: (val: number) => void
  formReviews?: import('@/lib/products-data').ReviewItem[]
  setFormReviews?: React.Dispatch<React.SetStateAction<import('@/lib/products-data').ReviewItem[]>>
}

export function ProductEditorModal({
  mainCategoriesList,
  categoriesList,
  sportsList,
  badgesList,
  sizesList,
  isOpen,
  onClose,
  editingProduct,
  onSubmit,
  formName,
  onNameChange,
  formBadge,
  setFormBadge,
  formGender,
  setFormGender,
  formMainCategory,
  setFormMainCategory,
  formCategory,
  setFormCategory,
  formSport,
  setFormSport,
  formPrice,
  setFormPrice,
  formOriginalPrice,
  setFormOriginalPrice,
  formColors,
  setFormColors,
  onRemoveColor,
  newColorName,
  setNewColorName,
  newColorHex,
  setNewColorHex,
  onAddColor,
  formSizes,
  onToggleSize,
  customSizeInput,
  setCustomSizeInput,
  onAddCustomSize,
  formGalleryImages,
  onRemoveGalleryImage,
  onAddGalleryImage,
  onReplaceGalleryImage,
  onSetMainGalleryImage,
  formDescription,
  setFormDescription,
  formFeatures,
  newFeatureInput,
  setNewFeatureInput,
  onAddFeature,
  onRemoveFeature,
  formInStock,
  setFormInStock,
  formRating,
  setFormRating,
  formReviewsCount,
  setFormReviewsCount,
  formReviews = [],
  setFormReviews,
}: ProductEditorModalProps) {
  if (!isOpen) return null

  const [galleryUrlInput, setGalleryUrlInput] = useState('')
  const [galleryUrlError, setGalleryUrlError] = useState<string | null>(null)

  // Review Form State inside modal
  const [newReviewAuthor, setNewReviewAuthor] = useState('')
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [newReviewComment, setNewReviewComment] = useState('')

  const handleAddReviewItem = () => {
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return
    const newRev: import('@/lib/products-data').ReviewItem = {
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
    // Recalculate average rating
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

  const activeMainCategories = mainCategoriesList && mainCategoriesList.length > 0
    ? mainCategoriesList
    : [
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Cricket', value: 'cricket' },
        { label: 'Accessories', value: 'accessories' },
      ]

  const activeCategories: { label: string; value: string; parentCategory?: string }[] =
    categoriesList && categoriesList.length > 0
      ? categoriesList
      : categoryOptions.filter((c) => c.value !== 'all')

  // Filter sub-categories if a main category is chosen, deduplicating by value
  const subCategoryCandidateList = formMainCategory
    ? activeCategories.filter((c) => !c.parentCategory || c.parentCategory === formMainCategory)
    : activeCategories

  const uniqueSubMap = new Map<string, string>()
  subCategoryCandidateList.forEach((c) => {
    if (!uniqueSubMap.has(c.value)) {
      uniqueSubMap.set(c.value, c.label)
    }
  })

  const filteredSubCategories = Array.from(uniqueSubMap.entries()).map(([value, label]) => ({
    value,
    label,
  }))

  const activeSports = sportsList && sportsList.length > 0
    ? sportsList
    : sportOptions.filter((s) => s.value !== 'all')

  const activeBadges = badgesList && badgesList.length > 0
    ? badgesList
    : PRESET_BADGES.filter(Boolean)

  const activeSizes = sizesList && sizesList.length > 0
    ? sizesList
    : PRESET_SIZES

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative max-h-[96vh] sm:max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4 gap-2">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717] block">
              {editingProduct ? 'Update Inventory Item' : 'New Catalog Item'}
            </span>
            <h3 className="text-base sm:text-xl font-black uppercase tracking-tight text-[#080d2d] truncate">
              {editingProduct ? 'Edit Product Details' : 'Add Sportswear Product'}
            </h3>
            <p className="hidden sm:block text-xs text-slate-400">
              Fill out the details below. Everything you configure here displays on the live website.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 sm:p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-xs">
          {/* 1. Basic Product Info */}
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

          {/* 2. Visual Color Picker */}
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

          {/* 3. Visual Size Selection */}
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
                <CheckSquare className="h-3.5 w-3.5 text-[#e51717]" />
                <span>Available Sizes</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                Click any size to enable or disable
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeSizes.map((size) => {
                const isSelected = formSizes.includes(size)
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onToggleSize(size)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-black transition ${
                      isSelected
                        ? 'border-[#080d2d] bg-[#080d2d] text-white shadow-xs'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-[#e51717]" />}
                    <span>{size}</span>
                  </button>
                )
              })}

              {formSizes
                .filter((s) => !activeSizes.includes(s))
                .map((customSize) => (
                  <button
                    key={customSize}
                    type="button"
                    onClick={() => onToggleSize(customSize)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#080d2d] bg-[#080d2d] px-3.5 py-1.5 text-xs font-black text-white"
                  >
                    <Check className="h-3 w-3 text-[#e51717]" />
                    <span>{customSize}</span>
                    <X className="h-3 w-3 ml-1 text-slate-400 hover:text-white" />
                  </button>
                ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
              <input
                type="text"
                placeholder="Add custom size (e.g. 4XL or 156g)..."
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-[#e51717]"
              />
              <button
                type="button"
                onClick={onAddCustomSize}
                disabled={!customSizeInput.trim()}
                className="flex items-center gap-1 rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-300 disabled:opacity-40 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* 4. Product Gallery Images */}
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

          {/* 5. Description & Key Performance Bullet Points */}
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

          {/* 6. Stock Availability & Overall Rating */}
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

          {/* 7. Customer Reviews & Testimonials Manager */}
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

          {/* Modal Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 border-t border-slate-200 pt-4 sm:pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-bold text-slate-600 transition hover:bg-slate-100 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#e51717] px-6 sm:px-7 py-2.5 font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-red-700 text-center"
            >
              {editingProduct ? 'Save Product Changes' : 'Create & Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
