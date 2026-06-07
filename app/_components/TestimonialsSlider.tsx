'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Dr. Marcus Webb',
    role: 'Molecular Biology Researcher, Stanford University',
    body: 'Clarion Peptides has completely transformed my lab\'s workflow. The purity levels are consistently above 99% and the COA reports are exactly what we need for publication-grade research. Will not order from anywhere else.',
    rating: 5,
    initials: 'MW',
  },
  {
    name: 'Priya Nair, PhD',
    role: 'Peptide Biochemist, NIH-affiliated Lab',
    body: 'I\'ve tested compounds from six different suppliers over the past three years. Clarion\'s BPC-157 had the cleanest HPLC profile I\'ve seen — zero detectable impurities at our detection threshold. Exceptional quality control.',
    rating: 5,
    initials: 'PN',
  },
  {
    name: 'Dr. Lars Eriksson',
    role: 'Sports Science Researcher, Uppsala University',
    body: 'The third-party COA documents are a genuine differentiator. Every lot number matches the certificate and the results are reproducible across our assays. This is what responsible peptide supply looks like.',
    rating: 5,
    initials: 'LE',
  },
  {
    name: 'Amanda Chen',
    role: 'Research Associate, Peptide Therapeutics Lab',
    body: 'Ordering is seamless, dispatch is fast, and the packaging keeps everything temperature-stable during transit. We\'ve run TB-500 batches from Clarion across six separate experiments with perfect reproducibility.',
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Dr. James Okafor',
    role: 'Neuroscience PI, UCL',
    body: 'Selank from Clarion has been central to our anxiety-model studies. The consistency between batches is remarkable. I\'ve recommended this supplier to every colleague in my department looking for reliable nootropic peptides.',
    rating: 5,
    initials: 'JO',
  },
  {
    name: 'Sophia Reinholt',
    role: 'Postdoctoral Fellow, Max Planck Institute',
    body: 'I was sceptical about ordering online but the downloadable COA and responsive customer service put my mind at ease immediately. The GHK-Cu arrived quickly and performed exactly as expected in our cell-culture experiments.',
    rating: 5,
    initials: 'SR',
  },
  {
    name: 'Dr. Thomas Nakamura',
    role: 'Regenerative Medicine Researcher, Kyoto University',
    body: 'Clarion Peptides is now our sole supplier for IGF-1 LR3. The purity documentation saves us hours of in-house validation and the shipping is remarkably fast to Japan. A truly professional operation.',
    rating: 5,
    initials: 'TN',
  },
  {
    name: 'Rachel Morrison',
    role: 'Senior Research Scientist, BioTech Startup',
    body: 'We placed a bulk order for several compounds and every single one arrived with its COA, within 48 hours, perfectly packaged. Clarion has earned our full trust and the repeat business that comes with it.',
    rating: 5,
    initials: 'RM',
  },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-[#3db896] text-[#3db896]' : 'text-[#1a6b58]/30'}`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSlider() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback(
    (next: number) => {
      if (animating) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent((next + testimonials.length) % testimonials.length)
        setAnimating(false)
      }, 250)
    },
    [animating]
  )

  const prev = () => go(current - 1)
  const next = () => go(current + 1)

  // Auto-advance every 5 seconds
  useEffect(() => {
    const id = setInterval(() => go(current + 1), 5000)
    return () => clearInterval(id)
  }, [current, go])

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <section ref={ref} className="py-16 bg-[#0d2e22] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-1">
              From the Research Community
            </p>
            <h2 className="text-2xl font-bold text-white">What Scientists Are Saying</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[#1a6b58]/50 flex items-center justify-center text-[#7fd4bb] hover:bg-[#1a6b58]/30 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[#1a6b58]/50 flex items-center justify-center text-[#7fd4bb] hover:bg-[#1a6b58]/30 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className={`bg-[#114030] border border-[#1a6b58]/40 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
                animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              } ${i === 1 ? 'md:scale-[1.02] border-[#3db896]/40' : ''}`}
            >
              <Quote className="w-6 h-6 text-[#3db896]/40" />
              <p className="text-[#c2ede3] text-sm leading-relaxed flex-1">{t.body}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#1a6b58]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a6b58] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{t.name}</p>
                    <p className="text-[#7fd4bb] text-[10px] leading-tight">{t.role}</p>
                  </div>
                </div>
                <StarRow rating={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-[#3db896]' : 'w-1.5 bg-[#1a6b58]/60'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
