'use client'

import { X } from 'lucide-react'
import {
  categoryOptions,
  sportOptions,
  type Product,
} from '@/lib/products-data'
import {
  ProductBasicInfoSection,
} from './product-editor/ProductBasicInfoSection'
import {
  ProductColorsSection,
  ColorSwatchItem,
} from './product-editor/ProductColorsSection'
import {
  ProductSizesSection,
} from './product-editor/ProductSizesSection'
import {
  ProductGallerySection,
} from './product-editor/ProductGallerySection'
import {
  ProductDescriptionFeaturesSection,
} from './product-editor/ProductDescriptionFeaturesSection'
import {
  ProductStockRatingSection,
} from './product-editor/ProductStockRatingSection'
import {
  ProductReviewsSection,
} from './product-editor/ProductReviewsSection'

export const PRESET_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size']
export const PRESET_BADGES = ['', 'NEW', 'BESTSELLER', 'HOT', 'LIMITED', 'SALE', 'PRO']

// Re-export ColorSwatchItem for backwards compatibility if needed
export { ColorSwatchItem }

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
          <ProductBasicInfoSection
            formName={formName}
            onNameChange={onNameChange}
            formBadge={formBadge}
            setFormBadge={setFormBadge}
            activeBadges={activeBadges}
            formMainCategory={formMainCategory}
            setFormMainCategory={setFormMainCategory}
            setFormGender={setFormGender}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            activeMainCategories={activeMainCategories}
            activeCategories={activeCategories}
            filteredSubCategories={filteredSubCategories}
            formPrice={formPrice}
            setFormPrice={setFormPrice}
            formOriginalPrice={formOriginalPrice}
            setFormOriginalPrice={setFormOriginalPrice}
          />

          {/* 2. Visual Color Picker */}
          <ProductColorsSection
            formColors={formColors}
            setFormColors={setFormColors}
            onRemoveColor={onRemoveColor}
            newColorName={newColorName}
            setNewColorName={setNewColorName}
            newColorHex={newColorHex}
            setNewColorHex={setNewColorHex}
            onAddColor={onAddColor}
            formGalleryImages={formGalleryImages}
            onAddGalleryImage={onAddGalleryImage}
          />

          {/* 3. Visual Size Selection */}
          <ProductSizesSection
            formSizes={formSizes}
            onToggleSize={onToggleSize}
            activeSizes={activeSizes}
            customSizeInput={customSizeInput}
            setCustomSizeInput={setCustomSizeInput}
            onAddCustomSize={onAddCustomSize}
          />

          {/* 4. Product Gallery Images */}
          <ProductGallerySection
            formGalleryImages={formGalleryImages}
            onRemoveGalleryImage={onRemoveGalleryImage}
            onAddGalleryImage={onAddGalleryImage}
            onReplaceGalleryImage={onReplaceGalleryImage}
            onSetMainGalleryImage={onSetMainGalleryImage}
          />

          {/* 5. Description & Key Performance Bullet Points */}
          <ProductDescriptionFeaturesSection
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            formFeatures={formFeatures}
            newFeatureInput={newFeatureInput}
            setNewFeatureInput={setNewFeatureInput}
            onAddFeature={onAddFeature}
            onRemoveFeature={onRemoveFeature}
          />

          {/* 6. Stock Availability & Overall Rating */}
          <ProductStockRatingSection
            formInStock={formInStock}
            setFormInStock={setFormInStock}
            formRating={formRating}
            setFormRating={setFormRating}
            formReviewsCount={formReviewsCount}
            setFormReviewsCount={setFormReviewsCount}
          />

          {/* 7. Customer Reviews & Testimonials Manager */}
          <ProductReviewsSection
            formReviews={formReviews}
            setFormReviews={setFormReviews}
            setFormReviewsCount={setFormReviewsCount}
            setFormRating={setFormRating}
          />

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
