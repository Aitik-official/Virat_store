import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { CategoryGrid, HeroSlider, PromotionalSlider, SectionHeading } from '@/components/cricket-home'
import { ContactSection } from '@/components/contact-section'
import { TeamWearSection } from '@/components/team-wear-section'
import { SocialPostCarousel } from '@/components/social-post-carousel'
import { PartnersSection } from '@/components/partners-section'
import { SiteFooter } from '@/components/site-footer'
import { AssetSlot } from '@/components/site-primitives'
import { socialPosts } from '@/lib/social-posts'
import { siteAssets } from '@/lib/site-assets'

import { SeeItInActionSection } from '@/components/see-it-in-action-section'

export function CricketHomePage() {
  return (
    <div id="top" className="min-h-screen bg-white text-[#080d2d]">
      <SiteHeader />
            <main>
                <HeroSlider />
                <PromotionalSlider />
                <CategoryGrid />

                {/* Team Wear Slider Section with See It In Action title styling and HeroSlider banner */}
                <TeamWearSection />

                {/* Concept 1: Split Screen Video with Featured Products */}
                <SeeItInActionSection />

                <PartnersSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    )
}
