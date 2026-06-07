import { NextRequest, NextResponse } from 'next/server'
import { sendTestimonialEmail, type TestimonialEmailPayload } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const payload: TestimonialEmailPayload = await req.json()
    if (!payload.name || !payload.body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    await sendTestimonialEmail(payload)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[email/testimonial]', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
