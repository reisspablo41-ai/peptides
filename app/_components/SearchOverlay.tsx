'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Search, X, FlaskConical, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/_context/LanguageContext'

interface SearchResult {
  id: string
  name: string
  slug: string
  specification: string
  purity: string
  price_per_unit: number
  image_url: string | null
  stock_quantity: number
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: Props) {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  // Escape key closes
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Debounced search
  const search = useCallback((q: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (q.trim().length < 2) { setResults([]); return }
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults(data)
      } finally {
        setLoading(false)
      }
    }, 220)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    search(e.target.value)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center pt-20 px-4 pb-8"
      style={{ backgroundColor: 'rgba(7, 26, 20, 0.88)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl">
        {/* Search input */}
        <div className="relative flex items-center bg-[#0d2e22] border border-[#1a6b58]/60 rounded-2xl shadow-2xl overflow-hidden">
          <Search className="absolute left-5 w-5 h-5 text-[#3db896] flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={handleChange}
            placeholder={t.nav.searchPlaceholder}
            className="w-full bg-transparent pl-14 pr-14 py-5 text-white text-lg placeholder:text-[#7fd4bb]/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-4 text-[#7fd4bb] hover:text-white transition-colors p-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-[#7fd4bb]/40 mt-3">{t.nav.searchHint}</p>

        {/* Results */}
        {query.trim().length >= 2 && (
          <div className="mt-4 bg-[#0d2e22] border border-[#1a6b58]/40 rounded-2xl overflow-hidden shadow-2xl">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-6 h-6 border-2 border-[#3db896] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : results.length === 0 ? (
              <div className="py-10 text-center">
                <FlaskConical className="w-10 h-10 text-[#1a6b58] mx-auto mb-3" />
                <p className="text-[#7fd4bb] text-sm">
                  {t.nav.searchNoResults} &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <ul>
                {results.map((product, i) => (
                  <li key={product.id} className={i > 0 ? 'border-t border-[#1a6b58]/20' : ''}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-[#1a6b58]/20 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-12 bg-[#114030] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <FlaskConical className="w-5 h-5 text-[#3db896]" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm group-hover:text-[#3db896] transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-[#7fd4bb] text-xs mt-0.5">
                          {product.specification} · {product.purity}
                        </p>
                      </div>

                      {/* Price + stock */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-white font-bold text-sm">
                          ${Number(product.price_per_unit).toFixed(2)}
                        </p>
                        {product.stock_quantity === 0 && (
                          <p className="text-[#94a3b8] text-[10px] mt-0.5">Out of stock</p>
                        )}
                      </div>

                      <ArrowRight className="w-4 h-4 text-[#1a6b58] group-hover:text-[#3db896] transition-colors flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
