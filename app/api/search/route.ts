import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (q.length < 2) return NextResponse.json([])

  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products')
      .select('id, name, slug, specification, purity, price_per_unit, image_url, stock_quantity')
      .eq('is_active', true)
      .ilike('name', `%${q}%`)
      .order('name')
      .limit(8)

    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json([])
  }
}
