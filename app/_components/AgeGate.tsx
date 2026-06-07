'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, FlaskConical, X } from 'lucide-react'
import { useLanguage } from '@/app/_context/LanguageContext'

const STORAGE_KEY = 'clarion_verified'

export default function AgeGate() {
  const [visible, setVisible] = useState(false)
  const [ageChecked, setAgeChecked] = useState(false)
  const [researcherChecked, setResearcherChecked] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const verified = sessionStorage.getItem(STORAGE_KEY)
    if (!verified) setVisible(true)
  }, [])

  const canConfirm = ageChecked && researcherChecked

  function confirm() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function decline() {
    window.location.href = 'https://www.google.com'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="age-gate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(7, 26, 20, 0.92)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            key="age-gate-card"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0d2e22] border border-[#1a6b58]/50 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1a6b58] via-[#3db896] to-[#1a6b58]" />

            <div className="px-8 py-8">
              {/* Logo mark */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1a6b58]/20 border border-[#1a6b58]/40 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-[#3db896]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Clarion Peptides</p>
                  <p className="text-[#3db896] text-[10px] uppercase tracking-widest mt-0.5">{t.ageGate.badge}</p>
                </div>
              </div>

              {/* Title */}
              <div className="mb-1">
                <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-2">{t.ageGate.required}</p>
                <h2 className="text-white text-2xl font-bold mb-1">{t.ageGate.title}</h2>
              </div>

              {/* Body copy */}
              <p className="text-[#7fd4bb] text-sm leading-relaxed mb-7">{t.ageGate.body}</p>

              {/* Checkboxes */}
              <div className="flex flex-col gap-4 mb-8">
                <label className={`flex items-start gap-4 cursor-pointer group rounded-xl border p-4 transition-all duration-200 ${
                  ageChecked ? 'border-[#3db896]/50 bg-[#1a6b58]/15' : 'border-[#1a6b58]/30 bg-[#0d2e22] hover:border-[#1a6b58]/50 hover:bg-[#1a6b58]/10'
                }`}>
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={ageChecked}
                      onChange={(e) => setAgeChecked(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      ageChecked ? 'bg-[#1a6b58] border-[#1a6b58]' : 'border-[#1a6b58]/50 bg-transparent'
                    }`}>
                      {ageChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-[#c2ede3] text-sm leading-snug">
                    {t.ageGate.check1Label} <strong className="text-white">{t.ageGate.check1Bold}</strong>
                  </p>
                </label>

                <label className={`flex items-start gap-4 cursor-pointer group rounded-xl border p-4 transition-all duration-200 ${
                  researcherChecked ? 'border-[#3db896]/50 bg-[#1a6b58]/15' : 'border-[#1a6b58]/30 bg-[#0d2e22] hover:border-[#1a6b58]/50 hover:bg-[#1a6b58]/10'
                }`}>
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={researcherChecked}
                      onChange={(e) => setResearcherChecked(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      researcherChecked ? 'bg-[#1a6b58] border-[#1a6b58]' : 'border-[#1a6b58]/50 bg-transparent'
                    }`}>
                      {researcherChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-[#c2ede3] text-sm leading-snug">
                    {t.ageGate.check2a} <strong className="text-white">{t.ageGate.check2Bold}</strong>{' '}
                    {t.ageGate.check2b}
                  </p>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={confirm}
                  disabled={!canConfirm}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 ${
                    canConfirm
                      ? 'bg-[#1a6b58] hover:bg-[#228070] text-white cursor-pointer'
                      : 'bg-[#1a6b58]/20 text-[#1a6b58]/50 cursor-not-allowed'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  {t.ageGate.confirm}
                </button>
                <button
                  onClick={decline}
                  className="flex-1 flex items-center justify-center gap-2 border border-[#1a6b58]/30 hover:border-[#1a6b58]/60 text-[#7fd4bb] hover:text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  {t.ageGate.decline}
                </button>
              </div>

              {/* Footer note */}
              <p className="text-[#475569] text-[11px] text-center mt-5 leading-relaxed">
                {t.ageGate.footer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
