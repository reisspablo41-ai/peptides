import { FlaskConical, ShieldCheck, Award, Microscope, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/app/_components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '@/app/_components/StaggerReveal'
import { getServerTranslations } from '@/lib/locale'

export const metadata = {
  title: 'About Us | Clarion Peptides',
  description: 'Learn about Clarion Peptides — our standards, sourcing, and commitment to research-grade quality.',
}

const standardIcons = [Microscope, ShieldCheck, Award, Users]

export default async function AboutPage() {
  const { t } = await getServerTranslations()
  const ta = t.about

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-[#0d2e22] border-b border-[#1a6b58]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ScrollReveal variant="scale-up">
            <div className="w-16 h-16 bg-[#1a6b58]/20 border border-[#1a6b58]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FlaskConical className="w-8 h-8 text-[#3db896]" />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">{ta.heroTitle}</h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-[#7fd4bb] text-lg leading-relaxed max-w-2xl mx-auto">{ta.heroSubtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-left">
            <div className="max-w-3xl">
              <p className="text-[#1a6b58] text-sm font-semibold uppercase tracking-widest mb-2">{ta.missionEyebrow}</p>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-6">{ta.missionTitle}</h2>
              <p className="text-[#475569] text-lg leading-relaxed mb-5">{ta.missionP1}</p>
              <p className="text-[#475569] text-lg leading-relaxed">{ta.missionP2}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="mb-10">
            <p className="text-[#1a6b58] text-sm font-semibold uppercase tracking-widest mb-2">{ta.standardsEyebrow}</p>
            <h2 className="text-3xl font-bold text-[#0f172a]">{ta.standardsTitle}</h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ta.standards.map(({ title, body }, i) => (
              <StaggerItem key={title}>
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-7 h-full">
                  <div className="w-12 h-12 bg-[#1a6b58]/10 rounded-xl flex items-center justify-center mb-4">
                    {(() => { const Icon = standardIcons[i]; return <Icon className="w-6 h-6 text-[#1a6b58]" /> })()}
                  </div>
                  <h3 className="font-bold text-[#0f172a] text-lg mb-3">{title}</h3>
                  <p className="text-[#64748b] text-base leading-relaxed">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Disclaimer */}
      <ScrollReveal variant="fade-up">
        <section className="py-10 bg-amber-50 border-t border-amber-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-base text-amber-800 leading-relaxed">{ta.disclaimer}</p>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="scale-up">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">{ta.ctaTitle}</h2>
            <p className="text-[#64748b] text-lg mb-8">{ta.ctaDesc}</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              {ta.ctaButton} <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
