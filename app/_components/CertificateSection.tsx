import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface Props {
  /** Linked from a specific product — optional, falls back to demo data */
  productName?: string
  lotId?: string
  purity?: string
  releaseDate?: string
  labReportUrl?: string
  sectionNumber?: string
}

const DEMO = {
  productName: 'BPC-157',
  lotId: 'WY20260009',
  purity: '99.857%',
  releaseDate: '2026-02-19',
  labReportUrl: '/coas/bpc-157-coa.png',
}

const bullets = [
  'HPLC purity by gradient elution, ≥98% release floor',
  'Mass-spec identity check on every lot, Δ < 0.05 Da',
  'Public certificate verification via independent lab portal',
  'Lot-locked inventory — the lot you view is the lot you receive',
]

export default function CertificateSection({
  productName = DEMO.productName,
  lotId = DEMO.lotId,
  purity = DEMO.purity,
  labReportUrl = DEMO.labReportUrl,
  sectionNumber = '03',
}: Props) {
  const viewerUrl = labReportUrl
    ? `/coa?url=${encodeURIComponent(labReportUrl)}&lot=${encodeURIComponent(lotId)}&product=${encodeURIComponent(productName)}`
    : null

  return (
    <section className="bg-[#edf7f2] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f5fbf8] rounded-3xl border border-[#c2ede3] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ── Left: actual COA document image ── */}
            <div className="p-10 lg:p-14 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#c2ede3]">
              <div className="w-full max-w-sm flex flex-col gap-4">
                {/* Document frame */}
                <div className="relative rounded-2xl overflow-hidden border border-[#c2ede3] shadow-lg bg-white">
                  <Image
                    src={labReportUrl}
                    alt={`${productName} Certificate of Analysis`}
                    width={480}
                    height={708}
                    className="w-full h-auto object-contain"
                  />
                  {/* Purity badge overlay */}
                  <div className="absolute top-3 right-3 bg-[#0d2e22]/90 backdrop-blur-sm text-[#3db896] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {purity} Purity
                  </div>
                </div>

                {/* Lot info strip */}
                <div className="bg-white rounded-xl border border-[#d4ede5] px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-medium">Lot</p>
                    <p className="text-[#0d2e22] font-mono font-semibold text-sm">{lotId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-medium">Verified by</p>
                    <p className="text-[#0d2e22] font-semibold text-sm">Janoshik</p>
                  </div>
                </div>

                {/* CTA */}
                {viewerUrl ? (
                  <Link
                    href={viewerUrl}
                    className="flex items-center justify-center gap-2 w-full bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                  >
                    View full COA <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full bg-[#e2e8f0] text-[#94a3b8] font-semibold py-3.5 rounded-xl text-sm cursor-not-allowed">
                    COA available per product
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: methodology copy ── */}
            <div className="px-10 py-14 lg:px-14 flex flex-col justify-center">
              <p className="text-[#1a6b58] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                {sectionNumber} · Methodology
              </p>
              <h2 className="text-[#0d2e22] text-4xl font-bold leading-tight mb-4">
                The certificate<br />is the product.
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed mb-8">
                Two independent assays. One public ledger. Zero room for interpretation.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-4 h-px bg-[#1a6b58] mt-3 flex-shrink-0" />
                    <span className="text-[#334155] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
                >
                  How we verify <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
