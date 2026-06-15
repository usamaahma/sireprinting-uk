import React from 'react';

export default function PrivacyPolicy() {
  return (
    /* pt-28 md:pt-36 aur mt-8 lagane se ab navbar se bilkul safe distance ban gaya hai, bilkul terms wale page ki tarah */
    <div className="min-h-screen bg-white text-gray-800 px-4 py-12 pt-28 md:pt-36 mt-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* CENTER-ALIGNED HEADING */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
            Privacy Policy
          </h1>
          {/* <p className="text-sm text-gray-500">
            Last Updated: June 15, 2026
          </p> */}
        </div>

        {/* TEXT CONTENT AREA */}
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-600">
          <p>
            We value your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          {/* Sub Section 1 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              1. Information We Collect
            </h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which you provide directly through contact forms, including your Full Name, Email Address, Phone Number, and any message details you share with us.
            </p>
          </div>

          {/* Sub Section 2 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              2. How We Use Your Information
            </h2>
            <p>
              We use your data only to respond to your inquiries, provide customer support, improve our website services, or process specific requests like free quotes or packaging estimates that you explicitly ask for.
            </p>
          </div>

          {/* Sub Section 3 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              3. Cookies and Tracking
            </h2>
            <p>
              Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your computer's hard drive that help us analyze web traffic or let you know when you visit a particular page. You can choose to accept or decline cookies in your browser settings.
            </p>
          </div>

          {/* Sub Section 4 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              4. Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees who have a business need to know.
            </p>
          </div>

          {/* Sub Section 5 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us via our official contact page or through the support channels provided on our website.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}