'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, RotateCcw, SlidersHorizontal, Star } from 'lucide-react'
import { categoryOptions, genderOptions, products as defaultProducts, sportOptions, type Product } from '@/lib/products-data'

export function ProductsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [productsList, setProductsList] = useState<Product[]>(defaultProducts)

  // Reactive state derived from searchParams so navbar links update the page immediately
  const paramGender = searchParams.get('gender') || 'all'
  const paramCategory = searchParams.get('category') || 'all'
  const paramSport = searchParams.get('sport') || 'all'
  const paramSearch = searchParams.get('search') || ''
  const paramBadge = searchParams.get('badge') || ''
  const paramOutlet = searchParams.get('outlet') === 'true'
  const paramStock = searchParams.get('stock') || 'all'

  const [selectedGender, setSelectedGender] = useState<string>(paramGender)
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory)
  const [selectedSport, setSelectedSport] = useState<string>(paramSport)
  const [search, setSearch] = useState<string>(paramSearch)
  const [selectedBadge, setSelectedBadge] = useState<string>(paramBadge)
  const [selectedOutlet, setSelectedOutlet] = useState<boolean>(paramOutlet)
  const [selectedStock, setSelectedStock] = useState<string>(paramStock)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  // Whenever the URL changes (e.g. clicking navbar dropdown items), sync states immediately
  useEffect(() => {
    setSelectedGender(searchParams.get('gender') || 'all')
    setSelectedCategory(searchParams.get('category') || 'all')
    setSelectedSport(searchParams.get('sport') || 'all')
    setSearch(searchParams.get('search') || '')
    setSelectedBadge(searchParams.get('badge') || '')
    setSelectedOutlet(searchParams.get('outlet') === 'true')
    setSelectedStock(searchParams.get('stock') || 'all')
  }, [searchParams])

  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem('virat_admin_products_v1')
        if (stored) setProductsList(JSON.parse(stored))
      } catch {}
    }
    sync()

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProductsList(data.products)
          try {
            localStorage.setItem('virat_admin_products_v1', JSON.stringify(data.products))
          } catch {}
        }
      })
      .catch(() => {})

    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  // Helper to update URL query params when sidebar filters change
  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all' || value === 'false') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    const queryString = params.toString()
    router.push(queryString ? `/products?${queryString}` : '/products')
  }

  const handleGenderChange = (val: string) => {
    setSelectedGender(val)
    updateQuery({ gender: val })
  }

  const handleSportChange = (val: string) => {
    setSelectedSport(val)
    updateQuery({ sport: val })
  }

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
    updateQuery({ category: val })
  }

  const handleSearchSubmit = (val: string) => {
    setSearch(val)
    updateQuery({ search: val.trim() ? val.trim() : null })
  }

  const handleStockChange = (val: string) => {
    setSelectedStock(val)
    updateQuery({ stock: val !== 'all' ? val : null })
  }

  const resetFilters = () => {
    setSelectedGender('all')
    setSelectedCategory('all')
    setSelectedSport('all')
    setSearch('')
    setSelectedBadge('')
    setSelectedOutlet(false)
    setSelectedStock('all')
    setSortBy('featured')
    router.push('/products')
  }

  const filteredProducts = useMemo(() => {
    return productsList
      .filter((product) => {
        // Stock status filter
        if (selectedStock === 'in_stock' && !product.inStock) {
          return false
        }
        if (selectedStock === 'out_of_stock' && product.inStock) {
          return false
        }
        // Gender filter
        if (selectedGender !== 'all') {
          const productGender = (product.gender || '').toLowerCase()
          const filterGender = selectedGender.toLowerCase()
          if (productGender !== filterGender && productGender !== 'unisex') {
            return false
          }
        }

        // Category filter (support category, subCategory, or mainCategory match)
        if (selectedCategory !== 'all') {
          const cat = selectedCategory.toLowerCase()
          const pCat = (product.category || '').toLowerCase()
          const pSubCat = (product.subCategory || '').toLowerCase()
          const pMainCat = (product.mainCategory || '').toLowerCase()
          const matchesCategory = pCat === cat || pSubCat === cat || pMainCat === cat
          if (!matchesCategory) {
            return false
          }
        }

        // Sport filter (seamlessly match if sport is assigned as sport, category, subCategory, or mainCategory)
        if (selectedSport !== 'all') {
          const sp = selectedSport.toLowerCase()
          const pSport = (product.sport || '').toLowerCase()
          const pCat = (product.category || '').toLowerCase()
          const pSubCat = (product.subCategory || '').toLowerCase()
          const pMainCat = (product.mainCategory || '').toLowerCase()
          const matchesSport =
            pSport === sp || pCat === sp || pSubCat === sp || pMainCat === sp
          if (!matchesSport) {
            return false
          }
        }

        // Badge filter (e.g. badge=new, badge=bestseller, badge=pro)
        if (selectedBadge) {
          const badgeLower = selectedBadge.toLowerCase()
          const pBadge = (product.badge || '').toLowerCase()
          if (!pBadge.includes(badgeLower)) {
            return false
          }
        }

        // Outlet filter (discounted products with originalPrice > price)
        if (selectedOutlet) {
          if (!product.originalPrice || product.originalPrice <= product.price) {
            return false
          }
        }

        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase()
          const matchName = product.name.toLowerCase().includes(q)
          const matchDesc = (product.description || '').toLowerCase().includes(q)
          const matchCat = (product.category || '').toLowerCase().includes(q)
          const matchSubCat = (product.subCategory || '').toLowerCase().includes(q)
          const matchSport = (product.sport || '').toLowerCase().includes(q)
          if (!matchName && !matchDesc && !matchCat && !matchSubCat && !matchSport) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0 // featured default
      })
  }, [productsList, selectedGender, selectedCategory, selectedSport, selectedBadge, selectedOutlet, search, sortBy])

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-12">
      {/* Top Breadcrumb & Heading */}
      <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-[#080d2d]">Home</Link>
            <span>/</span>
            <Link href="/products" className="text-[#e51717] hover:underline">Products</Link>
            {selectedGender !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#080d2d] uppercase">{selectedGender}</span>
              </>
            )}
            {selectedSport !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#080d2d] uppercase">{selectedSport}</span>
              </>
            )}
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#080d2d] uppercase">{selectedCategory.replace(/-/g, ' ')}</span>
              </>
            )}
            {selectedBadge && (
              <>
                <span>/</span>
                <span className="text-[#e51717] uppercase font-bold">{selectedBadge}</span>
              </>
            )}
            {selectedOutlet && (
              <>
                <span>/</span>
                <span className="text-[#e51717] uppercase font-bold">Outlet</span>
              </>
            )}
          </div>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#080d2d] sm:text-3xl">
            {selectedBadge
              ? `${selectedBadge.toUpperCase()} COLLECTION`
              : selectedOutlet
              ? 'OUTLET & CLEARANCE'
              : selectedCategory !== 'all'
              ? `${selectedCategory.replace(/-/g, ' ')}`
              : selectedSport !== 'all'
              ? `${selectedSport} Collection`
              : selectedGender !== 'all'
              ? `${selectedGender}’s Collection`
              : 'All Products'}
            <span className="ml-2.5 text-base font-bold text-[#e51717]">({filteredProducts.length})</span>
          </h1>
        </div>

        {/* Top Controls: Search + Sort + Mobile Filter Button */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={search}
            onChange={(e) => handleSearchSubmit(e.target.value)}
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
                    onChange={() => handleGenderChange(g.value)}
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
                    onChange={() => handleSportChange(s.value)}
                    className="accent-[#e51717]"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability / Stock Status Filter */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">Availability</h3>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'All Items', value: 'all' },
                { label: 'In Stock Only', value: 'in_stock' },
                { label: 'Out of Stock', value: 'out_of_stock' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-slate-600 transition-colors hover:text-[#080d2d]"
                >
                  <input
                    type="radio"
                    name="stock"
                    checked={selectedStock === opt.value}
                    onChange={() => handleStockChange(opt.value)}
                    className="accent-[#e51717]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Deals & Offers Filter */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-[#080d2d]">Deals &amp; Offers</h3>
            <label className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-slate-700 transition-colors hover:text-[#e51717]">
              <input
                type="checkbox"
                checked={selectedOutlet}
                onChange={(e) => {
                  setSelectedOutlet(e.target.checked)
                  updateQuery({ outlet: e.target.checked ? 'true' : null })
                }}
                className="size-4 accent-[#e51717] rounded"
              />
              <span className="flex items-center gap-1.5">
                <span>On Sale / Outlet</span>
                <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[9px] font-black text-[#e51717]">SALE</span>
              </span>
            </label>
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
                    onChange={() => handleCategoryChange(cat.value)}
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
                          onChange={() => handleGenderChange(g.value)}
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
                          onChange={() => handleSportChange(s.value)}
                          className="accent-[#e51717]"
                        />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability / Stock */}
                <div className="border-b border-slate-100 pb-3">
                  <p className="text-xs font-black uppercase text-[#080d2d]">Availability</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {[
                      { label: 'All Items', value: 'all' },
                      { label: 'In Stock Only', value: 'in_stock' },
                      { label: 'Out of Stock', value: 'out_of_stock' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="mobile-stock"
                          checked={selectedStock === opt.value}
                          onChange={() => handleStockChange(opt.value)}
                          className="accent-[#e51717]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Deals & Offers */}
                <div className="border-b border-slate-100 pb-3">
                  <p className="text-xs font-black uppercase text-[#080d2d]">Deals &amp; Offers</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedOutlet}
                        onChange={(e) => {
                          setSelectedOutlet(e.target.checked)
                          updateQuery({ outlet: e.target.checked ? 'true' : null })
                        }}
                        className="size-4 accent-[#e51717] rounded"
                      />
                      <span>On Sale / Outlet</span>
                      <span className="rounded bg-rose-100 px-1 py-0.2 text-[9px] font-black text-[#e51717]">SALE</span>
                    </label>
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
                          onChange={() => handleCategoryChange(c.value)}
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
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105 ${
              !product.inStock ? 'grayscale opacity-75' : ''
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-300">
            <ShoppingBag className="w-10 h-10 mb-1 opacity-50" />
            <span className="text-[10px] uppercase font-bold text-slate-400">No Image</span>
          </div>
        )}

        {/* Badges: Out of Stock or Promotional */}
        {!product.inStock ? (
          <span className="absolute left-3 top-3 rounded-md bg-[#080d2d] border border-white/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            Out of Stock
          </span>
        ) : product.badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-[#e51717] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
            {product.badge}
          </span>
        ) : null}

        {/* Quick View Tag on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center rounded-lg bg-[#080d2d]/90 py-2 text-xs font-black uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {product.inStock ? 'View Product Details' : 'View (Out of Stock)'}
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
