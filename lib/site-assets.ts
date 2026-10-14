export type ImageSlot = { src?: string; alt?: string; caption?: string }

export type PromotionalSlide = {
  findGame?: string
  cricketAction?: string
}

export const siteAssets = {
  logo: '/images/virat logo.png',
  heroBanners: [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1-eCklI5ruwHHeQmlieYReErao5bHEXU.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2-EnYzx4vuMKi8jUC0xJBkcagGRMxW5R.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner3-MCmNC8iXyuDqwwSBliJ8MFaLEkKMzR.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner4-3g6rEmF5u5Lqwy8ofPypbEECyRDx1J.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner5-8XbtuTeN9ak2odtSJNckgE2fphdUfV.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner6-sS2IK5eoQ81EMhxQ3xwowFK6ftb5UF.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner7-CswsS1HQelGQiETv2efaCOAKXpIomQ.jpeg',
  ],
  promotionalSlides: [{ findGame: '/images/1A.jpg', cricketAction: '/images/1B.jpg' }] as PromotionalSlide[],
  categories: {
    men: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mens-DxbKEbpvVlkcO0hjNrNuXwhKGMk5vl.png',
    women: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/women-mcpyTmUhUMr6i12Pl6BbiNxT3Bv1xx.png',
    youth: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youth-yCYCW0iSyMROSJHDvG5mTKuuAH75Ss.jpg',
    cap: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap-FIokDJWd1t6j3IITNd4TRQ2yscVAQu.png',
    kitbags: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bagpack-fOh3pPzNEw4SJBtDgPEhfz2PTi1AD4.png',
    accessories: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ACCESSORIES-TNaW6J5hpkPVl8jOgREsl6M2PFd2Qo.png',
  },
  videoThumbnail: '',
  teamwearBanner: '',
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
