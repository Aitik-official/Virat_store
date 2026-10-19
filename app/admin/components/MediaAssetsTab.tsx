'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Eye, Plus, Trash2 } from 'lucide-react'
import { ImageAssetCard, VideoAssetCard } from './AssetCards'
import type { SiteMediaAssets } from '@/lib/site-assets'
import type { Product } from '@/lib/products-data'

export interface MediaAssetsTabProps {
  mediaAssets: SiteMediaAssets
  saveMediaAssets: (assets: SiteMediaAssets) => void
  products: Product[]
  unshowcasedProducts: Product[]
  selectedSlugToAdd: string
  setSelectedSlugToAdd: (slug: string) => void
  onAddProductToShowcase: () => void
  onRemoveProductFromShowcase: (slug: string) => void
  onUpdateShowcaseVideo: (productSlug: string, reelNumber: 1 | 2, newSrc: string) => void
}

export function MediaAssetsTab({
  mediaAssets,
  saveMediaAssets,
  products,
  unshowcasedProducts,
  selectedSlugToAdd,
  setSelectedSlugToAdd,
  onAddProductToShowcase,
  onRemoveProductFromShowcase,
  onUpdateShowcaseVideo,
}: MediaAssetsTabProps) {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Unified Homepage Visual CMS
          </span>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#080d2d]">
            Homepage Section-by-Section Media Manager
          </h2>
          <p className="text-xs text-slate-500">
            Replace and update images and videos visually across all homepage sections.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#080d2d] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition shrink-0"
        >
          <Eye className="h-4 w-4 text-emerald-400" />
          <span>Preview Live Changes</span>
        </Link>
      </div>

      {/* SECTION 1: HERO CAROUSEL BANNERS */}
      <section id="sec-hero" className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
              Section 01 • Top of Homepage
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#080d2d]">
              Hero Carousel Banner Slides
            </h3>
            <p className="text-xs text-slate-400">
              Top animated header banners ({mediaAssets.heroBanners.length} active slides).
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = {
                ...mediaAssets,
                heroBanners: [...mediaAssets.heroBanners, '/images/banner8.png'],
              }
              saveMediaAssets(updated)
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-slate-800 transition shrink-0 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 text-[#e51717]" />
            <span>Add Banner Slide</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mediaAssets.heroBanners.map((bannerSrc, index) => (
            <ImageAssetCard
              key={index}
              label={`Hero Banner #${index + 1}`}
              sublabel="Top Carousel Slide"
              currentSrc={bannerSrc}
              aspectRatio="aspect-[2.2/1]"
              onUpdate={(newSrc) => {
                const updatedBanners = [...mediaAssets.heroBanners]
                updatedBanners[index] = newSrc
                saveMediaAssets({ ...mediaAssets, heroBanners: updatedBanners })
              }}
              onRemove={
                mediaAssets.heroBanners.length > 1
                  ? () => {
                      const updatedBanners = mediaAssets.heroBanners.filter((_, i) => i !== index)
                      saveMediaAssets({ ...mediaAssets, heroBanners: updatedBanners })
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: PROMOTIONAL POSTERS */}
      <section id="sec-promotional" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Section 02 • Promotional Strip
          </span>
          <h3 className="text-base font-black uppercase tracking-tight text-[#080d2d]">
            &quot;Find Your Game&quot; Athlete Campaign Posters
          </h3>
          <p className="text-xs text-slate-400">
            Featured split cards showcasing brand ambassadors (e.g. Rohit Sharma &amp; Suryakumar Yadav).
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ImageAssetCard
            label="Left Ambassador Poster (Rohit Sharma)"
            sublabel="Find Your Game Feature"
            currentSrc={mediaAssets.promotionalSection?.leftPoster || '/images/Rohit.jpeg'}
            aspectRatio="aspect-[1500/1076]"
            contain
            onUpdate={(newSrc) => {
              saveMediaAssets({
                ...mediaAssets,
                promotionalSection: {
                  ...mediaAssets.promotionalSection,
                  leftPoster: newSrc,
                },
              })
            }}
          />

          <ImageAssetCard
            label="Right Ambassador Poster (Suryakumar Yadav)"
            sublabel="Cricket Action Feature"
            currentSrc={mediaAssets.promotionalSection?.rightPoster || '/images/SKY.jpeg'}
            aspectRatio="aspect-[1500/1076]"
            contain
            onUpdate={(newSrc) => {
              saveMediaAssets({
                ...mediaAssets,
                promotionalSection: {
                  ...mediaAssets.promotionalSection,
                  rightPoster: newSrc,
                },
              })
            }}
          />
        </div>
      </section>

      {/* SECTION 3: SHOP BY CATEGORY GRID */}
      <section id="sec-category" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
            Section 03 • Shop By Category
          </span>
          <h3 className="text-base font-black uppercase tracking-tight text-[#080d2d]">
            Category Showcase Cards
          </h3>
          <p className="text-xs text-slate-400">
            Visual image cards for Men, Women, Youth, Cap, Bags &amp; Kitbags, and Accessories.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(mediaAssets.categories).map(([catKey, catSrc]) => (
            <ImageAssetCard
              key={catKey}
              label={catKey.toUpperCase()}
              sublabel="Category Thumbnail"
              currentSrc={catSrc}
              aspectRatio="aspect-square"
              contain
              onUpdate={(newSrc) => {
                const updatedCategories = {
                  ...mediaAssets.categories,
                  [catKey]: newSrc,
                }
                saveMediaAssets({ ...mediaAssets, categories: updatedCategories })
              }}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: TEAMWEAR CLUB & CUSTOM GEAR */}
      <section id="sec-teamwear" className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
              Section 04 • Custom Kits &amp; Gear
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#080d2d]">
              TeamWear Club Showcase &amp; Slider
            </h3>
            <p className="text-xs text-slate-400">
              TeamWear promotional banner and club gear carousel slides.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = {
                ...mediaAssets,
                teamwearSlides: [...mediaAssets.teamwearSlides, '/images/TeamWear/TeamWear1.png'],
              }
              saveMediaAssets(updated)
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-slate-800 transition shrink-0 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 text-[#e51717]" />
            <span>Add TeamWear Slide</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ImageAssetCard
            label="TeamWear Main Banner"
            sublabel="Campaign header banner"
            currentSrc={mediaAssets.teamwearBanner}
            aspectRatio="aspect-[2/1]"
            contain
            onUpdate={(newSrc) => {
              saveMediaAssets({ ...mediaAssets, teamwearBanner: newSrc })
            }}
          />

          {mediaAssets.teamwearSlides.map((slideSrc, index) => (
            <ImageAssetCard
              key={index}
              label={`TeamWear Slide #${index + 1}`}
              sublabel="Carousel slide"
              currentSrc={slideSrc}
              aspectRatio="aspect-[2/1]"
              contain
              onUpdate={(newSrc) => {
                const updatedSlides = [...mediaAssets.teamwearSlides]
                updatedSlides[index] = newSrc
                saveMediaAssets({ ...mediaAssets, teamwearSlides: updatedSlides })
              }}
              onRemove={
                mediaAssets.teamwearSlides.length > 1
                  ? () => {
                      const updatedSlides = mediaAssets.teamwearSlides.filter((_, i) => i !== index)
                      saveMediaAssets({ ...mediaAssets, teamwearSlides: updatedSlides })
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* SECTION 05: SEE IT IN ACTION (ONLY HOMEPAGE SHOWCASE) */}
      <section id="sec-videos" className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-4 gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
              Section 05 • &quot;See It In Action&quot; Product Reels
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#080d2d]">
              Homepage Featured Products &amp; Their Dedicated Videos
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Only the products selected here appear in the homepage video showcase. You can add products, remove products, and replace Reel 1 / Reel 2 videos visually.
            </p>
          </div>

          {/* Add Product Selector: Responsive flex/grid without overflowing */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0">
            <select
              value={selectedSlugToAdd}
              onChange={(e) => setSelectedSlugToAdd(e.target.value)}
              className="w-full sm:w-auto sm:max-w-xs truncate rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#080d2d] outline-none focus:border-[#e51717]"
            >
              <option value="">Select product to add to homepage...</option>
              {unshowcasedProducts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!selectedSlugToAdd}
              onClick={onAddProductToShowcase}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#e51717] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow transition hover:bg-red-700 disabled:opacity-40 shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* List of Homepage Showcase Products with their Reel Videos */}
        <div className="mt-6 space-y-6">
          {mediaAssets.showcaseProducts.map((showcaseItem, index) => {
            const matchedProduct = products.find((p) => p.slug === showcaseItem.productSlug)

            return (
              <div
                key={showcaseItem.productSlug}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <Image
                        src={matchedProduct?.image || '/images/category/mens.png'}
                        alt={matchedProduct?.name || showcaseItem.productSlug}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#080d2d] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                          Slide #{index + 1}
                        </span>
                        <h4 className="font-black text-sm text-[#080d2d]">
                          {matchedProduct?.name || showcaseItem.productSlug}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Category: <strong className="capitalize">{matchedProduct?.category || 'General'}</strong> • Price: <strong>₹{matchedProduct?.price || 1999}</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveProductFromShowcase(showcaseItem.productSlug)}
                    className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition self-start sm:self-auto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove from Homepage</span>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <VideoAssetCard
                    label="Reel 1: Match Action Video"
                    sublabel={`Plays for "${matchedProduct?.name || 'Product'}"`}
                    currentSrc={showcaseItem.reel1Video || '/videos/display_video.mp4'}
                    onUpdate={(newSrc) =>
                      onUpdateShowcaseVideo(showcaseItem.productSlug, 1, newSrc)
                    }
                  />

                  <VideoAssetCard
                    label="Reel 2: Training & Agility Video"
                    sublabel={`Plays for "${matchedProduct?.name || 'Product'}"`}
                    currentSrc={showcaseItem.reel2Video || '/videos/jadeja.mp4'}
                    onUpdate={(newSrc) =>
                      onUpdateShowcaseVideo(showcaseItem.productSlug, 2, newSrc)
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 6: PROUD PARTNERS */}
      <section id="sec-partners" className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#e51717]">
              Section 06 • Partner Endorsements
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#080d2d]">
              Our Proud Partners Logos
            </h3>
            <p className="text-xs text-slate-400">
              Brands and federation partner logos ({mediaAssets.partnerLogos.length} active logos).
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = {
                ...mediaAssets,
                partnerLogos: [...mediaAssets.partnerLogos, '/images/Partners/1.png'],
              }
              saveMediaAssets(updated)
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#080d2d] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-slate-800 transition shrink-0 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 text-[#e51717]" />
            <span>Add Partner Logo</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mediaAssets.partnerLogos.map((logoSrc, index) => (
            <ImageAssetCard
              key={index}
              label={`Partner #${index + 1}`}
              sublabel="Brand Partner"
              currentSrc={logoSrc}
              aspectRatio="aspect-square"
              contain
              onUpdate={(newSrc) => {
                const updatedLogos = [...mediaAssets.partnerLogos]
                updatedLogos[index] = newSrc
                saveMediaAssets({ ...mediaAssets, partnerLogos: updatedLogos })
              }}
              onRemove={
                mediaAssets.partnerLogos.length > 1
                  ? () => {
                      const updatedLogos = mediaAssets.partnerLogos.filter((_, i) => i !== index)
                      saveMediaAssets({ ...mediaAssets, partnerLogos: updatedLogos })
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 sm:bottom-6 z-30 flex flex-col xs:flex-row items-center justify-between rounded-xl sm:rounded-2xl border border-slate-800 bg-[#080d2d] p-3.5 sm:p-4 text-white shadow-2xl gap-3">
        <div className="text-center xs:text-left">
          <span className="font-bold text-xs sm:text-sm block">All Homepage Sections Active</span>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Changes take effect instantly on the live website.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="w-full xs:w-auto flex items-center justify-center gap-2 rounded-lg bg-[#e51717] px-5 sm:px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-red-700 shrink-0"
        >
          <Eye className="h-4 w-4" />
          <span>Preview Storefront</span>
        </Link>
      </div>
    </div>
  )
}
