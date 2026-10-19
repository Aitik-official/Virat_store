'use client'

import { RotateCcw } from 'lucide-react'

export interface SettingsTabProps {
  onResetCatalog: () => void
  onResetMediaAssets: () => void
}

export function SettingsTab({
  onResetCatalog,
  onResetMediaAssets,
}: SettingsTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-wider text-[#080d2d]">
          MongoDB Atlas & System Settings
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Data storage adapter: <strong className="text-emerald-600 font-mono">Dynamic MongoDB API + LocalStorage Fallback</strong>.
        </p>

        <div className="mt-4 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700">
          <div><strong>Database:</strong> MongoDB Atlas (Connected via Mongoose)</div>
          <div><strong>Collection (Products):</strong> `products`</div>
          <div><strong>Collection (Media CMS):</strong> `site_media`</div>
          <div><strong>Collection (Orders):</strong> `orders`</div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onResetCatalog}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Products Catalog</span>
          </button>
          <button
            type="button"
            onClick={onResetMediaAssets}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Media to Default</span>
          </button>
        </div>
      </div>
    </div>
  )
}
