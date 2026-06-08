'use client'

import { useState } from 'react'
import { Mail, Clock, CheckCircle, Phone } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const { t } = useLanguage()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/email/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setError(t.contact.errorMsg)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#94a3b8] text-[#0f172a]'
  const labelClass = 'block text-xs font-medium text-[#475569] mb-1'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-bold text-white mb-1">{t.contact.title}</h1>
          <p className="text-[#64748b] text-sm">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
              <div className="w-10 h-10 bg-[#1a6b58]/10 rounded-lg flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-[#3db896]" />
              </div>
              <h3 className="font-semibold text-[#0f172a] text-sm mb-1">{t.contact.emailSupport}</h3>
              <p className="text-xs text-[#64748b]">contact@clarionpeptidesresearchlab.com</p>
            </div>
            <a
              href="https://t.me/Clarionpeps"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#1a6b58]/40 hover:shadow-sm transition-all block"
            >
              <div className="w-10 h-10 bg-[#1a6b58]/10 rounded-lg flex items-center justify-center mb-3">
                <TelegramIcon className="w-5 h-5 text-[#3db896]" />
              </div>
              <h3 className="font-semibold text-[#0f172a] text-sm mb-1">Telegram</h3>
              <p className="text-xs text-[#64748b]">@Clarionpeps</p>
              <p className="text-xs text-[#3db896] mt-1">Message us directly →</p>
            </a>
            <a
              href="https://wa.me/17473167596"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#1a6b58]/40 hover:shadow-sm transition-all block"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                <WhatsAppIcon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-[#0f172a] text-sm mb-1">WhatsApp</h3>
              <p className="text-xs text-[#64748b]">+1 (747) 316-7596</p>
              <p className="text-xs text-emerald-600 mt-1">Message us directly →</p>
            </a>
            <a
              href="tel:+14172372146"
              className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#1a6b58]/40 hover:shadow-sm transition-all block"
            >
              <div className="w-10 h-10 bg-[#1a6b58]/10 rounded-lg flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-[#3db896]" />
              </div>
              <h3 className="font-semibold text-[#0f172a] text-sm mb-1">+1 (417) 237-2146</h3>
              <p className="text-xs text-[#64748b]">Text or Call</p>
            </a>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-[#0f172a] text-sm mb-1">{t.contact.responseTime}</h3>
              <p className="text-xs text-[#64748b]">{t.contact.responseTimeDesc}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-10 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h2 className="font-bold text-[#0f172a] mb-2">{t.contact.successTitle}</h2>
                <p className="text-sm text-[#64748b]">{t.contact.successDesc}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t.contact.nameLabel} *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.contact.emailLabel} *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t.contact.subjectLabel} *</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">{t.contact.subjectPlaceholder}</option>
                    {t.contact.subjectOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>{t.contact.messageLabel} *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="self-start bg-[#1a6b58] hover:bg-[#228070] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  {submitting ? t.contact.sendingButton : t.contact.sendButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
