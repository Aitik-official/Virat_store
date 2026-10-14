import Image from 'next/image'

export function AssetSlot({ src, alt, className = '', contain = false }: { src?: string; alt: string; className?: string; contain?: boolean }) {
  if (!src?.trim()) return <div aria-label={`${alt} image placeholder`} className={`bg-[#f3f4f6] ${className}`} />
  return <Image src={src} alt={alt} fill className={`${contain ? 'object-contain' : 'object-cover'} ${className}`} sizes="(max-width: 768px) 100vw, 25vw" />
}
