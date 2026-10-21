'use client'

import { useState, useMemo, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { AdminLogin } from './components/AdminLogin'
import { OrdersTab } from './components/OrdersTab'
import { InventoryTab } from './components/InventoryTab'
import { MediaAssetsTab } from './components/MediaAssetsTab'
import { SettingsTab } from './components/SettingsTab'
import { ProductEditorModal } from './components/ProductEditorModal'
import { TaxonomyManagerTab } from './components/TaxonomyManagerTab'
import { AdminSidebar, type AdminTab } from './components/AdminSidebar'
import { AdminHeader } from './components/AdminHeader'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAdminProducts } from './hooks/useAdminProducts'
import { useAdminSiteConfig } from './hooks/useAdminSiteConfig'
import { useProductForm } from './hooks/useProductForm'

const VALID_TABS: AdminTab[] = ['orders', 'inventory', 'media', 'taxonomy', 'settings']

export function AdminDashboardClient({ initialTab }: { initialTab?: AdminTab }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  // Resolve initial active tab: explicit prop -> URL query param -> localStorage -> fallback 'orders'
  const queryTab = searchParams.get('tab') as AdminTab | null
  const [activeTab, setActiveTabState] = useState<AdminTab>(() => {
    if (initialTab && VALID_TABS.includes(initialTab)) return initialTab
    if (queryTab && VALID_TABS.includes(queryTab)) return queryTab
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('virat_admin_active_tab') as AdminTab | null
        if (saved && VALID_TABS.includes(saved)) return saved
      } catch {}
    }
    return 'orders'
  })

  // Synchronize tab state with router URL and localStorage
  const setActiveTab = (tab: AdminTab) => {
    setActiveTabState(tab)
    try {
      localStorage.setItem('virat_admin_active_tab', tab)
    } catch {}
    router.replace(`/admin?tab=${tab}`, { scroll: false })
  }

  // React to browser back/forward or external URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab') as AdminTab | null
    if (tabParam && VALID_TABS.includes(tabParam) && tabParam !== activeTab) {
      setActiveTabState(tabParam)
    }
  }, [searchParams])

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Check auth session on mount
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => {
        if (res.ok) setIsAuthenticated(true)
        else setIsAuthenticated(false)
      })
      .catch(() => setIsAuthenticated(false))
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
    } catch {}
    setIsAuthenticated(false)
  }

  // 1. Products Hook
  const {
    products,
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
    isLoading: isLoadingProducts,
    handleToggleStock,
    handleDeleteProduct,
    handleResetCatalog,
    saveProductsToStorage,
  } = useAdminProducts(triggerToast)

  // 2. Media & Taxonomy Hook
  const {
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
  } = useAdminSiteConfig(products, triggerToast)

  // 3. Product Add/Edit Form Hook
  const productForm = useProductForm({
    products,
    taxonomyConfig,
    saveProductsToStorage,
    triggerToast,
  })

  // Showcase unshowcased filter memo
  const unshowcasedProducts = useMemo(() => {
    const showcaseSlugs = new Set(mediaAssets.showcaseProducts.map((item) => item.productSlug))
    return products.filter((p) => !showcaseSlugs.has(p.slug))
  }, [products, mediaAssets.showcaseProducts])

  // While checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d2d]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-slate-700 border-t-[#e51717]" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Verifying Admin Access...
          </span>
        </div>
      </div>
    )
  }

  // If not authenticated, show Admin Login Screen
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="flex min-h-screen bg-[#f4f5f8] text-[#080d2d]">
      {/* SIDEBAR NAVIGATION */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        productsCount={products.length}
        handleLogout={handleLogout}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 w-full min-w-0">
        <AdminHeader
          activeTab={activeTab}
          setMobileSidebarOpen={setMobileSidebarOpen}
          onOpenAddProduct={productForm.handleOpenAddProduct}
          onResetMediaAssets={handleResetMediaAssets}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500 bg-[#080d2d] px-4 py-3 text-sm font-semibold text-white shadow-2xl animate-in slide-in-from-bottom">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 0: CUSTOMER ORDERS */}
          {activeTab === 'orders' && <OrdersTab />}

          {/* TAB 1: INVENTORY & PRODUCTS */}
          {activeTab === 'inventory' && (
            <InventoryTab
              categoriesList={taxonomyConfig.categories.map((c) => ({ label: c.label, value: c.value }))}
              sportsList={taxonomyConfig.sports.map((s) => ({ label: s.label, value: s.value }))}
              metrics={metrics}
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              onResetCatalog={handleResetCatalog}
              filteredProducts={filteredProducts}
              isLoading={isLoadingProducts}
              onToggleStock={handleToggleStock}
              onOpenEditProduct={productForm.handleOpenEditProduct}
              onDeleteProduct={handleDeleteProduct}
              deleteConfirmId={deleteConfirmId}
              setDeleteConfirmId={setDeleteConfirmId}
            />
          )}

          {/* TAB 2: HOMEPAGE VISUAL MEDIA CMS */}
          {activeTab === 'media' && (
            <MediaAssetsTab
              mediaAssets={mediaAssets}
              saveMediaAssets={saveMediaAssets}
              products={products}
              unshowcasedProducts={unshowcasedProducts}
              selectedSlugToAdd={selectedSlugToAdd}
              setSelectedSlugToAdd={setSelectedSlugToAdd}
              onAddProductToShowcase={handleAddProductToShowcase}
              onRemoveProductFromShowcase={handleRemoveProductFromShowcase}
              onUpdateShowcaseVideo={handleUpdateShowcaseVideo}
            />
          )}

          {/* TAB 3: TAXONOMY & DYNAMIC ELEMENTS */}
          {activeTab === 'taxonomy' && (
            <TaxonomyManagerTab
              taxonomyConfig={taxonomyConfig}
              saveTaxonomyConfig={saveTaxonomyConfig}
              triggerToast={triggerToast}
              products={products}
            />
          )}

          {/* TAB 4: SETTINGS & DATABASE ARCHITECTURE */}
          {activeTab === 'settings' && (
            <SettingsTab
              onResetCatalog={handleResetCatalog}
              onResetMediaAssets={handleResetMediaAssets}
            />
          )}
        </main>
      </div>

      {/* USER-FRIENDLY ADD / EDIT PRODUCT MODAL */}
      <ProductEditorModal
        mainCategoriesList={taxonomyConfig.mainCategories?.map((mc) => ({ label: mc.label, value: mc.value }))}
        categoriesList={taxonomyConfig.categories.map((c) => ({
          label: c.label,
          value: c.value,
          parentCategory: c.parentCategory,
        }))}
        sportsList={taxonomyConfig.sports.map((s) => ({ label: s.label, value: s.value }))}
        badgesList={taxonomyConfig.badges.map((b) => b.name)}
        sizesList={taxonomyConfig.sizes}
        isOpen={productForm.isProductModalOpen}
        onClose={() => productForm.setIsProductModalOpen(false)}
        editingProduct={productForm.editingProduct}
        onSubmit={productForm.handleSubmitProduct}
        formName={productForm.formName}
        onNameChange={productForm.handleNameChange}
        formBadge={productForm.formBadge}
        setFormBadge={productForm.setFormBadge}
        formGender={productForm.formGender}
        setFormGender={productForm.setFormGender}
        formMainCategory={productForm.formMainCategory}
        setFormMainCategory={productForm.setFormMainCategory}
        formCategory={productForm.formCategory}
        setFormCategory={productForm.setFormCategory}
        formSport={productForm.formSport}
        setFormSport={productForm.setFormSport}
        formPrice={productForm.formPrice}
        setFormPrice={productForm.setFormPrice}
        formOriginalPrice={productForm.formOriginalPrice}
        setFormOriginalPrice={productForm.setFormOriginalPrice}
        formColors={productForm.formColors}
        setFormColors={productForm.setFormColors}
        onRemoveColor={productForm.handleRemoveColor}
        newColorName={productForm.newColorName}
        setNewColorName={productForm.setNewColorName}
        newColorHex={productForm.newColorHex}
        setNewColorHex={productForm.setNewColorHex}
        onAddColor={productForm.handleAddColor}
        formSizes={productForm.formSizes}
        onToggleSize={productForm.toggleSizeSelection}
        customSizeInput={productForm.customSizeInput}
        setCustomSizeInput={productForm.setCustomSizeInput}
        onAddCustomSize={productForm.handleAddCustomSize}
        formGalleryImages={productForm.formGalleryImages}
        onRemoveGalleryImage={productForm.handleRemoveGalleryImage}
        onReplaceGalleryImage={productForm.handleReplaceGalleryImage}
        onSetMainGalleryImage={productForm.handleSetMainGalleryImage}
        onAddGalleryImage={(res) => {
          productForm.setFormGalleryImages((prev) => [...prev, res])
          if (!productForm.formMainImage) productForm.setFormMainImage(res)
        }}
        formDescription={productForm.formDescription}
        setFormDescription={productForm.setFormDescription}
        formFeatures={productForm.formFeatures}
        newFeatureInput={productForm.newFeatureInput}
        setNewFeatureInput={productForm.setNewFeatureInput}
        onAddFeature={productForm.handleAddFeature}
        onRemoveFeature={productForm.handleRemoveFeature}
        formInStock={productForm.formInStock}
        setFormInStock={productForm.setFormInStock}
        formRating={productForm.formRating}
        setFormRating={productForm.setFormRating}
        formReviewsCount={productForm.formReviewsCount}
        setFormReviewsCount={productForm.setFormReviewsCount}
        formReviews={productForm.formReviews}
        setFormReviews={productForm.setFormReviews}
      />
    </div>
  )
}
