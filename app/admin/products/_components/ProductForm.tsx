'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Product, Category } from '@/lib/types'

interface Props {
  product: Product | null
  categories: Category[]
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    purity: product?.purity ?? '99%',
    sequence: product?.sequence ?? '',
    specification: product?.specification ?? '',
    price_per_unit: product?.price_per_unit?.toString() ?? '',
    stock_quantity: product?.stock_quantity?.toString() ?? '0',
    category_id: product?.category_id?.toString() ?? '',
    image_url: product?.image_url ?? '',
    lab_report_url: product?.lab_report_url ?? '',
    is_active: product?.is_active ?? true,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' && !isEdit ? { slug: slugify(value) } : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      purity: form.purity,
      sequence: form.sequence || null,
      specification: form.specification,
      price_per_unit: parseFloat(form.price_per_unit),
      stock_quantity: parseInt(form.stock_quantity),
      category_id: form.category_id ? parseInt(form.category_id) : null,
      image_url: form.image_url || null,
      lab_report_url: form.lab_report_url || null,
      is_active: form.is_active,
    }

    const { error: err } = isEdit
      ? await supabase.from('products').update(payload).eq('id', product!.id)
      : await supabase.from('products').insert(payload)

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  const inputClass =
    'w-full px-3 py-2 text-xs border border-[#1a6b58] rounded-lg bg-[#071a14] text-white focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#334155]'
  const labelClass = 'block text-xs font-medium text-[#64748b] mb-1'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0d2e22] border border-[#1a6b58/40] rounded-xl p-6"
    >
      <h2 className="text-sm font-bold text-white mb-5">
        {isEdit ? `Edit: ${product!.name}` : 'New Product'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <label className={labelClass}>Product Name *</label>
          <input name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="BPC-157" />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" required value={form.slug} onChange={handleChange} className={inputClass} placeholder="bpc-157" />
        </div>

        <div>
          <label className={labelClass}>Purity *</label>
          <input name="purity" required value={form.purity} onChange={handleChange} className={inputClass} placeholder="99%" />
        </div>

        <div>
          <label className={labelClass}>Specification *</label>
          <input name="specification" required value={form.specification} onChange={handleChange} className={inputClass} placeholder="5mg/vial" />
        </div>

        <div>
          <label className={labelClass}>Price (USD) *</label>
          <input name="price_per_unit" type="number" step="0.01" min="0" required value={form.price_per_unit} onChange={handleChange} className={inputClass} placeholder="49.99" />
        </div>

        <div>
          <label className={labelClass}>Stock Quantity *</label>
          <input name="stock_quantity" type="number" min="0" required value={form.stock_quantity} onChange={handleChange} className={inputClass} placeholder="100" />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className={inputClass}>
            <option value="">— No category —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Amino Acid Sequence</label>
          <input name="sequence" value={form.sequence} onChange={handleChange} className={inputClass} placeholder="H-Gly-Glu-Pro-Pro-…" />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Product description…" />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Image URL (Supabase Storage)</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} className={inputClass} placeholder="https://…" />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>COA / Lab Report URL</label>
          <input name="lab_report_url" value={form.lab_report_url} onChange={handleChange} className={inputClass} placeholder="https://…" />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="w-4 h-4 rounded accent-[#1a6b58]"
          />
          <label htmlFor="is_active" className="text-xs text-[#94a3b8] cursor-pointer">
            Active (visible on storefront)
          </label>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-xs text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 mt-5">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1a6b58] hover:bg-[#228070] disabled:opacity-60 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <a
          href="/admin/products"
          className="text-xs text-[#64748b] hover:text-white transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
