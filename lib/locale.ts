import { cookies } from 'next/headers'
import { translations, type Locale, type Translations } from './translations'

export async function getServerTranslations(): Promise<{ locale: Locale; t: Translations }> {
  const cookieStore = await cookies()
  const raw = cookieStore.get('clarion_locale')?.value
  const locale: Locale = raw === 'pt-BR' ? 'pt-BR' : 'en'
  return { locale, t: translations[locale] }
}
