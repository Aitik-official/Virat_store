export type MegaMenuCategory = {
  title: string
  items: { label: string; href: string }[]
}

export type MegaMenuData = {
  label: string
  exploreTitle: string
  exploreHref: string
  watermarkText: string
  columns: MegaMenuCategory[]
}

export const menWomenColumns: MegaMenuCategory[] = [
  {
    title: 'SHOP BY CATEGORY',
    items: [
      { label: 'TOPS', href: '/products?category=tops' },
      { label: 'POLOS', href: '/products?category=polos' },
      { label: 'SLEEVELESS', href: '/products?category=sleeveless' },
      { label: 'LONG SLEEVES', href: '/products?category=long-sleeves' },
      { label: 'JACKET AND HOODIES', href: '/products?category=jacket-and-hoodies' },
      { label: 'SHORTS', href: '/products?category=shorts' },
      { label: 'PANTS AND LEGGINGS', href: '/products?category=pants-and-leggings' },
      { label: 'TRACKSUITS', href: '/products?category=tracksuits' },
    ],
  },
  {
    title: 'SHOP BY SPORT',
    items: [
      { label: 'CRICKET', href: '/products?sport=cricket' },
      { label: 'FOOTBALL', href: '/products?sport=football' },
      { label: 'SHOOTING', href: '/products?sport=shooting' },
      { label: 'TRAINING', href: '/products?sport=training' },
      { label: 'INDIA MERCHANDISE', href: '/products?sport=india-merchandise' },
      { label: 'SHOP OUTLET', href: '/products?outlet=true' },
    ],
  },
  {
    title: 'ACCESSORIES',
    items: [
      { label: 'COMPRESSION AND BASELAYERS', href: '/products?category=compression-and-baselayers' },
    ],
  },
]

export const cricketColumns: MegaMenuCategory[] = [
  {
    title: 'SHOP CRICKET',
    items: [
      { label: 'CRICKET HELMETS', href: '/products?category=cricket-helmets&sport=cricket' },
      { label: 'CLOTHING', href: '/products?category=clothing&sport=cricket' },
      { label: 'CRICKET BALLS', href: '/products?category=cricket-balls&sport=cricket' },
      { label: 'BAGS AND DUFFLES', href: '/products?category=bags-and-duffles&sport=cricket' },
      { label: 'ACCESSORIES', href: '/products?category=accessories&sport=cricket' },
      { label: 'SHOES', href: '/products?category=shoes&sport=cricket' },
      { label: 'SHOP OUTLET', href: '/products?sport=cricket&outlet=true' },
    ],
  },
]

export const accessoriesColumns: MegaMenuCategory[] = [
  {
    title: 'SHOP ACCESSORIES',
    items: [
      { label: 'BAGS AND DUFFLES', href: '/products?category=bags-and-duffles' },
      { label: 'HATS AND CAPS', href: '/products?category=hats-and-caps' },
      { label: 'SOCKS', href: '/products?category=socks' },
      { label: 'SUPPORTERS', href: '/products?category=supporters' },
      { label: 'COMPRESSION AND BASELAYERS', href: '/products?category=compression-and-baselayers' },
      { label: 'SHOES', href: '/products?category=shoes' },
      { label: 'RECOVERY FOAM ROLLERS', href: '/products?category=recovery-foam-rollers' },
      { label: 'LOOP BANDS AND SUPPORT', href: '/products?category=loop-bands-and-support' },
    ],
  },
]

export const megaMenus: Record<string, MegaMenuData> = {
  MEN: {
    label: 'MEN',
    exploreTitle: 'MEN',
    exploreHref: '/products?gender=men',
    watermarkText: 'DESIGN\nYOUR OWN.',
    columns: menWomenColumns.map((col) => ({
      ...col,
      items: col.items.map((it) => ({
        ...it,
        href: it.href.includes('?') ? `${it.href}&gender=men` : `${it.href}?gender=men`,
      })),
    })),
  },
  WOMEN: {
    label: 'WOMEN',
    exploreTitle: 'WOMEN',
    exploreHref: '/products?gender=women',
    watermarkText: 'DESIGN\nYOUR OWN.',
    columns: menWomenColumns.map((col) => ({
      ...col,
      items: col.items.map((it) => ({
        ...it,
        href: it.href.includes('?') ? `${it.href}&gender=women` : `${it.href}?gender=women`,
      })),
    })),
  },
  CRICKET: {
    label: 'CRICKET',
    exploreTitle: 'CRICKET',
    exploreHref: '/products?sport=cricket',
    watermarkText: 'DESIGN\nYOUR OWN.',
    columns: cricketColumns,
  },
  ACCESSORIES: {
    label: 'ACCESSORIES',
    exploreTitle: 'ACCESSORIES',
    exploreHref: '/products?sport=accessories',
    watermarkText: 'DESIGN\nYOUR OWN.',
    columns: accessoriesColumns,
  },
}
