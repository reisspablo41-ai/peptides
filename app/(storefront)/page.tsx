import Link from 'next/link'
import Image from 'next/image'
import {
  FlaskConical, ShieldCheck, Award, FileText, ArrowRight,
  Microscope, Zap, Lock, Dna, Brain, HeartPulse, Leaf, ChevronRight,
} from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import TestimonialsSlider from '@/app/_components/TestimonialsSlider'
import FaqAccordion from '@/app/_components/FaqAccordion'
import CertificateSection from '@/app/_components/CertificateSection'
import ScrollReveal from '@/app/_components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '@/app/_components/StaggerReveal'

const MOLECULE = 'https://images.pexels.com/photos/25626509/pexels-photo-25626509.jpeg'
const VIALS    = 'https://images.pexels.com/photos/27925589/pexels-photo-27925589.jpeg'
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

const trustBadges = [
  { icon: ShieldCheck, title: 'Third-Party Verified',  body: 'Every batch independently tested by ISO 17025-accredited labs before shipping.',        color: 'text-[#1a6b58]', bg: 'bg-[#1a6b58]/10' },
  { icon: Award,       title: '≥99% Purity',           body: 'HPLC-confirmed purity on all peptides. COA downloadable on every product page.',        color: 'text-[#1a6b58]', bg: 'bg-[#1a6b58]/10' },
  { icon: Zap,         title: 'Same-Day Dispatch',      body: 'Orders placed before 2 pm ship the same business day in climate-controlled packaging.', color: 'text-amber-500',  bg: 'bg-amber-500/10'  },
  { icon: Lock,        title: 'Secure Guest Checkout',  body: 'No account required. SSL-encrypted checkout. Your data is never sold or shared.',        color: 'text-[#1a6b58]', bg: 'bg-[#1a6b58]/10' },
]

const popularPeptides = [
  { name: 'BPC-157',   subtitle: 'Body Protection Compound',           category: 'Healing Peptides', slug: 'bpc-157',   icon: HeartPulse,  color: 'text-rose-500',    bg: 'bg-rose-50',      border: 'border-rose-100',     description: 'One of the most extensively researched peptides for tissue repair. Studies demonstrate accelerated healing of tendons, ligaments, muscle, and gut lining in animal models.',                                                            tags: ['Tissue Repair', 'Gut Health', 'Anti-inflammatory'] },
  { name: 'TB-500',    subtitle: 'Thymosin Beta-4 Fragment',           category: 'Healing Peptides', slug: 'tb-500',    icon: HeartPulse,  color: 'text-[#1a6b58]',  bg: 'bg-[#1a6b58]/5', border: 'border-[#1a6b58]/20', description: 'A synthetic version of Thymosin Beta-4, widely studied for its role in cellular migration, wound healing, angiogenesis, and recovery from musculoskeletal injury.',                                                                   tags: ['Wound Healing', 'Angiogenesis', 'Recovery'] },
  { name: 'Epithalon', subtitle: 'Tetrapeptide AEDG',                  category: 'Anti-Aging',       slug: 'epithalon', icon: Leaf,        color: 'text-purple-500',  bg: 'bg-purple-50',   border: 'border-purple-100',   description: 'A tetrapeptide derived from the pineal gland, researched for its ability to activate telomerase and regulate the neuroendocrine system. Subject of decades of Russian longevity studies.', tags: ['Telomerase', 'Longevity', 'Neuroendocrine'] },
  { name: 'Semax',     subtitle: 'ACTH(4-7)PGP',                      category: 'Cognitive',        slug: 'semax',     icon: Brain,       color: 'text-violet-500',  bg: 'bg-violet-50',   border: 'border-violet-100',     description: 'A synthetic analogue of adrenocorticotropin studied for neuroprotective and nootropic effects. Research shows upregulation of BDNF and improvement in working memory models.',                                                         tags: ['BDNF Upregulation', 'Neuroprotection', 'Cognitive'] },
  { name: 'GHK-Cu',   subtitle: 'Copper Peptide Complex',             category: 'Anti-Aging',       slug: 'ghk-cu',    icon: Dna,         color: 'text-amber-600',   bg: 'bg-amber-50',    border: 'border-amber-100',    description: 'A naturally occurring copper-binding tripeptide studied extensively for stimulating collagen synthesis, wound repair, anti-inflammatory activity, and skin regeneration in vitro.',                                                    tags: ['Collagen Synthesis', 'Skin Repair', 'Anti-oxidant'] },
  { name: 'IGF-1 LR3', subtitle: 'Long R3 Insulin-like Growth Factor', category: 'Growth Factors', slug: 'igf-1-lr3', icon: FlaskConical, color: 'text-[#1a6b58]',  bg: 'bg-[#1a6b58]/5', border: 'border-[#1a6b58]/20', description: 'A potent analogue of IGF-1 with an extended half-life, widely used in cell culture research. Studies show significant effects on cellular proliferation, differentiation, and protein synthesis.',                                         tags: ['Cell Proliferation', 'Protein Synthesis', 'Growth'] },
]

