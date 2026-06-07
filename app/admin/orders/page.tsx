import { createServerClient } from '@/lib/supabase/server'
import type { Order } from '@/lib/types'
import OrderStatusUpdater from './_components/OrderStatusUpdater'
import TrackingInput from './_components/TrackingInput'

async function getOrders(): Promise<Order[]> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('orders')
      .select(`*, order_items(id, quantity, price_at_purchase, products(name, specification))`)
      .order('created_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

export const metadata = { title: 'Orders' }

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-[#edf7f2] text-[#1a6b58]',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Orders</h1>
        <p className="text-[#64748b] text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl px-5 py-12 text-center text-sm text-[#64748b]">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl overflow-hidden"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-4 border-b border-[#1a6b58/40]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#64748b]">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[order.status] ?? ''}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">{order.customer_name}</p>
                  <p className="text-xs text-[#64748b]">{order.customer_email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    ${Number(order.total_amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Line items */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="px-5 py-3 border-b border-[#1a6b58/40]">
                  <p className="text-[10px] uppercase tracking-widest text-[#64748b] mb-2">Items</p>
                  <div className="flex flex-col gap-1">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-[#94a3b8]">
                        <span>
                          {item.products?.name ?? 'Unknown'}{' '}
                          <span className="text-[#64748b]">×{item.quantity}</span>
                        </span>
                        <span>${(item.price_at_purchase * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping address */}
              <div className="px-5 py-3 border-b border-[#1a6b58/40]">
                <p className="text-[10px] uppercase tracking-widest text-[#64748b] mb-1">
                  Ship To
                </p>
                <p className="text-xs text-[#94a3b8]">
                  {order.shipping_address_line1}
                  {order.shipping_address_line2 && `, ${order.shipping_address_line2}`},{' '}
                  {order.city}, {order.postal_code}, {order.country}
                </p>
              </div>

              {/* Admin controls */}
              <div className="px-5 py-3 flex flex-wrap gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#64748b] mb-1">Status</p>
                  <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                </div>
                <div className="flex-1 min-w-48">
                  <p className="text-[10px] uppercase tracking-widest text-[#64748b] mb-1">
                    Tracking Number
                  </p>
                  <TrackingInput orderId={order.id} currentTracking={order.tracking_number} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
