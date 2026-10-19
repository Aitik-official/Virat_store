'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Ruler,
  ChevronRight,
  Info,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type UnitType = 'cm' | 'inches'

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<UnitType>('inches')
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'cricket'>('men')

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#080d2d]">
      <SiteHeader />

      <main className="relative overflow-hidden">
        {/* Top Header */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e51717]">
              <Link href="/contact" className="hover:underline">Support</Link>
              <ChevronRight className="size-3 text-neutral-400" />
              <span className="text-neutral-500">Size &amp; Fit Guide</span>
            </div>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#080d2d] sm:text-5xl lg:text-6xl">
              FIND YOUR <span className="text-[#e51717]">PERFECT FIT</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Athletic precision measurements for tops, bottoms, tracksuits, cricket pads, gloves, and batting equipment engineered to maximize comfort and movement.
            </p>
          </div>
        </section>

        {/* Tab Controls & Unit Toggle */}
        <section className="mx-auto max-w-[1440px] px-6 pt-10 md:px-12 lg:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-4">
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('men')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'men'
                    ? 'bg-[#080d2d] text-white'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:border-[#080d2d]'
                }`}
              >
                Men&apos;s Apparel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('women')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'women'
                    ? 'bg-[#080d2d] text-white'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:border-[#080d2d]'
                }`}
              >
                Women&apos;s Apparel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cricket')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'cricket'
                    ? 'bg-[#080d2d] text-white'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:border-[#080d2d]'
                }`}
              >
                Cricket Gear &amp; Equipment
              </button>
            </div>

            {/* Inches / CM Toggle */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Unit:</span>
              <div className="inline-flex border border-neutral-300 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    unit === 'inches' ? 'bg-[#e51717] text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Inches (in)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    unit === 'cm' ? 'bg-[#e51717] text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-10 lg:col-span-8">
              {/* MEN'S CHARTS */}
              {activeTab === 'men' && (
                <>
                  <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                      Men&apos;s Tops, Match Jerseys &amp; Polos
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Measurement taken around the fullest part of the chest with arms relaxed at your sides.
                    </p>

                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <th className="py-3 px-4">Size Tag</th>
                            <th className="py-3 px-4">Chest ({unit})</th>
                            <th className="py-3 px-4">Shoulder ({unit})</th>
                            <th className="py-3 px-4">Length ({unit})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">S (Small)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '36 - 38' : '91 - 96'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '17.0' : '43.2'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '27.5' : '69.8'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">M (Medium)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '39 - 41' : '99 - 104'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '18.0' : '45.7'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '28.5' : '72.4'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">L (Large)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '42 - 44' : '107 - 112'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '19.0' : '48.2'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '29.5' : '74.9'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">XL</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '45 - 47' : '114 - 119'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '20.0' : '50.8'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '30.5' : '77.5'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">XXL</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '48 - 50' : '122 - 127'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '21.0' : '53.3'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '31.5' : '80.0'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                      Men&apos;s Shorts, Track Pants &amp; Leggings
                    </h2>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <th className="py-3 px-4">Size Tag</th>
                            <th className="py-3 px-4">Waist ({unit})</th>
                            <th className="py-3 px-4">Hip ({unit})</th>
                            <th className="py-3 px-4">Inseam ({unit})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">S (30)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '30 - 32' : '76 - 81'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '37 - 39' : '94 - 99'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '29.5' : '75.0'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">M (32)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '32 - 34' : '81 - 86'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '39 - 41' : '99 - 104'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '30.0' : '76.2'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">L (34)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '34 - 36' : '86 - 91'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '41 - 43' : '104 - 109'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '30.5' : '77.5'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">XL (36)</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '36 - 38' : '91 - 96'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '43 - 45' : '109 - 114'}</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '31.0' : '78.7'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* WOMEN'S CHARTS */}
              {activeTab === 'women' && (
                <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                  <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                    Women&apos;s Training Tops &amp; Leggings
                  </h2>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                          <th className="py-3 px-4">Size Tag</th>
                          <th className="py-3 px-4">Bust ({unit})</th>
                          <th className="py-3 px-4">Waist ({unit})</th>
                          <th className="py-3 px-4">Hips ({unit})</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                        <tr>
                          <td className="py-3 px-4 font-bold text-[#080d2d]">XS (UK 6)</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '31 - 33' : '79 - 84'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '24 - 26' : '61 - 66'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '34 - 36' : '86 - 91'}</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-[#080d2d]">S (UK 8)</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '33 - 35' : '84 - 89'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '26 - 28' : '66 - 71'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '36 - 38' : '91 - 96'}</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-[#080d2d]">M (UK 10)</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '35 - 37' : '89 - 94'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '28 - 30' : '71 - 76'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '38 - 40' : '96 - 101'}</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-[#080d2d]">L (UK 12)</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '37 - 40' : '94 - 101'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '30 - 33' : '76 - 84'}</td>
                          <td className="py-3 px-4">{unit === 'inches' ? '40 - 43' : '101 - 109'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CRICKET GEAR CHARTS */}
              {activeTab === 'cricket' && (
                <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-8">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                      Batting Legguards / Pads Sizing
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Measure from the center of the kneecap down to the top of your instep (where the tongue of the shoe sits).
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <th className="py-3 px-4">Pad Category</th>
                            <th className="py-3 px-4">Instep to Knee ({unit})</th>
                            <th className="py-3 px-4">Recommended Player Height</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Junior / Youth</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '14.0 - 15.5' : '35.5 - 39.5'}</td>
                            <td className="py-3 px-4">4&apos;9&quot; to 5&apos;3&quot;</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Men&apos;s / Standard</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '16.0 - 17.5' : '40.5 - 44.5'}</td>
                            <td className="py-3 px-4">5&apos;7&quot; to 6&apos;0&quot;</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Large Men / XL</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '18.0+' : '45.5+'}</td>
                            <td className="py-3 px-4">6&apos;1&quot; and above</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#080d2d]">
                      Batting Gloves Sizing
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Measure from the base of the palm to the tip of your middle finger.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <th className="py-3 px-4">Glove Size</th>
                            <th className="py-3 px-4">Palm to Middle Finger Tip ({unit})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Boys / Youth</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '6.5 - 7.2' : '16.5 - 18.3'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Standard Men&apos;s</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '7.5 - 8.2' : '19.0 - 20.8'}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-[#080d2d]">Large Men&apos;s / XL</td>
                            <td className="py-3 px-4">{unit === 'inches' ? '8.5+' : '21.5+'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Pro Tips */}
            <div className="space-y-6 lg:col-span-4">
              <div className="border border-neutral-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e51717]">
                  <Info className="size-4" />
                  <span>Pro Sizing Advice</span>
                </div>
                <h3 className="mt-3 text-lg font-black uppercase tracking-tight text-[#080d2d]">
                  Between Two Sizes?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  • <strong>For Match Jerseys:</strong> If you prefer a tighter athletic compression fit for fielding agility, order the smaller size. If you wear arm sleeves or chest armor underneath, order the larger size.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  • <strong>Free Size Exchange:</strong> If the size does not feel 100% right during your trial, our support team will organize a seamless doorstep exchange within 7 days.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#080d2d] py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#e51717]"
                >
                  Consult A Specialist <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#080d2d]">
                  Shop Recommended Sizes
                </h4>
                <div className="mt-4 divide-y divide-neutral-100 text-xs font-bold">
                  <Link href="/products?category=tops" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>View Performance Tops</span>
                    <ChevronRight className="size-3" />
                  </Link>
                  <Link href="/products?category=tracksuits" className="flex items-center justify-between py-3 text-neutral-700 hover:text-[#e51717]">
                    <span>View Tracksuits &amp; Bottoms</span>
                    <ChevronRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
