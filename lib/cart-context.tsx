'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '@/lib/products-data'

export type CartItem = {
  product: Product
  size: string
  color: string
  colorHex?: string
  colorImage?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (
    product: Product,
    size: string,
    color: string,
    quantity?: number,
    colorImage?: string
  ) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('virat_cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true)
    }

    // Also sync if another tab modifies the cart
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'virat_cart') {
        try {
          if (e.newValue) {
            setItems(JSON.parse(e.newValue))
          } else {
            setItems([])
          }
        } catch {}
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Sync to localStorage only AFTER initial load has completed
  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem('virat_cart', JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, isInitialized])

  const addItem = (
    product: Product,
    size: string,
    color: string,
    quantity = 1,
    customColorImage?: string
  ) => {
    // Find matching color data from product if available
    const matchedColorObj = product.colors?.find(
      (c) => c.name.toLowerCase() === color.toLowerCase()
    )
    const colorHex = matchedColorObj?.hex
    const colorImage = customColorImage || matchedColorObj?.image || product.image

    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity, colorHex: colorHex || i.colorHex, colorImage: colorImage || i.colorImage }
            : i
        )
      }
      return [...prev, { product, size, color, colorHex, colorImage, quantity }]
    })
  }

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.size === size && i.color === color)
      )
    )
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      )
    )
  }

  const clearCart = () => setItems([])

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
