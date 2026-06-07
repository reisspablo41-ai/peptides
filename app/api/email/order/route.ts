import { NextRequest, NextResponse } from 'next/server'
import { sendOrderEmails, type OrderEmailPayload } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const payload: OrderEmailPayload = await req.json()
    await sendOrderEmails(payload)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[email/order]', err)
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 })
  }
}
