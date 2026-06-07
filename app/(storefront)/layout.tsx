import Navbar from '@/app/_components/Navbar'
import Footer from '@/app/_components/Footer'
import { CartProvider } from '@/app/_context/CartContext'
import { LanguageProvider } from '@/app/_context/LanguageContext'
import AgeGate from '@/app/_components/AgeGate'

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <AgeGate />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </LanguageProvider>
  )
}
