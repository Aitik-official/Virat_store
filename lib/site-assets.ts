export type ImageSlot = { src?: string; alt?: string; caption?: string }

export type PromotionalSlide = {
  findGame?: string
  cricketAction?: string
}

export type CategoryAssets = {
  men: string
  women: string
  youth: string
  cap: string
  kitbags: string
  accessories: string
}

export type TeamwearSlideItem = {
  image: string
  alt?: string
}

export type PromotionalSectionAssets = {
  leftPoster: string
  rightPoster: string
}

export type ShowcaseProductItem = {
  productSlug: string
  tag: string
  quickDescription: string
  reel1Title: string
  reel1Label: string
  reel1Video: string
  reel2Title: string
  reel2Label: string
  reel2Video: string
}

export type SiteMediaAssets = {
  logo: string
  heroBanners: string[]
  promotionalSlides: PromotionalSlide[]
  promotionalSection: PromotionalSectionAssets
  categories: CategoryAssets
  videoThumbnail: string
  mainVideo: string
  actionReelVideo: string
  teamwearBanner: string
  teamwearSlides: string[]
  partnerLogos: string[]
  showcaseProducts: ShowcaseProductItem[]
}

export const defaultShowcaseProducts: ShowcaseProductItem[] = [
  {
    productSlug: 'virat-pro-match-cricket-jersey',
    tag: 'Worn by Virat',
    quickDescription: 'Ultra-breathable micro-mesh engineered for maximum airflow and match intensity.',
    reel1Title: 'Cover Drive & Bat Speed Drill',
    reel1Label: 'Batting Reel',
    reel1Video: '/videos/display_video.mp4',
    reel2Title: 'Pitch Intensity & All-Round Agility',
    reel2Label: 'Action Reel',
    reel2Video: '/videos/jadeja.mp4',
  },
  {
    productSlug: 'virat-all-weather-performance-tracksuit',
    tag: 'All-Weather Kit',
    quickDescription: '4-way ergonomic stretch for sprint acceleration and weather resistance.',
    reel1Title: 'Pre-Match Warmups & Sprints',
    reel1Label: 'Agility Reel',
    reel1Video: '/videos/display_video.mp4',
    reel2Title: 'On-Field Sprint & Slide',
    reel2Label: 'Fielding Action',
    reel2Video: '/videos/jadeja.mp4',
  },
  {
    productSlug: 'virat-championship-curved-peak-cap',
    tag: 'Official Merch',
    quickDescription: 'Curved visor with UV 50+ protection and moisture-wicking sweatband.',
    reel1Title: 'Sunny Outfield High-Catch Drill',
    reel1Label: 'Fielding Reel',
    reel1Video: '/videos/display_video.mp4',
    reel2Title: 'Dynamic Pitch Movement',
    reel2Label: 'Match Action',
    reel2Video: '/videos/jadeja.mp4',
  },
]

export const defaultSiteAssets: SiteMediaAssets = {
  logo: '/images/virat logo.png',
  heroBanners: [
    '/images/banner8.png',
    '/images/banner1.jpeg',
    '/images/banner3.jpeg',
    '/images/banner5.jpeg',
  ],
  promotionalSlides: [{ findGame: '/images/Rohit.jpeg', cricketAction: '/images/SKY.jpeg' }],
  promotionalSection: {
    leftPoster: '/images/Rohit.jpeg',
    rightPoster: '/images/SKY.jpeg',
  },
  categories: {
    men: '/images/category/mens.jpeg',
    women: '/images/category/women.png',
    youth: '/images/category/youth.jpg',
    cap: '/images/category/cap.png',
    kitbags: '/images/category/bagpack.png',
    accessories: '/images/category/ACCESSORIES.png',
  },
  videoThumbnail: '',
  mainVideo: '/videos/display_video.mp4',
  actionReelVideo: '/videos/jadeja.mp4',
  teamwearBanner: '/images/TeamWear/TeamWear1.png',
  teamwearSlides: [
    '/images/TeamWear/TeamWear4.png',
    '/images/TeamWear/TeamWear1.png',
    '/images/TeamWear/TeamWear2.png',
    '/images/TeamWear/TeamWare3.png',
  ],
  partnerLogos: [
    '/images/Partners/1.png',
    '/images/Partners/2.png',
    '/images/Partners/3.png',
    '/images/Partners/4.png',
    '/images/Partners/5.png',
    '/images/Partners/6.png',
    '/images/Partners/7.png',
    '/images/Partners/8.png',
    '/images/Partners/9.png',
    '/images/Partners/10.png',
    '/images/Partners/11.png',
    '/images/Partners/12.png',
  ],
  showcaseProducts: defaultShowcaseProducts,
}

export const MEDIA_STORAGE_KEY = 'virat_site_media_assets_v1'

/**
 * Returns either client-overridden media assets from localStorage
 * or default site assets.
 */
export function getActiveSiteAssets(): SiteMediaAssets {
  if (typeof window === 'undefined') {
    return defaultSiteAssets
  }
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...defaultSiteAssets,
        ...parsed,
        promotionalSection: {
          ...defaultSiteAssets.promotionalSection,
          ...(parsed.promotionalSection || {}),
        },
        categories: { ...defaultSiteAssets.categories, ...(parsed.categories || {}) },
        showcaseProducts: parsed.showcaseProducts && parsed.showcaseProducts.length > 0
          ? parsed.showcaseProducts
          : defaultShowcaseProducts,
      }
    }
  } catch {
    // fallback
  }
  return defaultSiteAssets
}

/**
 * Fetch latest media configuration from MongoDB Atlas API endpoint
 * with fallback to local state / defaults.
 */
export async function fetchSiteAssetsAsync(): Promise<SiteMediaAssets> {
  try {
    const res = await fetch('/api/media')
    if (res.ok) {
      const data = await res.json()
      if (data.media) {
        const merged: SiteMediaAssets = {
          ...defaultSiteAssets,
          ...data.media,
          promotionalSection: {
            ...defaultSiteAssets.promotionalSection,
            ...(data.media.promotionalSection || {}),
          },
          categories: { ...defaultSiteAssets.categories, ...(data.media.categories || {}) },
          showcaseProducts:
            data.media.showcaseProducts && data.media.showcaseProducts.length > 0
              ? data.media.showcaseProducts
              : defaultShowcaseProducts,
        }
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(merged))
          } catch {}
        }
        return merged
      }
    }
  } catch {
    // fallback to getActiveSiteAssets
  }
  return getActiveSiteAssets()
}

export const siteAssets = defaultSiteAssets
export const defaultSiteMedia = defaultSiteAssets

export type OptionalImageProps = { src?: string; alt: string }

export const validSources = (sources: readonly (string | undefined)[]) =>
  sources.filter((source): source is string => Boolean(source?.trim()))
