'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/app/_context/CartContext'
import type { Product } from '@/lib/types'

export default function AddToCartButton({
  product,
  disabled,
}: {
  product: Product
  disabled: boolean
}) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#64748b]">Quantity</span>
        <div className="flex items-center border border-[#e2e8f0] rounded-lg overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] transition-colors text-sm font-medium"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-[#0f172a]">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] transition-colors text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
          disabled
            ? 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
            : added
            ? 'bg-emerald-500 text-white'
            : 'bg-[#0d2e22] hover:bg-[#1a6b58] text-white'
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            {disabled ? 'Out of Stock' : 'Add to Cart'}
          </>
        )}
      </button>
    </div>
  )
}
