export interface MainCategoryItem {
  id: string
  label: string
  value: string
  showOnNavbar?: boolean
  description?: string
  order?: number
}

export interface CategoryItem {
  id: string
  label: string
  value: string
  parentCategory?: string // slug value of MainCategoryItem (e.g. 'men', 'women', 'cricket', 'accessories')
  sport?: string
  description?: string
  image?: string
}

export interface TagBadgeItem {
  id: string
  name: string
  bgColor: string
  textColor: string
  description?: string
}

export interface SportItem {
  id: string
  label: string
  value: string
  icon?: string
}

export interface SiteAnnouncementItem {
  id?: string
  text: string
  linkText?: string
  linkHref?: string
}

export interface SiteAnnouncement {
  enabled: boolean
  text: string
  linkText?: string
  linkHref?: string
  items?: SiteAnnouncementItem[]
  bgColor?: string
  textColor?: string
}

export interface StoreContactInfo {
  email: string
  phone: string
  whatsapp: string
  address: string
  hours: string
  instagram: string
  youtube: string
  facebook: string
  twitter: string
}

export interface StoreTaxonomyConfig {
  mainCategories: MainCategoryItem[]
  categories: CategoryItem[]
  sports: SportItem[]
  badges: TagBadgeItem[]
  sizes: string[]
  announcement: SiteAnnouncement
  contactInfo: StoreContactInfo
}

export const TAXONOMY_STORAGE_KEY = 'virat_taxonomy_config_v1'

export const defaultMainCategories: MainCategoryItem[] = [
  { id: 'main-men', label: 'Men', value: 'men', showOnNavbar: true, description: 'Men athletic wear & performance gear', order: 1 },
  { id: 'main-women', label: 'Women', value: 'women', showOnNavbar: true, description: 'Women training & sportswear', order: 2 },
  { id: 'main-cricket', label: 'Cricket', value: 'cricket', showOnNavbar: true, description: 'Cricket gear, equipment & bats', order: 3 },
  { id: 'main-accessories', label: 'Accessories', value: 'accessories', showOnNavbar: true, description: 'Sports accessories, duffles & protective headgear', order: 4 },
]

