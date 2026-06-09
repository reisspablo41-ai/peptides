import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Clarion Peptides — Research-Grade Peptides',
    template: '%s | Clarion Peptides',
  },
  description:
    'High-purity research peptides with independently verified COA reports. Manufactured under ISO-grade laboratory conditions.',
  keywords: ['research peptides', 'high purity peptides', 'BPC-157', 'TB-500', 'peptide research'],
  openGraph: {
    siteName: 'Clarion Peptides',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
      <Script src="//code.jivosite.com/widget/hFjw8AGSZd" strategy="lazyOnload" />
    </html>
  )
}
