import Link from 'next/link';

export default function CancellationRefund() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-8">
          <nav className="flex items-center space-x-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Cancellation & Refund Policy</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Cancellation & Refund Policy</h1>
          <p className="text-lg text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Overview Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At SEOBuddy, we strive to provide exceptional SEO services and ensure complete customer 
                  satisfaction. This policy outlines our cancellation and refund procedures to ensure 
                  transparency and fairness for all our clients.
                </p>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Service Cancellation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may cancel your service at any time with written notice</li>
                  <li>Email cancellations to: support@seobuddy.com</li>
                  <li>Phone cancellations: +1 (555) 123-4567</li>
                  <li>Cancellation takes effect at the end of the current billing period</li>
                  <li>We will provide all completed work and reports upon cancellation</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 mb-3 mt-6">Project Cancellation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ongoing projects may be cancelled with 30 days written notice</li>
                  <li>You will be charged for work completed up to the cancellation date</li>
                  <li>Any prepaid amounts for incomplete work will be refunded</li>
                  <li>We will deliver all completed deliverables and reports</li>
                </ul>
              </div>
            </section>

            {/* Refund Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Policy</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Eligible for Refunds</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prepaid services not yet delivered</li>
                  <li>Technical issues preventing service delivery</li>
                  <li>Service cancellation within 7 days of purchase</li>
                  <li>Failure to meet agreed service standards</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 mb-3 mt-6">Not Eligible for Refunds</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Services already delivered and completed</li>
                  <li>Work in progress beyond 7 days from purchase</li>
                  <li>Client dissatisfaction with search engine results (SEO is not guaranteed)</li>
                  <li>Changes in client business circumstances</li>
                  <li>Violation of our terms of service</li>
                </ul>
              </div>
            </section>

            {/* Refund Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Process</h2>
              <div className="space-y-4 text-gray-700">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Submit refund request via email to support@seobuddy.com</li>
                  <li>Include your account details and reason for refund</li>
                  <li>We will review your request within 3-5 business days</li>
                  <li>Approved refunds will be processed within 7-10 business days</li>
                  <li>Refunds will be issued to the original payment method</li>
                </ol>
              </div>
            </section>

            {/* Service-Specific Policies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service-Specific Policies</h2>
              <div className="space-y-6 text-gray-700">
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">SEO Audits</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full refund if audit not delivered within 7 days</li>
                    <li>Partial refund if audit is incomplete or substandard</li>
                    <li>No refund once audit is delivered and reviewed</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ongoing SEO Services</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pro-rated refund for unused portion of billing period</li>
                    <li>30-day notice required for service cancellation</li>
                    <li>All completed work and reports provided upon cancellation</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Consulting Services</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full refund if session cancelled 24+ hours in advance</li>
                    <li>50% refund if cancelled 2-24 hours in advance</li>
                    <li>No refund for same-day cancellations</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Training & Workshops</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full refund if cancelled 7+ days in advance</li>
                    <li>50% refund if cancelled 3-7 days in advance</li>
                    <li>No refund for cancellations within 3 days</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you disagree with a refund decision, we encourage open communication to resolve 
                  the issue. You may:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request a review by our management team</li>
                  <li>Provide additional documentation or evidence</li>
                  <li>Request mediation or alternative dispute resolution</li>
                  <li>Contact relevant consumer protection agencies if necessary</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For cancellation requests, refund inquiries, or policy questions:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">SEOBuddy Support Team</p>
                  <p>Email: support@seobuddy.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                  <p>Address: 123 SEO Street, Digital City, DC 12345</p>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  This policy may be updated periodically. We will notify clients of significant 
                  changes via email. Continued use of our services constitutes acceptance of updated policies.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 