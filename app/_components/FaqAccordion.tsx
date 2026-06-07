'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What are peptides and how do they work?',
    a: 'Peptides are short chains of amino acids — the building blocks of proteins — typically between 2 and 50 amino acids in length. In research settings, they are studied for their ability to act as signalling molecules, binding to specific receptors and modulating biological processes such as tissue repair, hormone secretion, immune response, and cellular regeneration.',
  },
  {
    q: 'What does "research grade" mean?',
    a: 'Research-grade peptides are synthesised and characterised for use in controlled laboratory experiments. This means they are produced under strict conditions using solid-phase peptide synthesis (SPPS), then independently verified for purity and identity via HPLC and mass spectrometry. Clarion Peptides requires a minimum purity of 99% on all listed compounds.',
  },
  {
    q: 'Can I use these peptides for myself or my patients?',
    a: 'No. All products sold by Clarion Peptides are strictly for in vitro laboratory research and scientific study. They are not approved for human or veterinary use, are not medications, and must not be administered to any biological system. They are sold exclusively to qualified researchers and scientific professionals.',
  },
  {
    q: 'What is a Certificate of Analysis (COA) and why does it matter?',
    a: 'A COA is an independently verified analytical document issued by a third-party, ISO 17025-accredited laboratory. It confirms the identity, purity, and potency of a compound on a batch-specific basis. Every product in our catalogue has a downloadable COA so researchers can verify exactly what they are receiving before use.',
  },
  {
    q: 'How do you ensure purity levels are accurate?',
    a: 'We do not self-certify. Every production batch is sent to an independent, accredited external laboratory for HPLC (High Performance Liquid Chromatography) purity analysis and mass spectrometry identity confirmation. The resulting COA is issued by that external laboratory — not by us — and is made available on each product listing.',
  },
  {
    q: 'How are peptides packaged and shipped?',
    a: 'All compounds are lyophilised (freeze-dried) and sealed under inert gas to maximise stability. Orders are shipped in insulated packaging with appropriate cold-packs where required. We dispatch orders placed before 2pm the same business day and use tracked, express courier services for all shipments.',
  },
  {
    q: 'Do I need to create an account to order?',
    a: 'No. We operate an entirely guest-checkout model. There is no registration required. You simply select your compounds, complete the secure checkout form with your shipping details, and your order is processed immediately. Order confirmation and tracking information are sent to the email address provided.',
  },
  {
    q: 'What is the shelf life of lyophilised peptides?',
    a: 'Lyophilised peptides are stable for 24–36 months when stored correctly — sealed, in a cool, dark environment (ideally −20°C for long-term storage). Once reconstituted in solution, stability depends on the specific peptide, the buffer used, and storage conditions. COA documents include specific storage guidance per compound.',
  },
  {
    q: 'Do you offer bulk or institutional purchasing?',
    a: 'Yes. We regularly fulfil institutional and bulk research orders. For large volume enquiries, custom specification requests, or institutional purchase order processing, please contact us via the contact page or email support@clarionpeptides.com. Volume pricing is available for qualifying orders.',
  },
  {
    q: 'What is your returns policy?',
    a: 'Due to the controlled and perishable nature of research compounds, we do not accept returns as standard. However, if you receive a product that is demonstrably defective, incorrectly dispatched, or damaged in transit, please contact us within 48 hours of receipt and we will investigate and arrange a replacement or refund as appropriate.',
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col divide-y divide-[#e2e8f0]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
          >
            <span className="font-semibold text-[#0f172a] text-base group-hover:text-[#1a6b58] transition-colors">
              {faq.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-[#1a6b58] transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="text-[#475569] leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
