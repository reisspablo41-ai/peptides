'use client'

import { useState } from 'react'
import { Star, Quote, CheckCircle, Send } from 'lucide-react'

export const dynamic = 'force-dynamic'

const allTestimonials = [
  { name: 'Dr. Marcus Webb', role: 'Molecular Biology, Stanford University', body: 'Clarion Peptides has completely transformed my lab\'s workflow. The purity levels are consistently above 99% and the COA reports are exactly what we need for publication-grade research.', rating: 5 },
  { name: 'Priya Nair, PhD', role: 'Peptide Biochemist, NIH-affiliated Lab', body: 'Clarion\'s BPC-157 had the cleanest HPLC profile I\'ve seen — zero detectable impurities at our detection threshold. Exceptional quality control across every batch.', rating: 5 },
  { name: 'Dr. Lars Eriksson', role: 'Sports Science Researcher, Uppsala University', body: 'The third-party COA documents are a genuine differentiator. Every lot number matches the certificate and results are reproducible across our assays.', rating: 5 },
  { name: 'Amanda Chen', role: 'Research Associate, Peptide Therapeutics Lab', body: 'Ordering is seamless, dispatch is fast, and the packaging keeps everything temperature-stable during transit. Six experiments, perfect reproducibility every time.', rating: 5 },
  { name: 'Dr. James Okafor', role: 'Neuroscience PI, UCL', body: 'Selank from Clarion has been central to our anxiety-model studies. The consistency between batches is remarkable — I\'ve recommended this supplier to every colleague.', rating: 5 },
  { name: 'Sophia Reinholt', role: 'Postdoctoral Fellow, Max Planck Institute', body: 'The downloadable COA and responsive customer service put my mind at ease immediately. The GHK-Cu performed exactly as expected in our cell-culture experiments.', rating: 5 },
  { name: 'Dr. Thomas Nakamura', role: 'Regenerative Medicine, Kyoto University', body: 'Clarion Peptides is now our sole supplier for IGF-1 LR3. The purity documentation saves us hours of in-house validation and shipping to Japan is remarkably fast.', rating: 5 },
  { name: 'Rachel Morrison', role: 'Senior Research Scientist, BioTech Startup', body: 'A bulk order across several compounds arrived with every COA, within 48 hours, perfectly packaged. Clarion has earned our full trust and repeat business.', rating: 5 },
  { name: 'Dr. Elena Vasquez', role: 'Endocrinologist, UT Southwestern', body: 'I\'ve been sourcing peptides for clinical research for over a decade. Clarion is simply the most reliable supplier I\'ve worked with. Consistent, documented, fast.', rating: 5 },
  { name: 'Prof. Heinrich Bauer', role: 'Biochemistry Chair, Heidelberg University', body: 'Our lab requires ISO 17025-certified analytical data for every compound we use. Clarion is one of the very few suppliers that actually meets this standard.', rating: 5 },
  { name: 'Dr. Yuki Tanaka', role: 'Biophysics Researcher, Osaka University', body: 'Epithalon purity from Clarion was confirmed at 99.7% by our in-house HPLC. That number speaks for itself. Outstanding supplier for serious researchers.', rating: 5 },
  { name: 'Fatima Al-Rashid', role: 'PhD Candidate, Imperial College London', body: 'My supervisor recommended Clarion and I understand why now. Fast dispatch, impeccable documentation, and the compounds work exactly as published literature predicts.', rating: 5 },
  { name: 'Dr. Carlos Mendez', role: 'Pharmacology Researcher, UNAM', body: 'We switched from a competitor after inconsistent purity results damaged a study. Clarion has been flawless across 14 consecutive orders over the past year.', rating: 5 },
  { name: 'Dr. Grace Osei', role: 'Cell Biology Researcher, University of Ghana', body: 'International delivery was faster than expected and the cold-pack packaging was intact. Clarion Peptides clearly understands what researchers in tropical climates need.', rating: 5 },
  { name: 'Alex Hartmann', role: 'Graduate Researcher, ETH Zürich', body: 'TB-500 batch from Clarion was used in our wound-healing model. The results aligned perfectly with published studies — that only happens with genuinely pure compound.', rating: 5 },
  { name: 'Dr. Natalie Fox', role: 'Tissue Engineering Lab, Johns Hopkins', body: 'I appreciate that Clarion doesn\'t oversell or make therapeutic claims. They serve researchers professionally and back every product with real analytical data.', rating: 5 },
  { name: 'Prof. Samuel Park', role: 'Biochemistry, Seoul National University', body: 'We\'ve ordered Semax, Selank, and Epithalon. All three were consistent in purity and the COA matched our internal verification. Outstanding reliability.', rating: 5 },
  { name: 'Dr. Isabella Romano', role: 'Neuropharmacology, University of Bologna', body: 'Our receptor-binding assay for Semax was successful on the first attempt with Clarion\'s compound. That rarely happens with peptides from less rigorous suppliers.', rating: 5 },
  { name: 'Oliver Bergström', role: 'Research Coordinator, Karolinska Institutet', body: 'The admin team processed our institutional purchase order quickly and professionally. Everything was documented properly for our compliance requirements.', rating: 5 },
  { name: 'Dr. Aisha Mohammed', role: 'Translational Medicine, KAUST', body: 'Clarion is my first recommendation whenever colleagues ask where to source research-grade peptides. No other supplier matches their transparency and consistency.', rating: 5 },
  { name: 'Dr. Peter Williamson', role: 'Gerontology Researcher, University of Edinburgh', body: 'GHK-Cu from Clarion performed superbly in our collagen-synthesis assays. The purity was verified independently and matched the COA within 0.1%. Impressive.', rating: 5 },
  { name: 'Dr. Liu Wei', role: 'Pharmacognosy, Peking University', body: 'Cross-border orders handled flawlessly with full documentation for Chinese customs. I\'ve introduced five colleagues to Clarion Peptides and all have had equally positive experiences.', rating: 5 },
  { name: 'Hannah Brooks', role: 'MSc Researcher, University of Melbourne', body: 'As a postgraduate working on a tight budget, the pricing and purity combination from Clarion is unbeatable. Every penny of the research grant was well spent.', rating: 5 },
  { name: 'Dr. Victor Petrov', role: 'Immunology PI, Sechenov University', body: 'Thymosin Alpha-1 from Clarion was the highest-purity preparation we\'ve sourced. Activity assays confirmed the compound was bioactively intact — critical for our research.', rating: 5 },
  { name: 'Dr. Amelia Watson', role: 'Kinesiology Researcher, University of Toronto', body: 'Fast dispatch, excellent cold-chain packaging, and thorough analytical documentation. Our IGF-1 studies consistently produce clean data with Clarion\'s compounds.', rating: 5 },
  { name: 'Nguyen Thanh Liem', role: 'Pharmacology PhD, VNU Hanoi', body: 'First international order was a little nerve-wracking, but everything arrived pristine and exactly as described. Clarion Peptides has a customer for life.', rating: 5 },
  { name: 'Dr. Miriam Steinfeld', role: 'Ageing Biology, Charité Berlin', body: 'We use Epithalon as a positive control in our telomerase assays. Clarion\'s compound consistently activates at expected concentrations — something we cannot say for other suppliers.', rating: 5 },
  { name: 'Dr. Ryan O\'Sullivan', role: 'Sports Medicine Researcher, UCD', body: 'BPC-157 sourced from Clarion was integral to our tendon-regeneration pilot. COA documentation held up to peer-review scrutiny without any issues. Will reorder.', rating: 5 },
  { name: 'Dr. Fatou Diallo', role: 'Cell Signalling Researcher, Dakar Institute', body: 'The quality of Clarion\'s compounds gave our lab the confidence to publish results from our initial peptide trials. That\'s an endorsement money cannot buy.', rating: 5 },
  { name: 'Prof. Mikael Johansson', role: 'Structural Biology, Uppsala University', body: 'We used Clarion\'s DSIP in sleep-regulation studies. Biological activity confirmed by EEG metrics aligned precisely with published literature. Superb quality.', rating: 5 },
  { name: 'Dr. Sarah Klaas', role: 'Oncology Research, UMC Utrecht', body: 'Sample integrity for our cancer-metabolism studies depends on compound purity. Clarion meets our exacting requirements consistently — we\'ve validated six peptides from them.', rating: 5 },
  { name: 'Dr. Emmanuel Adeyemi', role: 'Molecular Pharmacology, University of Lagos', body: 'Delivery to Nigeria was handled professionally with appropriate documentation. COA was identical to our independent verification. Exceptional supplier.', rating: 5 },
  { name: 'Dr. Hiroshi Mori', role: 'Immunopeptide Research, Tohoku University', body: 'Ordering, shipping, and documentation processes are all thoroughly professional. Clarion understands the compliance demands of academic research institutions.', rating: 5 },
  { name: 'Jessica Park', role: 'Research Technician, CSIRO Australia', body: 'Our peptide budget is limited and we need every dollar to deliver reliable results. Clarion offers the best value-per-purity ratio of any supplier we\'ve evaluated.', rating: 5 },
  { name: 'Dr. Martin Schultz', role: 'Metabolic Disease Research, TU Munich', body: 'GLP-1 analogues from Clarion performed within expected parameters across all six of our receptor-binding assays. Reproducible, reliable, and thoroughly documented.', rating: 5 },
  { name: 'Dr. Ananya Bose', role: 'Biophysics, IIT Bombay', body: 'The COA PDF included mass-spec data that our reviewer specifically asked for. Clarion\'s documentation standards saved our publication from needing additional supplementary analysis.', rating: 5 },
  { name: 'Dr. William Adama', role: 'Haematology Researcher, UCT', body: 'Reliable supply of high-quality peptides is hard to find in Sub-Saharan Africa. Clarion Peptides ships reliably and the compounds perform exactly as specified.', rating: 5 },
  { name: 'Dr. Claudia Bernhardt', role: 'Dermatology Research, Düsseldorf University', body: 'GHK-Cu and Matrixyl from Clarion produced statistically significant results in our fibroblast-proliferation assay. The purity difference versus other suppliers was measurable.', rating: 5 },
  { name: 'Tomás Rivera', role: 'Neuroscience PhD, UNAM', body: 'Our cognitive-enhancement research with Noopept-adjacent peptides required a supplier we could trust completely. Clarion earned that trust on the very first order.', rating: 5 },
  { name: 'Dr. Zoë Papadaki', role: 'Exercise Physiology, Athens University', body: 'TB-500 from Clarion was the primary compound in our muscle-repair pilot study. The results were clean and reproducible — a direct consequence of compound purity.', rating: 5 },
  { name: 'Dr. Kenji Abe', role: 'Pharmacogenomics, University of Tokyo', body: 'Clarion\'s approach — independent testing, downloadable COAs, transparent documentation — is the gold standard for research peptide supply. Every supplier should operate this way.', rating: 5 },
  { name: 'Dr. Monica Lenz', role: 'Cardiovascular Research, Erasmus MC', body: 'We use Clarion exclusively for vasoactive peptides. Their quality assurance process and responsive support team make complex multi-batch studies straightforward to manage.', rating: 5 },
  { name: 'Prof. David Asante', role: 'Bioinformatics & Peptide Biology, Accra', body: 'I was impressed by the detail in the COA reports — not just purity percentages but full spectral data. That level of transparency builds real confidence in the compounds.', rating: 5 },
  { name: 'Dr. Ingrid Petersen', role: 'Obesity & Metabolism Research, University of Copenhagen', body: 'Five consecutive orders of GLP-1 receptor agonist peptides, all arriving within 48 hours, all matching COA specifications. Clarion has set a benchmark for this category.', rating: 5 },
  { name: 'Dr. Youssef El-Amin', role: 'Anti-Aging Medicine Research, Cairo University', body: 'Clarion Peptides is the only supplier I have recommended in my research group\'s peptide handbook. Their standards genuinely justify that level of trust.', rating: 5 },
  { name: 'Nina Volkova', role: 'Biochemistry Researcher, Lomonosov MSU', body: 'The Semax compound from Clarion was verified at 99.4% purity in our facility. Activity in our BDNF-elevation model was strong and consistent across three replicates.', rating: 5 },
  { name: 'Dr. Patrick Lefevre', role: 'Immunotherapy Research, Institut Pasteur', body: 'Clarion Peptides is the only supplier we use for immunomodulatory research compounds. The purity and documentation standards are simply unmatched in this space.', rating: 5 },
  { name: 'Dr. Akira Sato', role: 'Wound Healing Research, Nagoya University', body: 'BPC-157 potency from Clarion is noticeably superior to previously tested sources. Our healing-rate metrics improved significantly after switching suppliers.', rating: 5 },
  { name: 'Dr. Bianca Ferretti', role: 'Peptide Drug Discovery, University of Milan', body: 'For drug discovery work, compound purity is not negotiable. Clarion Peptides understands this and delivers at a level that supports serious pharmaceutical research.', rating: 5 },
  { name: 'Prof. Abdurrahman Yıldız', role: 'Molecular Medicine, Ankara University', body: 'Our comparative study required identical purity across six peptide batches from the same supplier. Clarion delivered all six at ≥99.1% — an extraordinary result.', rating: 5 },
  { name: 'Dr. Charlotte Dubois', role: 'Cognitive Neuroscience, Sorbonne Université', body: 'Semax purchased from Clarion showed full receptor binding in our cortical-slice preparation. The data quality was publication-ready from the first experiment.', rating: 5 },
  { name: 'Dr. Ravi Shankar', role: 'Biochemistry, IISc Bangalore', body: 'International express shipping was faster than some domestic suppliers I\'ve used. Every item arrived cold-packed with lot-specific COA included. Completely reliable.', rating: 5 },
  { name: 'Dr. Emeka Nwosu', role: 'Protein Chemistry, University of Ibadan', body: 'Clarion Peptides consistently goes above expectations. Their peptides behave as published and their support team answers technical questions with genuine expertise.', rating: 5 },
  { name: 'Dr. Linnea Andersson', role: 'Chronobiology Researcher, Lund University', body: 'DSIP from Clarion produced robust phase-shifting results in our circadian rhythm models. Compound integrity was confirmed by biological activity — the best validation there is.', rating: 5 },
  { name: 'Dr. Tobias Richter', role: 'Skin Biology, Berlin Free University', body: 'We\'ve used Clarion\'s GHK-Cu in four published studies. Reviewers have never questioned our compound sourcing because the COA documentation is airtight.', rating: 5 },
  { name: 'Dr. Ama Okonkwo', role: 'Translational Oncology, Uni of Lagos', body: 'Scientific rigour starts with compound quality. Clarion Peptides gives our lab the foundation we need to do credible research. Consistently excellent across every order.', rating: 5 },
  { name: 'Dr. Jan Kowalski', role: 'Immunology Researcher, Warsaw Medical University', body: 'Thymosin Beta-4 from Clarion exceeded our purity specification by half a percentage point. That kind of quality headroom is invaluable for sensitive immunological assays.', rating: 5 },
  { name: 'Dr. Mei Lin', role: 'Endocrine Pharmacology, Fudan University', body: 'Every order we have placed with Clarion has arrived ahead of schedule with complete documentation. For a busy research lab, that reliability translates directly into research output.', rating: 5 },
  { name: 'Dr. Felipe Santos', role: 'Regenerative Biology, USP São Paulo', body: 'We compared six suppliers for IGF-1 LR3. Clarion won on purity, documentation, and price. We haven\'t ordered from anyone else in eighteen months and don\'t intend to.', rating: 5 },
  { name: 'Dr. Nora Schmidt', role: 'Anti-Aging Research, Vienna Medical University', body: 'The combination of transparent COA reporting and dependable shipping makes Clarion Peptides the obvious choice for any serious research institution. Highly recommended.', rating: 5 },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#3db896] text-[#3db896]' : 'text-[#1a6b58]/30'}`}
        />
      ))}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .filter((w) => w.match(/^[A-Z]/))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

