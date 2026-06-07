import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM   = process.env.RESEND_FROM_EMAIL ?? 'orders@clarionpeptidesresearchlab.com'
const ADMIN  = process.env.ADMIN_EMAIL        ?? 'contact@clarionpeptidesresearchlab.com'
const SITE   = 'https://clarionpeptidesresearchlab.com'

// ─── Shared brand shell ────────────────────────────────────────────────────────
function shell(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Clarion Peptides</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#0d2e22;border-radius:16px 16px 0 0;padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="display:inline-block;background:#1a6b58;border-radius:8px;padding:8px 12px;margin-bottom:12px;">
                  <span style="color:#ffffff;font-size:14px;">⚗</span>
                </span><br/>
                <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">
                  Clarion<span style="color:#3db896;">Peptides</span>
                </span>
              </td>
              <td align="right" style="vertical-align:bottom;">
                <span style="color:#7fd4bb;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Research Compounds</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:36px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#0d2e22;border-radius:0 0 16px 16px;padding:20px 36px;">
          <p style="margin:0;color:#7fd4bb;font-size:11px;line-height:1.6;">
            <strong style="color:#3db896;">Clarion Peptides Research Lab</strong> · ${SITE}<br/>
            For research use only. Not for human consumption, diagnosis, or treatment.<br/>
            <a href="${SITE}/privacy" style="color:#3db896;text-decoration:none;">Privacy Policy</a> &nbsp;·&nbsp;
            <a href="${SITE}/terms" style="color:#3db896;text-decoration:none;">Terms &amp; Conditions</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

// ─── Reusable section primitives ───────────────────────────────────────────────
function sectionHeading(text: string, sub?: string) {
  return `
    <p style="margin:0 0 4px;color:#1a6b58;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Clarion Peptides</p>
    <h1 style="margin:0 0 ${sub ? '6px' : '24px'};color:#0d2e22;font-size:26px;font-weight:800;letter-spacing:-0.5px;">${text}</h1>
    ${sub ? `<p style="margin:0 0 24px;color:#64748b;font-size:14px;">${sub}</p>` : ''}
  `
}

function divider() {
  return `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />`
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;width:36%;">
        <span style="color:#94a3b8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${label}</span>
      </td>
      <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;">
        <span style="color:#0f172a;font-size:13px;font-weight:600;">${value}</span>
      </td>
    </tr>
  `
}

function lineItemRow(name: string, spec: string, qty: number, price: number) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
        <span style="color:#0f172a;font-size:13px;font-weight:600;">${name}</span><br/>
        <span style="color:#64748b;font-size:11px;">${spec}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;text-align:center;">
        <span style="color:#475569;font-size:13px;">×${qty}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;text-align:right;">
        <span style="color:#0d2e22;font-size:13px;font-weight:700;">$${(price * qty).toFixed(2)}</span>
      </td>
    </tr>
  `
}

function ctaButton(text: string, href: string) {
  return `
    <a href="${href}" style="display:inline-block;background:#1a6b58;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;margin-top:8px;">
      ${text}
    </a>
  `
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface OrderLineItem {
  name: string
  specification: string
  quantity: number
  price_at_purchase: number
}

export interface OrderEmailPayload {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode: string
  country: string
  items: OrderLineItem[]
  totalAmount: number
}

export interface ContactEmailPayload {
  name: string
  email: string
  subject: string
  message: string
}

export interface TestimonialEmailPayload {
  name: string
  role: string
  body: string
  rating: number
}

// ─── 1. Order confirmation → customer ──────────────────────────────────────────
function buildCustomerConfirmationHtml(o: OrderEmailPayload) {
  const itemRows = o.items.map((i) =>
    lineItemRow(i.name, i.specification, i.quantity, i.price_at_purchase)
  ).join('')

  return shell(`
    ${sectionHeading('Order Confirmed', `Thank you, ${o.customerName}. Your research order is being prepared.`)}

    <div style="background:#edf7f2;border:1px solid #c2ede3;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;color:#1a6b58;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Order Reference</p>
      <p style="margin:4px 0 0;color:#0d2e22;font-size:18px;font-weight:800;font-family:monospace;">#${o.orderId.slice(0, 8).toUpperCase()}</p>
    </div>

    <h3 style="margin:0 0 12px;color:#0f172a;font-size:14px;font-weight:700;">Order Summary</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 0;text-align:left;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Product</th>
          <th style="padding:10px 0;text-align:center;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Qty</th>
          <th style="padding:10px 0;text-align:right;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Price</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      <tr>
        <td style="padding:12px 0;text-align:right;font-size:16px;font-weight:800;color:#0d2e22;">
          Total: $${o.totalAmount.toFixed(2)} USD
        </td>
      </tr>
    </table>

    ${divider()}

    <h3 style="margin:0 0 12px;color:#0f172a;font-size:14px;font-weight:700;">Shipping Address</h3>
    <p style="margin:0;color:#475569;font-size:13px;line-height:1.8;">
      ${o.addressLine1}${o.addressLine2 ? '<br/>' + o.addressLine2 : ''}<br/>
      ${o.city}, ${o.postalCode}<br/>
      ${o.country}
    </p>

    ${divider()}

    <h3 style="margin:0 0 8px;color:#0f172a;font-size:14px;font-weight:700;">What Happens Next?</h3>
    <ul style="margin:0 0 20px;padding-left:20px;color:#475569;font-size:13px;line-height:2;">
      <li>Orders placed before 2 pm are dispatched the same business day.</li>
      <li>You will receive a separate email with your tracking number once shipped.</li>
      <li>COA documents are available on each product page on our website.</li>
      <li>For queries, reply to this email or contact us at ${ADMIN}.</li>
    </ul>

    ${ctaButton('View Our Catalog', `${SITE}/products`)}

    ${divider()}

    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-top:8px;">
      <p style="margin:0;color:#92400e;font-size:12px;line-height:1.6;">
        <strong>Research Use Only:</strong> All products are sold exclusively for in vitro laboratory research. Not for human consumption, veterinary, or agricultural use.
      </p>
    </div>
  `)
}

// ─── 2. Order notification → admin ─────────────────────────────────────────────
function buildAdminOrderHtml(o: OrderEmailPayload) {
  const itemRows = o.items.map((i) =>
    lineItemRow(i.name, i.specification, i.quantity, i.price_at_purchase)
  ).join('')

  return shell(`
    ${sectionHeading('New Order Received', `A new order has been placed on Clarion Peptides Research Lab.`)}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;border-collapse:collapse;margin-bottom:24px;">
      ${infoRow('Order ID', `#${o.orderId.slice(0, 8).toUpperCase()}`)}
      ${infoRow('Full ID', o.orderId)}
      ${infoRow('Customer', o.customerName)}
      ${infoRow('Email', o.customerEmail)}
      ${infoRow('Phone', o.customerPhone ?? '—')}
      ${infoRow('Total', `$${o.totalAmount.toFixed(2)} USD`)}
    </table>

    <h3 style="margin:0 0 12px;color:#0f172a;font-size:14px;font-weight:700;">Line Items</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 0;text-align:left;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">Product</th>
          <th style="padding:10px 0;text-align:center;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">Qty</th>
          <th style="padding:10px 0;text-align:right;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <p style="text-align:right;font-size:15px;font-weight:800;color:#0d2e22;margin:8px 0 24px;">Total: $${o.totalAmount.toFixed(2)} USD</p>

    ${divider()}

    <h3 style="margin:0 0 12px;color:#0f172a;font-size:14px;font-weight:700;">Shipping Address</h3>
    <p style="margin:0 0 24px;color:#475569;font-size:13px;line-height:1.8;">
      ${o.addressLine1}${o.addressLine2 ? '<br/>' + o.addressLine2 : ''}<br/>
      ${o.city}, ${o.postalCode}<br/>
      ${o.country}
    </p>

    ${ctaButton('Open Admin Dashboard', `${SITE}/admin/orders`)}
  `)
}

// ─── 3. Contact form → admin ────────────────────────────────────────────────────
function buildContactAdminHtml(c: ContactEmailPayload) {
  return shell(`
    ${sectionHeading('New Contact Enquiry', 'A visitor has submitted a message via the contact form.')}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;border-collapse:collapse;margin-bottom:24px;">
      ${infoRow('Name', c.name)}
      ${infoRow('Email', c.email)}
      ${infoRow('Subject', c.subject)}
    </table>

    <h3 style="margin:0 0 10px;color:#0f172a;font-size:14px;font-weight:700;">Message</h3>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;">${c.message}</p>
    </div>

    ${ctaButton(`Reply to ${c.name}`, `mailto:${c.email}`)}
  `)
}

// ─── 4. Testimonial → admin ─────────────────────────────────────────────────────
function buildTestimonialAdminHtml(t: TestimonialEmailPayload) {
  const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating)
  return shell(`
    ${sectionHeading('New Testimonial Submission', 'A researcher has submitted a testimonial for review.')}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;border-collapse:collapse;margin-bottom:24px;">
      ${infoRow('Name', t.name)}
      ${infoRow('Role / Institution', t.role)}
      ${infoRow('Rating', `<span style="color:#1a6b58;font-size:16px;">${stars}</span> (${t.rating}/5)`)}
    </table>

    <h3 style="margin:0 0 10px;color:#0f172a;font-size:14px;font-weight:700;">Testimonial</h3>
    <div style="background:#edf7f2;border:1px solid #c2ede3;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;font-style:italic;">"${t.body}"</p>
    </div>

    ${ctaButton('Review on Admin', `${SITE}/admin`)}
  `)
}

// ─── Public send functions ──────────────────────────────────────────────────────
export async function sendOrderEmails(payload: OrderEmailPayload) {
  const shortId = `#${payload.orderId.slice(0, 8).toUpperCase()}`

  await Promise.all([
    // Customer confirmation
    resend.emails.send({
      from: `Clarion Peptides <${FROM}>`,
      to: payload.customerEmail,
      subject: `Order Confirmed ${shortId} — Clarion Peptides Research Lab`,
      html: buildCustomerConfirmationHtml(payload),
    }),
    // Admin notification
    resend.emails.send({
      from: `Clarion Peptides <${FROM}>`,
      to: ADMIN,
      subject: `New Order ${shortId} — ${payload.customerName} · $${payload.totalAmount.toFixed(2)}`,
      html: buildAdminOrderHtml(payload),
    }),
  ])
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  await resend.emails.send({
    from: `Clarion Peptides <${FROM}>`,
    to: ADMIN,
    replyTo: payload.email,
    subject: `Contact Form: ${payload.subject} — from ${payload.name}`,
    html: buildContactAdminHtml(payload),
  })
}

export async function sendTestimonialEmail(payload: TestimonialEmailPayload) {
  await resend.emails.send({
    from: `Clarion Peptides <${FROM}>`,
    to: ADMIN,
    subject: `New Testimonial from ${payload.name} (${payload.rating}★)`,
    html: buildTestimonialAdminHtml(payload),
  })
}
