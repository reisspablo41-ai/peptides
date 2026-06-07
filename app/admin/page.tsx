import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getStats() {
  try {
    const supabase = createServerClient()
    const [products, orders, pendingOrders] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('orders').select('total_amount'),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    ])

    const totalRevenue = orders.data?.reduce((s, o) => s + Number(o.total_amount), 0) ?? 0
    return {
      productCount: products.count ?? 0,
      orderCount: orders.data?.length ?? 0,
      pendingCount: pendingOrders.count ?? 0,
      totalRevenue,
    }
  } catch {
    return { productCount: 0, orderCount: 0, pendingCount: 0, totalRevenue: 0 }
  }
}

async function getRecentOrders() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('orders')
      .select('id, customer_name, customer_email, total_amount, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
    return data ?? []
  } catch {
    return []
  }
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-[#edf7f2] text-[#1a6b58]',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboard() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()])

  const statCards = [
    { label: 'Active Products', value: stats.productCount, icon: Package, color: 'text-[#3db896]', bg: 'bg-[#1a6b58]/10' },
    { label: 'Total Orders', value: stats.orderCount, icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Pending Orders', value: stats.pendingCount, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-[#64748b] text-sm mt-0.5">Overview of store performance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl p-4">
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-[#64748b] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a6b58/40]">
          <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-[#3db896] hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-[#64748b]">No orders yet</div>
        ) : (
          <div className="divide-y divide-[#1a6b58/40]">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{order.customer_name}</p>
                  <p className="text-xs text-[#64748b] truncate">{order.customer_email}</p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${statusColors[order.status] ?? 'bg-[#1a6b58/40] text-[#64748b]'}`}
                >
                  {order.status}
                </span>
                <span className="text-xs font-bold text-white flex-shrink-0">
                  ${Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
