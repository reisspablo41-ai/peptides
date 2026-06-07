import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

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
  lotId: 'BPC-2026A-04',
  purity: '99.9%',
  releaseDate: '2025-09-12',
  labReportUrl: '/test-report.png',
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
  releaseDate = DEMO.releaseDate,
  labReportUrl = DEMO.labReportUrl,
  sectionNumber = '03',
}: Props) {
  const viewerUrl = labReportUrl
    ? `/coa?url=${encodeURIComponent(labReportUrl)}&lot=${encodeURIComponent(lotId)}&product=${encodeURIComponent(productName)}`
    : null

  const rows = [
    { label: 'LOT ID',        value: lotId,        mono: true  },
    { label: 'HPLC PURITY',   value: purity,       mono: false, bold: true },
    { label: 'IDENTITY (MS)', value: 'Δ < 0.05 Da', mono: true  },
    { label: 'RELEASED',      value: releaseDate,  mono: true  },
    { label: 'VERIFIED BY',   value: 'Janoshik',   mono: false },
  ]

  return (
    <section className="bg-[#edf7f2] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f5fbf8] rounded-3xl border border-[#c2ede3] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ── Left: COA card ── */}
            <div className="p-10 lg:p-14 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#c2ede3]">
              <div className="w-full max-w-md bg-white rounded-2xl border border-[#d4ede5] shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#edf7f2]">
                  <div>
                    <h3 className="text-[#0d2e22] text-xl font-bold">{productName}</h3>
                    <p className="text-[#64748b] text-[10px] uppercase tracking-[0.15em] mt-0.5 font-medium">
                      Certificate of Analysis
                    </p>
                  </div>
                  <span className="bg-[#d4ede5] text-[#1a6b58] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Released
                  </span>
                </div>

                {/* Data rows */}
                <div className="divide-y divide-[#f0f9f4]">
                  {rows.map(({ label, value, mono, bold }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-3">
                      <span className="text-[#94a3b8] text-[10px] uppercase tracking-[0.12em] font-medium">
                        {label}
                      </span>
                      <span
                        className={`text-[#0d2e22] text-sm ${mono ? 'font-mono' : ''} ${bold ? 'font-bold text-base' : 'font-medium'}`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 pt-4">
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
