'use client'

import Link from 'next/link'
import { FlaskConical, ShieldCheck, Award, Phone } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  const footerLinks = {
    [f.shop]: [
      { href: '/products', label: f.allProducts },
      { href: '/products?category=growth-factors', label: f.growthFactors },
      { href: '/products?category=healing-peptides', label: f.healingPeptides },
      { href: '/products?category=cognitive', label: f.cognitive },
    ],
    [f.company]: [
      { href: '/about', label: f.aboutUs },
      { href: '/contact', label: f.contact },
      { href: '/testimonials', label: f.testimonials },
    ],
    [f.legal]: [
      { href: '/terms', label: f.termsOfService },
      { href: '/privacy', label: f.privacyPolicy },
    ],
  }

  return (
    <footer className="bg-[#071a14] text-[#64748b] border-t border-[#114030]">
      {/* Trust bar */}
      <div className="border-b border-[#114030] bg-[#0d2e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#7fd4bb]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3db896]" />
              <span>{f.coaVerified}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#3db896]" />
              <span>{f.purityGuaranteed}</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#3db896]" />
              <span>{f.isoGrade}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a6b58]">
                <FlaskConical className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-base">
                Clarion<span className="text-[#3db896]">Peptides</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs">{f.brandDesc}</p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                {group}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Contacts */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
              {f.quickContacts}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://t.me/Clarionpeps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs hover:text-white transition-colors group"
                >
                  <TelegramIcon className="w-4 h-4 text-[#3db896] mt-0.5 flex-shrink-0" />
                  <span>{f.telegramContact}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+14172372146"
                  className="flex items-start gap-2 text-xs hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#3db896] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">+1 (417) 237-2146</div>
                    <div className="text-[#64748b] text-[10px]">{f.phoneContact}</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#114030] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} Clarion Peptides. {f.allRightsReserved}
          </p>
          <p className="text-xs text-center">{f.forResearchOnly}</p>
        </div>
      </div>
    </footer>
  )
}
