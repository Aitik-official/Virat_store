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
    title: 'TOPS & UPPERWEAR',
    items: [
      { label: 'TOPS & MATCH JERSEYS', href: '/products?category=tops' },
      { label: 'POLOS', href: '/products?category=polos' },
      { label: 'SLEEVELESS', href: '/products?category=sleeveless' },
      { label: 'LONG SLEEVES', href: '/products?category=long-sleeves' },
      { label: 'JACKETS AND HOODIES', href: '/products?category=jacket-and-hoodies' },
    ],
  },
  {
    title: 'BOTTOMS & LOWERWEAR',
    items: [
      { label: 'SHORTS', href: '/products?category=shorts' },
      { label: 'PANTS AND LEGGINGS', href: '/products?category=pants-and-leggings' },
      { label: 'TRACKSUITS', href: '/products?category=tracksuits' },
      { label: 'COMPRESSION BASELAYERS', href: '/products?category=compression-and-baselayers' },
    ],
  },
  {
    title: 'COLLECTIONS',
    items: [
      { label: 'NEW ARRIVALS', href: '/products?badge=new' },
      { label: 'BESTSELLERS', href: '/products?badge=bestseller' },
      { label: 'PRO GRADE SPEC', href: '/products?badge=pro' },
      { label: 'OUTLET & DEALS', href: '/products?outlet=true' },
    ],
  },
]

export const cricketColumns: MegaMenuCategory[] = [
  {
    title: 'CRICKET GEAR & PROTECTION',
    items: [
      { label: 'CRICKET HELMETS', href: '/products?category=cricket-helmets&sport=cricket' },
      { label: 'MATCH CLOTHING', href: '/products?category=clothing&sport=cricket' },
      { label: 'LEATHER MATCH BALLS', href: '/products?category=cricket-balls&sport=cricket' },
      { label: 'KITBAGS & DUFFLES', href: '/products?category=bags-and-duffles&sport=cricket' },
      { label: 'CRICKET SHOES & SPIKES', href: '/products?category=shoes&sport=cricket' },
      { label: 'CRICKET ACCESSORIES', href: '/products?category=accessories&sport=cricket' },
    ],
  },
  {
    title: 'CRICKET COLLECTIONS',
    items: [
      { label: 'TEST MATCH RANGE', href: '/products?category=clothing&sport=cricket' },
      { label: 'T20 MATCH JERSEYS', href: '/products?category=tops&sport=cricket' },
      { label: 'CRICKET BESTSELLERS', href: '/products?sport=cricket&badge=bestseller' },
      { label: 'CRICKET OUTLET', href: '/products?sport=cricket&outlet=true' },
    ],
  },
]

export const accessoriesColumns: MegaMenuCategory[] = [
  {
    title: 'BAGS & CARRY GEAR',
    items: [
      { label: 'BAGS AND DUFFLES', href: '/products?category=bags-and-duffles' },
      { label: 'HATS AND CAPS', href: '/products?category=hats-and-caps' },
      { label: 'SOCKS & SLEEVES', href: '/products?category=socks' },
    ],
  },
  {
    title: 'FITNESS & RECOVERY',
    items: [
      { label: 'SUPPORTERS & GUARDS', href: '/products?category=supporters' },
      { label: 'COMPRESSION & BASELAYERS', href: '/products?category=compression-and-baselayers' },
      { label: 'RECOVERY FOAM ROLLERS', href: '/products?category=recovery-foam-rollers' },
      { label: 'LOOP BANDS & SUPPORT', href: '/products?category=loop-bands-and-support' },
    ],
  },
  {
    title: 'FOOTWEAR',
    items: [
      { label: 'ATHLETIC SHOES', href: '/products?category=shoes' },
      { label: 'PRO TURF SHOES', href: '/products?category=shoes' },
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
    exploreHref: '/products?category=accessories',
    watermarkText: 'DESIGN\nYOUR OWN.',
    columns: accessoriesColumns,
  },
}
