'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, ArrowRight, FlaskConical, ShieldCheck } from 'lucide-react'
import { useCart } from '@/app/_context/CartContext'
import { useLanguage } from '@/app/_context/LanguageContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#e2e8f0] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-10 h-10 text-[#94a3b8]" />
          </div>
          <h2 className="text-xl font-bold text-[#0f172a] mb-2">{t.cart.emptyTitle}</h2>
          <p className="text-sm text-[#64748b] mb-6">{t.cart.emptyDesc}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            {t.cart.browseProducts}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-white">{t.cart.title}</h1>
          <p className="text-[#64748b] text-sm mt-1">
            {items.length} {items.length !== 1 ? t.cart.items : t.cart.item}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Line items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex gap-4"
              >
                <div className="w-20 h-20 bg-[#f1f5f9] rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <FlaskConical className="w-8 h-8 text-[#94a3b8]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-[#0f172a] text-sm">{product.name}</h3>
                      <p className="text-xs text-[#64748b] mt-0.5">{product.specification}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                        <ShieldCheck className="w-3 h-3" />
                        {product.purity} {t.cart.purity}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-[#94a3b8] hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#e2e8f0] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-[#0f172a]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-[#0d2e22] text-sm">
                      ${(Number(product.price_per_unit) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 sticky top-24">
              <h2 className="font-bold text-[#0f172a] mb-4">{t.cart.orderSummary}</h2>

              <div className="flex flex-col gap-2 text-sm">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-[#475569]">
                    <span className="truncate mr-2">{product.name} ×{quantity}</span>
                    <span className="flex-shrink-0">
                      ${(Number(product.price_per_unit) * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#f1f5f9] mt-4 pt-4 flex justify-between font-bold text-[#0f172a]">
                <span>{t.cart.total}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <p className="text-xs text-[#94a3b8] mt-2">{t.cart.shippingNote}</p>

              <Link
                href="/checkout"
                className="mt-5 flex items-center justify-center gap-2 w-full bg-[#1a6b58] hover:bg-[#228070] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
              >
                {t.cart.proceedToCheckout}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="mt-3 flex items-center justify-center text-sm text-[#64748b] hover:text-[#3db896] transition-colors"
              >
                {t.cart.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
