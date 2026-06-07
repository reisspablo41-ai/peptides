'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function TrackingInput({
  orderId,
  currentTracking,
}: {
  orderId: string
  currentTracking: string | null
}) {
  const router = useRouter()
  const [value, setValue] = useState(currentTracking ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    await supabase
      .from('orders')
      .update({ tracking_number: value || null })
      .eq('id', orderId)
    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter tracking number…"
        className="flex-1 text-xs border border-[#1a6b58] bg-[#071a14] text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#334155]"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
          saved
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-[#1a6b58]/20 hover:bg-[#1a6b58]/30 text-[#3db896]'
        }`}
      >
        {saved ? <Check className="w-3 h-3" /> : null}
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  )
}
