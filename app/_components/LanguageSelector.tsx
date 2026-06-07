'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'
import type { Locale } from '@/lib/translations'

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'en',    flag: '🇺🇸', label: 'English'    },
  { code: 'pt-BR', flag: '🇧🇷', label: 'Português'  },
]

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#1a6b58]/40 hover:border-[#3db896]/60 hover:bg-[#1a6b58]/20 transition-all duration-200 text-[#7fd4bb] hover:text-white"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-semibold hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-40 bg-[#0d2e22] border border-[#1a6b58]/50 rounded-xl shadow-xl overflow-hidden z-50"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => { setLocale(l.code); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                l.code === locale
                  ? 'bg-[#1a6b58]/40 text-white font-semibold'
                  : 'text-[#7fd4bb] hover:bg-[#1a6b58]/20 hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              {l.label}
              {l.code === locale && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3db896]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
