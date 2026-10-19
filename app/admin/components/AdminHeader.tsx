import { Menu, Plus, RotateCcw } from 'lucide-react'
import type { AdminTab } from './AdminSidebar'

interface AdminHeaderProps {
  activeTab: AdminTab
  setMobileSidebarOpen: (open: boolean) => void
  onOpenAddProduct: () => void
  onResetMediaAssets: () => void
}

export function AdminHeader({
  activeTab,
  setMobileSidebarOpen,
  onOpenAddProduct,
  onResetMediaAssets,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-3 sm:px-6 lg:px-8 backdrop-blur shadow-sm gap-2">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden shrink-0"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-base font-black uppercase tracking-tight text-[#080d2d] truncate">
            {activeTab === 'orders' && 'Customer Orders'}
            {activeTab === 'inventory' && 'Inventory & Products'}
            {activeTab === 'media' && 'Homepage Media CMS'}
            {activeTab === 'taxonomy' && 'Store Taxonomies'}
            {activeTab === 'settings' && 'System Architecture'}
          </h1>
          <p className="hidden md:block text-[11px] font-medium text-slate-400 truncate">
            {activeTab === 'orders' &&
              'Review incoming orders, view shipping addresses, initiate WhatsApp/email, and manage fulfillment.'}
            {activeTab === 'inventory' &&
              'Easily add and edit products with visual color pickers, size checkboxes, and galleries.'}
            {activeTab === 'media' && 'Replace or update images and videos visually without complex URL strings.'}
            {activeTab === 'taxonomy' &&
              'Add and manage categories, promotional tags, sports, sizes, announcement ticker, and contact details.'}
            {activeTab === 'settings' && 'Database collection and system settings.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>MongoDB Atlas</span>
        </div>

        {activeTab === 'inventory' && (
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-[#e51717] px-2.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-red-700 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Add Product</span>
            <span className="xs:hidden">Add</span>
          </button>
        )}

        {activeTab === 'media' && (
          <button
            type="button"
            onClick={onResetMediaAssets}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Reset Media</span>
            <span className="xs:hidden">Reset</span>
          </button>
        )}
      </div>
    </header>
  )
}
