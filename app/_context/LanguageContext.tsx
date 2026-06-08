'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

function syncCookie(l: Locale) {
  document.cookie = `clarion_locale=${l}; path=/; max-age=31536000; samesite=lax`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('clarion_locale') as Locale | null
    if (stored === 'en' || stored === 'pt-BR') {
      setLocaleState(stored)
      syncCookie(stored)
      return
    }
    const browserLang = navigator.language || (navigator.languages ?? [])[0] || 'en'
    if (browserLang.toLowerCase().startsWith('pt')) {
      setLocaleState('pt-BR')
      syncCookie('pt-BR')
    }
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem('clarion_locale', l)
    syncCookie(l)
    router.refresh()
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
