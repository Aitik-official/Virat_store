'use client'

import { useState } from 'react'
import {
  Tag,
  Layers,
  Maximize2,
  Megaphone,
  Phone,
  RotateCcw,
} from 'lucide-react'
import type { StoreTaxonomyConfig } from '@/lib/store-taxonomy'
import { defaultTaxonomyConfig, defaultMainCategories } from '@/lib/store-taxonomy'
import type { Product } from '@/lib/products-data'
import { TaxonomyCategoriesSubtab } from './taxonomy/TaxonomyCategoriesSubtab'
import { TaxonomyBadgesSubtab } from './taxonomy/TaxonomyBadgesSubtab'
import { TaxonomySizesSubtab } from './taxonomy/TaxonomySizesSubtab'
import { TaxonomyAnnouncementSubtab } from './taxonomy/TaxonomyAnnouncementSubtab'
import { TaxonomyContactSubtab } from './taxonomy/TaxonomyContactSubtab'

export interface TaxonomyManagerTabProps {
  taxonomyConfig: StoreTaxonomyConfig
  saveTaxonomyConfig: (config: StoreTaxonomyConfig) => void
  triggerToast: (msg: string) => void
  products?: Product[]
}

export function TaxonomyManagerTab({
  taxonomyConfig,
  saveTaxonomyConfig,
  triggerToast,
  products = [],
}: TaxonomyManagerTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'categories' | 'badges' | 'sizes' | 'announcement' | 'contact'
  >('categories')

  const activeMainCategories = taxonomyConfig.mainCategories?.length
    ? taxonomyConfig.mainCategories
    : defaultMainCategories

  // Reset All Taxonomy Defaults
  const handleResetTaxonomy = () => {
    if (window.confirm('Reset all categories, sports, badges and site elements to default?')) {
      saveTaxonomyConfig(defaultTaxonomyConfig)
      triggerToast('Store taxonomies restored to defaults.')
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header bar */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Global Architecture
          </span>
          <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-[#080d2d]">
            Store Taxonomy &amp; Dynamic Elements Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, or remove categories, product tags, sport types, sizes, and top announcement banners.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetTaxonomy}
          className="flex items-center justify-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Reset All Defaults</span>
        </button>
      </div>

      {/* Sub-tab Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('categories')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'categories'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="h-4 w-4 text-[#e51717]" />
          <span>Categories ({activeMainCategories.length} Main • {taxonomyConfig.categories.length} Sub)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('badges')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'badges'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Tag className="h-4 w-4 text-[#e51717]" />
          <span>Badges &amp; Tags ({taxonomyConfig.badges.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('sizes')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'sizes'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Maximize2 className="h-4 w-4 text-[#e51717]" />
          <span>Sizes ({taxonomyConfig.sizes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('announcement')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'announcement'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Megaphone className="h-4 w-4 text-[#e51717]" />
          <span>Announcement Bar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('contact')}
          className={`flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition shrink-0 ${
            activeSubTab === 'contact'
              ? 'bg-[#080d2d] text-white shadow-md'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Phone className="h-4 w-4 text-[#e51717]" />
          <span>Contact &amp; Socials</span>
        </button>
      </div>

      {/* Subtab Content */}
      {activeSubTab === 'categories' && (
        <TaxonomyCategoriesSubtab
          taxonomyConfig={taxonomyConfig}
          saveTaxonomyConfig={saveTaxonomyConfig}
          triggerToast={triggerToast}
          products={products}
        />
      )}

      {activeSubTab === 'badges' && (
        <TaxonomyBadgesSubtab
          taxonomyConfig={taxonomyConfig}
          saveTaxonomyConfig={saveTaxonomyConfig}
          triggerToast={triggerToast}
        />
      )}

      {activeSubTab === 'sizes' && (
        <TaxonomySizesSubtab
          taxonomyConfig={taxonomyConfig}
          saveTaxonomyConfig={saveTaxonomyConfig}
          triggerToast={triggerToast}
        />
      )}

      {activeSubTab === 'announcement' && (
        <TaxonomyAnnouncementSubtab
          taxonomyConfig={taxonomyConfig}
          saveTaxonomyConfig={saveTaxonomyConfig}
          triggerToast={triggerToast}
        />
      )}

      {activeSubTab === 'contact' && (
        <TaxonomyContactSubtab
          taxonomyConfig={taxonomyConfig}
          saveTaxonomyConfig={saveTaxonomyConfig}
        />
      )}
    </div>
  )
}
