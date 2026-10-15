export type ImageSlot = { src?: string; alt?: string; caption?: string }

export type PromotionalSlide = {
  findGame?: string
  cricketAction?: string
}

export const siteAssets = {
  logo: '/images/virat logo.png',
  heroBanners: [
    '/images/banner1.jpeg',
    '/images/banner2.jpeg',
    '/images/banner3.jpeg',
    '/images/banner4.jpeg',
    '/images/banner5.jpeg',
    '/images/banner6.jpeg',
    '/images/banner7.jpeg',
  ],
  promotionalSlides: [{ findGame: '/images/1A.jpg', cricketAction: '/images/1B.jpg' }] as PromotionalSlide[],
  categories: {
    men: '/images/category/mens.png',
    women: '/images/category/women.png',
    youth: '/images/category/youth.jpg',
    cap: '/images/category/cap.png',
    kitbags: '/images/category/bagpack.png',
    accessories: '/images/category/ACCESSORIES.png',
  },
  videoThumbnail: '',
  teamwearBanner: '/images/TeamWear/TeamWear1.png',
  teamwearSlides: [
    '/images/TeamWear/TeamWear1.png',
    '/images/TeamWear/TeamWear2.png',
    '/images/TeamWear/TeamWare3.png',
  ],
  actionGallery: [
    { src: '', caption: 'Game ready' },
    { src: '', caption: 'Off the field' },
    { src: '', caption: 'Built different' },
    { src: '', caption: 'Stay relentless' },
  ] as ImageSlot[],
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
} as const

export type OptionalImageProps = { src?: string; alt: string }

export const validSources = (sources: readonly (string | undefined)[]) => sources.filter((source): source is string => Boolean(source?.trim()))
