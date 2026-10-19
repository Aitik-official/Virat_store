import Link from 'next/link'
import {
  Package,
  Film,
  SlidersHorizontal,
  Eye,
  Tag,
  X,
  LogOut,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react'

export type AdminTab = 'orders' | 'inventory' | 'media' | 'taxonomy' | 'settings'

interface AdminSidebarProps {
  activeTab: AdminTab
  setActiveTab: (tab: AdminTab) => void
  mobileSidebarOpen: boolean
  setMobileSidebarOpen: (open: boolean) => void
  productsCount: number
  handleLogout: () => void
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  productsCount,
  handleLogout,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-[#080d2d] text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tighter text-white">VIRAT</span>
            <span className="rounded bg-[#e51717] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              ADMIN
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">
              v2.3
            </span>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="rounded p-1 text-slate-400 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 p-3 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Store Modules
          </div>

          {/* Module: Customer Orders */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('orders')
              setMobileSidebarOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
              activeTab === 'orders'
                ? 'bg-[#e51717] text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              <span>Customer Orders</span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                activeTab === 'orders' ? 'bg-white text-[#e51717]' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              Live
            </span>
          </button>

          {/* Module 1: Inventory */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('inventory')
              setMobileSidebarOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
              activeTab === 'inventory'
                ? 'bg-[#e51717] text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4" />
              <span>Inventory &amp; Products</span>
            </div>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                activeTab === 'inventory' ? 'bg-white text-[#e51717]' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {productsCount}
            </span>
          </button>

          {/* Module 2: CMS Media & Videos */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('media')
              setMobileSidebarOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
              activeTab === 'media'
                ? 'bg-[#e51717] text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Film className="h-4 w-4" />
              <span>Homepage Media CMS</span>
            </div>
            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${
                activeTab === 'media' ? 'bg-black/30 text-white' : 'bg-[#e51717]/20 text-[#e51717]'
              }`}
            >
              Visual
            </span>
          </button>

          {/* Module 3: Store Taxonomy & Tags */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('taxonomy')
              setMobileSidebarOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
              activeTab === 'taxonomy'
                ? 'bg-[#e51717] text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4" />
              <span>Categories &amp; Tags</span>
            </div>
            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${
                activeTab === 'taxonomy' ? 'bg-black/30 text-white' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              Dynamic
            </span>
          </button>

          {/* Module 4: Settings */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('settings')
              setMobileSidebarOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
              activeTab === 'settings'
                ? 'bg-[#e51717] text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Store Configuration</span>
            </div>
          </button>

          <div className="my-4 border-t border-slate-800/80" />

          {/* Quick storefront links */}
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Live Storefront
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Eye className="h-4 w-4 text-emerald-400" />
              <span>Preview Homepage</span>
            </div>
            <ExternalLink className="h-3 w-3 text-slate-500" />
          </Link>

          <Link
            href="/products"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-blue-400" />
              <span>View Catalog</span>
            </div>
            <ExternalLink className="h-3 w-3 text-slate-500" />
          </Link>
        </div>

        <div className="border-t border-slate-800 p-3 space-y-2">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-slate-400">Admin Active</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