const categories = [
  { slug: 'healing-peptides', label: 'Healing Peptides',  count: 'BPC-157, TB-500 & more' },
  { slug: 'growth-factors',   label: 'Growth Factors',    count: 'IGF-1, MGF & more'       },
  { slug: 'cognitive',        label: 'Cognitive',         count: 'Semax, Selank & more'     },
  { slug: 'anti-aging',       label: 'Anti-Aging',        count: 'Epithalon, GHK-Cu & more' },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group bg-white border border-[#e2e8f0] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#1a6b58]/40 transition-all duration-300">
      <div className="aspect-square bg-[#f1f5f9] flex items-center justify-center relative">
        {product.image_url
          ? <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="flex flex-col items-center gap-2 text-[#94a3b8]"><FlaskConical className="w-12 h-12" /><span className="text-xs">Research Peptide</span></div>}
        <div className="absolute top-3 right-3 bg-[#0d2e22] text-[#3db896] text-xs font-semibold px-2 py-1 rounded-full border border-[#1a6b58]/40">{product.purity}</div>
      </div>
      <div className="p-4">
        <div className="text-xs text-[#1a6b58] font-medium mb-1 uppercase tracking-wide">{product.specification}</div>
        <h3 className="font-semibold text-[#0f172a] text-sm leading-snug mb-2 group-hover:text-[#1a6b58] transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#0d2e22]">${Number(product.price_per_unit).toFixed(2)}</span>
          <div className="flex items-center gap-1 text-xs text-[#1a6b58]"><ShieldCheck className="w-3.5 h-3.5" /><span>COA Available</span></div>
        </div>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

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
                  <Microscope className="w-3.5 h-3.5" />ISO-Grade Research Peptides
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                  Pharmaceutical&#8209;Grade<br /><span className="text-[#3db896]">Research Peptides</span><br />You Can Trust.
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-[#7fd4bb] text-lg leading-relaxed mb-10 max-w-xl">
                  Every peptide is independently verified for purity and potency. Downloadable COA reports. Rapid dispatch. Strict laboratory sourcing.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap gap-4 mb-14">
                  <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">Browse Catalog <ArrowRight className="w-4 h-4" /></Link>
                  <Link href="/about" className="inline-flex items-center gap-2 border border-[#1a6b58]/50 hover:border-[#3db896]/60 text-[#7fd4bb] hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">Our Standards</Link>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.4}>
                <div className="flex flex-wrap gap-10 border-t border-[#1a6b58]/30 pt-8">
                  {[{ value: '≥99%', label: 'Purity guarantee' }, { value: '48h', label: 'Average dispatch' }, { value: '100%', label: 'COA-verified lots' }].map((s) => (
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
              {trustBadges.map(({ icon: Icon, title, body, color, bg }) => (
                <StaggerItem key={title}>
                  <div className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-[#e2e8f0] shadow-sm h-full">
                    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}><Icon className={`w-5 h-5 ${color}`} /></div>
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
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">The Science</p>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">What Exactly Is a<br /><span className="text-[#3db896]">Research Peptide?</span></h2>
              <p className="text-[#c2ede3] text-lg leading-relaxed mb-5">Peptides are short chains of amino acids — the same building blocks that form proteins — typically ranging from 2 to 50 units in length. Because of their small size, they can be engineered to bind to highly specific biological receptors with remarkable precision.</p>
              <p className="text-[#7fd4bb] leading-relaxed mb-8">In controlled laboratory environments, researchers use synthesised peptides to study cellular signalling pathways, hormone regulation, tissue repair mechanisms, immune modulation, and the biochemistry of ageing.</p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#3db896] hover:text-white font-semibold transition-colors group">
                Learn about our sourcing standards <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-4" delay={0.1}>
              {[
                { value: '7,000+', label: 'Peptides characterised in scientific literature' },
                { value: '$50B+',  label: 'Global peptide therapeutics market by 2030' },
                { value: '60+',    label: 'FDA-approved peptide-based drugs in clinical use' },
                { value: '99%',    label: 'Minimum verified purity on every Clarion batch' },
              ].map((s) => (
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
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-1">Latest Additions</p>
              <h2 className="text-2xl font-bold text-white">Featured Peptides</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" duration={0.5}>
              <Link href="/products" className="inline-flex items-center gap-2 border border-[#3db896]/40 hover:border-[#3db896] text-[#3db896] hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {featuredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
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
              <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-2">Most Researched</p>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Popular Research Compounds</h2>
              <p className="text-[#64748b] max-w-xl">These six peptides appear most frequently in peer-reviewed literature and are the most requested compounds in our catalogue.</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" className="relative h-32 lg:h-36 rounded-2xl overflow-hidden hidden lg:block">
              <Image src={MOLECULE} alt="Molecular structure" fill className="object-cover object-center" quality={70} />
              <div className="absolute inset-0 bg-[#0d2e22]/60 flex items-center justify-center">
                <p className="text-white text-xs font-semibold uppercase tracking-widest text-center px-4">Independently Synthesised &amp; Verified</p>
              </div>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPeptides.map((p) => (
              <StaggerItem key={p.slug}>
                <Link href={`/products/${p.slug}`} className={`group bg-white border ${p.border} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 ${p.bg} rounded-xl flex items-center justify-center`}><p.icon className={`w-5 h-5 ${p.color}`} /></div>
                    <span className="text-xs text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-full">{p.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1a6b58] transition-colors">{p.name}</h3>
                  <p className="text-xs text-[#94a3b8] mb-3">{p.subtitle}</p>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((tag) => <span key={tag} className="text-[10px] font-medium bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-full">{tag}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#1a6b58] font-medium group-hover:gap-2 transition-all">View product <ArrowRight className="w-3.5 h-3.5" /></div>
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
            <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-1">Research Focus Areas</p>
            <h2 className="text-2xl font-bold text-[#0f172a]">Shop by Category</h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={0.05}>
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link href={`/products?category=${cat.slug}`} className="group bg-white border border-[#e2e8f0] hover:border-[#1a6b58]/40 rounded-xl p-5 text-center hover:shadow-lg transition-all block">
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
              <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">Full Transparency</p>
              <h2 className="text-3xl font-bold text-white mb-5 leading-tight">Every Product Comes<br />With a Downloadable<br /><span className="text-[#3db896]">Certificate of Analysis</span></h2>
              <p className="text-[#7fd4bb] leading-relaxed mb-6">We believe researchers deserve total transparency. Each listing includes a COA from an independent, ISO 17025-accredited laboratory confirming purity, identity, and potency — downloadable with one click.</p>
              <div className="flex gap-4">
                <div className="bg-[#114030] border border-[#1a6b58]/40 rounded-xl p-4 text-center flex-1">
                  <FileText className="w-7 h-7 text-[#3db896] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">COA Reports</div>
                  <div className="text-[#7fd4bb] text-xs mt-0.5">Downloadable PDF</div>
                </div>
                <div className="bg-[#114030] border border-[#1a6b58]/40 rounded-xl p-4 text-center flex-1">
                  <Award className="w-7 h-7 text-[#3db896] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">ISO 17025</div>
                  <div className="text-[#7fd4bb] text-xs mt-0.5">Accredited Labs</div>
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
                <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest mb-2">Got Questions?</p>
                <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Frequently Asked Questions</h2>
                <p className="text-[#64748b] leading-relaxed">Everything you need to know about research peptides, our quality process, and how ordering works.</p>
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image src={MOLECULE} alt="Molecular model" fill className="object-cover object-center" quality={75} />
                <div className="absolute inset-0 bg-[#0d2e22]/55 flex items-end p-4">
                  <Link href="/contact" className="text-sm text-white font-medium hover:text-[#3db896] transition-colors flex items-center gap-1.5">
                    Still have questions? Contact us <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="relative h-36 rounded-2xl overflow-hidden">
                <Image src={VIALS} alt="Peptide vials" fill className="object-cover object-center" quality={70} />
                <div className="absolute inset-0 bg-[#0d2e22]/60 flex items-center justify-center">
                  <p className="text-white text-xs font-semibold uppercase tracking-widest text-center px-4">Secure · Verified · Delivered</p>
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
            <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-3">Start Researching Today</p>
            <h2 className="text-4xl font-bold text-white mb-5">The Compounds Your Research Deserves.</h2>
            <p className="text-[#7fd4bb] text-lg mb-10 max-w-xl mx-auto">ISO-grade purity. Independent verification. Same-day dispatch. No account required.</p>
          </ScrollReveal>
          <ScrollReveal variant="scale-up" delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
                Browse Full Catalog <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/testimonials" className="inline-flex items-center gap-2 border border-[#3db896]/40 hover:border-[#3db896] text-[#3db896] hover:text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
                Read Researcher Reviews
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ DISCLAIMER ════════════════════════════════════════════════════════ */}
      <ScrollReveal variant="fade" duration={0.4}>
        <div className="bg-amber-50 border-t border-amber-200 py-3 px-4 text-center">
          <p className="text-amber-800 text-xs">
            <strong>Research Use Only:</strong> All products sold by Clarion Peptides are intended solely for laboratory research and scientific study. Not for human or veterinary use.
          </p>
        </div>
      </ScrollReveal>

    </div>
  )
}
