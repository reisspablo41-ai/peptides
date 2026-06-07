import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactEmailPayload } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const payload: ContactEmailPayload = await req.json()
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    await sendContactEmail(payload)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[email/contact]', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
