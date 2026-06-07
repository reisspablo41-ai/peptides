import Link from 'next/link'
import { FlaskConical, ShieldCheck, SlidersHorizontal, Search } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { Product, Category } from '@/lib/types'

async function getData(category?: string, search?: string) {
  try {
    const supabase = createServerClient()

    const [catRes, prodRes] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      (async () => {
        let q = supabase
          .from('products')
          .select('*, categories(name, slug)')
          .eq('is_active', true)
          .order('name')

        if (category) {
          q = q.eq('categories.slug', category)
        }
        if (search) {
          q = q.ilike('name', `%${search}%`)
        }
        return q
      })(),
    ])

    return {
      categories: (catRes.data ?? []) as Category[],
      products: (prodRes.data ?? []) as Product[],
    }
  } catch {
    return { categories: [], products: [] }
  }
}

export const metadata = {
  title: 'Products',
  description: 'Browse our full catalog of high-purity research peptides.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const { categories, products } = await getData(params.category, params.search)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Page header */}
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-bold text-white mb-1">Research Peptides Catalog</h1>
          <p className="text-[#64748b] text-sm">
            {products.length} product{products.length !== 1 ? 's' : ''} — all independently COA-verified
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-[#64748b]" />
                <span className="text-sm font-semibold text-[#0f172a]">Filters</span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94a3b8]" />
                <form>
                  <input
                    name="search"
                    type="text"
                    defaultValue={params.search ?? ''}
                    placeholder="Search peptides…"
                    className="w-full pl-8 pr-3 py-2 text-xs border border-[#e2e8f0] rounded-lg bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#94a3b8]"
                  />
                </form>
              </div>

              {/* Category list */}
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-2">
                  Category
                </p>
                <ul className="flex flex-col gap-1">
                  <li>
                    <Link
                      href="/products"
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        !params.category
                          ? 'bg-[#1a6b58]/10 text-[#3db896] font-medium'
                          : 'text-[#475569] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/products?category=${cat.slug}`}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          params.category === cat.slug
                            ? 'bg-[#1a6b58]/10 text-[#3db896] font-medium'
                            : 'text-[#475569] hover:bg-[#f1f5f9]'
                        }`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-white border border-[#e2e8f0] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#1a6b58]/40 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-[#f1f5f9] flex items-center justify-center relative">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                          <FlaskConical className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-[#0d2e22] text-[#3db896] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#1a6b58]/30">
                        {product.purity}
                      </div>
                      {product.stock_quantity === 0 && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="bg-[#0f172a] text-white text-xs font-medium px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-[#3db896] font-medium uppercase tracking-wide mb-1">
                        {product.specification}
                      </div>
                      <h3 className="font-semibold text-[#0f172a] text-sm leading-snug group-hover:text-[#3db896] transition-colors mb-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-[#64748b] line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                        <span className="text-base font-bold text-[#0d2e22]">
                          ${Number(product.price_per_unit).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#10b981]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>COA</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <FlaskConical className="w-12 h-12 text-[#cbd5e1] mb-4" />
                <h3 className="font-semibold text-[#0f172a] mb-2">No products found</h3>
                <p className="text-sm text-[#64748b]">
                  Try a different search or browse all categories.
                </p>
                <Link
                  href="/products"
                  className="mt-4 text-sm text-[#3db896] hover:underline"
                >
                  Clear filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
