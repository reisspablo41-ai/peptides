'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Locale, type Translations } from '@/lib/translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: translations['en'],
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('clarion_locale') as Locale | null
    if (stored === 'en' || stored === 'pt-BR') {
      setLocaleState(stored)
      return
    }
    const browserLang = navigator.language || (navigator.languages ?? [])[0] || 'en'
    if (browserLang.toLowerCase().startsWith('pt')) {
      setLocaleState('pt-BR')
    }
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem('clarion_locale', l)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
