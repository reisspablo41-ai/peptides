import { FlaskConical, ShieldCheck, Award, Microscope, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/app/_components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '@/app/_components/StaggerReveal'

export const metadata = {
  title: 'About Us | Clarion Peptides',
  description: 'Learn about Clarion Peptides — our standards, sourcing, and commitment to research-grade quality.',
}

const standards = [
  { icon: Microscope, title: 'ISO-Grade Synthesis',          body: 'All peptides are synthesized in cGMP-compliant facilities using solid-phase peptide synthesis (SPPS) to ensure consistent molecular integrity across every batch.' },
  { icon: ShieldCheck, title: 'Independent Third-Party Testing', body: 'Every production lot is sent to an ISO 17025-accredited external laboratory for HPLC purity analysis and mass spectrometry identity confirmation.' },
  { icon: Award,       title: 'Full Transparency',            body: 'We publish the Certificate of Analysis for every product. Researchers can download the COA report directly from each product listing — no registration required.' },
  { icon: Users,       title: 'Research Community Focus',    body: 'We exist to serve the scientific research community. Our catalog is curated based on the most-requested compounds in active peer-reviewed research.' },
]

export default function AboutPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">About Clarion Peptides</h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-[#7fd4bb] text-lg leading-relaxed max-w-2xl mx-auto">
              We are a specialist supplier of high-purity research peptides, dedicated to providing
              the scientific community with rigorously verified compounds at accessible pricing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-left">
            <div className="max-w-3xl">
              <p className="text-[#1a6b58] text-sm font-semibold uppercase tracking-widest mb-2">Why We Exist</p>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Our Mission</h2>
              <p className="text-[#475569] text-lg leading-relaxed mb-5">
                The quality of research outcomes depends entirely on the quality of the compounds
                used. Too often, researchers face uncertainty about the purity and identity of
                peptides sourced from unverified suppliers.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                Clarion Peptides was founded to solve this problem. Every product in our catalog
                comes with independently verified analytical data — because we believe researchers
                deserve certainty, not assumptions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="mb-10">
            <p className="text-[#1a6b58] text-sm font-semibold uppercase tracking-widest mb-2">How We Operate</p>
            <h2 className="text-3xl font-bold text-[#0f172a]">Our Quality Standards</h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {standards.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-7 h-full">
                  <div className="w-12 h-12 bg-[#1a6b58]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1a6b58]" />
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
            <p className="text-base text-amber-800 leading-relaxed">
              <strong>Important Notice:</strong> All products sold by Clarion Peptides are
              intended exclusively for in vitro laboratory research and scientific study.
              They are not approved for human or veterinary use and must not be administered
              to any biological system.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="scale-up">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Ready to start your research?</h2>
            <p className="text-[#64748b] text-lg mb-8">Browse our full catalog of independently verified research peptides.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0d2e22] hover:bg-[#1a6b58] text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
