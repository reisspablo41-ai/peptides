export const COA_URLS: Record<string, string> = {
  'bpc-157-10mg': '/coas/bpc-157-coa.png',
  'tb-500':     '/coas/tb-500-coa.png',
  'ghk-cu':     '/coas/ghk-cu-coa.png',
  'mots-c':     '/coas/mots-c-coa.png',
  'tirzepatide':'/coas/tirzepatide-coa.png',
}

export const COA_SLUGS = new Set(Object.keys(COA_URLS))

export function getCoaUrl(slug: string): string | null {
  return COA_URLS[slug] ?? null
}
