import Link from 'next/link'
import Image from 'next/image'
import {
  FlaskConical, ShieldCheck, Award, FileText, ArrowRight,
  Microscope, Zap, Lock, Dna, Brain, HeartPulse, Leaf, ChevronRight,
} from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { COA_SLUGS } from '@/lib/coa'
import { getServerTranslations } from '@/lib/locale'
import TestimonialsSlider from '@/app/_components/TestimonialsSlider'
import FaqAccordion from '@/app/_components/FaqAccordion'
import CertificateSection from '@/app/_components/CertificateSection'
import ScrollReveal from '@/app/_components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '@/app/_components/StaggerReveal'

const MOLECULE  = 'https://images.pexels.com/photos/25626509/pexels-photo-25626509.jpeg'
const VIALS     = 'https://images.pexels.com/photos/27925589/pexels-photo-27925589.jpeg'
const HERO_VIAL = 'https://clarionpeptides.com/wp-content/uploads/2026/05/hero-alpha.png'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products').select('*, categories(name, slug)')
      .eq('is_active', true).order('created_at', { ascending: false }).limit(4)
    return data ?? []
  } catch { return [] }
}

async function getProductSlugMap(): Promise<Map<string, string>> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('products').select('name, slug').eq('is_active', true)
    const map = new Map<string, string>()
    for (const p of (data ?? [])) map.set(p.name.toLowerCase(), p.slug)
    return map
  } catch { return new Map() }
}

const popularSlugs = ['bpc-157', 'tb-500', 'epithalon', 'semax', 'ghk-cu', 'igf-1-lr3']
const popularIcons = [HeartPulse, HeartPulse, Leaf, Brain, Dna, FlaskConical]
const popularColors = [
  'text-rose-500',    'text-[#1a6b58]', 'text-purple-500',
  'text-violet-500',  'text-amber-600', 'text-[#1a6b58]',
]
const popularBgs = [
  'bg-rose-50',    'bg-[#1a6b58]/5', 'bg-purple-50',
  'bg-violet-50',  'bg-amber-50',    'bg-[#1a6b58]/5',
]
const popularBorders = [
  'border-rose-100',   'border-[#1a6b58]/20', 'border-purple-100',
  'border-violet-100', 'border-amber-100',     'border-[#1a6b58]/20',
]
const popularNames = ['BPC-157', 'TB-500', 'Epithalon', 'Semax', 'GHK-Cu', 'IGF-1 LR3']

const trustIcons = [ShieldCheck, Award, Zap, Lock]
const trustColors = ['text-[#1a6b58]', 'text-[#1a6b58]', 'text-amber-500', 'text-[#1a6b58]']
const trustBgs    = ['bg-[#1a6b58]/10', 'bg-[#1a6b58]/10', 'bg-amber-500/10', 'bg-[#1a6b58]/10']

const categorySlugs = ['healing-peptides', 'growth-factors', 'cognitive', 'anti-aging']

