'use client'

import { useState } from 'react'
import {
  Compass,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
} from 'lucide-react'
import type {
  StoreTaxonomyConfig,
  MainCategoryItem,
  CategoryItem,
} from '@/lib/store-taxonomy'
import { defaultMainCategories } from '@/lib/store-taxonomy'
import type { Product } from '@/lib/products-data'

export interface TaxonomyCategoriesSubtabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
  products?: Product[]
}

export function TaxonomyCategoriesSubtab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
  products = [],
}: TaxonomyCategoriesSubtabProps) {
  // Main Category Form State
  const [newMainLabel, setNewMainLabel] = useState('')
  const [newMainValue, setNewMainValue] = useState('')
  const [newMainShowOnNav, setNewMainShowOnNav] = useState(true)
  const [newMainDescription, setNewMainDescription] = useState('')

  // Edit Main Category State
  const [editingMainCategory, setEditingMainCategory] = useState<MainCategoryItem | null>(null)
  const [editMainLabel, setEditMainLabel] = useState('')
  const [editMainValue, setEditMainValue] = useState('')
  const [editMainDescription, setEditMainDescription] = useState('')
  const [editMainShowOnNav, setEditMainShowOnNav] = useState(true)

  // Sub Category Form State
  const [newCatLabel, setNewCatLabel] = useState('')
  const [newCatValue, setNewCatValue] = useState('')
  const [newCatParent, setNewCatParent] = useState('')
  const [newCatDescription, setNewCatDescription] = useState('')

  // Edit Sub Category State
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  const [editCatLabel, setEditCatLabel] = useState('')
  const [editCatValue, setEditCatValue] = useState('')
  const [editCatParent, setEditCatParent] = useState('')
  const [editCatDescription, setEditCatDescription] = useState('')

  const activeMainCategories = taxonomyConfig.mainCategories?.length
    ? taxonomyConfig.mainCategories
    : defaultMainCategories

  // Helper to count products using a Main Category
  const getProductCountForMainCategory = (mainCatValue: string) => {
    const val = mainCatValue.toLowerCase()
    return products.filter((p) => {
      const pMain = (p.mainCategory || '').toLowerCase()
      const pGender = (p.gender || '').toLowerCase()
      const pSport = (p.sport || '').toLowerCase()
      const pCat = (p.category || '').toLowerCase()
      return pMain === val || pGender === val || pSport === val || pCat === val
    }).length
  }

  // Helper to count products using a Sub Category
  const getProductCountForSubCategory = (subCatValue: string) => {
    const val = subCatValue.toLowerCase()
    return products.filter((p) => {
      const pCat = (p.category || '').toLowerCase()
      const pSub = (p.subCategory || '').toLowerCase()
      return pCat === val || pSub === val
    }).length
  }

  // Handlers: Main Categories
  const handleAddMainCategory = () => {
    if (!newMainLabel.trim()) {
      triggerToast('Please provide a main category name (e.g. Mens, Kids).')
      return
    }
    const val =
      newMainValue.trim() ||
      newMainLabel
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    if (activeMainCategories.some((mc) => mc.value === val)) {
      triggerToast(`Main category "${val}" already exists.`)
      return
    }

    const newMain: MainCategoryItem = {
      id: `main-${Date.now()}`,
      label: newMainLabel.trim(),
      value: val,
      showOnNavbar: newMainShowOnNav,
      description: newMainDescription.trim(),
      order: activeMainCategories.length + 1,
    }

    const updated = {
      ...taxonomyConfig,
      mainCategories: [...activeMainCategories, newMain],
    }
    saveTaxonomyConfig(updated)
    setNewMainLabel('')
    setNewMainValue('')
    setNewMainDescription('')
    setNewMainShowOnNav(true)
    triggerToast(`Main category "${newMain.label}" created! ${newMain.showOnNavbar ? 'Added to Navbar!' : ''}`)
  }

  const handleToggleMainCategoryNav = (mainId: string) => {
    const updated = {
      ...taxonomyConfig,
      mainCategories: activeMainCategories.map((mc) =>
        mc.id === mainId ? { ...mc, showOnNavbar: !mc.showOnNavbar } : mc
      ),
    }
    saveTaxonomyConfig(updated)
    const toggled = updated.mainCategories.find((mc) => mc.id === mainId)
    triggerToast(
      `Navbar visibility for "${toggled?.label}" set to ${toggled?.showOnNavbar ? 'Visible' : 'Hidden'}.`
    )
  }

  const handleStartEditMainCategory = (mc: MainCategoryItem) => {
    setEditingMainCategory(mc)
    setEditMainLabel(mc.label)
    setEditMainValue(mc.value)
    setEditMainDescription(mc.description || '')
    setEditMainShowOnNav(mc.showOnNavbar !== false)
  }

  const handleUpdateMainCategory = () => {
    if (!editingMainCategory) return
    if (!editMainLabel.trim()) {
      triggerToast('Please provide a main category name.')
      return
    }
    const val =
      editMainValue.trim() ||
      editMainLabel
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    if (activeMainCategories.some((mc) => mc.id !== editingMainCategory.id && mc.value === val)) {
      triggerToast(`Another main category with identifier "${val}" already exists.`)
      return
    }

    const oldValue = editingMainCategory.value
    const updated = {
      ...taxonomyConfig,
      mainCategories: activeMainCategories.map((mc) =>
        mc.id === editingMainCategory.id
          ? {
              ...mc,
              label: editMainLabel.trim(),
              value: val,
              description: editMainDescription.trim(),
              showOnNavbar: editMainShowOnNav,
            }
          : mc
      ),
      categories:
        oldValue !== val
          ? taxonomyConfig.categories.map((c) =>
              c.parentCategory === oldValue ? { ...c, parentCategory: val } : c
            )
          : taxonomyConfig.categories,
    }

    saveTaxonomyConfig(updated)
    setEditingMainCategory(null)
    triggerToast(`Main category "${editMainLabel.trim()}" updated successfully!`)
  }

  const handleDeleteMainCategory = (mainId: string) => {
    if (activeMainCategories.length <= 1) {
      triggerToast('At least one main category is required.')
      return
    }
    const target = activeMainCategories.find((mc) => mc.id === mainId)
    if (!target) return

    const prodCount = getProductCountForMainCategory(target.value)
    if (prodCount > 0) {
      triggerToast(
        `Cannot delete "${target.label}": ${prodCount} product${
          prodCount > 1 ? 's are' : ' is'
        } currently assigned to this category!`
      )
      return
    }

    const assignedSubCategories = taxonomyConfig.categories.filter(
      (c) => c.parentCategory === target.value
    )
    if (assignedSubCategories.length > 0) {
      triggerToast(
        `Cannot delete "${target.label}": It has ${assignedSubCategories.length} sub-categor${
          assignedSubCategories.length > 1 ? 'ies' : 'y'
        } assigned. Reassign or delete them first.`
      )
      return
    }

    const updated = {
      ...taxonomyConfig,
      mainCategories: activeMainCategories.filter((mc) => mc.id !== mainId),
    }
    saveTaxonomyConfig(updated)
    triggerToast(`Main category "${target?.label || mainId}" removed.`)
  }

  // Handlers: Sub Categories
  const handleAddCategory = () => {
    if (!newCatLabel.trim()) {
      triggerToast('Please provide a sub-category name (e.g. Tops, Polos).')
      return
    }
    const val =
      newCatValue.trim() ||
      newCatLabel
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    if (taxonomyConfig.categories.some((c) => c.value === val)) {
      triggerToast(`Sub-category with identifier "${val}" already exists.`)
      return
    }

    const parent = newCatParent.trim() || activeMainCategories[0]?.value || 'men'

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      label: newCatLabel.trim(),
      value: val,
      parentCategory: parent,
      description: newCatDescription.trim(),
    }

    const updated = {
      ...taxonomyConfig,
      mainCategories: activeMainCategories,
      categories: [...taxonomyConfig.categories, newCat],
    }
    saveTaxonomyConfig(updated)
    setNewCatLabel('')
    setNewCatValue('')
    setNewCatDescription('')
    triggerToast(`Sub-category "${newCat.label}" added under "${parent.toUpperCase()}"!`)
  }

  const handleStartEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat)
    setEditCatLabel(cat.label)
    setEditCatValue(cat.value)
    setEditCatParent(cat.parentCategory || activeMainCategories[0]?.value || 'men')
    setEditCatDescription(cat.description || '')
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return
    if (!editCatLabel.trim()) {
      triggerToast('Please provide a sub-category name.')
      return
    }
    const val =
      editCatValue.trim() ||
      editCatLabel
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    if (taxonomyConfig.categories.some((c) => c.id !== editingCategory.id && c.value === val)) {
      triggerToast(`Another sub-category with identifier "${val}" already exists.`)
      return
    }

    const updated = {
      ...taxonomyConfig,
      categories: taxonomyConfig.categories.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              label: editCatLabel.trim(),
              value: val,
              parentCategory: editCatParent.trim(),
              description: editCatDescription.trim(),
            }
          : c
      ),
    }

    saveTaxonomyConfig(updated)
    setEditingCategory(null)
    triggerToast(`Sub-category "${editCatLabel.trim()}" updated successfully!`)
  }

  const handleDeleteCategory = (catId: string) => {
    if (taxonomyConfig.categories.length <= 1) {
      triggerToast('At least one sub-category is required.')
      return
    }
    const target = taxonomyConfig.categories.find((c) => c.id === catId)
    if (!target) return

    const prodCount = getProductCountForSubCategory(target.value)
    if (prodCount > 0) {
      triggerToast(
        `Cannot delete "${target.label}": ${prodCount} product${
          prodCount > 1 ? 's are' : ' is'
        } currently using this sub-category! Reassign the products first.`
      )
      return
    }

    const updated = {
      ...taxonomyConfig,
      categories: taxonomyConfig.categories.filter((c) => c.id !== catId),
    }
    saveTaxonomyConfig(updated)
    triggerToast(`Sub-category "${target?.label || catId}" removed.`)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* SECTION A: MAIN CATEGORIES */}
      <div className="space-y-4">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#e51717]" />
                <span>Main Categories ({activeMainCategories.length})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Main departments like <strong>MEN, WOMEN, CRICKET, ACCESSORIES</strong>. When &quot;Show on Navbar&quot; is enabled, they appear instantly as header tabs with dynamic dropdown mega-menus.
              </p>
            </div>
          </div>

          {/* Add Main Category Form */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Category Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Kids, Footwear, Tennis"
                value={newMainLabel}
                onChange={(e) => {
                  setNewMainLabel(e.target.value)
                  if (!newMainValue) {
                    setNewMainValue(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    )
                  }
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-[#e51717]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Slug ID (auto-generated)
              </label>
              <input
                type="text"
                placeholder="e.g. kids"
                value={newMainValue}
                onChange={(e) => setNewMainValue(e.target.value.toLowerCase())}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-700 outline-none focus:border-[#e51717]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                placeholder="e.g. Junior & youth performance kits"
                value={newMainDescription}
                onChange={(e) => setNewMainDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMainShowOnNav}
                  onChange={(e) => setNewMainShowOnNav(e.target.checked)}
                  className="size-4 accent-[#e51717] rounded"
                />
                <span>Navbar Tab</span>
              </label>

              <button
                type="button"
                onClick={handleAddMainCategory}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-slate-800 transition"
              >
                <Plus className="h-4 w-4 text-[#e51717]" />
                <span>Add Main</span>
              </button>
            </div>
          </div>

          {/* Main Categories Cards */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {activeMainCategories.map((mc) => {
              const subCount = taxonomyConfig.categories.filter(
                (c) => c.parentCategory === mc.value
              ).length
              const prodCount = getProductCountForMainCategory(mc.value)
              const hasProducts = prodCount > 0

              return (
                <div
                  key={mc.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:bg-white hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs uppercase tracking-wider text-[#080d2d]">
                        {mc.label}
                      </span>
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[9px] text-slate-600">
                        {mc.value}
                      </span>
                    </div>
                    {mc.description && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {mc.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">
                        {subCount} sub-cats
                      </span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                          hasProducts
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {prodCount} products
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-200/80 pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMainCategoryNav(mc.id)}
                      className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider rounded px-2 py-1 transition ${
                        mc.showOnNavbar !== false
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title="Toggle visibility in top header navbar"
                    >
                      {mc.showOnNavbar !== false ? (
                        <>
                          <Eye className="h-3 w-3" />
                          <span>On Navbar</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEditMainCategory(mc)}
                        title={`Edit main category "${mc.label}"`}
                        className="rounded-lg p-1 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteMainCategory(mc.id)}
                        disabled={hasProducts || subCount > 0}
                        title={
                          hasProducts
                            ? `Cannot delete: ${prodCount} product(s) assigned`
                            : subCount > 0
                            ? `Cannot delete: ${subCount} sub-category assigned`
                            : `Delete main category "${mc.label}"`
                        }
                        className={`rounded-lg p-1 transition ${
                          hasProducts || subCount > 0
                            ? 'cursor-not-allowed opacity-30 text-slate-400'
                            : 'text-slate-400 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Edit Main Category Inline Modal */}
          {editingMainCategory && (
            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                <span className="flex items-center gap-1.5 text-xs font-black uppercase text-[#080d2d]">
                  <Pencil className="size-3.5 text-blue-600" />
                  Modify Main Category: &ldquo;{editingMainCategory.label}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setEditingMainCategory(null)}
                  className="rounded p-1 text-slate-400 hover:bg-blue-100 hover:text-slate-700"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={editMainLabel}
                    onChange={(e) => setEditMainLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Slug ID
                  </label>
                  <input
                    type="text"
                    value={editMainValue}
                    onChange={(e) => setEditMainValue(e.target.value.toLowerCase())}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={editMainDescription}
                    onChange={(e) => setEditMainDescription(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editMainShowOnNav}
                      onChange={(e) => setEditMainShowOnNav(e.target.checked)}
                      className="size-4 accent-[#e51717] rounded"
                    />
                    <span>Navbar Tab</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMainCategory(null)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateMainCategory}
                      className="flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-black uppercase text-white hover:bg-blue-700"
                    >
                      <Check className="size-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION B: SUB-CATEGORIES */}
      <div className="space-y-4">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#e51717]" />
            <span>Add Sub-Category Under Main Category</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Attach a specific sub-category (like <strong>Tops, Polos, Helmets, Shorts</strong>) under a parent Main Category (like <strong>Men, Women, Cricket</strong>).
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Parent Main Category *
              </label>
              <select
                value={newCatParent || (activeMainCategories[0]?.value ?? 'men')}
                onChange={(e) => setNewCatParent(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
              >
                {activeMainCategories.map((mc) => (
                  <option key={mc.value} value={mc.value}>
                    {mc.label} ({mc.value})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sub-Category Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Tops, Polos, Helmets, Shorts"
                value={newCatLabel}
                onChange={(e) => {
                  setNewCatLabel(e.target.value)
                  if (!newCatValue) {
                    setNewCatValue(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    )
                  }
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Slug Identifier (auto-generated)
              </label>
              <input
                type="text"
                placeholder="e.g. tops"
                value={newCatValue}
                onChange={(e) => setNewCatValue(e.target.value.toLowerCase())}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-700 outline-none focus:border-[#e51717]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Match shirts & athletic jerseys"
                value={newCatDescription}
                onChange={(e) => setNewCatDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleAddCategory}
              className="flex items-center gap-1.5 rounded-lg bg-[#e51717] px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Create Sub-Category</span>
            </button>
          </div>
        </div>

        {/* Sub-Categories Grouped By Main Category */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d]">
            Sub-Categories Catalog ({taxonomyConfig.categories.length})
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            These sub-categories are automatically displayed inside the product editor dropdown and in the mega-menu under their parent.
          </p>

          {/* Edit Sub Category Modal */}
          {editingCategory && (
            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                <span className="flex items-center gap-1.5 text-xs font-black uppercase text-[#080d2d]">
                  <Pencil className="size-3.5 text-blue-600" />
                  Modify Sub-Category: &ldquo;{editingCategory.label}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="rounded p-1 text-slate-400 hover:bg-blue-100 hover:text-slate-700"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Parent Main Category *
                  </label>
                  <select
                    value={editCatParent}
                    onChange={(e) => setEditCatParent(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#080d2d] outline-none focus:border-blue-500"
                  >
                    {activeMainCategories.map((mc) => (
                      <option key={mc.value} value={mc.value}>
                        {mc.label} ({mc.value})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Sub-Category Name *
                  </label>
                  <input
                    type="text"
                    value={editCatLabel}
                    onChange={(e) => setEditCatLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    URL Slug Identifier
                  </label>
                  <input
                    type="text"
                    value={editCatValue}
                    onChange={(e) => setEditCatValue(e.target.value.toLowerCase())}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={editCatDescription}
                    onChange={(e) => setEditCatDescription(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-black uppercase text-white hover:bg-blue-700"
                >
                  <Check className="size-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 space-y-6">
            {activeMainCategories.map((mc) => {
              const children = taxonomyConfig.categories.filter(
                (c) => c.parentCategory === mc.value || (!c.parentCategory && mc.value === 'men')
              )
              return (
                <div key={mc.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#e51717]" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                        {mc.label} Sub-Categories ({children.length})
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">parent: {mc.value}</span>
                  </div>

                  {children.length === 0 ? (
                    <p className="text-xs italic text-slate-400 py-3">
                      No sub-categories assigned to {mc.label} yet. Use the form above to add one!
                    </p>
                  ) : (
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {children.map((cat, idx) => {
                        const subProdCount = getProductCountForSubCategory(cat.value)
                        const subHasProducts = subProdCount > 0

                        return (
                          <div
                            key={cat.id || idx}
                            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition hover:shadow-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-xs text-[#080d2d]">{cat.label}</span>
                                <span className="rounded bg-slate-100 px-1.5 py-0.2 font-mono text-[9px] text-slate-500">
                                  {cat.value}
                                </span>
                              </div>
                              {cat.description && (
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                                  {cat.description}
                                </p>
                              )}
                              <div className="mt-1">
                                <span
                                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                                    subHasProducts
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-emerald-50 text-emerald-700'
                                  }`}
                                >
                                  {subProdCount} products
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditCategory(cat)}
                                title={`Edit sub-category "${cat.label}"`}
                                className="rounded p-1 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat.id)}
                                disabled={subHasProducts}
                                title={
                                  subHasProducts
                                    ? `Cannot delete: ${subProdCount} product(s) assigned`
                                    : `Delete sub-category "${cat.label}"`
                                }
                                className={`rounded p-1 transition ${
                                  subHasProducts
                                    ? 'cursor-not-allowed opacity-30 text-slate-400'
                                    : 'text-slate-400 hover:bg-rose-50 hover:text-rose-600'
                                }`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
