'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, Check, Heart, Minus, Plus, Share2, ShieldCheck, ShoppingBag, Star, Truck, Zap } from 'lucide-react'
import type { Product } from '@/lib/products-data'
import { useCart } from '@/lib/cart-context'

export function ProductDetailsClient({
  product: initialProduct,
  relatedProducts,
}: {
  product: Product
  relatedProducts: Product[]
}) {
  const [product, setProduct] = useState<Product>(initialProduct)

  useEffect(() => {
    setProduct(initialProduct)
    setSelectedImage(0)
    setSelectedSize(initialProduct.sizes[0] || 'M')
    setSelectedColor(initialProduct.colors[0]?.name || '')
    setQuantity(1)
  }, [initialProduct])

  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem('virat_admin_products_v1')
        if (stored) {
          const list: Product[] = JSON.parse(stored)
          const found = list.find((p) => p.slug === initialProduct.slug || p.id === initialProduct.id)
          if (found) setProduct(found)
        }
      } catch {}
    }
    sync()

    fetch(`/api/products/${initialProduct.slug || initialProduct.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product)
        }
      })
      .catch(() => {})

    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [initialProduct.slug, initialProduct.id])

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [addedSuccess, setAddedSuccess] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySubmitted, setNotifySubmitted] = useState(false)

  // Customer Reviews State
  const [reviewsList, setReviewsList] = useState<import('@/lib/products-data').ReviewItem[]>(
    product.reviews || []
  )
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewAuthor, setReviewAuthor] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (product.reviews) {
      setReviewsList(product.reviews)
    }
  }, [product.reviews])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewAuthor.trim() || !reviewComment.trim()) return

    const newReview: import('@/lib/products-data').ReviewItem = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle.trim() || undefined,
      comment: reviewComment.trim(),
      verified: true,
      helpfulCount: 0,
    }

    const updatedReviews = [newReview, ...reviewsList]
    setReviewsList(updatedReviews)
    setReviewSuccess(true)

    // Recalculate average rating & reviews count
    const totalCount = updatedReviews.length
    const avgRating = Number(
      (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
    )

    const updatedProduct = {
      ...product,
      rating: avgRating,
      reviewsCount: totalCount,
      reviews: updatedReviews,
    }
    setProduct(updatedProduct)

    // Persist to database via API & LocalStorage
    try {
      await fetch(`/api/products/${product.id || product.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: avgRating,
          reviewsCount: totalCount,
          reviews: updatedReviews,
        }),
      })

      const stored = localStorage.getItem('virat_admin_products_v1')
      if (stored) {
        const list: Product[] = JSON.parse(stored)
        const updatedList = list.map((p) =>
          p.id === product.id || p.slug === product.slug ? updatedProduct : p
        )
        localStorage.setItem('virat_admin_products_v1', JSON.stringify(updatedList))
        window.dispatchEvent(new Event('storage'))
      }
    } catch {}

    setReviewAuthor('')
    setReviewTitle('')
    setReviewComment('')
    setReviewRating(5)
    setTimeout(() => {
      setReviewSuccess(false)
      setShowReviewForm(false)
    }, 2500)
  }

  const handleHelpfulClick = (revId: string) => {
    if (helpfulVoted[revId]) return
    setHelpfulVoted((prev) => ({ ...prev, [revId]: true }))
    setReviewsList((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r))
    )
  }

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notifyEmail.trim()) return
    setNotifySubmitted(true)
  }

  const router = useRouter()
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    setAddedSuccess(true)
    setTimeout(() => setAddedSuccess(false), 3000)
  }

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    router.push('/checkout')
  }

  // Only use uploaded images fetched from database / product data; remove stock fallback bleed
  const rawList = [
    ...(product.images || []),
    ...(product.image ? [product.image] : []),
    ...(product.colors?.map((c) => c.image).filter(Boolean) as string[]),
  ]
  const dedupedImages = Array.from(new Set(rawList.filter(Boolean)))
  const allImages = dedupedImages.length > 0 ? dedupedImages : (product.image ? [product.image] : [])

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
      // Swiped left -> next image
      setSelectedImage((prev) => (prev + 1) % allImages.length)
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev image
      setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Link href="/" className="hover:text-[#080d2d]">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#080d2d]">Products</Link>
        <span>/</span>
        <span className="text-[#080d2d] truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left: Gallery Showcase with thumbnails below the main card */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* Main Selected Image Card (compact height to fit on screen with thumbnails) */}
          <div
            className="relative aspect-[4/3] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f6] shadow-sm select-none touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {allImages[selectedImage] || product.image ? (
              <Image
                src={allImages[selectedImage] || product.image}
                alt={product.name}
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
            {product.badge && (
              <span className="absolute left-3.5 top-3.5 rounded-md bg-[#e51717] px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                {product.badge}
              </span>
            )}

            {/* Subtle mobile swipe indicator dots when multiple images */}
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
                    selectedImage === idx ? 'border-[#e51717] ring-2 ring-[#e51717]/20 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-contain p-1.5" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Buying Options */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#e51717]">
            <span>{product.gender}</span>
            <span>•</span>
            <span>{product.sport}</span>
          </div>

          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#080d2d] sm:text-4xl">
            {product.name}
          </h1>

          {/* Reviews & Stock */}
          <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#080d2d]">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} reviews)</span>
            </div>
            <span className="text-slate-300">|</span>
            {product.inStock ? (
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                In Stock &amp; Ready to Ship
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                <span className="size-2 rounded-full bg-rose-600" />
                Currently Out of Stock
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-6 flex items-baseline gap-3 border-y border-slate-100 py-4">
            <span className="text-3xl font-black text-[#080d2d]">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-base font-semibold text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-black text-[#e51717]">
                  SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                Color: <span className="font-medium text-slate-600">{selectedColor}</span>
              </span>
            </div>
            <div className="mt-2.5 flex gap-2.5">
              {product.colors.map((c, colorIdx) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c.name)
                    // If this color has an associated image:
                    if (c.image) {
                      const foundIdx = allImages.findIndex((img) => img === c.image)
                      if (foundIdx >= 0) {
                        setSelectedImage(foundIdx)
                      } else {
                        // Color image is first
                        setSelectedImage(0)
                      }
                    } else if (allImages[colorIdx]) {
                      // Fallback: If 1-to-1 index exists with color
                      setSelectedImage(colorIdx)
                    }
                  }}
                  className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                    selectedColor === c.name ? 'border-[#080d2d] scale-110 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className={`size-4 ${c.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#080d2d]">Select Size</span>
              <span className="text-xs font-bold text-[#e51717] hover:underline cursor-pointer">Size Guide</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-12 rounded-lg border-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                    selectedSize === s
                      ? 'border-[#080d2d] bg-[#080d2d] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Quantity Stepper */}
              <div className="flex items-center self-start sm:self-auto rounded-xl border border-slate-300 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="min-w-10 text-center text-sm font-black text-[#080d2d]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#080d2d] bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-[#080d2d] transition-all hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="size-4" />
                <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
              </button>

              {/* Buy Now Button (High-conversion instant checkout) */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e51717] px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="size-4 fill-white" />
                <span>Buy Now</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                className="flex size-11 items-center justify-center self-start sm:self-auto rounded-xl border border-slate-300 text-slate-600 transition hover:border-[#e51717] hover:text-[#e51717]"
                aria-label="Add to wishlist"
              >
                <Heart className="size-4" />
              </button>
            </div>

            {/* Out of Stock: Restock Notification Card */}
            {!product.inStock && (
              <div className="mt-3 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/70 to-white p-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-rose-100 text-[#e51717]">
                    <Bell className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-wider text-[#080d2d]">
                      Notify Me When Back in Stock
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Leave your email address to receive priority notification when new batches arrive.
                    </p>
                  </div>
                </div>

                {notifySubmitted ? (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-100/70 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <Check className="size-4 text-emerald-600" />
                    <span>Thanks! We'll notify you as soon as {product.name} is restocked.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotifyMe} className="mt-3 flex gap-2">
                    <input
                      type="email"
                      required
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="Enter your email for restock alert..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-[#080d2d] outline-none focus:border-[#e51717]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#080d2d] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#e51717] shrink-0"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Success Banner */}
          {addedSuccess && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 border border-emerald-200 animate-in fade-in">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-emerald-600" />
                Added to your bag successfully!
              </span>
              <Link href="/cart" className="underline hover:text-emerald-900">
                View Bag & Checkout →
              </Link>
            </div>
          )}

          {/* Value Props */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="size-5 text-[#e51717]" />
              <div>
                <p className="font-black uppercase text-[#080d2d]">Free Shipping</p>
                <p className="text-[11px] text-slate-400">On all orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#e51717]" />
              <div>
                <p className="font-black uppercase text-[#080d2d]">100% Authentic</p>
                <p className="text-[11px] text-slate-400">Official Virat Sports gear</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features & Specifications */}
      <div className="mt-16 border-t border-slate-200 pt-12">
        <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
          Performance Features
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8f9fa] p-4">
              <span className="mt-0.5 size-2 shrink-0 rounded-full bg-[#e51717]" />
              <span className="text-xs font-bold text-slate-700">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Ratings & Reviews Section */}
      <section className="mt-16 border-t border-slate-200 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
              Verified Feedback
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#080d2d]">
              Customer Reviews ({reviewsList.length || product.reviewsCount})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real reviews from cricketers and athletes who train with {product.name}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#080d2d] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#e51717] shrink-0 self-start sm:self-auto"
          >
            <Star className="size-4 text-amber-400 fill-amber-400" />
            <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Rating Summary Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          {/* Left: Overall Score */}
          <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <span className="text-5xl font-black text-[#080d2d] tracking-tighter">
              {product.rating ? product.rating.toFixed(1) : '4.9'}
            </span>
            <div className="mt-2 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < Math.round(product.rating || 5)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs font-bold text-slate-500">
              Based on {reviewsList.length || product.reviewsCount} verified ratings
            </p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-200">
              <Check className="size-3 text-emerald-600" /> 98% recommend this product
            </span>
          </div>

          {/* Center: Rating Distribution Breakdown */}
          <div className="space-y-2 md:col-span-2 flex flex-col justify-center">
            {[5, 4, 3, 2, 1].map((stars) => {
              const countForStar = reviewsList.filter((r) => r.rating === stars).length
              const total = reviewsList.length || 1
              const percentage = Math.round(
                reviewsList.length > 0
                  ? (countForStar / total) * 100
                  : stars === 5
                  ? 80
                  : stars === 4
                  ? 15
                  : 5
              )

              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-14 shrink-0 font-bold text-slate-700">
                    <span>{stars}</span>
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-[11px] font-bold text-slate-400">
                    {percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Write Review Form Card */}
        {showReviewForm && (
          <div className="mt-6 rounded-2xl border-2 border-slate-900 bg-slate-50 p-6 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#080d2d]">
                  Share Your Experience with {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your feedback helps athletes choose the best performance gear.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                ✕ Close
              </button>
            </div>

            {reviewSuccess ? (
              <div className="my-6 flex items-center gap-3 rounded-xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800 border border-emerald-300">
                <Check className="size-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your verified review has been submitted and published successfully.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Tendulkar"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Overall Rating *</label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="focus:outline-none transition hover:scale-125"
                        >
                          <Star
                            className={`size-6 ${
                              s <= reviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 hover:text-amber-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-black uppercase text-slate-700">
                        {reviewRating === 5
                          ? 'Excellent (5 Stars)'
                          : reviewRating === 4
                          ? 'Very Good (4 Stars)'
                          : reviewRating === 3
                          ? 'Average (3 Stars)'
                          : reviewRating === 2
                          ? 'Fair (2 Stars)'
                          : 'Poor (1 Star)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Review Headline (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Best match jersey I've ever played in"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the fabric quality, breathability, durability, and fit..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-[#e51717]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#e51717] px-6 py-2.5 font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews List */}
        <div className="mt-8 space-y-4">
          {reviewsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="size-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
                <Star className="size-6 fill-amber-400" />
              </div>
              <h4 className="font-black text-sm uppercase text-[#080d2d]">No Reviews Yet</h4>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                Be the first cricketer to share your experience with {product.name}!
              </p>
              <button
                type="button"
                onClick={() => setShowReviewForm(true)}
                className="mt-4 rounded-xl bg-[#080d2d] px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#e51717] transition"
              >
                Write First Review
              </button>
            </div>
          ) : (
            reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#080d2d] text-white font-black text-xs shrink-0 uppercase">
                      {rev.author.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-xs sm:text-sm text-[#080d2d]">
                          {rev.author}
                        </span>
                        {rev.verified !== false && (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-200">
                            <Check className="size-3 text-emerald-600" />
                            Verified Athlete
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  {rev.title && (
                    <h4 className="font-black text-xs sm:text-sm text-[#080d2d] mb-1">
                      {rev.title}
                    </h4>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-slate-400" />
                    Verified Customer Purchase
                  </span>

                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                      helpfulVoted[rev.id]
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <span>Helpful?</span>
                    <span className="font-black">({(rev.helpfulCount || 0) + (helpfulVoted[rev.id] ? 1 : 0)})</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 border-t border-slate-200 pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d] sm:text-2xl">
              You May Also Like
            </h2>
            <Link href="/products" className="text-xs font-black uppercase text-[#e51717] hover:underline">
              View All →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md hover:border-[#080d2d]"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
                  <Image src={rel.image} alt={rel.name} fill className="object-contain p-2 transition group-hover:scale-105" />
                </div>
                <p className="mt-3 truncate text-xs font-black uppercase text-[#080d2d] group-hover:text-[#e51717]">
                  {rel.name}
                </p>
                <p className="mt-1 text-xs font-black text-[#080d2d]">
                  ₹{rel.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