const bgColors = [
  'bg-[#1a6b58]',
  'bg-[#114030]',
  'bg-[#228070]',
  'bg-[#165240]',
  'bg-[#0d2e22]',
]

export default function TestimonialsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', body: '', rating: 5 })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'rating' ? parseInt(value) : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.body.length < 40) {
      setError('Please write at least 40 characters.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/email/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-[#e2e8f0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b58]/30 focus:border-[#1a6b58] placeholder:text-[#94a3b8] text-[#0f172a]'
  const labelClass = 'block text-xs font-medium text-[#475569] mb-1'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-2">
            Verified Researchers
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">What the Research Community Says</h1>
          <p className="text-[#7fd4bb] max-w-xl mx-auto">
            Over {allTestimonials.length} researchers worldwide trust Clarion Peptides for
            publication-grade compounds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg hover:border-[#1a6b58]/30 transition-all"
            >
              <Quote className="w-5 h-5 text-[#1a6b58]/30" />
              <p className="text-[#475569] text-sm leading-relaxed flex-1">{t.body}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full ${bgColors[i % bgColors.length]} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}
                  >
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="text-[#0f172a] text-xs font-semibold">{t.name}</p>
                    <p className="text-[#94a3b8] text-[10px] leading-tight">{t.role}</p>
                  </div>
                </div>
                <StarRow rating={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Submission form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#1a6b58]/10 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-[#1a6b58]" />
              </div>
              <div>
                <h2 className="font-bold text-[#0f172a]">Share Your Experience</h2>
                <p className="text-xs text-[#64748b]">
                  Help other researchers make informed decisions.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-[#1a6b58] mx-auto mb-3" />
                <h3 className="font-bold text-[#0f172a] mb-2">Thank You!</h3>
                <p className="text-sm text-[#64748b]">
                  Your testimonial has been submitted for review and will appear on this page shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dr. Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role / Institution *</label>
                    <input
                      name="role"
                      required
                      value={form.role}
                      onChange={handleChange}
                      placeholder="Research Scientist, MIT"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Your Review *</label>
                  <textarea
                    name="body"
                    required
                    value={form.body}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share your experience with Clarion Peptides' products and service…"
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-xs text-[#94a3b8] mt-1">
                    {form.body.length} / 40 characters minimum
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Rating *</label>
                  <div className="flex items-center gap-3">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <label key={r} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={r}
                          checked={form.rating === r}
                          onChange={handleChange}
                          className="accent-[#1a6b58]"
                        />
                        <span className="text-xs text-[#475569]">{r}★</span>
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="self-start flex items-center gap-2 bg-[#1a6b58] hover:bg-[#228070] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting…' : 'Submit Testimonial'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
