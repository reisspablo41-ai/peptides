import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ProductActions from './_components/ProductActions'
import ProductForm from './_components/ProductForm'
import type { Product, Category } from '@/lib/types'

async function getData() {
  try {
    const supabase = createServerClient()
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*, categories(name, slug)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
    ])
    return {
      products: (prodRes.data ?? []) as Product[],
      categories: (catRes.data ?? []) as Category[],
    }
  } catch {
    return { products: [], categories: [] }
  }
}

export const metadata = { title: 'Manage Products' }

const statusColors: Record<string, string> = {
  true: 'bg-emerald-100 text-emerald-700',
  false: 'bg-[#1a6b58/40] text-[#64748b]',
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string }>
}) {
  const params = await searchParams
  const { products, categories } = await getData()

  const editProduct = params.edit
    ? products.find((p) => p.id === params.edit)
    : null

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Products</h1>
          <p className="text-[#64748b] text-sm mt-0.5">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products?action=new"
          className="inline-flex items-center gap-1.5 bg-[#1a6b58] hover:bg-[#228070] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Product
        </Link>
      </div>

      {/* Create / Edit form */}
      {(params.action === 'new' || editProduct) && (
        <div className="mb-6">
          <ProductForm product={editProduct ?? null} categories={categories} />
        </div>
      )}

      {/* Products table */}
      <div className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1a6b58/40] text-[#64748b] uppercase tracking-widest">
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Purity</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Stock</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a6b58/40]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[#64748b]">
                    No products yet.{' '}
                    <Link href="/admin/products?action=new" className="text-[#3db896] hover:underline">
                      Add your first product.
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#1a6b58/40]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-[#64748b] mt-0.5">{product.specification}</div>
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8]">
                      {product.categories?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-medium">{product.purity}</td>
                    <td className="px-4 py-3 text-white font-semibold">
                      ${Number(product.price_per_unit).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8]">{product.stock_quantity}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          statusColors[String(product.is_active)]
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ProductActions productId={product.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
