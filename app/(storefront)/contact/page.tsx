'use client'

import { useState } from 'react'
import { Mail, Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'

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
