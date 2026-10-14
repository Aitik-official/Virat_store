export type PartnerLogo = {
  id: string
  name: string
  src: string
  href?: string
}

export const partnerLogos: PartnerLogo[] = [
  { id: 'east-bengal', name: 'East Bengal Club Kolkata', src: '/images/Partners/1.png' },
  { id: 'cab-xi', name: 'Cricket Association of Bengal CAB XI', src: '/images/Partners/2.png' },
  { id: 'baroda', name: 'Baroda Cricket Association', src: '/images/Partners/3.png' },
  { id: 'kerala', name: 'Kerala Cricket Association', src: '/images/Partners/4.png' },
  { id: 'mca', name: 'Maharashtra Cricket Association', src: '/images/Partners/5.png' },
  { id: 'odisha', name: 'Odisha Cricket Association', src: '/images/Partners/6.png' },
  { id: 'saurashtra', name: 'Saurashtra Cricket Association', src: '/images/Partners/7.png' },
  { id: 'uae', name: 'UAE Cricket', src: '/images/Partners/8.png' },
  { id: 'kenya', name: 'Cricket Kenya', src: '/images/Partners/9.png' },
  { id: 'bcci', name: 'Board of Control for Cricket in India', src: '/images/Partners/10.png' },
  { id: 'icc', name: 'International Cricket Council', src: '/images/Partners/11.png' },
  { id: 'assam', name: 'Assam Cricket Association', src: '/images/Partners/12.png' },
]

export const validPartnerLogos = partnerLogos.filter((logo) => logo.src.trim())

export const partnerRows = (rows: 1 | 2) => Array.from({ length: rows }, (_, rowIndex) =>
  validPartnerLogos.filter((_, index) => index % rows === rowIndex),
)

export const partnerLogoMap = Object.fromEntries(validPartnerLogos.map((logo) => [logo.id, logo]))

export const partnerLogoSources = validPartnerLogos.map((logo) => logo.src)
