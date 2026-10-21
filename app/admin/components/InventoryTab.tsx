'use client'

import Image from 'next/image'
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  Search,
  RotateCcw,
  Edit2,
  Trash2,
  Loader2,
} from 'lucide-react'
import {
  categoryOptions,
  sportOptions,
  type Product,
} from '@/lib/products-data'

export interface InventoryTabProps {
  categoriesList?: { label: string; value: string }[]
  sportsList?: { label: string; value: string }[]
  metrics: {
    total: number
    inStockCount: number
    outOfStockCount: number
    avgPrice: number
  }
  search: string
  setSearch: (val: string) => void
  selectedCategory: string
  setSelectedCategory: (val: string) => void
  selectedSport: string
  setSelectedSport: (val: string) => void
  selectedGender?: string
  setSelectedGender?: (val: string) => void
  stockFilter: 'all' | 'in_stock' | 'out_of_stock'
  setStockFilter: (val: 'all' | 'in_stock' | 'out_of_stock') => void
  onResetCatalog: () => void
  filteredProducts: Product[]
  isLoading?: boolean
  onToggleStock: (product: Product) => void
  onOpenEditProduct: (product: Product) => void
  onDeleteProduct: (productId: string) => void
  deleteConfirmId: string | null
  setDeleteConfirmId: (id: string | null) => void
}

export function InventoryTab({
  categoriesList,
  sportsList,
  metrics,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedSport,
  setSelectedSport,
  stockFilter,
  setStockFilter,
  onResetCatalog,
  filteredProducts,
  isLoading,
  onToggleStock,
  onOpenEditProduct,
  onDeleteProduct,
  deleteConfirmId,
  setDeleteConfirmId,
}: InventoryTabProps) {
  // Deduplicate categories by value so duplicate sub-categories across genders have unique filter entries
  const rawCategories = categoriesList && categoriesList.length > 0
    ? categoriesList
    : categoryOptions.filter((c) => c.value !== 'all')

  const uniqueCategoryMap = new Map<string, string>()
  rawCategories.forEach((cat) => {
    if (!uniqueCategoryMap.has(cat.value)) {
      uniqueCategoryMap.set(cat.value, cat.label)
    }
  })

  const activeCategories = [
    { value: 'all', label: 'All Categories' },
    ...Array.from(uniqueCategoryMap.entries()).map(([value, label]) => ({
      value,
      label,
    })),
  ]

  const rawSports = sportsList && sportsList.length > 0
    ? sportsList
    : sportOptions.filter((s) => s.value !== 'all')

  const uniqueSportMap = new Map<string, string>()
  rawSports.forEach((sp) => {
    if (!uniqueSportMap.has(sp.value)) {
      uniqueSportMap.set(sp.value, sp.label)
    }
  })

  const activeSports = [
    { value: 'all', label: 'All Sports' },
    ...Array.from(uniqueSportMap.entries()).map(([value, label]) => ({
      value,
      label,
    })),
  ]
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Metrics Row: 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Total SKUs</span>
            <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
          </div>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-[#080d2d]">{metrics.total}</p>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">Products</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">In Stock</span>
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
          </div>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-emerald-600">{metrics.inStockCount}</p>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">Available</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Out Stock</span>
            <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-600" />
          </div>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-rose-600">{metrics.outOfStockCount}</p>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">Replenish</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Avg Price</span>
            <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
          </div>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-[#080d2d]">₹{metrics.avgPrice}</p>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">Active catalog</span>
        </div>
      </div>

      {/* Filter and Search Bar: Stacks on mobile */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, SKU ID, category, or sport..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-[#080d2d] outline-none transition focus:border-[#e51717] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
            >
              {activeCategories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
            >
              {activeSports.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
            >
              <option value="all">Stock: All</option>
              <option value="in_stock">In Stock Only</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <button
              type="button"
              onClick={onResetCatalog}
              title="Reset to factory defaults"
              className="flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 transition shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product List: Mobile Cards + Desktop Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-3.5 sm:py-4">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#080d2d]">
            Product Inventory
            <span className="ml-2 font-bold text-[#e51717]">({filteredProducts.length})</span>
          </h2>
        </div>

        {/* MOBILE CARD VIEW (hidden on md and above) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {isLoading ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
              <Loader2 className="size-7 animate-spin text-[#e51717] mb-2" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading catalog items...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-medium text-xs">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-3.5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-[#080d2d] line-clamp-2">
                      {product.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ID: {product.id}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      {product.mainCategory && (
                        <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                          {product.mainCategory}
                        </span>
                      )}
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold capitalize text-slate-700">
                        {product.category.replace(/-/g, ' ')}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {product.sport}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <div>
                    <div className="font-black text-sm text-[#080d2d]">₹{product.price}</div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-[10px] text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleStock(product)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                        product.inStock
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          product.inStock ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />
                      {product.inStock ? 'In Stock' : 'Out'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenEditProduct(product)}
                      className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                      title="Edit product"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {deleteConfirmId === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded bg-rose-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-rose-700 transition"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Colors & Sizes chips on mobile */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-400">Colors:</span>
                    {(product.colors || []).map((col, idx) => (
                      <span
                        key={idx}
                        className="size-3 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    <span className="font-bold text-slate-400">Sizes:</span>
                    {(product.sizes || []).slice(0, 3).map((s) => (
                      <span key={s} className="font-semibold text-slate-700">
                        {s}
                      </span>
                    ))}
                    {(product.sizes || []).length > 3 && (
                      <span className="text-slate-400">+{(product.sizes || []).length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP TABLE VIEW (visible on md and above) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category & Sport</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Colors</th>
                <th className="px-4 py-3">Sizes</th>
                <th className="px-4 py-3 text-center">Stock Toggle</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[#080d2d]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 className="size-7 animate-spin text-[#e51717] mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading catalog items...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#080d2d] line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.mainCategory && (
                          <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                            {product.mainCategory}
                          </span>
                        )}
                        <span className="font-bold capitalize text-slate-800 text-xs">
                          {product.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
                        {product.sport}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-black text-[#080d2d]">₹{product.price}</div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </td>

                    {/* Colors preview */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {(product.colors || []).map((col, idx) => (
                          <span
                            key={idx}
                            className="size-4 rounded-full border border-slate-300 shadow-xs shrink-0"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[130px]">
                        {(product.sizes || []).slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            {s}
                          </span>
                        ))}
                        {(product.sizes || []).length > 4 && (
                          <span className="text-[10px] text-slate-400 font-bold">
                            +{(product.sizes || []).length - 4}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleStock(product)}
                        title="Click to toggle stock status"
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                          product.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.inStock ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenEditProduct(product)}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
                          title="Edit product"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>

                        {deleteConfirmId === product.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => onDeleteProduct(product.id)}
                              className="rounded bg-rose-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-rose-700 transition"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-300 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="rounded-lg p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
