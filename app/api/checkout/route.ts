import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createServerClient()

    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone || null,
        shipping_address_line1: body.shipping_address_line1,
        shipping_address_line2: body.shipping_address_line2 || null,
        city: body.city,
        postal_code: body.postal_code,
        country: body.country,
        total_amount: body.total_amount,
        status: 'pending',
      })
      .select('id')
      .single()

    if (orderErr || !order) {
      return NextResponse.json(
        { error: orderErr?.message ?? 'Failed to create order' },
        { status: 500 }
      )
    }

    const lineItems = (body.items as Array<{ product_id: string; quantity: number; price_at_purchase: number }>).map(
      (item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase,
      })
    )

    const { error: itemsErr } = await supabase.from('order_items').insert(lineItems)
    if (itemsErr) {
      return NextResponse.json({ error: itemsErr.message }, { status: 500 })
    }

    return NextResponse.json({ orderId: order.id })
  } catch (err) {
    console.error('[checkout]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
