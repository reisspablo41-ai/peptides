import Link from 'next/link'
import { FlaskConical, ShieldCheck, Award } from 'lucide-react'

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=growth-factors', label: 'Growth Factors' },
    { href: '/products?category=healing-peptides', label: 'Healing Peptides' },
    { href: '/products?category=cognitive', label: 'Cognitive' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/testimonials', label: 'Testimonials' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#071a14] text-[#64748b] border-t border-[#114030]">
      {/* Trust bar */}
      <div className="border-b border-[#114030] bg-[#0d2e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#7fd4bb]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3db896]" />
              <span>Third-Party COA Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#3db896]" />
              <span>≥99% Purity Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#3db896]" />
              <span>ISO-Grade Laboratory Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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
            <p className="text-xs leading-relaxed max-w-xs">
              Supplying research scientists with pharmaceutical-grade peptides.
              All products are for laboratory research purposes only and are not
              intended for human consumption.
            </p>
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
                    <Link
                      href={link.href}
                      className="text-xs hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#114030] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} Clarion Peptides. All rights reserved.
          </p>
          <p className="text-xs text-center">
            For Research Purposes Only — Not for Human or Veterinary Use.
          </p>
        </div>
      </div>
    </footer>
  )
}
