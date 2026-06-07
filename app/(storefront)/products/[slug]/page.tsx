import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  FlaskConical, ShieldCheck, FileText, ArrowLeft, Download,
  Package, Dna, ChevronRight, Layers, Beaker, Hash,
  TestTube, Microscope, TriangleAlert, Info,
} from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { BundleComponent } from '@/lib/types'
import AddToCartButton from './_components/AddToCartButton'

async function getProduct(slug: string) {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.description ?? `${product.name} — ${product.specification} — ${product.purity} purity research peptide.`,
  }
}

function DataRow({ label, value, mono = false, accent = false }: {
  label: string
  value: React.ReactNode
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-6 px-5 py-3.5 border-b border-[#f1f5f9] last:border-0">
      <span className="text-xs text-[#94a3b8] uppercase tracking-[0.1em] font-medium flex-shrink-0 pt-0.5">{label}</span>
      <span className={`text-xs text-right ${mono ? 'font-mono' : 'font-semibold'} ${accent ? 'text-[#1a6b58]' : 'text-[#0f172a]'}`}>
        {value}
      </span>
    </div>
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const inStock = product.stock_quantity > 0

  const coaUrl = product.slug === 'bpc-157'
    ? '/test-report.png'
    : (product.lab_report_url ?? null)

  const viewerUrl = coaUrl
    ? `/coa?url=${encodeURIComponent(coaUrl)}&lot=${encodeURIComponent(product.structural_batch_code ?? '')}&product=${encodeURIComponent(product.name)}`
    : null

  const components: BundleComponent[] = product.bundle_components ?? []

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-8">
          <Link href="/" className="hover:text-[#3db896] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-[#3db896] transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0f172a] font-medium">{product.name}</span>
        </nav>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#3db896] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to catalog
        </Link>

        {/* ── Top grid: image + purchase panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

          {/* Image */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#94a3b8]">
                <FlaskConical className="w-20 h-20" />
                <span className="text-sm">Research Peptide</span>
              </div>
            )}
          </div>

          {/* Purchase panel */}
          <div className="flex flex-col">
            {product.categories && (
              <Link
                href={`/products?category=${product.categories.slug}`}
                className="text-xs text-[#3db896] font-semibold uppercase tracking-widest mb-2 hover:underline"
              >
                {product.categories.name}
              </Link>
            )}

            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-[#0f172a] leading-tight">{product.name}</h1>
              {product.is_bundle && (
                <span className="flex items-center gap-1 bg-[#0d2e22] text-[#3db896] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#1a6b58]/40">
                  <Layers className="w-3 h-3" />Kit
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />{product.purity} Purity Verified
              </div>
              {product.structural_batch_code && (
                <div className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] text-xs font-mono px-3 py-1 rounded-full">
                  <Hash className="w-3 h-3" />{product.structural_batch_code}
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-4xl font-bold text-[#0d2e22]">${Number(product.price_per_unit).toFixed(2)}</span>
              <span className="text-sm text-[#64748b]">per {product.specification}</span>
            </div>

            {product.description && (
              <p className="text-[#475569] text-sm leading-relaxed mb-5">{product.description}</p>
            )}

            {/* Quick-spec table */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden divide-y divide-[#f1f5f9] mb-5">
              <DataRow label="Specification" value={product.specification} />
              <DataRow label="Purity" value={product.purity} accent />
              {product.total_mg_per_vial && (
                <DataRow label="Total mg / vial" value={`${product.total_mg_per_vial} mg`} accent />
              )}
              {product.sequence && (
                <DataRow label="Sequence" value={product.sequence} mono />
              )}
              <DataRow
                label="Availability"
                value={inStock ? `In Stock (${product.stock_quantity} units)` : 'Out of Stock'}
                accent={inStock}
              />
            </div>

            {/* COA */}
            {viewerUrl ? (
              <Link
                href={viewerUrl}
                className="flex items-center gap-2.5 bg-[#edf7f2] hover:bg-[#c2ede3]/50 border border-[#c2ede3] rounded-xl px-4 py-3 transition-colors mb-4"
              >
                <div className="w-8 h-8 bg-[#1a6b58]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-[#1a6b58]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0d2e22]">Certificate of Analysis</div>
                  <div className="text-xs text-[#1a6b58]">View &amp; download — third-party lab verified</div>
                </div>
                <Download className="w-4 h-4 text-[#1a6b58]" />
              </Link>
            ) : (
              <div className="flex items-center gap-2.5 bg-[#f8fafc] border border-[#e2e8f0] border-dashed rounded-xl px-4 py-3 mb-4">
                <div className="w-8 h-8 bg-[#f1f5f9] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-[#94a3b8]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#64748b]">Certificate of Analysis</div>
                  <div className="text-xs text-[#94a3b8]">COA will be uploaded shortly</div>
                </div>
                <span className="text-[10px] font-medium bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full whitespace-nowrap">Pending</span>
              </div>
            )}

            <AddToCartButton product={product} disabled={!inStock} />

            <p className="mt-4 text-xs text-[#94a3b8] bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 leading-relaxed">
              <strong className="text-amber-700">Research Use Only:</strong> This product is intended solely for in vitro laboratory research and scientific study. Not for human or veterinary use.
            </p>
          </div>
        </div>

        {/* ── DATA SHEET ─────────────────────────────────────────────── */}
        <div className="border-t border-[#e2e8f0] pt-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-[#0d2e22] rounded-lg flex items-center justify-center">
              <Microscope className="w-4 h-4 text-[#3db896]" />
            </div>
            <div>
              <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-widest">Technical Reference</p>
              <h2 className="text-xl font-bold text-[#0f172a]">Product Data Sheet</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Col 1: Identity & Physical Properties ── */}
            <div className="space-y-4">
              <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-[#1a6b58]" />
                  <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">Identity &amp; Properties</span>
                </div>
                <div className="divide-y divide-[#f1f5f9]">
                  <DataRow label="Product Name" value={product.name} />
                  <DataRow label="Format" value={product.is_bundle ? 'Research Kit' : 'Single Compound'} />
                  <DataRow label="Specification" value={product.specification} />
                  {product.total_mg_per_vial && (
                    <DataRow label="Total mg / Vial" value={`${product.total_mg_per_vial} mg`} accent />
                  )}
                  <DataRow label="Physical Form" value="Lyophilised powder" />
                  <DataRow label="Appearance" value="White to off-white powder" />
                  <DataRow label="Storage" value="−20 °C (long-term)" />
                  <DataRow label="Shelf Life" value="24–36 months (sealed)" />
                  <DataRow label="Solubility" value="Soluble in water / acetic acid" />
                </div>
              </div>
            </div>

            {/* ── Col 2: Analytical Data ── */}
            <div className="space-y-4">
              <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1a6b58]" />
                  <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">Analytical Data</span>
                </div>
                <div className="divide-y divide-[#f1f5f9]">
                  <DataRow label="HPLC Purity" value={product.purity} accent />
                  <DataRow label="Identity Method" value="Mass Spectrometry (MS)" />
                  <DataRow label="MS Tolerance" value="Δ < 0.05 Da" mono />
                  <DataRow label="Testing Lab" value="ISO 17025-accredited" />
                  <DataRow label="COA Status" value={viewerUrl ? 'Available' : 'Pending upload'} accent={!!viewerUrl} />
                  {product.structural_batch_code && (
                    <DataRow label="Batch Code" value={product.structural_batch_code} mono />
                  )}
                  <DataRow label="Synthesis Method" value="SPPS (Solid-Phase)" />
                  <DataRow label="Lot Traceability" value="Full lot-locked" />
                </div>
              </div>

              {/* COA quick-access */}
              <div className={`rounded-xl border p-4 ${viewerUrl ? 'bg-[#edf7f2] border-[#c2ede3]' : 'bg-[#f8fafc] border-[#e2e8f0] border-dashed'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className={`w-4 h-4 ${viewerUrl ? 'text-[#1a6b58]' : 'text-[#94a3b8]'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wide ${viewerUrl ? 'text-[#0d2e22]' : 'text-[#64748b]'}`}>
                    Certificate of Analysis
                  </span>
                </div>
                {viewerUrl ? (
                  <>
                    <p className="text-xs text-[#475569] mb-3 leading-relaxed">Third-party verified. HPLC + MS confirmation. Lot-specific document.</p>
                    <Link
                      href={viewerUrl}
                      className="flex items-center justify-center gap-2 w-full bg-[#1a6b58] hover:bg-[#228070] text-white font-semibold py-2.5 rounded-lg text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      View &amp; Download COA
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-[#94a3b8] mb-2 leading-relaxed">The COA for this product batch will be uploaded shortly.</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs text-amber-600 font-medium">Upload in progress</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Col 3: Bundle / Safety ── */}
            <div className="space-y-4">

              {/* Bundle components — shown only for kits */}
              {product.is_bundle && components.length > 0 && (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 bg-[#0d2e22] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#3db896]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Kit Contents</span>
                    <span className="ml-auto text-[10px] text-[#3db896] font-semibold">{components.length} compound{components.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="divide-y divide-[#f1f5f9]">
                    {components.map((c, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 gap-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-[#1a6b58]/10 flex items-center justify-center flex-shrink-0">
                            <Beaker className="w-3 h-3 text-[#1a6b58]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#0f172a]">{c.name ?? c.product_slug}</p>
                            <p className="text-[10px] text-[#94a3b8] font-mono">{c.product_slug}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-[#1a6b58]">{c.mg} mg</p>
                          <p className="text-[10px] text-[#94a3b8]">× {c.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {product.total_mg_per_vial && (
                    <div className="px-5 py-3 bg-[#edf7f2] border-t border-[#c2ede3] flex items-center justify-between">
                      <span className="text-xs text-[#475569] font-medium">Total</span>
                      <span className="text-sm font-bold text-[#1a6b58]">{product.total_mg_per_vial} mg</span>
                    </div>
                  )}
                </div>
              )}

              {/* Handling & Safety */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center gap-2">
                  <TriangleAlert className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">Handling &amp; Safety</span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    'Handle in a controlled laboratory environment with appropriate PPE.',
                    'Reconstitute only with sterile bacteriostatic water or acetic acid as appropriate.',
                    'Aliquot and store at −20 °C. Avoid repeated freeze-thaw cycles.',
                    'Not for human, veterinary, or agricultural use under any circumstances.',
                    'Dispose of in accordance with local laboratory waste regulations.',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-[#1a6b58] mt-2 flex-shrink-0" />
                      <p className="text-xs text-[#475569] leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Regulatory Notice</span>
                </div>
                <p className="text-xs text-amber-700 leading-relaxed">
                  This product is an analytical reference material for in-vitro research only. It has not been evaluated by the FDA or any regulatory authority. Purchase and use must comply with all applicable laws in your jurisdiction.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
