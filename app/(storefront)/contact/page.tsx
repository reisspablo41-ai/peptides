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
