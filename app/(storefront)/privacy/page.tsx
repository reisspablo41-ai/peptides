export const metadata = {
  title: 'Privacy Policy | Clarion Peptides',
  description: 'How Clarion Peptides collects, uses, stores, and protects your personal information.',
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#0d2e22] border-b border-[#1a6b58]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[#3db896] text-xs font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[#7fd4bb] text-sm">Last updated: 6 June 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro card */}
        <div className="bg-[#edf7f2] border border-[#c2ede3] rounded-xl p-6 mb-10">
          <p className="text-[#1a6b58] font-semibold text-sm mb-2">About this Policy</p>
          <p className="text-[#334155] text-sm leading-relaxed">
            This Privacy Policy describes how Clarion Peptides (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, discloses, and safeguards personal information when you visit our website or place an order. We are committed to protecting your privacy and processing your data lawfully, fairly, and transparently. Please read this policy carefully. By using our website or services you acknowledge the practices described below.
          </p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 sm:p-10">

          <Section number="1" title="Who We Are — Data Controller">
            <p>Clarion Peptides is the data controller responsible for your personal information. We determine the purposes and means by which your personal data is processed.</p>
            <p>If you have any questions about this policy or your data, you can contact our privacy team at <a href="mailto:privacy@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">privacy@clarionpeptides.com</a>. We aim to respond to all legitimate requests within 30 days of receipt.</p>
          </Section>

          <Section number="2" title="Information We Collect">
            <p>We collect the following categories of personal information:</p>
            <div className="space-y-4 mt-2">
              <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Order and Transactional Data</p>
                <p className="text-sm">Your full name, email address, telephone number, billing address, and shipping address. We also retain a record of your order — which products you purchased, quantities, and the price paid. We do not store payment card numbers or CVV codes. Payment is handled exclusively by PCI-DSS-compliant third-party processors who are bound by their own security standards.</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Communications Data</p>
                <p className="text-sm">If you contact us by email or through our contact form, we retain copies of that correspondence, including your name, email, and the content of your message, in order to respond to your enquiry and maintain a record of our interactions.</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Technical and Usage Data</p>
                <p className="text-sm">When you browse our website, our servers automatically record certain information including your IP address, browser type and version, operating system, referring URL, pages visited, and time and date of visits. This data is used solely for security, fraud prevention, and the performance of our website. It is not linked to identifiable individuals without cause.</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Testimonial and Review Data</p>
                <p className="text-sm">If you voluntarily submit a research testimonial through our website, you provide your name, professional role, and written review. By submitting, you grant us permission to display that content publicly on our website. You may request removal at any time by contacting us.</p>
              </div>
            </div>
          </Section>

          <Section number="3" title="Legal Basis for Processing">
            <p>We process personal data only where we have a lawful legal basis to do so. Depending on the context, we rely on one or more of the following:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                ['Contractual necessity', 'Processing your order, arranging delivery, and responding to order-related enquiries.'],
                ['Legitimate interests', 'Fraud prevention, website security, server log analysis, and improving our services — provided these interests do not override your fundamental rights.'],
                ['Legal obligation', 'Retaining financial and tax records as required by applicable law.'],
                ['Consent', 'Sending non-transactional communications (e.g. newsletters) — only if you have explicitly opted in. You may withdraw consent at any time.'],
              ].map(([basis, desc]) => (
                <li key={basis as string} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#0f172a]">{basis}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="4" title="How We Use Your Information">
            <p>Your personal data is used exclusively for the following purposes:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'To process, fulfil, and confirm your orders',
                'To dispatch and track your shipment and communicate delivery updates',
                'To respond to customer service enquiries, complaints, or support requests',
                'To investigate and prevent fraudulent transactions or unauthorised access',
                'To comply with our legal and regulatory obligations, including financial record-keeping',
                'To send transactional communications such as order confirmations and shipping notifications',
                'To maintain the security and operational performance of our website and infrastructure',
                'To enforce our Terms of Service and other agreements',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">We will never use your information for unrelated marketing without your explicit consent, and we will never sell, rent, or otherwise commercially exploit your personal data to third parties.</p>
          </Section>

          <Section number="5" title="Cookies and Tracking Technologies">
            <p>Our website uses a minimal number of cookies strictly necessary for its operation. We do not use advertising, retargeting, or cross-site tracking cookies.</p>
            <div className="space-y-3 mt-2">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Session Cookies</p>
                <p className="text-sm">Temporary cookies used to maintain the state of your shopping cart during a single session. These expire when you close your browser.</p>
              </div>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">LocalStorage (Cart Persistence)</p>
                <p className="text-sm">Your cart contents are stored in your browser&apos;s local storage so items persist between visits. This data never leaves your device and is never transmitted to our servers until you place an order.</p>
              </div>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                <p className="font-semibold text-[#0f172a] text-sm mb-1">Authentication Cookies</p>
                <p className="text-sm">Secure, httpOnly session cookies used exclusively for our internal administrative area. These are not set for regular site visitors and expire after 8 hours.</p>
              </div>
            </div>
            <p className="text-sm mt-3">You can disable cookies in your browser settings. Disabling session cookies may impair cart functionality but will not prevent you from browsing the site.</p>
          </Section>

          <Section number="6" title="How We Share Your Information">
            <p>We share personal data only with the following categories of third parties, and only to the extent necessary to fulfil our services:</p>
            <div className="space-y-3 mt-2">
              {[
                { title: 'Shipping and Fulfilment Partners', body: 'Your name, address, and contact details are shared with our logistics and courier partners to arrange delivery of your order. These partners process your data solely for delivery purposes and are prohibited from using it for any other purpose.' },
                { title: 'Payment Processors', body: 'Payment transactions are handled by PCI-DSS-compliant third-party processors. We do not receive or store your full card details. The payment processor may retain transaction records in accordance with their own privacy policies.' },
                { title: 'Email Service Providers', body: 'Transactional emails (order confirmations, shipping notifications) are sent via a third-party email delivery provider. Your email address and order details are transmitted to that provider solely for this purpose.' },
                { title: 'Cloud Infrastructure', body: 'Our database and file storage are hosted on Supabase, a cloud infrastructure provider operating in compliance with SOC 2 and other security standards. Your data is stored on their encrypted servers.' },
                { title: 'Legal and Regulatory Authorities', body: 'We may disclose personal data if required to do so by law, court order, or a legitimate request from a competent regulatory authority. We will notify you of any such disclosure where we are legally permitted to do so.' },
              ].map(({ title, body }) => (
                <div key={title} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                  <p className="font-semibold text-[#0f172a] text-sm mb-1">{title}</p>
                  <p className="text-sm">{body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-3 font-medium text-[#0f172a]">We do not sell, rent, lease, or otherwise commercially share your personal data with any third party for their own marketing or commercial purposes.</p>
          </Section>

          <Section number="7" title="International Data Transfers">
            <p>Our infrastructure providers may process data in jurisdictions outside your country of residence. Where personal data is transferred internationally, we ensure that appropriate safeguards are in place — such as Standard Contractual Clauses approved by relevant data protection authorities — to maintain the same level of protection required under applicable privacy law.</p>
            <p className="text-sm">If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland and have concerns about international transfers of your data, please contact us at <a href="mailto:privacy@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">privacy@clarionpeptides.com</a>.</p>
          </Section>

          <Section number="8" title="No Customer Accounts">
            <p>Clarion Peptides operates exclusively on a guest checkout model. We do not create, maintain, or require persistent customer accounts. You are not required to register with us to browse products or place an order.</p>
            <p>Order records are stored in our secure database for fulfilment and legal record-keeping only. There is no publicly accessible profile, login portal, or user dashboard for customers. This design decision minimises the amount of personal data we hold and reduces the risk surface associated with account-based systems.</p>
          </Section>

          <Section number="9" title="Data Retention">
            <p>We retain personal data for the minimum period necessary for the purpose for which it was collected, subject to the following:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                ['Order records', 'Retained for 7 years to comply with tax, accounting, and financial regulation requirements.'],
                ['Customer service correspondence', 'Retained for 3 years or until the matter is resolved, whichever is shorter.'],
                ['Server and access logs', 'Retained for 90 days for security and diagnostic purposes, then deleted.'],
                ['Testimonial submissions', 'Retained indefinitely while displayed on the site; removed upon written request.'],
              ].map(([cat, desc]) => (
                <li key={cat as string} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#0f172a]">{cat}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">When data is no longer required, it is securely deleted or anonymised in accordance with our data retention schedule.</p>
          </Section>

          <Section number="10" title="Your Rights">
            <p>Subject to applicable data protection law, you have the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {[
                { right: 'Access', desc: 'Request a copy of the personal data we hold about you.' },
                { right: 'Rectification', desc: 'Request correction of inaccurate or incomplete data.' },
                { right: 'Erasure', desc: 'Request deletion of your data, subject to legal retention obligations.' },
                { right: 'Restriction', desc: 'Request that we limit processing of your data in certain circumstances.' },
                { right: 'Portability', desc: 'Request your data in a structured, machine-readable format.' },
                { right: 'Objection', desc: 'Object to processing based on legitimate interests.' },
                { right: 'Withdraw Consent', desc: 'Withdraw consent for any processing based on consent, at any time.' },
                { right: 'Complaint', desc: 'Lodge a complaint with your local data protection supervisory authority.' },
              ].map(({ right, desc }) => (
                <div key={right} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3">
                  <p className="font-semibold text-[#0f172a] text-sm">{right}</p>
                  <p className="text-xs text-[#64748b] mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-3">To exercise any of these rights, contact us at <a href="mailto:privacy@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">privacy@clarionpeptides.com</a>. We will respond within 30 days. We may need to verify your identity before processing a request.</p>
          </Section>

          <Section number="11" title="Security Measures">
            <p>We implement a range of technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration:</p>
            <ul className="list-none space-y-2 mt-2">
              {[
                'All data transmitted between your browser and our servers is encrypted using TLS 1.2 or higher (HTTPS).',
                'Our database enforces row-level security (RLS) policies ensuring that only authorised processes can access customer records.',
                'Administrative access to the backend is protected by a secure session cookie and password authentication, with no public-facing registration.',
                'Database credentials and service keys are stored as environment variables and are never committed to source code.',
                'We conduct periodic reviews of our security practices and update our infrastructure in response to known vulnerabilities.',
                'Payment data is never stored on our servers — it is transmitted directly to our PCI-DSS-compliant payment processor.',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1a6b58] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-3">No method of electronic transmission or storage is 100% secure. While we use commercially reasonable precautions, we cannot guarantee absolute security. In the event of a data breach that is likely to result in a risk to your rights, we will notify you as required by applicable law.</p>
          </Section>

          <Section number="12" title="Children's Privacy">
            <p>Our products are research compounds intended solely for use by qualified scientific professionals. Our website and services are not directed at, and we do not knowingly collect personal data from, individuals under the age of 18. If we become aware that we have inadvertently collected personal data from a minor, we will delete it promptly.</p>
          </Section>

          <Section number="13" title="Third-Party Links">
            <p>Our website may contain links to third-party websites, including laboratory report portals, research databases, or partner organisations. This Privacy Policy does not apply to those external sites. We are not responsible for the privacy practices of third-party websites and encourage you to review their privacy policies before providing any personal information.</p>
          </Section>

          <Section number="14" title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or service offerings. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. For material changes, we will take reasonable steps to notify affected users — for example, by placing a notice on our website.</p>
            <p className="text-sm">Your continued use of our website after any changes constitutes your acceptance of the updated policy. We encourage you to review this page periodically.</p>
          </Section>

          <Section number="15" title="Contact and Complaints">
            <p>For any privacy-related questions, requests, or concerns, please contact us:</p>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5 mt-2 space-y-1.5 text-sm">
              <p><strong className="text-[#0f172a]">Email:</strong> <a href="mailto:privacy@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">privacy@clarionpeptides.com</a></p>
              <p><strong className="text-[#0f172a]">General enquiries:</strong> <a href="mailto:support@clarionpeptides.com" className="text-[#1a6b58] underline underline-offset-2">support@clarionpeptides.com</a></p>
            </div>
            <p className="text-sm mt-3">If you are based in the UK or EEA and are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority — for example, the Information Commissioner&apos;s Office (ICO) in the UK at <span className="font-mono text-xs">ico.org.uk</span>.</p>
          </Section>

        </div>
      </div>
    </div>
  )
}
