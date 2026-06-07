'use client'

import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await supabase.from('products').delete().eq('id', productId)
    router.refresh()
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <a
        href={`/admin/products?edit=${productId}`}
        className="p-1.5 text-[#64748b] hover:text-[#3db896] transition-colors"
        aria-label="Edit"
      >
        <Pencil className="w-3.5 h-3.5" />
      </a>
      <button
        onClick={handleDelete}
        className="p-1.5 text-[#64748b] hover:text-red-400 transition-colors"
        aria-label="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
