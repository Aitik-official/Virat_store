'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Filter, RotateCcw, SlidersHorizontal, Star } from 'lucide-react'
import { categoryOptions, genderOptions, products, sportOptions, type Product } from '@/lib/products-data'

export function ProductsClient() {
  const searchParams = useSearchParams()

  const initialGender = searchParams.get('gender') || 'all'
  const initialCategory = searchParams.get('category') || 'all'
  const initialSport = searchParams.get('sport') || 'all'
  const initialSearch = searchParams.get('search') || ''

  const [selectedGender, setSelectedGender] = useState<string>(initialGender)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedSport, setSelectedSport] = useState<string>(initialSport)
  const [search, setSearch] = useState<string>(initialSearch)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedGender !== 'all' && product.gender !== selectedGender && product.gender !== 'unisex') {
          return false
        }
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false
        }
        if (selectedSport !== 'all' && product.sport !== selectedSport) {
          return false
        }
        if (search.trim()) {
          const q = search.toLowerCase()
          return (
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q)
          )
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0 // featured default
      })
  }, [selectedGender, selectedCategory, selectedSport, search, sortBy])

  const resetFilters = () => {
    setSelectedGender('all')
    setSelectedCategory('all')
    setSelectedSport('all')
    setSearch('')
    setSortBy('featured')
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-12">
      {/* Top Breadcrumb & Heading */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-[#080d2d]">Home</Link>
            <span>/</span>
            <span className="text-[#e51717]">Products</span>
            {selectedGender !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#080d2d] uppercase">{selectedGender}</span>
              </>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#080d2d] sm:text-4xl">
            {selectedGender !== 'all' ? `${selectedGender}’s Collection` : 'All Products'}
            <span className="ml-3 text-lg font-bold text-[#e51717]">({filteredProducts.length})</span>
          </h1>
        </div>

        {/* Top Controls: Search + Sort + Mobile Filter Button */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-[#080d2d] outline-none focus:border-[#e51717]"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase text-[#080d2d] outline-none focus:border-[#e51717]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold uppercase text-[#080d2d] hover:border-[#080d2d] md:hidden"
          >
            <Filter className="size-3.5 text-[#e51717]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden space-y-6 md:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#080d2d]">
              <SlidersHorizontal className="size-4 text-[#e51717]" />
              Filters
            </h2>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-[#e51717]"
            >
              <RotateCcw className="size-3" />
              Reset
            </button>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">Gender</h3>
            <div className="flex flex-col gap-1.5">
              {genderOptions.map((g) => (
                <label
                  key={g.value}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-bold capitalize text-slate-600 transition-colors hover:text-[#080d2d]"
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === g.value}
                    onChange={() => setSelectedGender(g.value)}
                    className="accent-[#e51717]"
                  />
                  <span>{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sport Filter */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">Shop by Sport</h3>
            <div className="flex flex-col gap-1.5">
              {sportOptions.map((s) => (
                <label
                  key={s.value}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-bold capitalize text-slate-600 transition-colors hover:text-[#080d2d]"
                >
                  <input
                    type="radio"
                    name="sport"
                    checked={selectedSport === s.value}
                    onChange={() => setSelectedSport(s.value)}
                    className="accent-[#e51717]"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">Category</h3>
            <div className="space-y-1.5">
              {categoryOptions.map((cat) => (
                <label
                  key={cat.value}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-slate-600 transition-colors hover:text-[#080d2d]"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.value}
                    onChange={() => setSelectedCategory(cat.value)}
                    className="accent-[#e51717]"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer Modal */}
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm md:hidden">
            <div className="ml-auto flex size-full max-w-xs flex-col bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-sm font-black uppercase text-[#080d2d]">Filter Products</span>
                <button onClick={() => setFilterDrawerOpen(false)} aria-label="Close filters">
                  <RotateCcw className="size-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto py-4">
                {/* Gender */}
                <div>
                  <p className="text-xs font-black uppercase text-[#080d2d]">Gender</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {genderOptions.map((g) => (
                      <label key={g.value} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="mobile-gender"
                          checked={selectedGender === g.value}
                          onChange={() => setSelectedGender(g.value)}
                          className="accent-[#e51717]"
                        />
                        {g.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sport */}
                <div>
                  <p className="text-xs font-black uppercase text-[#080d2d]">Sport</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {sportOptions.map((s) => (
                      <label key={s.value} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="mobile-sport"
                          checked={selectedSport === s.value}
                          onChange={() => setSelectedSport(s.value)}
                          className="accent-[#e51717]"
                        />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-xs font-black uppercase text-[#080d2d]">Category</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {categoryOptions.map((c) => (
                      <label key={c.value} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="mobile-category"
                          checked={selectedCategory === c.value}
                          onChange={() => setSelectedCategory(c.value)}
                          className="accent-[#e51717]"
                        />
                        {c.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-full rounded-lg bg-[#080d2d] py-3 text-xs font-black uppercase tracking-wider text-white"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <main>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
              <p className="text-lg font-black uppercase text-[#080d2d]">No products found</p>
              <p className="mt-1 text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
              <button
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-[#080d2d] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#e51717]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#080d2d] hover:shadow-xl"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#f9fafb] to-[#f1f3f6]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-[#e51717] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
            {product.badge}
          </span>
        )}

        {/* Quick View Tag on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center rounded-lg bg-[#080d2d]/90 py-2 text-xs font-black uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          View Product Details
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#e51717]">
          <span>{product.sport}</span>
          <span className="flex items-center gap-1 text-slate-700">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-1 text-sm font-black uppercase text-[#080d2d] transition-colors group-hover:text-[#e51717]">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {product.description}
        </p>

        {/* Price & Colors */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-[#080d2d]">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="size-3 rounded-full border border-slate-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
