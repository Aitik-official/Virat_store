import { useState, useEffect } from 'react'
import {
  defaultSiteAssets,
  defaultShowcaseProducts,
  MEDIA_STORAGE_KEY,
  type SiteMediaAssets,
  type ShowcaseProductItem,
} from '@/lib/site-assets'
import {
  defaultTaxonomyConfig,
  TAXONOMY_STORAGE_KEY,
  type StoreTaxonomyConfig,
} from '@/lib/store-taxonomy'
import type { Product } from '@/lib/products-data'

export function useAdminSiteConfig(
  products: Product[],
  triggerToast: (msg: string) => void
) {
  const [mediaAssets, setMediaAssets] = useState<SiteMediaAssets>(defaultSiteAssets)
  const [taxonomyConfig, setTaxonomyConfig] = useState<StoreTaxonomyConfig>(defaultTaxonomyConfig)
  const [selectedSlugToAdd, setSelectedSlugToAdd] = useState<string>('')

  // Load Media Assets & Taxonomy from DB/LocalStorage
  useEffect(() => {
    let isMounted = true

    async function loadData() {
      // 1. Fetch Media
      try {
        const mediaRes = await fetch('/api/media')
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json()
          if (isMounted && mediaData.media) {
            const merged: SiteMediaAssets = {
              ...defaultSiteAssets,
              ...mediaData.media,
              promotionalSection: {
                ...defaultSiteAssets.promotionalSection,
                ...(mediaData.media.promotionalSection || {}),
              },
              categories: { ...defaultSiteAssets.categories, ...(mediaData.media.categories || {}) },
              showcaseProducts:
                mediaData.media.showcaseProducts && mediaData.media.showcaseProducts.length > 0
                  ? mediaData.media.showcaseProducts
                  : defaultShowcaseProducts,
            }
            setMediaAssets(merged)
            try {
              localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(merged))
            } catch {}
          }
        }
      } catch {
        try {
          const storedMedia = localStorage.getItem(MEDIA_STORAGE_KEY)
          if (storedMedia && isMounted) {
            setMediaAssets(JSON.parse(storedMedia))
          }
        } catch {}
      }

      // 2. Fetch Taxonomy
      try {
        const taxRes = await fetch('/api/taxonomy')
        if (taxRes.ok) {
          const taxData = await taxRes.json()
          if (isMounted && taxData.taxonomy) {
            const mergedTax: StoreTaxonomyConfig = {
              ...defaultTaxonomyConfig,
              ...taxData.taxonomy,
              categories: taxData.taxonomy.categories?.length
                ? taxData.taxonomy.categories
                : defaultTaxonomyConfig.categories,
              sports: taxData.taxonomy.sports?.length
                ? taxData.taxonomy.sports
                : defaultTaxonomyConfig.sports,
              badges: taxData.taxonomy.badges?.length
                ? taxData.taxonomy.badges
                : defaultTaxonomyConfig.badges,
              sizes: taxData.taxonomy.sizes?.length
                ? taxData.taxonomy.sizes
                : defaultTaxonomyConfig.sizes,
              announcement: {
                ...defaultTaxonomyConfig.announcement,
                ...(taxData.taxonomy.announcement || {}),
                items:
                  Array.isArray(taxData.taxonomy.announcement?.items) &&
                  taxData.taxonomy.announcement.items.length > 0
                    ? taxData.taxonomy.announcement.items
                    : taxData.taxonomy.announcement?.text
                    ? [
                        {
                          text: taxData.taxonomy.announcement.text,
                          linkText: taxData.taxonomy.announcement.linkText,
                          linkHref: taxData.taxonomy.announcement.linkHref,
                        },
                      ]
                    : defaultTaxonomyConfig.announcement.items,
              },
              contactInfo: {
                ...defaultTaxonomyConfig.contactInfo,
                ...(taxData.taxonomy.contactInfo || {}),
              },
            }
            setTaxonomyConfig(mergedTax)
            try {
              localStorage.setItem(TAXONOMY_STORAGE_KEY, JSON.stringify(mergedTax))
            } catch {}
          }
        }
      } catch {
        try {
          const storedTax = localStorage.getItem(TAXONOMY_STORAGE_KEY)
          if (storedTax && isMounted) {
            setTaxonomyConfig(JSON.parse(storedTax))
          }
        } catch {}
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  // Save Media Assets to MongoDB & sync with LocalStorage
  const saveMediaAssets = async (updated: SiteMediaAssets) => {
    setMediaAssets(updated)
    try {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
      triggerToast('Homepage media updated successfully!')
    } catch {
      triggerToast('Could not save media changes locally.')
    }

    try {
      await fetch('/api/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
    } catch (err) {
      console.error('MongoDB media sync error:', err)
    }
  }

  // Save Store Taxonomy to MongoDB & sync with LocalStorage
  const saveTaxonomyConfig = async (updated: StoreTaxonomyConfig) => {
    setTaxonomyConfig(updated)
    try {
      localStorage.setItem(TAXONOMY_STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch {
      triggerToast('Could not save taxonomy changes locally.')
    }

    try {
      await fetch('/api/taxonomy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
    } catch (err) {
      console.error('MongoDB taxonomy sync error:', err)
    }
  }

  // Showcase Section: Add product to homepage showcase
  const handleAddProductToShowcase = () => {
    if (!selectedSlugToAdd) return
    const chosenProduct = products.find((p) => p.slug === selectedSlugToAdd)
    if (!chosenProduct) return

    if (mediaAssets.showcaseProducts.some((item) => item.productSlug === chosenProduct.slug)) {
      triggerToast(`Product "${chosenProduct.name}" is already in the homepage showcase.`)
      return
    }

    const newShowcaseItem: ShowcaseProductItem = {
      productSlug: chosenProduct.slug,
      tag: chosenProduct.badge || 'Featured Gear',
      quickDescription: chosenProduct.description,
      reel1Title: `${chosenProduct.name} - Drill Action`,
      reel1Label: 'Reel 01',
      reel1Video: '/videos/display_video.mp4',
      reel2Title: `${chosenProduct.name} - Match Agility`,
      reel2Label: 'Reel 02',
      reel2Video: '/videos/jadeja.mp4',
    }

    const updated = {
      ...mediaAssets,
      showcaseProducts: [...mediaAssets.showcaseProducts, newShowcaseItem],
    }
    saveMediaAssets(updated)
    setSelectedSlugToAdd('')
    triggerToast(`Added "${chosenProduct.name}" to Section 05 showcase!`)
  }

  // Showcase Section: Remove product from showcase
  const handleRemoveProductFromShowcase = (slug: string) => {
    if (mediaAssets.showcaseProducts.length <= 1) {
      triggerToast('At least one product must remain in the homepage showcase.')
      return
    }
    const updated = {
      ...mediaAssets,
      showcaseProducts: mediaAssets.showcaseProducts.filter((item) => item.productSlug !== slug),
    }
    saveMediaAssets(updated)
    triggerToast('Removed product from homepage showcase.')
  }

  // Showcase Section: Update Video for a specific product
  const handleUpdateShowcaseVideo = (
    productSlug: string,
    reelNumber: 1 | 2,
    newVideoSrc: string
  ) => {
    const updated = {
      ...mediaAssets,
      showcaseProducts: mediaAssets.showcaseProducts.map((item) => {
        if (item.productSlug === productSlug) {
          return {
            ...item,
            [reelNumber === 1 ? 'reel1Video' : 'reel2Video']: newVideoSrc,
          }
        }
        return item
      }),
    }
    saveMediaAssets(updated)
  }

  const handleResetMediaAssets = () => {
    if (window.confirm('Reset all homepage media (banners, video, categories) to factory defaults?')) {
      saveMediaAssets(defaultSiteAssets)
      triggerToast('Media assets restored to default.')
    }
  }

  return {
    mediaAssets,
    saveMediaAssets,
    taxonomyConfig,
    saveTaxonomyConfig,
    selectedSlugToAdd,
    setSelectedSlugToAdd,
    handleAddProductToShowcase,
    handleRemoveProductFromShowcase,
    handleUpdateShowcaseVideo,
    handleResetMediaAssets,
  }
}
