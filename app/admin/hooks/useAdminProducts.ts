import { useState, useEffect, useMemo } from 'react'
import { products as initialStaticProducts, type Product } from '@/lib/products-data'

export const PRODUCTS_STORAGE_KEY = 'virat_admin_products_v1'

export function useAdminProducts(triggerToast: (msg: string) => void) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Load products strictly from MongoDB
  const fetchProductsFromDatabase = async () => {
    setIsLoading(true)
    try {
      const prodRes = await fetch('/api/products')
      if (prodRes.ok) {
        const prodData = await prodRes.json()
        if (prodData.products && Array.isArray(prodData.products)) {
          setProducts(prodData.products)
          try {
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(prodData.products))
            window.dispatchEvent(new Event('storage'))
          } catch {}
          return prodData.products
        }
      }
    } catch (err) {
      console.error('Failed to load products from database:', err)
    } finally {
      setIsLoading(false)
    }
    return []
  }

  useEffect(() => {
    fetchProductsFromDatabase()
  }, [])

  // Sync products helper interacting directly with MongoDB
  const saveProductsToStorage = async (
    updatedList: Product[],
    syncApiProduct?: { method: 'POST' | 'PUT' | 'DELETE'; product?: Product; id?: string }
  ) => {
    // Optimistically update local view
    setProducts(updatedList)

    if (syncApiProduct) {
      try {
        if (syncApiProduct.method === 'POST' && syncApiProduct.product) {
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(syncApiProduct.product),
          })
          if (res.ok) {
            const data = await res.json()
            if (data.product) {
              // Replace optimistic temp id with confirmed database document
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === syncApiProduct.product?.id || p.slug === syncApiProduct.product?.slug
                    ? data.product
                    : p
                )
              )
            }
          }
        } else if (syncApiProduct.method === 'PUT' && syncApiProduct.product) {
          const identifier = syncApiProduct.product.id || syncApiProduct.product.slug
          await fetch(`/api/products/${identifier}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(syncApiProduct.product),
          })
        } else if (syncApiProduct.method === 'DELETE' && syncApiProduct.id) {
          await fetch(`/api/products/${syncApiProduct.id}`, {
            method: 'DELETE',
          })
        }
      } catch (error) {
        console.error('Failed to sync product change to MongoDB:', error)
      }
    }

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('storage'))
    } catch {}
  }

  const handleToggleStock = async (product: Product) => {
    const updatedProduct = { ...product, inStock: !product.inStock }
    const updated = products.map((p) => (p.id === product.id ? updatedProduct : p))
    await saveProductsToStorage(updated, { method: 'PUT', product: updatedProduct })
    triggerToast(`Product "${product.name}" marked as ${!product.inStock ? 'In Stock' : 'Out of Stock'}`)
  }

  const handleDeleteProduct = async (id: string) => {
    const target = products.find((p) => p.id === id)
    const updated = products.filter((p) => p.id !== id)
    await saveProductsToStorage(updated, { method: 'DELETE', id: target?.id || target?.slug || id })
    setDeleteConfirmId(null)
    triggerToast(`Product "${target?.name || id}" was deleted from database.`)
  }

  const handleResetCatalog = async () => {
    if (window.confirm('Reset all product items back to default? This will resync with MongoDB.')) {
      await fetchProductsFromDatabase()
      triggerToast('Catalog refreshed from database.')
    }
  }

  // Computed metrics
  const metrics = useMemo(() => {
    const total = products.length
    const inStockCount = products.filter((p) => p.inStock).length
    const outOfStockCount = total - inStockCount
    const avgPrice = total > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / total) : 0
    return { total, inStockCount, outOfStockCount, avgPrice }
  }, [products])

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
      if (selectedSport !== 'all' && p.sport !== selectedSport) return false
      if (stockFilter === 'in_stock' && !p.inStock) return false
      if (stockFilter === 'out_of_stock' && p.inStock) return false

      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sport.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [products, search, selectedCategory, selectedSport, stockFilter])

  return {
    products,
    setProducts,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedSport,
    setSelectedSport,
    selectedGender,
    setSelectedGender,
    stockFilter,
    setStockFilter,
    deleteConfirmId,
    setDeleteConfirmId,
    metrics,
    filteredProducts,
    isLoading,
    handleToggleStock,
    handleDeleteProduct,
    handleResetCatalog,
    saveProductsToStorage,
  }
}
