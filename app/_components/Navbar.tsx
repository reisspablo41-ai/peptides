'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, FlaskConical, Search } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/app/_context/CartContext'
import { useLanguage } from '@/app/_context/LanguageContext'
import LanguageSelector from '@/app/_components/LanguageSelector'
import SearchOverlay from '@/app/_components/SearchOverlay'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems } = useCart()
  const { t } = useLanguage()

  const navLinks = [
    { href: '/products',     label: t.nav.products  },
    { href: '/testimonials', label: t.nav.reviews   },
    { href: '/about',        label: t.nav.about     },
    { href: '/contact',      label: t.nav.contact   },
  ]

  return (
    <>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="sticky top-0 z-50 bg-[#0d2e22] border-b border-[#1a6b58]/40 shadow-lg">
        {/* Contact bar */}
        <div className="border-b border-[#1a6b58]/30 bg-[#071a14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center sm:justify-end gap-5 py-1.5 text-xs text-[#7fd4bb]">
              <a
                href="https://t.me/Clarionpeps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                {t.nav.telegramLabel}
              </a>
              <a
                href="https://wa.me/17473167596"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                {t.nav.whatsappLabel}
              </a>
              <a
                href="tel:+14172372146"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
                </svg>
                <span>+1 (417) 237-2146</span>
                <span className="text-[#3db896]">· {t.nav.phoneLabel}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a6b58] group-hover:bg-[#228070] transition-colors">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Clarion<span className="text-[#3db896]">Peptides</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#7fd4bb] hover:text-white text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search + language + cart + mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={t.nav.search}
                className="flex items-center gap-1.5 text-[#7fd4bb] hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#1a6b58]/30"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm font-medium hidden lg:inline">{t.nav.search}</span>
              </button>

              <LanguageSelector />

              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 text-[#7fd4bb] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1a6b58]/30"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#3db896] text-[#0d2e22] text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{t.nav.cart}</span>
                {totalItems > 0 && (
                  <span className="hidden sm:inline text-xs text-[#3db896] font-semibold">
                    ({totalItems})
                  </span>
                )}
              </Link>

              <button
                className="md:hidden text-[#7fd4bb] hover:text-white transition-colors p-1.5"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#1a6b58]/40 bg-[#0d2e22]">
            <div className="px-4 py-3 flex flex-col gap-1">
              {/* Mobile search */}
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
                className="flex items-center gap-2 text-[#7fd4bb] hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-[#1a6b58]/30 transition-colors"
              >
                <Search className="w-4 h-4" />
                {t.nav.search}
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#7fd4bb] hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-[#1a6b58]/30 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-[#7fd4bb] hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-[#1a6b58]/30 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {t.nav.cart}
                {totalItems > 0 && (
                  <span className="ml-auto bg-[#3db896] text-[#0d2e22] text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
