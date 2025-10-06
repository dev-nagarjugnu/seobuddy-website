import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-8">
          <nav className="flex items-center space-x-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Terms & Conditions</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using SEOBuddy's services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  SEOBuddy provides search engine optimization (SEO) services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Technical SEO audits and optimization</li>
                  <li>On-page SEO services</li>
                  <li>Off-page SEO and link building</li>
                  <li>Local SEO services</li>
                  <li>SEO consulting and strategy</li>
                  <li>Performance monitoring and reporting</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the services in compliance with applicable laws</li>
                  <li>Not engage in any activity that interferes with our services</li>
                  <li>Not attempt to reverse engineer or hack our systems</li>
                  <li>Comply with all applicable website terms and policies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Payment for services is due upon receipt of invoice. We accept payment by credit card, 
                  bank transfer, or other methods as specified. Late payments may result in service suspension.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Additional services may incur additional charges</li>
                  <li>Taxes will be added where applicable</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Delivery</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We strive to deliver services within agreed timelines, but cannot guarantee specific 
                  results or rankings. SEO is a long-term process and results may vary.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Project timelines are estimates and may be subject to change</li>
                  <li>Client cooperation is required for optimal results</li>
                  <li>We provide regular progress reports and updates</li>
                  <li>Changes to project scope may affect timelines and pricing</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content, trademarks, and intellectual property on this website remain the property 
                  of SEOBuddy. You retain ownership of your website content and data.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our methodologies and tools remain our proprietary information</li>
                  <li>You grant us license to use your content for service delivery</li>
                  <li>We may use anonymized data for case studies and marketing</li>
                  <li>Portfolio examples may be shared with your permission</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Confidentiality</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We maintain strict confidentiality regarding your business information, website data, 
                  and SEO strategies. Information is shared only with authorized personnel.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  SEOBuddy shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of our services.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our liability is limited to the amount paid for services</li>
                  <li>We do not guarantee specific search rankings or traffic increases</li>
                  <li>Third-party changes may affect SEO performance</li>
                  <li>We are not responsible for website downtime or technical issues</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Either party may terminate this agreement with written notice. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to services will be discontinued</li>
                  <li>Outstanding payments become immediately due</li>
                  <li>We will provide final deliverables and reports</li>
                  <li>Confidentiality obligations continue after termination</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Any disputes arising from this agreement will be resolved through good faith negotiation. 
                  If resolution cannot be reached, disputes will be settled through binding arbitration.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  This agreement is governed by the laws of the jurisdiction where SEOBuddy is incorporated. 
                  Any legal proceedings will be brought in the appropriate courts of that jurisdiction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Continued use of services constitutes acceptance of new terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For questions about these terms, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">SEOBuddy</p>
                  <p>Email: legal@seobuddy.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 SEO Street, Digital City, DC 12345</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 