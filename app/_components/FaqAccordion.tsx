'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  const { t } = useLanguage()

  return (
    <div className="flex flex-col divide-y divide-[#e2e8f0]">
      {t.faq.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
          >
            <span className="font-semibold text-[#0f172a] text-base group-hover:text-[#1a6b58] transition-colors">
              {faq.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-[#1a6b58] transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="text-[#475569] leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
