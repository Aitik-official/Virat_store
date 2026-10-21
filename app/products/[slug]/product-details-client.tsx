'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Product, ReviewItem } from '@/lib/products-data'
import { useCart } from '@/lib/cart-context'
import { ProductDetailsGallery } from './components/ProductDetailsGallery'
import { ProductDetailsInfo } from './components/ProductDetailsInfo'
import { ProductDetailsReviews } from './components/ProductDetailsReviews'
import { RelatedProductsSection } from './components/RelatedProductsSection'

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
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(product.reviews || [])
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

    const newReview: ReviewItem = {
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

  // Extract gallery images
  const rawList = [
    ...(product.images || []),
    ...(product.image ? [product.image] : []),
    ...(product.colors?.map((c) => c.image).filter(Boolean) as string[]),
  ]
  const dedupedImages = Array.from(new Set(rawList.filter(Boolean)))
  const allImages = dedupedImages.length > 0 ? dedupedImages : (product.image ? [product.image] : [])

  const handleAddToCart = () => {
    const activeColorObj = product.colors?.find(
      (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
    )
    const colorImg = activeColorObj?.image || allImages[selectedImage] || product.image
    addItem(product, selectedSize, selectedColor, quantity, colorImg)
    setAddedSuccess(true)
    setTimeout(() => setAddedSuccess(false), 3000)
  }

  const handleBuyNow = () => {
    const activeColorObj = product.colors?.find(
      (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
    )
    const colorImg = activeColorObj?.image || allImages[selectedImage] || product.image
    addItem(product, selectedSize, selectedColor, quantity, colorImg)
    router.push('/checkout')
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
        {/* Left: Gallery Showcase */}
        <ProductDetailsGallery
          productName={product.name}
          productImage={product.image}
          productBadge={product.badge}
          allImages={allImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {/* Right: Product Details & Buying Options */}
        <ProductDetailsInfo
          product={product}
          allImages={allImages}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          addedSuccess={addedSuccess}
          notifyEmail={notifyEmail}
          setNotifyEmail={setNotifyEmail}
          notifySubmitted={notifySubmitted}
          onNotifyMe={handleNotifyMe}
        />
      </div>

      {/* Key Features & Specifications */}
      {product.features && product.features.length > 0 && (
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
      )}

      {/* Customer Ratings & Reviews Section */}
      <ProductDetailsReviews
        productName={product.name}
        productRating={product.rating}
        productReviewsCount={product.reviewsCount}
        reviewsList={reviewsList}
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
        reviewSuccess={reviewSuccess}
        reviewAuthor={reviewAuthor}
        setReviewAuthor={setReviewAuthor}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        reviewTitle={reviewTitle}
        setReviewTitle={setReviewTitle}
        reviewComment={reviewComment}
        setReviewComment={setReviewComment}
        onSubmitReview={handleSubmitReview}
        helpfulVoted={helpfulVoted}
        onHelpfulClick={handleHelpfulClick}
      />

      {/* Related Products Section */}
      <RelatedProductsSection relatedProducts={relatedProducts} />
    </div>
  )
}
