import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { CategoryGrid, HeroSlider, PromotionalSlider, SectionHeading } from '@/components/cricket-home'
import { ContactSection } from '@/components/contact-section'
import { SocialPostCarousel } from '@/components/social-post-carousel'
import { PartnersSection } from '@/components/partners-section'
import { SiteFooter } from '@/components/site-footer'
import { AssetSlot } from '@/components/site-primitives'
import { socialPosts } from '@/lib/social-posts'
import { siteAssets } from '@/lib/site-assets'

export function CricketHomePage() {
  return (
    <div id="top" className="min-h-screen bg-white text-[#080d2d]">
      <SiteHeader />
            <main>
                <HeroSlider />
                <PromotionalSlider />
                <CategoryGrid />

                {/* Video Showcase Section - minimal vertical gap */}
                <section id="video" className="border-b border-slate-200 bg-[#f9fafb] px-5 py-12 md:py-16">
                    <SectionHeading subtitle="Unstoppable Spirit">VIRAT IN ACTION</SectionHeading>
                    <div className="group relative mx-auto mt-6 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-[#080d2d] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                        <video
                            src="/videos/display_video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="size-full object-cover"
                        />
                    </div>
                </section>

                {/* Team Wear / Trending Products Split Section using collections.png */}
                <section id="team-wear" className="grid border-b border-slate-200 md:grid-cols-[75%_25%]">
                    <div className="group relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200 bg-[#060a1f] md:border-b-0 md:border-r">
                        <div className="relative size-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                            <Image
                                src="/images/collections.png"
                                alt="Virat Team Wear Collection"
                                fill
                                priority
                                className="object-contain object-center"
                                sizes="(max-width: 768px) 100vw, 75vw"
                            />
                        </div>
                    </div>
                    <a
                        href="#trending-products"
                        className="group relative flex min-h-36 items-center justify-center overflow-hidden bg-[#080d2d] p-6 text-center text-xl font-black uppercase tracking-tight text-white transition-all duration-300 hover:bg-[#e51717] md:min-h-0 md:text-2xl lg:text-3xl"
                    >
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                            Trending<br />
                            <span className="text-[#e51717] transition-colors group-hover:text-white">Products</span>
                        </span>
                    </a>
                </section>

                <SocialPostCarousel posts={socialPosts} />
                <PartnersSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    )
}
