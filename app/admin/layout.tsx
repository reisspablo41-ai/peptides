import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, FlaskConical, ExternalLink } from 'lucide-react'
import LogoutButton from './_components/LogoutButton'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#071a14]">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-[#1a6b58/40] flex flex-col">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-[#1a6b58/40]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a6b58] rounded-lg flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-xs font-bold leading-tight">Clarion</div>
              <div className="text-[#64748b] text-[10px] leading-tight">Admin</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#64748b] hover:text-white hover:bg-[#1a6b58/40] transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[#1a6b58/40] flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#64748b] hover:text-white hover:bg-[#1a6b58/40] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Storefront
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
