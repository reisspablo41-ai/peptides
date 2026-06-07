'use client'

import { useSearchParams } from 'next/navigation'
import { Download, ArrowLeft, ZoomIn, ZoomOut, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function COAViewerPage() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') ?? ''
  const lot = searchParams.get('lot') ?? 'N/A'
  const product = searchParams.get('product') ?? 'Certificate of Analysis'

  const [zoom, setZoom] = useState(1)

  if (!url) {
    return (
      <div className="min-h-screen bg-[#f0f9f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] mb-4">No COA report specified.</p>
          <Link href="/products" className="text-[#1a6b58] hover:underline text-sm">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const isPdf = url.toLowerCase().endsWith('.pdf')

  return (
    <div className="min-h-screen bg-[#0d2e22] flex flex-col">
      {/* Toolbar */}
      <div className="bg-[#0b2620] border-b border-[#1a6b58]/30 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-[#7fd4bb] hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="w-px h-4 bg-[#1a6b58]/40" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3db896]" />
            <div>
              <span className="text-white text-sm font-semibold">{product}</span>
              {lot !== 'N/A' && (
                <span className="text-[#7fd4bb] text-xs ml-2">Lot {lot}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls — only for images */}
          {!isPdf && (
            <div className="hidden sm:flex items-center gap-1 bg-[#114030] rounded-lg p-1">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                className="p-1.5 text-[#7fd4bb] hover:text-white transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#7fd4bb] w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                className="p-1.5 text-[#7fd4bb] hover:text-white transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Download */}
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download COA</span>
            <span className="sm:hidden">Download</span>
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-6">
        {isPdf ? (
          <iframe
            src={url}
            className="w-full max-w-4xl rounded-xl shadow-2xl bg-white"
            style={{ height: 'calc(100vh - 120px)', minHeight: '600px' }}
            title={`${product} Certificate of Analysis`}
          />
        ) : (
          <div
            className="transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`${product} Certificate of Analysis`}
              className="max-w-3xl w-full rounded-xl shadow-2xl block"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0b2620] border-t border-[#1a6b58]/30 px-4 py-2 text-center flex-shrink-0">
        <p className="text-[#64748b] text-xs">
          This certificate was issued by an independent, ISO 17025-accredited laboratory. Lot ID: <span className="text-[#7fd4bb] font-mono">{lot}</span>
        </p>
      </div>
    </div>
  )
}
