'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, FlaskConical } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/app/_context/CartContext'
import { useLanguage } from '@/app/_context/LanguageContext'
import LanguageSelector from '@/app/_components/LanguageSelector'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()
  const { t } = useLanguage()

  const navLinks = [
    { href: '/products',     label: t.nav.products  },
    { href: '/testimonials', label: t.nav.reviews   },
    { href: '/about',        label: t.nav.about     },
    { href: '/contact',      label: t.nav.contact   },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0d2e22] border-b border-[#1a6b58]/40 shadow-lg">
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

          {/* Cart + language + mobile toggle */}
          <div className="flex items-center gap-2">
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
  )
}
