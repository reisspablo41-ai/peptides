export const metadata = {
  title: 'Terms & Conditions | Clarion Peptides',
  description: 'Terms and conditions governing use of the Clarion Peptides website and purchase of research compounds.',
}

const Section = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-[#0d2e22] font-bold text-xl mb-3 flex items-start gap-2">
      <span className="text-[#1a6b58] font-mono text-sm mt-1.5 w-6 flex-shrink-0">{number}.</span>
      {title}
    </h2>
    <div className="pl-8 text-[#475569] leading-relaxed space-y-3 text-base">{children}</div>
  </div>
)

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-[#7fd4bb] text-sm">Last updated: 6 June 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Warning banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 text-sm mb-1">Important — Research Use Only</p>
          <p className="text-amber-800 text-sm leading-relaxed">
            All products sold by Clarion Peptides are strictly for in vitro laboratory research and scientific study. They are not approved for human or veterinary use, are not medicines or dietary supplements, and must not be used in or on any biological system. By placing an order, you confirm that you understand and accept these restrictions without reservation.
          </p>
        </div>

        {/* Intro card */}
        <div className="bg-[#edf7f2] border border-[#c2ede3] rounded-xl p-6 mb-10">
          <p className="text-[#1a6b58] font-semibold text-sm mb-2">Acceptance of These Terms</p>
          <p className="text-[#334155] text-sm leading-relaxed">
            By accessing or using the Clarion Peptides website (<strong>clarionpeptides.com</strong>) or placing an order for any product, you agree to be bound by these Terms &amp; Conditions in their entirety. If you do not agree with any part of these terms, you must not use our website or place an order. These terms constitute a legally binding agreement between you and Clarion Peptides.
          </p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 sm:p-10">

          <Section number="1" title="Research Use Only — Absolute Restriction">
            <p>All peptides, compounds, and associated products listed on our website (&ldquo;Products&rdquo;) are sold <strong className="text-[#0f172a]">exclusively for in vitro laboratory research purposes</strong>. They are not intended, approved, licensed, or suitable for:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Human consumption, injection, or any form of self-administration',
                'Veterinary or agricultural use of any kind',
                'Use in clinical trials without explicit regulatory approval',
                'Administration to any biological system, including cell cultures unless conducted in a properly equipped and regulated laboratory',
                'Any purpose that contravenes applicable local, national, or international law',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">Clarion Peptides bears no liability whatsoever for any harm, injury, or legal consequence arising from use of our products outside of their intended research application. The full burden of compliance with applicable law rests with the purchaser.</p>
          </Section>

          <Section number="2" title="Purchaser Eligibility and Representations">
            <p>By placing an order with Clarion Peptides, you represent, warrant, and confirm that:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'You are at least 18 years of age.',
                'You are a qualified researcher, scientist, laboratory professional, or are acting on behalf of a recognised research institution, university, or commercial laboratory.',
                'You will use all purchased compounds solely for lawful scientific research purposes in a controlled laboratory environment.',
                'You have the knowledge, training, and equipment necessary to handle research-grade chemical compounds safely.',
                'You have reviewed all relevant safety data, literature, and regulatory guidance for the compounds you are purchasing.',
                'Your purchase and use of the Products complies with all applicable laws and regulations in your jurisdiction.',
                'You are not purchasing Products for the purpose of human or animal administration, resale as a consumer product, or any prohibited purpose.',
                'All information you provide during checkout is accurate, truthful, and up-to-date.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">We reserve the right to refuse service to any person or organisation that we believe is not complying with the above representations, or where fulfilling the order may create legal or regulatory risk.</p>
          </Section>

          <Section number="3" title="Product Information and Accuracy">
            <p>We take reasonable care to ensure that product listings — including names, purity figures, specifications, and Certificate of Analysis (COA) documents — are accurate and up-to-date. However:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Purity figures and analytical data reflect batch-specific testing conducted by independent laboratories at the time of testing. Results may vary between lots.',
                'Product descriptions are provided for informational purposes only and do not constitute scientific claims, endorsements, or guarantees of research outcomes.',
                'We do not warrant that any product is suitable for any specific research application. It is the researcher\'s responsibility to verify suitability.',
                'COA documents are issued by third-party laboratories. While we take reasonable steps to verify their authenticity, we make no independent warranty regarding their content beyond what is stated.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">We reserve the right to modify product listings, discontinue products, or correct errors at any time without prior notice.</p>
          </Section>

          <Section number="4" title="Pricing, Orders, and Payment">
            <div className="space-y-3">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Prices</p>
                <p className="text-sm">All prices are displayed in United States Dollars (USD) and exclude any applicable shipping costs, duties, taxes, or import fees, which are calculated and displayed at checkout. Prices are subject to change without notice. The price charged will be the price displayed at the time your order is confirmed.</p>
              </div>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Order Acceptance</p>
                <p className="text-sm">Submission of an order constitutes an offer to purchase. We reserve the right to accept or decline any order at our sole discretion, including but not limited to cases where a product is out of stock, the order triggers a fraud alert, payment cannot be verified, or the purchaser fails to meet eligibility requirements. An order is confirmed and accepted only when we send an order confirmation to the email address provided.</p>
              </div>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Guest Checkout</p>
                <p className="text-sm">All orders are processed as guest transactions. We do not create or require customer accounts. Your order details are associated with your email address and order reference number for fulfilment and support purposes only.</p>
              </div>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Payment Processing</p>
                <p className="text-sm">Payments are processed by secure, PCI-DSS-compliant third-party payment processors. We do not store your full card details on our servers. All payments must be received and cleared before an order is dispatched.</p>
              </div>
            </div>
          </Section>

          <Section number="5" title="Shipping, Delivery, and Risk of Loss">
            <p>We aim to dispatch all orders placed before 2:00 pm (local business hours) on the same business day. Orders placed after this time or on weekends or public holidays will be dispatched the following business day.</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Shipping is via tracked express courier. A tracking reference will be included in your dispatch notification email.',
                'Delivery estimates are provided by the carrier and are not guaranteed. We are not liable for delays caused by the carrier, adverse weather, customs processing, or other events outside our control.',
                'Risk of loss and title for Products passes to the buyer at the time we hand the order to the carrier for delivery.',
                'We package all compounds in tamper-evident, climate-appropriate packaging to minimise the risk of degradation in transit.',
                'International shipments may be subject to customs inspection, import duties, or restrictions imposed by the destination country. The buyer is solely responsible for understanding and complying with any such requirements. We are not liable for packages seized or delayed by customs.',
                'If a package is returned to us as undeliverable, we will contact you to arrange re-shipment. Additional shipping charges may apply.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="6" title="Returns, Refunds, and Replacements">
            <p>Due to the perishable, controlled, and research-grade nature of our products, <strong className="text-[#0f172a]">we do not accept returns as standard practice</strong>. Once an order has been dispatched, it cannot be cancelled or returned.</p>
            <p>We will consider a replacement or refund only in the following exceptional circumstances:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'A Product arrives visibly damaged or demonstrably compromised due to transit mishandling.',
                'An incorrect product was dispatched — i.e., you received a product you did not order.',
                'A Product is analytically verified to be materially different from the specification stated at the time of order.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">To initiate a claim, you must contact us at <a href="mailto:support@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">support@clarionpeptides.com</a> within 48 hours of receiving your order, providing your order reference, a description of the issue, and photographic evidence where applicable. We will review your claim and respond within 5 business days. Approved replacements or refunds will be processed within 10 business days.</p>
          </Section>

          <Section number="7" title="Quality, Purity, and Certificate of Analysis">
            <p>Clarion Peptides is committed to supplying research compounds of the highest verifiable quality. Every product in our catalogue:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Is synthesised using solid-phase peptide synthesis (SPPS) or equivalent validated methodology.',
                'Is independently tested by an ISO 17025-accredited third-party laboratory using HPLC and mass spectrometry.',
                'Has a Certificate of Analysis (COA) available for download on the product listing page.',
                'Meets a minimum purity standard of 99% by HPLC unless otherwise stated on the product page.',
                'Is assigned a unique lot number, allowing full traceability from synthesis to dispatch.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">COA documents are issued by independent laboratories and are provided in good faith. We do not make any further warranty beyond the accuracy of the lot-specific analytical report as issued by the testing laboratory.</p>
          </Section>

          <Section number="8" title="Prohibited Uses">
            <p>You agree not to use our website or products for any of the following purposes:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Any unlawful purpose or in violation of any applicable law or regulation',
                'Human or animal administration of any product purchased from our store',
                'Reverse engineering, reproducing, or reselling our products without authorisation',
                'Submitting false or misleading information during checkout',
                'Attempting to circumvent our fraud detection or security systems',
                'Using automated tools, scrapers, or bots to access or copy content from our website',
                'Engaging in any conduct that could damage, disable, or impair the operation of our website',
                'Misrepresenting your professional credentials or intended use of products',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="9" title="Intellectual Property">
            <p>All content on the Clarion Peptides website — including but not limited to text, product descriptions, graphics, logos, images, layout design, and the overall appearance of the site — is the property of Clarion Peptides or its licensors and is protected by applicable copyright, trademark, and intellectual property law.</p>
            <p className="text-sm">You may not reproduce, republish, distribute, or otherwise exploit any content from our website for commercial purposes without our prior written consent. Sharing links to our website, or downloading COA documents for your own research records, is permitted and encouraged.</p>
          </Section>

          <Section number="10" title="Disclaimer of Warranties">
            <p>To the fullest extent permitted by applicable law, Clarion Peptides provides its website and products on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without representations or warranties of any kind, whether express, implied, or statutory.</p>
            <p className="text-sm">We do not warrant that:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'The website will be uninterrupted, timely, secure, or error-free at all times.',
                'The results obtained from using our products will meet your specific research requirements.',
                'Any defects in the website or its content will be corrected.',
                'The website is free from viruses, malware, or other harmful components.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="11" title="Limitation of Liability">
            <p>To the fullest extent permitted by law, Clarion Peptides, its directors, officers, employees, agents, and affiliates shall not be liable for any:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Indirect, incidental, special, consequential, or punitive damages',
                'Loss of profits, revenue, data, goodwill, or business opportunity',
                'Damages arising from your use or inability to use our products or website',
                'Damages arising from the use of our products outside their intended research application',
                'Damages arising from reliance on any information published on our website',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">In any event, our total aggregate liability to you in connection with any order or claim shall not exceed the total amount paid by you for the specific order giving rise to the claim. Nothing in these terms limits liability for fraud, death, or personal injury caused by our negligence to the extent that such limitation would be unlawful.</p>
          </Section>

          <Section number="12" title="Indemnification">
            <p>You agree to indemnify, defend, and hold harmless Clarion Peptides and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, penalties, and expenses (including reasonable legal fees) arising from or related to:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Your use of our products or website in violation of these Terms',
                'Your misrepresentation of your identity, professional credentials, or intended use of Products',
                'Any use of our Products outside of their intended in vitro research application',
                'Any violation of applicable law in connection with your purchase or use of our Products',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="13" title="Regulatory Compliance">
            <p>The purchase, import, possession, and use of research-grade peptides and chemical compounds is subject to varying laws and regulations across different jurisdictions. It is the sole responsibility of the purchaser to:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'Determine whether the purchase, import, or use of a Product is lawful in your jurisdiction before placing an order.',
                'Obtain any licences, permits, or regulatory approvals required to purchase or possess the Products.',
                'Comply with all applicable local, national, and international laws, including but not limited to controlled substance regulations, import restrictions, and laboratory safety standards.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">Clarion Peptides makes no representations regarding the legality of our products in any specific jurisdiction. We reserve the right to decline orders to regions where we believe fulfilment may create legal risk.</p>
          </Section>

          <Section number="14" title="Modifications to These Terms">
            <p>We reserve the right to modify, amend, or replace these Terms &amp; Conditions at any time at our sole discretion. When we do, we will update the &ldquo;Last updated&rdquo; date at the top of this page. For material changes, we will take reasonable steps to make the change visible — for example, by placing a notice on our website.</p>
            <p className="text-sm">Your continued use of our website or the placing of an order after any changes constitutes your acceptance of the revised Terms. It is your responsibility to review this page periodically. If you do not agree with a revised version, you must cease using our website and services.</p>
          </Section>

          <Section number="15" title="Severability">
            <p>If any provision of these Terms &amp; Conditions is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be severed and the remainder of the Terms shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it enforceable while reflecting the original intent of the parties.</p>
          </Section>

          <Section number="16" title="Entire Agreement">
            <p>These Terms &amp; Conditions, together with our Privacy Policy and any other legal notices published on our website, constitute the entire agreement between you and Clarion Peptides with respect to your use of our website and purchase of our Products. They supersede all prior agreements, representations, and understandings between the parties.</p>
          </Section>

          <Section number="17" title="Governing Law and Dispute Resolution">
            <p>These Terms &amp; Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Clarion Peptides is incorporated, without regard to its conflict of law provisions.</p>
            <p className="text-sm">Any dispute arising from or in connection with these Terms or your use of our services shall first be referred to informal resolution by contacting us at <a href="mailto:support@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">support@clarionpeptides.com</a>. If the dispute cannot be resolved informally within 30 days, it shall be subject to the exclusive jurisdiction of the courts of our governing jurisdiction.</p>
          </Section>

          <Section number="18" title="Contact Us">
            <p>If you have any questions about these Terms &amp; Conditions or any other matter, please contact us:</p>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5 mt-2 space-y-1.5 text-sm">
              <p><strong className="text-[#0f172a]">General &amp; Orders:</strong> <a href="mailto:support@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">support@clarionpeptides.com</a></p>
              <p><strong className="text-[#0f172a]">Privacy &amp; Data:</strong> <a href="mailto:privacy@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">privacy@clarionpeptides.com</a></p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
