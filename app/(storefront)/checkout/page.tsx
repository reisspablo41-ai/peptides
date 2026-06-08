'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, ArrowRight, FlaskConical, Coins, DollarSign, Zap, Smartphone, Building2, CreditCard } from 'lucide-react'
import { useCart } from '@/app/_context/CartContext'
import { useLanguage } from '@/app/_context/LanguageContext'

interface FormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address_line1: string
  shipping_address_line2: string
  city: string
  postal_code: string
  country: string
  payment_method: string
}

const initialForm: FormData = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  shipping_address_line1: '',
  shipping_address_line2: '',
  city: '',
  postal_code: '',
  country: '',
  payment_method: '',
}

const PAYMENT_METHODS = [
  { id: 'crypto',      label: 'Crypto',       Icon: Coins       },
  { id: 'cashapp',     label: 'CashApp',      Icon: DollarSign  },
  { id: 'zelle',       label: 'Zelle',        Icon: Zap         },
  { id: 'apple-pay',   label: 'Apple Pay',    Icon: Smartphone  },
  { id: 'chime',       label: 'Chime',        Icon: Building2   },
  { id: 'credit-card', label: 'Credit Card',  Icon: CreditCard  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { t } = useLanguage()
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0 && !ordered) {
    router.replace('/cart')
    return null
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.payment_method) {
      setError('Please select a payment method.')
      return
    }
    setSubmitting(true)
    setError('')

    // Snapshot all values immediately — before any awaits or re-renders
    const snapshot = { ...form }
    const cartSnapshot = items.map((i) => ({
      product_id: i.product.id,
      name: i.product.name,
      specification: i.product.specification,
      quantity: i.quantity,
      price_at_purchase: Number(i.product.price_per_unit),
    }))
    const total = totalPrice

    try {
      // Create order via server-side API route (uses service role — bypasses RLS)
      const orderRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...snapshot,
          payment_method: snapshot.payment_method,
          total_amount: total,
          items: cartSnapshot.map(({ product_id, quantity, price_at_purchase }) => ({
            product_id,
            quantity,
            price_at_purchase,
          })),
        }),
      })

      const orderData = await orderRes.json()
      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(orderData.error ?? 'Failed to create order')
      }

      const orderId = orderData.orderId

      // Send confirmation + admin notification emails (fire-and-forget — don't block checkout)
      fetch('/api/email/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName: snapshot.customer_name,
          customerEmail: snapshot.customer_email,
          customerPhone: snapshot.customer_phone || undefined,
          addressLine1: snapshot.shipping_address_line1,
          addressLine2: snapshot.shipping_address_line2 || undefined,
          city: snapshot.city,
          postalCode: snapshot.postal_code,
          country: snapshot.country,
          paymentMethod: snapshot.payment_method,
          items: cartSnapshot.map(({ name, specification, quantity, price_at_purchase }) => ({
            name,
            specification,
            quantity,
            price_at_purchase,
          })),
          totalAmount: total,
        }),
      }).catch(() => {/* email failure never blocks order */})

      setOrdered(true)
      clearCart()
      router.push(`/checkout/confirmation?order=${orderId}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#94a3b8] text-[#0f172a]'
  const labelClass = 'block text-xs font-medium text-[#475569] mb-1'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-[#3db896] text-xs mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>{t.checkout.secureLabel}</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t.checkout.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
                <h2 className="font-bold text-[#0f172a] mb-5">{t.checkout.contactInfo}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t.checkout.fullName} *</label>
                    <input
                      name="customer_name"
                      required
                      value={form.customer_name}
                      onChange={handleChange}
                      placeholder="Dr. Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.checkout.emailAddress} *</label>
                    <input
                      name="customer_email"
                      type="email"
                      required
                      value={form.customer_email}
                      onChange={handleChange}
                      placeholder="jane@research-lab.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.checkout.phoneNumber}</label>
                    <input
                      name="customer_phone"
                      type="tel"
                      value={form.customer_phone}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
                <h2 className="font-bold text-[#0f172a] mb-5">{t.checkout.shippingAddress}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.checkout.addressLine1} *</label>
                    <input
                      name="shipping_address_line1"
                      required
                      value={form.shipping_address_line1}
                      onChange={handleChange}
                      placeholder="123 Research Drive"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.checkout.addressLine2}</label>
                    <input
                      name="shipping_address_line2"
                      value={form.shipping_address_line2}
                      onChange={handleChange}
                      placeholder="Suite 400"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.checkout.city} *</label>
                    <input
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Boston"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.checkout.postalCode} *</label>
                    <input
                      name="postal_code"
                      required
                      value={form.postal_code}
                      onChange={handleChange}
                      placeholder="02101"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.checkout.country} *</label>
                    <input
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      placeholder="United States"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
                <h2 className="font-bold text-[#0f172a] mb-1">Payment Method <span className="text-red-500">*</span></h2>
                <p className="text-xs text-[#64748b] mb-5">Select how you&apos;d like to pay — instructions will be sent after your order is placed.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map(({ id, label, Icon }) => {
                    const selected = form.payment_method === id
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, payment_method: id }))}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selected
                            ? 'border-[#1a6b58] bg-[#edf7f2] text-[#0d2e22]'
                            : 'border-[#e2e8f0] bg-white text-[#475569] hover:border-[#1a6b58]/40 hover:bg-[#f8fafc]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${selected ? 'text-[#1a6b58]' : 'text-[#94a3b8]'}`} />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-800 leading-relaxed">
                  {t.checkout.disclaimer}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 sticky top-24">
                <h2 className="font-bold text-[#0f172a] mb-4">{t.checkout.orderSummary}</h2>

                <div className="flex flex-col gap-3 mb-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center flex-shrink-0">
                        {product.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <FlaskConical className="w-5 h-5 text-[#94a3b8]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0f172a] truncate">{product.name}</p>
                        <p className="text-xs text-[#64748b]">
                          {product.specification} × {quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#0f172a] flex-shrink-0">
                        ${(Number(product.price_per_unit) * quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#f1f5f9] pt-3 flex justify-between font-bold text-[#0f172a]">
                  <span>{t.checkout.total}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-[#1a6b58] hover:bg-[#228070] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                >
                  {submitting ? (
                    t.checkout.processing
                  ) : (
                    <>
                      {t.checkout.placeOrder}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#94a3b8]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.checkout.sslNote}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
