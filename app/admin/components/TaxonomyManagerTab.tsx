'use client'

import { useState } from 'react'
import {
  Tag,
  Layers,
  Activity,
  Maximize2,
  Megaphone,
  Phone,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Link2,
  Compass,
  ArrowRight,
  Eye,
  EyeOff,
  Pencil,
  X,
  AlertTriangle,
} from 'lucide-react'
import type {
  StoreTaxonomyConfig,
  MainCategoryItem,
  CategoryItem,
  TagBadgeItem,
  SportItem,
} from '@/lib/store-taxonomy'
import { defaultTaxonomyConfig, defaultMainCategories } from '@/lib/store-taxonomy'
import type { Product } from '@/lib/products-data'

export interface TaxonomyManagerTabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
  products?: Product[]
}

export function TaxonomyManagerTab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
  products = [],
}: TaxonomyManagerTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'categories' | 'badges' | 'sizes' | 'announcement' | 'contact'
  >('categories')

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

  // Badge Form State
  const [newBadgeName, setNewBadgeName] = useState('')
  const [newBadgeBg, setNewBadgeBg] = useState('#e51717')
  const [newBadgeText, setNewBadgeText] = useState('#ffffff')

  // Size Form State
  const [newSizeInput, setNewSizeInput] = useState('')

  const activeMainCategories = taxonomyConfig.mainCategories?.length
    ? taxonomyConfig.mainCategories
    : defaultMainCategories

  // --- Handlers: Main Categories ---
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

    // Check duplicate value with other items
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
      // If the slug value changed, update any sub-categories pointing to the old parent
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

    // CHECK IF ANY PRODUCTS ARE USING THIS MAIN CATEGORY
    const prodCount = getProductCountForMainCategory(target.value)
    if (prodCount > 0) {
      triggerToast(
        `Cannot delete "${target.label}": ${prodCount} product${
          prodCount > 1 ? 's are' : ' is'
        } currently assigned to this category!`
      )
      return
    }

    // Also check if any sub-categories are assigned under this main category
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

  // --- Handlers: Sub Categories ---
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

    // Check duplicate identifier with other sub-categories
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

    // CHECK IF ANY PRODUCTS ARE USING THIS SUB-CATEGORY
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

  // --- Handlers: Badges & Tags ---
  const handleAddBadge = () => {
    if (!newBadgeName.trim()) {
      triggerToast('Please enter a badge/tag name.')
      return
    }
    const nameUpper = newBadgeName.trim().toUpperCase()
    if (taxonomyConfig.badges.some((b) => b.name === nameUpper)) {
      triggerToast(`Badge "${nameUpper}" already exists.`)
      return
    }

    const newBadge: TagBadgeItem = {
      id: `badge-${Date.now()}`,
      name: nameUpper,
      bgColor: newBadgeBg,
      textColor: newBadgeText,
    }

    const updated = {
      ...taxonomyConfig,
      badges: [...taxonomyConfig.badges, newBadge],
    }
    saveTaxonomyConfig(updated)
    setNewBadgeName('')
    triggerToast(`Promotional Badge "${nameUpper}" added!`)
  }

  const handleDeleteBadge = (badgeId: string) => {
    if (taxonomyConfig.badges.length <= 1) {
      triggerToast('At least one badge must remain.')
      return
    }
    const updated = {
      ...taxonomyConfig,
      badges: taxonomyConfig.badges.filter((b) => b.id !== badgeId),
    }
    saveTaxonomyConfig(updated)
    triggerToast('Badge removed.')
  }

  // --- Handlers: Sports ---
  // --- Handlers: Sizes ---
  const handleAddSize = () => {
    const trimmed = newSizeInput.trim()
    if (!trimmed) return
    if (taxonomyConfig.sizes.includes(trimmed)) {
      triggerToast(`Size "${trimmed}" is already in the list.`)
      return
    }
    const updated = {
      ...taxonomyConfig,
      sizes: [...taxonomyConfig.sizes, trimmed],
    }
    saveTaxonomyConfig(updated)
    setNewSizeInput('')
    triggerToast(`Size "${trimmed}" added!`)
  }

  const handleDeleteSize = (sizeVal: string) => {
    if (taxonomyConfig.sizes.length <= 1) {
      triggerToast('At least one size is required.')
      return
    }
    const updated = {
      ...taxonomyConfig,
      sizes: taxonomyConfig.sizes.filter((s) => s !== sizeVal),
    }
    saveTaxonomyConfig(updated)
    triggerToast(`Size "${sizeVal}" removed.`)
  }

  // --- Reset All Taxonomy Defaults ---
  const handleResetTaxonomy = () => {
    if (window.confirm('Reset all categories, sports, badges and site elements to default?')) {
      saveTaxonomyConfig(defaultTaxonomyConfig)
      triggerToast('Store taxonomies restored to defaults.')
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header bar */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Global Architecture
          </span>
          <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-[#080d2d]">
            Store Taxonomy &amp; Dynamic Elements Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, or remove categories, product tags, sport types, sizes, and top announcement banners.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetTaxonomy}
          className="flex items-center justify-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Reset All Defaults</span>
        </button>
      </div>

      {/* Sub-tab Navigation Pills: Scrollable horizontally on small screens */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('categories')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'categories'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="h-4 w-4 text-[#e51717]" />
          <span>Categories ({activeMainCategories.length} Main • {taxonomyConfig.categories.length} Sub)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('badges')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'badges'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Tag className="h-4 w-4 text-[#e51717]" />
          <span>Badges &amp; Tags ({taxonomyConfig.badges.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('sizes')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'sizes'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Maximize2 className="h-4 w-4 text-[#e51717]" />
          <span>Sizes ({taxonomyConfig.sizes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('announcement')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'announcement'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Megaphone className="h-4 w-4 text-[#e51717]" />
          <span>Announcement Bar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('contact')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'contact'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Phone className="h-4 w-4 text-[#e51717]" />
          <span>Contact &amp; Socials</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. CATEGORIES SUBTAB (MAIN CATEGORIES + SUB-CATEGORIES)         */}
      {/* ============================================================== */}
      {activeSubTab === 'categories' && (
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

              {/* Add Main Category Form: 1 col on mobile, 2 on sm, 4 on lg */}
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
                          {/* Edit / Modify Main Category */}
                          <button
                            type="button"
                            onClick={() => handleStartEditMainCategory(mc)}
                            title={`Edit main category "${mc.label}"`}
                            className="rounded-lg p-1 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>

                          {/* Delete Main Category (Disabled if products assigned or sub-categories exist) */}
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

              {/* Edit Main Category Inline Modal / Drawer */}
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

          {/* SECTION B: SUB-CATEGORIES (TIED TO MAIN CATEGORY) */}
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

              {/* Edit Sub Category Modal / Drawer */}
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
                                  {/* Edit / Modify Sub Category */}
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditCategory(cat)}
                                    title={`Edit sub-category "${cat.label}"`}
                                    className="rounded p-1 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>

                                  {/* Delete Sub Category (Disabled if products assigned) */}
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
      )}

      {/* ============================================================== */}
      {/* 2. BADGES & TAGS SUBTAB                                        */}
      {/* ============================================================== */}
      {activeSubTab === 'badges' && (
        <div className="space-y-6">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#e51717]" />
              <span>Create Promotional Badge or Tag</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add custom tags like FLASH SALE, LIMITED, TEST GRADE with custom background and text colors.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Badge Text *
                </label>
                <input
                  type="text"
                  placeholder="e.g. FLASH SALE, BESTSELLER"
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase text-[#080d2d] outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Background Color
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 shadow-xs focus-within:border-[#e51717] focus-within:ring-1 focus-within:ring-[#e51717]">
                  <label className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 overflow-hidden shadow-inner shrink-0 hover:scale-105 transition" title="Click to pick background color">
                    <input
                      type="color"
                      value={newBadgeBg}
                      onChange={(e) => setNewBadgeBg(e.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <span
                      className="h-full w-full"
                      style={{ backgroundColor: newBadgeBg }}
                    />
                  </label>
                  <input
                    type="text"
                    value={newBadgeBg}
                    onChange={(e) => setNewBadgeBg(e.target.value)}
                    className="w-20 font-mono text-xs font-bold uppercase text-[#080d2d] outline-none"
                    placeholder="#E51717"
                  />
                  <div className="flex items-center gap-1 ml-auto">
                    {['#e51717', '#080d2d', '#10b981', '#f59e0b', '#8b5cf6'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewBadgeBg(c)}
                        className="h-4 w-4 rounded-full border border-white shadow-xs hover:scale-125 transition"
                        style={{ backgroundColor: c }}
                        title={`Select ${c}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Text Color
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 shadow-xs focus-within:border-[#e51717] focus-within:ring-1 focus-within:ring-[#e51717]">
                  <label className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 overflow-hidden shadow-inner shrink-0 hover:scale-105 transition" title="Click to pick text color">
                    <input
                      type="color"
                      value={newBadgeText}
                      onChange={(e) => setNewBadgeText(e.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <span
                      className="h-full w-full"
                      style={{ backgroundColor: newBadgeText }}
                    />
                  </label>
                  <input
                    type="text"
                    value={newBadgeText}
                    onChange={(e) => setNewBadgeText(e.target.value)}
                    className="w-20 font-mono text-xs font-bold uppercase text-[#080d2d] outline-none"
                    placeholder="#FFFFFF"
                  />
                  <div className="flex items-center gap-1 ml-auto">
                    {['#ffffff', '#080d2d', '#f8fafc', '#1e293b'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewBadgeText(c)}
                        className="h-4 w-4 rounded-full border border-slate-300 shadow-xs hover:scale-125 transition"
                        style={{ backgroundColor: c }}
                        title={`Select ${c}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="flex items-center gap-1.5 rounded-lg bg-[#e51717] px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Badge</span>
                </button>
              </div>
            </div>

            {/* Live Badge Preview */}
            {newBadgeName && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Live Preview:</span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-black tracking-wider shadow-xs"
                  style={{ backgroundColor: newBadgeBg, color: newBadgeText }}
                >
                  {newBadgeName}
                </span>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#080d2d]">
              Active Promotional Badges ({taxonomyConfig.badges.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Available in the product editor dropdown to highlight hero products.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {taxonomyConfig.badges.map((badge, idx) => (
                <div
                  key={badge.id || idx}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-black tracking-wider shadow-xs"
                    style={{ backgroundColor: badge.bgColor, color: badge.textColor }}
                  >
                    {badge.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteBadge(badge.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
                    title={`Delete badge ${badge.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* ============================================================== */}
      {/* 4. SIZES & ATTRIBUTES SUBTAB                                   */}
      {/* ============================================================== */}
      {activeSubTab === 'sizes' && (
        <div className="space-y-6">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-[#e51717]" />
              <span>Global Size Standards</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add standard apparel sizes (e.g. XS, 4XL) or ball/equipment dimensions (e.g. 156g, Harrow, Full Size SH).
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <input
                type="text"
                placeholder="Enter size label (e.g. 4XL, 156g, Size 6)..."
                value={newSizeInput}
                onChange={(e) => setNewSizeInput(e.target.value)}
                className="w-full sm:max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
              />
              <button
                type="button"
                onClick={handleAddSize}
                disabled={!newSizeInput.trim()}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Size</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {taxonomyConfig.sizes.map((sz, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#080d2d]"
                >
                  <span>{sz}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSize(sz)}
                    className="text-slate-400 hover:text-rose-600 transition"
                    title={`Delete size ${sz}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. ANNOUNCEMENT BAR SUBTAB                                     */}
      {/* ============================================================== */}
      {activeSubTab === 'announcement' && (() => {
        const announcementData = taxonomyConfig.announcement || defaultTaxonomyConfig.announcement
        const items = Array.isArray(announcementData.items) && announcementData.items.length > 0
          ? announcementData.items
          : (announcementData.text ? [{ id: 'ann-1', text: announcementData.text, linkText: announcementData.linkText || '', linkHref: announcementData.linkHref || '' }] : defaultTaxonomyConfig.announcement.items || [])

        const updateItems = (newItems: typeof items) => {
          const firstItem = newItems[0] || { text: '', linkText: '', linkHref: '' }
          saveTaxonomyConfig({
            ...taxonomyConfig,
            announcement: {
              ...announcementData,
              text: firstItem.text,
              linkText: firstItem.linkText,
              linkHref: firstItem.linkHref,
              items: newItems,
            },
          })
        }

        return (
          <div className="space-y-6">
            <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-[#e51717]" />
                    <span>Top Promotional Announcements Slider ({items.length} Slides)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Multi-slide banner shown at the top of every storefront page. Slides on desktop/tablet; animated moving words ticker on mobile devices.
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={announcementData.enabled}
                      onChange={(e) => {
                        const updated = {
                          ...taxonomyConfig,
                          announcement: {
                            ...announcementData,
                            enabled: e.target.checked,
                          },
                        }
                        saveTaxonomyConfig(updated)
                        triggerToast(`Announcement bar ${e.target.checked ? 'enabled' : 'disabled'}.`)
                      }}
                      className="h-4 w-4 rounded accent-[#e51717]"
                    />
                    <span className="font-bold text-xs text-[#080d2d]">Enable Top Bar</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      const newItem = {
                        id: `ann-${Date.now()}`,
                        text: '🔥 NEW PROMOTION: ENJOY EXCLUSIVE SAVINGS ON ALL SPORT GEAR',
                        linkText: 'Shop Now',
                        linkHref: '/products',
                      }
                      updateItems([...items, newItem])
                      triggerToast('New announcement slide added.')
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-[#080d2d] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#e51717] transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Slide</span>
                  </button>
                </div>
              </div>

              {/* Announcement Slides List */}
              <div className="mt-6 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 transition hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-1.5">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#080d2d] text-[10px] text-white">
                          {index + 1}
                        </span>
                        Announcement Slide #{index + 1}
                      </span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = items.filter((_, i) => i !== index)
                            updateItems(filtered)
                            triggerToast('Announcement slide removed.')
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Announcement Message Text
                      </label>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const updated = [...items]
                          updated[index] = { ...item, text: e.target.value }
                          updateItems(updated)
                        }}
                        placeholder="e.g. FREE SHIPPING ON ALL ORDERS OVER ₹1,999 • USE CODE VIRAT10"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Call-to-Action Link Text
                        </label>
                        <input
                          type="text"
                          value={item.linkText || ''}
                          onChange={(e) => {
                            const updated = [...items]
                            updated[index] = { ...item, linkText: e.target.value }
                            updateItems(updated)
                          }}
                          placeholder="e.g. Shop New Arrivals"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#e51717]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Destination URL
                        </label>
                        <input
                          type="text"
                          value={item.linkHref || ''}
                          onChange={(e) => {
                            const updated = [...items]
                            updated[index] = { ...item, linkHref: e.target.value }
                            updateItems(updated)
                          }}
                          placeholder="e.g. /products?badge=new"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#e51717]"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Styling colors & Live Preview Bar */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Live Top Bar Preview:</span>
                    <span className="text-[11px] text-slate-400">
                      {items.length} announcements configured
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-bold text-center rounded-xl transition"
                        style={{
                          backgroundColor: announcementData.bgColor || '#080d2d',
                          color: announcementData.textColor || '#ffffff',
                        }}
                      >
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
                          Slide {idx + 1}
                        </span>
                        <span>{item.text || '(Empty text)'}</span>
                        {item.linkText && (
                          <span className="underline font-black text-[#e51717]">
                            {item.linkText} →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ============================================================== */}
      {/* 6. CONTACT & SOCIALS SUBTAB                                    */}
      {/* ============================================================== */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#e51717]" />
              <span>Customer Support &amp; Store Contact Information</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Changes here update the live contact section and site footer.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={taxonomyConfig.contactInfo.email}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, email: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Helpline Phone Number
                </label>
                <input
                  type="text"
                  value={taxonomyConfig.contactInfo.phone}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, phone: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Support Number
                </label>
                <input
                  type="text"
                  value={taxonomyConfig.contactInfo.whatsapp}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, whatsapp: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Support Hours
                </label>
                <input
                  type="text"
                  value={taxonomyConfig.contactInfo.hours}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, hours: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Store Address &amp; Warehouse Facility
              </label>
              <textarea
                rows={2}
                value={taxonomyConfig.contactInfo.address}
                onChange={(e) => {
                  saveTaxonomyConfig({
                    ...taxonomyConfig,
                    contactInfo: { ...taxonomyConfig.contactInfo, address: e.target.value },
                  })
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#e51717]"
              />
            </div>

            <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-[#080d2d] flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-[#e51717]" />
              <span>Official Social Media Channels</span>
            </h4>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Instagram URL</label>
                <input
                  type="text"
                  placeholder="https://www.instagram.com/viratsportsofficial/"
                  value={taxonomyConfig.contactInfo.instagram || ''}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, instagram: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">X (Twitter) URL</label>
                <input
                  type="text"
                  placeholder="https://x.com/viratsports"
                  value={taxonomyConfig.contactInfo.twitter || ''}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, twitter: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Facebook URL</label>
                <input
                  type="text"
                  placeholder="https://www.facebook.com/ViratSportsOfficial/"
                  value={taxonomyConfig.contactInfo.facebook || ''}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, facebook: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">YouTube URL</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/@viratsports"
                  value={taxonomyConfig.contactInfo.youtube || ''}
                  onChange={(e) => {
                    saveTaxonomyConfig({
                      ...taxonomyConfig,
                      contactInfo: { ...taxonomyConfig.contactInfo, youtube: e.target.value },
                    })
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e51717]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
