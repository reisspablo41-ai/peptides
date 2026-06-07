import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Order Confirmed' }

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order } = await searchParams

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Order Confirmed!</h1>
        <p className="text-[#475569] text-sm mb-6">
          Thank you for your order. You will receive a confirmation email shortly with your
          order details and tracking information once your shipment is dispatched.
        </p>

        {order && (
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 text-xs text-[#64748b] mb-1">
              <Package className="w-3.5 h-3.5" />
              Order Reference
            </div>
            <p className="font-mono text-xs text-[#0f172a] break-all">{order}</p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-amber-800">
            <strong>Processing Time:</strong> Orders are typically processed within 1 business
            day. You will receive a shipping notification with a tracking number by email.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