export default async function HomePage() {
  const [featuredProducts, { t }, slugMap] = await Promise.all([
    getFeaturedProducts(),
    getServerTranslations(),
    getProductSlugMap(),
  ])

  return (
    <div>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0d2e22] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#3db896 1px, transparent 1px), linear-gradient(90deg, #3db896 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <ScrollReveal variant="fade-right" delay={0.15} className="flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-72 h-96 sm:w-80 sm:h-[26rem] lg:w-96 lg:h-[30rem] drop-shadow-2xl">
                <Image src={HERO_VIAL} alt="Clarion Peptides research vial" fill className="object-contain" priority />
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal variant="fade-down" delay={0}>
                <div className="inline-flex items-center gap-2 bg-[#1a6b58]/20 border border-[#1a6b58]/30 rounded-full px-4 py-1.5 text-sm text-[#3db896] font-medium mb-6">
                  <Microscope className="w-3.5 h-3.5" />{t.home.heroBadge}
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                  {t.home.heroTitle1}<br /><span className="text-[#3db896]">{t.home.heroTitle2}</span><br />{t.home.heroTitle3}
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-[#7fd4bb] text-lg leading-relaxed mb-10 max-w-xl">
                  {t.home.heroSubtitle}
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap gap-4 mb-14">
                  <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">{t.home.browseCatalog} <ArrowRight className="w-4 h-4" /></Link>
                  <Link href="/about" className="inline-flex items-center gap-2 border border-[#1a6b58]/50 hover:border-[#3db896]/60 text-[#7fd4bb] hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">{t.home.ourStandards}</Link>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.4}>
                <div className="flex flex-wrap gap-10 border-t border-[#1a6b58]/30 pt-8">
                  {[{ value: '≥99%', label: t.home.purityStat }, { value: '48h', label: t.home.dispatchStat }, { value: '100%', label: t.home.coaStat }].map((s) => (
                    <div key={s.label}><div className="text-2xl font-bold text-white">{s.value}</div><div className="text-sm text-[#7fd4bb] mt-0.5">{s.label}</div></div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. TRUST BADGES ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={VIALS} alt="" fill className="object-cover object-center" quality={80} aria-hidden />
          <div className="absolute inset-0 bg-white/93" />
        </div>
        <div className="relative py-14 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.home.trustBadges.map(({ title, body }, i) => (
                <StaggerItem key={title}>
                  <div className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-[#e2e8f0] shadow-sm h-full">
                    <div className={`w-10 h-10 ${trustBgs[i]} rounded-lg flex items-center justify-center`}>
                      {(() => { const Icon = trustIcons[i]; return <Icon className={`w-5 h-5 ${trustColors[i]}`} /> })()}
                    </div>
                    <h3 className="font-semibold text-[#0f172a] text-sm">{title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ══ 3. WHAT ARE PEPTIDES ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src={MOLECULE} alt="Glass molecular structure" fill className="object-cover object-center" quality={85} />
          <div className="absolute inset-0 bg-[#071a14]/82" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <ScrollReveal variant="fade-left">
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">{t.home.scienceEyebrow}</p>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">{t.home.scienceTitle1}<br /><span className="text-[#3db896]">{t.home.scienceTitle2}</span></h2>
              <p className="text-[#c2ede3] text-lg leading-relaxed mb-5">{t.home.scienceP1}</p>
              <p className="text-[#7fd4bb] leading-relaxed mb-8">{t.home.scienceP2}</p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#3db896] hover:text-white font-semibold transition-colors group">
                {t.home.scienceLinkText} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-4" delay={0.1}>
              {t.home.scienceStats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="bg-[#0d2e22]/80 backdrop-blur-sm border border-[#3db896]/40 rounded-2xl p-5 h-full">
                    <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-xs text-[#7fd4bb] leading-relaxed">{s.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>
        </div>
      </section>

      {/* ══ 4. FEATURED PRODUCTS ═════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="relative h-36 overflow-hidden">
          <Image src={VIALS} alt="Research vials" fill className="object-cover object-center" quality={75} />
          <div className="absolute inset-0 bg-[#0d2e22]/80" />
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <ScrollReveal variant="fade-left" duration={0.5}>
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-1">{t.home.featuredEyebrow}</p>
              <h2 className="text-2xl font-bold text-white">{t.home.featuredTitle}</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" duration={0.5}>
              <Link href="/products" className="inline-flex items-center gap-2 border border-[#3db896]/40 hover:border-[#3db896] text-[#3db896] hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                {t.home.featuredViewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {featuredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <StaggerItem key={p.id}>
                  <Link href={`/products/${p.slug}`} className="group bg-white border border-[#e2e8f0] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#1a6b58]/40 transition-all duration-300">
                    <div className="aspect-square bg-[#f1f5f9] flex items-center justify-center relative">
                      {p.image_url
                        ? <Image src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="flex flex-col items-center gap-2 text-[#94a3b8]"><FlaskConical className="w-12 h-12" /><span className="text-xs">Research Peptide</span></div>}
                      <div className="absolute top-3 right-3 bg-[#0d2e22] text-[#3db896] text-xs font-semibold px-2 py-1 rounded-full border border-[#1a6b58]/40">{p.purity}</div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-[#1a6b58] font-medium mb-1 uppercase tracking-wide">{p.specification}</div>
                      <h3 className="font-semibold text-[#0f172a] text-sm leading-snug mb-2 group-hover:text-[#1a6b58] transition-colors">{p.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#0d2e22]">${Number(p.price_per_unit).toFixed(2)}</span>
                        {COA_SLUGS.has(p.slug) && (
                          <div className="flex items-center gap-1 text-xs text-[#1a6b58]"><ShieldCheck className="w-3.5 h-3.5" /><span>{t.home.featuredCoaAvailable}</span></div>
                        )}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                  <div className="aspect-square bg-[#f1f5f9] animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-[#f1f5f9] rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-[#f1f5f9] rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-[#f1f5f9] rounded animate-pulse w-1/2 mt-3" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ 5. POPULAR PEPTIDES ══════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-12">
            <ScrollReveal variant="fade-left" className="lg:col-span-2">
              <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-2">{t.home.popularEyebrow}</p>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-3">{t.home.popularTitle}</h2>
              <p className="text-[#64748b] max-w-xl">{t.home.popularDesc}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" className="relative h-32 lg:h-36 rounded-2xl overflow-hidden hidden lg:block">
              <Image src={MOLECULE} alt="Molecular structure" fill className="object-cover object-center" quality={70} />
              <div className="absolute inset-0 bg-[#0d2e22]/60 flex items-center justify-center">
                <p className="text-white text-xs font-semibold uppercase tracking-widest text-center px-4">{t.home.popularIndependent}</p>
              </div>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.home.popularPeptides.map((p, i) => (
              <StaggerItem key={popularSlugs[i]}>
                <Link href={`/products/${slugMap.get(popularNames[i].toLowerCase()) ?? popularSlugs[i]}`} className={`group bg-white border ${popularBorders[i]} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 ${popularBgs[i]} rounded-xl flex items-center justify-center`}>
                      {(() => { const Icon = popularIcons[i]; return <Icon className={`w-5 h-5 ${popularColors[i]}`} /> })()}
                    </div>
                    <span className="text-xs text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-full">{p.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1a6b58] transition-colors">{popularNames[i]}</h3>
                  <p className="text-xs text-[#94a3b8] mb-3">{p.subtitle}</p>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((tag) => <span key={tag} className="text-[10px] font-medium bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-full">{tag}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#1a6b58] font-medium group-hover:gap-2 transition-all">{t.home.popularViewProduct} <ArrowRight className="w-3.5 h-3.5" /></div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ 6. CERTIFICATE OF ANALYSIS ═══════════════════════════════════════ */}
      <ScrollReveal variant="fade-up">
        <CertificateSection />
      </ScrollReveal>

      {/* ══ 7. CATEGORIES ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <Image src={VIALS} alt="" fill className="object-cover object-center" quality={75} aria-hidden />
          <div className="absolute inset-0 bg-[#f8fafc]/94" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-10">
            <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-1">{t.home.categoriesEyebrow}</p>
            <h2 className="text-2xl font-bold text-[#0f172a]">{t.home.categoriesTitle}</h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={0.05}>
            {t.home.categories.map((cat, i) => (
              <StaggerItem key={categorySlugs[i]}>
                <Link href={`/products?category=${categorySlugs[i]}`} className="group bg-white border border-[#e2e8f0] hover:border-[#1a6b58]/40 rounded-xl p-5 text-center hover:shadow-lg transition-all block">
                  <div className="w-12 h-12 bg-[#1a6b58]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1a6b58]/20 transition-colors">
                    <FlaskConical className="w-5 h-5 text-[#1a6b58]" />
                  </div>
                  <h3 className="font-semibold text-[#0f172a] text-sm mb-1">{cat.label}</h3>
                  <p className="text-xs text-[#64748b]">{cat.count}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS ══════════════════════════════════════════════════ */}
      <TestimonialsSlider />

      {/* ══ 9. COA TRANSPARENCY ══════════════════════════════════════════════ */}
      <section className="bg-[#0d2e22] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
            <ScrollReveal variant="fade-left" className="relative hidden lg:block">
              <Image src={VIALS} alt="Research peptide vials" fill className="object-cover object-center opacity-70" quality={80} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d2e22]" />
            </ScrollReveal>
            <ScrollReveal variant="fade-right" className="px-8 lg:px-16 py-16 flex flex-col justify-center">
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">{t.home.coaEyebrow}</p>
              <h2 className="text-3xl font-bold text-white mb-5 leading-tight whitespace-pre-line">{t.home.coaTitle}</h2>
              <p className="text-[#7fd4bb] leading-relaxed mb-6">{t.home.coaBody}</p>
              <div className="flex gap-4">
                <div className="bg-[#114030] border border-[#1a6b58]/40 rounded-xl p-4 text-center flex-1">
                  <FileText className="w-7 h-7 text-[#3db896] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">{t.home.coaReports}</div>
                  <div className="text-[#7fd4bb] text-xs mt-0.5">{t.home.coaDownloadable}</div>
                </div>
                <div className="bg-[#114030] border border-[#1a6b58]/40 rounded-xl p-4 text-center flex-1">
                  <Award className="w-7 h-7 text-[#3db896] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">{t.home.isoLabel}</div>
                  <div className="text-[#7fd4bb] text-xs mt-0.5">{t.home.isoDesc}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ 10. FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ScrollReveal variant="fade-left" className="lg:col-span-1 flex flex-col gap-6">
              <div>
                <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-2">{t.home.faqEyebrow}</p>
                <h2 className="text-3xl font-bold text-[#0f172a] mb-3">{t.home.faqTitle}</h2>
                <p className="text-[#64748b] leading-relaxed">{t.home.faqDesc}</p>
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image src={MOLECULE} alt="Molecular model" fill className="object-cover object-center" quality={75} />
                <div className="absolute inset-0 bg-[#0d2e22]/55 flex items-end p-4">
                  <Link href="/contact" className="text-sm text-white font-medium hover:text-[#3db896] transition-colors flex items-center gap-1.5">
                    {t.home.faqContact} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="relative h-36 rounded-2xl overflow-hidden">
                <Image src={VIALS} alt="Peptide vials" fill className="object-cover object-center" quality={70} />
                <div className="absolute inset-0 bg-[#0d2e22]/60 flex items-center justify-center">
                  <p className="text-white text-xs font-semibold uppercase tracking-widest text-center px-4">{t.home.faqSecure}</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" className="lg:col-span-2">
              <FaqAccordion />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ 11. BOTTOM CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={MOLECULE} alt="" fill className="object-cover object-center" quality={75} aria-hidden />
          <div className="absolute inset-0 bg-[#071a14]/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ScrollReveal variant="fade-up">
            <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">{t.home.ctaEyebrow}</p>
            <h2 className="text-4xl font-bold text-white mb-5">{t.home.ctaTitle}</h2>
            <p className="text-[#7fd4bb] text-lg mb-10 max-w-xl mx-auto">{t.home.ctaSubtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="scale-up" delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
                {t.home.ctaBrowse} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/testimonials" className="inline-flex items-center gap-2 border border-[#3db896]/40 hover:border-[#3db896] text-[#3db896] hover:text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
                {t.home.ctaReviews}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ DISCLAIMER ════════════════════════════════════════════════════════ */}
      <ScrollReveal variant="fade" duration={0.4}>
        <div className="bg-amber-50 border-t border-amber-200 py-3 px-4 text-center">
          <p className="text-amber-800 text-xs">{t.home.disclaimer}</p>
        </div>
      </ScrollReveal>

    </div>
  )
}
