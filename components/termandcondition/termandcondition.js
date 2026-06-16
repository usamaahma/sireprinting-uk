import React from 'react';

export default function TermsAndConditions() {
  return (
    /* pt-28 md:pt-36 aur mt-8 lagane se ab header/navbar se bilkul clear safe distance ban gaya hai */
    <div className="min-h-screen bg-white text-gray-800 px-4 py-12 pt-28 md:pt-36 mt-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* CENTER-ALIGNED HEADING */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
            Terms & Conditions
          </h1>
          {/* <p className="text-sm text-gray-500">
            Last Updated: June 15, 2026
          </p> */}
        </div>

        {/* TEXT CONTENT AREA */}
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-600">
          <p>
            Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you.
          </p>

          {/* Sub Section 1 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              1. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, and service marks displayed on the site are our property or the property of other third parties. You are not permitted to use these marks without our prior written consent or the consent of such third party which may own the marks.
            </p>
          </div>

          {/* Sub Section 2 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              2. User Obligations
            </h2>
            <p>
              As a user, you agree to use the website responsibly and legally. Any unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense under the applicable state laws.
            </p>
          </div>

          {/* Sub Section 3 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              3. Limitation of Liability
            </h2>
            <p>
              The information contained in this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability.
            </p>
          </div>

          {/* Sub Section 4 */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
              4. Changes to These Terms
            </h2>
            <p>
              We reserve the right to revise these terms and conditions at any time. By using this website, you are expected to review these terms on a regular basis to ensure you understand all terms and conditions governing the use of this website.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}