export const defaultCategories: CategoryItem[] = [
  // --- MEN Sub-Categories (from Navbar) ---
  { id: 'cat-men-tops', label: 'Tops', value: 'tops', parentCategory: 'men', description: 'Performance match tees & tops' },
  { id: 'cat-men-polos', label: 'Polos', value: 'polos', parentCategory: 'men', description: 'Athletic collar team polos' },
  { id: 'cat-men-sleeveless', label: 'Sleeveless', value: 'sleeveless', parentCategory: 'men', description: 'Training tanks & vests' },
  { id: 'cat-men-long-sleeves', label: 'Long Sleeves', value: 'long-sleeves', parentCategory: 'men', description: 'UV sun protection long sleeve shirts' },
  { id: 'cat-men-jackets', label: 'Jacket and Hoodies', value: 'jacket-and-hoodies', parentCategory: 'men', description: 'Warmup zippered jackets & hoodies' },
  { id: 'cat-men-shorts', label: 'Shorts', value: 'shorts', parentCategory: 'men', description: 'Breathable training shorts' },
  { id: 'cat-men-pants', label: 'Pants & Leggings', value: 'pants-and-leggings', parentCategory: 'men', description: 'Warmup track pants & compression tights' },
  { id: 'cat-men-tracksuits', label: 'Tracksuits', value: 'tracksuits', parentCategory: 'men', description: 'Full match squad tracksuit sets' },
  { id: 'cat-men-compression', label: 'Compression & Baselayers', value: 'compression-and-baselayers', parentCategory: 'men', description: 'High endurance muscle recovery wear' },

  // --- WOMEN Sub-Categories (from Navbar) ---
  { id: 'cat-women-tops', label: 'Tops', value: 'tops', parentCategory: 'women', description: 'Women moisture-wicking tees' },
  { id: 'cat-women-polos', label: 'Polos', value: 'polos', parentCategory: 'women', description: 'Fitted athletic polo shirts' },
  { id: 'cat-women-sleeveless', label: 'Sleeveless', value: 'sleeveless', parentCategory: 'women', description: 'Racerback training tanks' },
  { id: 'cat-women-long-sleeves', label: 'Long Sleeves', value: 'long-sleeves', parentCategory: 'women', description: 'Full coverage athletic training tops' },
  { id: 'cat-women-jackets', label: 'Jacket and Hoodies', value: 'jacket-and-hoodies', parentCategory: 'women', description: 'Lightweight warmup zippered jackets' },
  { id: 'cat-women-shorts', label: 'Shorts', value: 'shorts', parentCategory: 'women', description: 'Ergonomic 2-in-1 agility shorts' },
  { id: 'cat-women-pants', label: 'Pants & Leggings', value: 'pants-and-leggings', parentCategory: 'women', description: 'Stretch compression tights & leggings' },
  { id: 'cat-women-tracksuits', label: 'Tracksuits', value: 'tracksuits', parentCategory: 'women', description: 'Athletic squad warm-up tracksuit sets' },
  { id: 'cat-women-compression', label: 'Compression & Baselayers', value: 'compression-and-baselayers', parentCategory: 'women', description: 'Targeted support baselayers' },

  // --- CRICKET Sub-Categories (from Navbar) ---
  { id: 'cat-cricket-helmets', label: 'Cricket Helmets', value: 'cricket-helmets', parentCategory: 'cricket', description: 'Titanium & high-density shell helmets' },
  { id: 'cat-cricket-clothing', label: 'Cricket Clothing', value: 'clothing', parentCategory: 'cricket', description: 'Official match whites & colored jerseys' },
  { id: 'cat-cricket-balls', label: 'Cricket Balls', value: 'cricket-balls', parentCategory: 'cricket', description: 'Test grade 4-piece leather match balls' },
  { id: 'cat-cricket-bags', label: 'Bags & Duffles', value: 'bags-and-duffles', parentCategory: 'cricket', description: 'Pro wheelie kitbags & gear duffles' },
  { id: 'cat-cricket-accessories', label: 'Cricket Accessories', value: 'accessories', parentCategory: 'cricket', description: 'Grips, bats, pads, gloves & protection' },
  { id: 'cat-cricket-shoes', label: 'Cricket Shoes', value: 'shoes', parentCategory: 'cricket', description: 'Spikes & rubber turf cricket shoes' },

  // --- ACCESSORIES Sub-Categories (from Navbar) ---
  { id: 'cat-acc-bags', label: 'Bags & Duffles', value: 'bags-and-duffles', parentCategory: 'accessories', description: 'Waterproof team gear duffles' },
  { id: 'cat-acc-caps', label: 'Hats & Caps', value: 'hats-and-caps', parentCategory: 'accessories', description: 'Sun field broad hats & caps' },
  { id: 'cat-acc-socks', label: 'Socks', value: 'socks', parentCategory: 'accessories', description: 'Cushioned athletic anti-blister socks' },
  { id: 'cat-acc-supporters', label: 'Supporters', value: 'supporters', parentCategory: 'accessories', description: 'Protective sports briefs & supporters' },
  { id: 'cat-acc-compression', label: 'Compression & Baselayers', value: 'compression-and-baselayers', parentCategory: 'accessories', description: 'Thermoregulating baselayers' },
  { id: 'cat-acc-shoes', label: 'Shoes', value: 'shoes', parentCategory: 'accessories', description: 'Footwear & agility turf shoes' },
  { id: 'cat-acc-rollers', label: 'Recovery Foam Rollers', value: 'recovery-foam-rollers', parentCategory: 'accessories', description: 'Deep tissue myofascial release rollers' },
  { id: 'cat-acc-bands', label: 'Loop Bands & Support', value: 'loop-bands-and-support', parentCategory: 'accessories', description: 'Resistance loops, wristbands & joint straps' },
]

export const defaultSports: SportItem[] = [
  { id: 'sp-cricket', label: 'Cricket', value: 'cricket' },
  { id: 'sp-football', label: 'Football', value: 'football' },
  { id: 'sp-training', label: 'Training & Fitness', value: 'training' },
  { id: 'sp-shooting', label: 'Shooting Sports', value: 'shooting' },
  { id: 'sp-badminton', label: 'Badminton', value: 'badminton' },
  { id: 'sp-accessories', label: 'General Accessories', value: 'accessories' },
]

export const defaultBadges: TagBadgeItem[] = [
  { id: 'b-new', name: 'NEW', bgColor: '#e51717', textColor: '#ffffff' },
  { id: 'b-bestseller', name: 'BESTSELLER', bgColor: '#080d2d', textColor: '#ffffff' },
  { id: 'b-hot', name: 'HOT', bgColor: '#f97316', textColor: '#ffffff' },
  { id: 'b-limited', name: 'LIMITED', bgColor: '#9333ea', textColor: '#ffffff' },
  { id: 'b-sale', name: 'SALE', bgColor: '#16a34a', textColor: '#ffffff' },
  { id: 'b-pro', name: 'PRO GRADE', bgColor: '#2563eb', textColor: '#ffffff' },
]

export const defaultSizes: string[] = [
  'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size', 'Men 156g', 'Women 142g'
]

export const defaultAnnouncement: SiteAnnouncement = {
  enabled: true,
  text: '🏏 FREE ALL-INDIA SHIPPING ON ORDERS OVER ₹1,999 • USE CODE "VIRAT10" FOR 10% OFF',
  linkText: 'Shop New Arrivals',
  linkHref: '/products?badge=new',
  items: [
    {
      id: 'ann-1',
      text: '🏏 FREE ALL-INDIA SHIPPING ON ORDERS OVER ₹1,999 • USE CODE "VIRAT10" FOR 10% OFF',
      linkText: 'Shop New Arrivals',
      linkHref: '/products?badge=new',
    },
    {
      id: 'ann-2',
      text: '⚡ NEW SEASON MATCH REPLICAS & PRO BAT COLLECTION NOW LIVE',
      linkText: 'Explore Cricket Gear',
      linkHref: '/products?category=cricket-bats',
    },
    {
      id: 'ann-3',
      text: '🏆 FLAT 15% OFF ON CUSTOM TEAMWEAR ORDERS THIS WEEK',
      linkText: 'Customize Kit',
      linkHref: '/teamwear',
    },
  ],
  bgColor: '#080d2d',
  textColor: '#ffffff',
}

export const defaultContactInfo: StoreContactInfo = {
  email: 'support@viratsports.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  address: 'Plot 45, Sports Complex Road, New Delhi, India 110001',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
  instagram: 'https://www.instagram.com/viratsportsofficial/',
  youtube: 'https://www.youtube.com/@ViratSportsOfficial',
  facebook: 'https://www.facebook.com/ViratSportsOfficial/',
  twitter: 'https://x.com/viratsports',
}

export const defaultTaxonomyConfig: StoreTaxonomyConfig = {
  mainCategories: defaultMainCategories,
  categories: defaultCategories,
  sports: defaultSports,
  badges: defaultBadges,
  sizes: defaultSizes,
  announcement: defaultAnnouncement,
  contactInfo: defaultContactInfo,
}

export function getStoredTaxonomyConfig(): StoreTaxonomyConfig {
  if (typeof window === 'undefined') return defaultTaxonomyConfig
  try {
    const raw = localStorage.getItem(TAXONOMY_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const parsedAnnouncement = parsed.announcement || {}
      return {
        ...defaultTaxonomyConfig,
        ...parsed,
        mainCategories: parsed.mainCategories?.length ? parsed.mainCategories : defaultMainCategories,
        categories: parsed.categories?.length ? parsed.categories : defaultCategories,
        sports: parsed.sports?.length ? parsed.sports : defaultSports,
        badges: parsed.badges?.length ? parsed.badges : defaultBadges,
        sizes: parsed.sizes?.length ? parsed.sizes : defaultSizes,
        announcement: {
          ...defaultAnnouncement,
          ...parsedAnnouncement,
          items: Array.isArray(parsedAnnouncement.items) && parsedAnnouncement.items.length > 0
            ? parsedAnnouncement.items
            : (parsedAnnouncement.text ? [{ text: parsedAnnouncement.text, linkText: parsedAnnouncement.linkText, linkHref: parsedAnnouncement.linkHref }] : defaultAnnouncement.items),
        },
        contactInfo: { ...defaultContactInfo, ...(parsed.contactInfo || {}) },
      }
    }
  } catch {}
  return defaultTaxonomyConfig
}
