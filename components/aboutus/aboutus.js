import React from 'react';

/* ─── Small reusable SVG icon ───────────────────────────────── */
const GoldCheck = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    style={{ color: '#D98A10' }}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/* ─── Isometric packaging illustration ─────────────────────── */
const PackagingIllustration = () => (
  <svg
    viewBox="0 0 560 440"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-lg mx-auto"
    aria-hidden="true"
  >
    <circle cx="280" cy="220" r="185" fill="#fdf8ee" opacity="0.55" />
    <ellipse cx="280" cy="390" rx="205" ry="25" fill="#fef3c7" opacity="0.45" />
    <polygon points="210,160 290,115 370,160 290,205" fill="#F5C872" />
    <polygon points="210,160 290,205 290,300 210,255" fill="#D98A10" />
    <polygon points="290,205 370,160 370,255 290,300" fill="#E8A030" />
    <line x1="290" y1="115" x2="290" y2="300" stroke="white" strokeWidth="1" opacity="0.18" />
    <line x1="252" y1="138" x2="252" y2="230" stroke="white" strokeWidth="1.5" opacity="0.28" />
    <polygon points="118,252 172,224 226,252 172,280" fill="#F0D090" />
    <polygon points="118,252 172,280 172,328 118,300" fill="#F5C872" />
    <polygon points="172,280 226,252 226,300 172,328" fill="#EDB84A" />
    <polygon points="336,262 378,240 420,262 378,284" fill="#F7E0A0" />
    <polygon points="336,262 378,284 378,322 336,300" fill="#EDB84A" />
    <polygon points="378,284 420,262 420,300 378,322" fill="#F0D090" />
    <rect x="58" y="290" width="96" height="50" rx="5" fill="#1a1a1a" />
    <rect x="118" y="272" width="46" height="32" rx="4" fill="#2d2d2d" />
    <rect x="123" y="277" width="34" height="18" rx="2" fill="#e2e8f0" />
    <circle cx="80"  cy="346" r="11" fill="#333" />
    <circle cx="132" cy="346" r="11" fill="#333" />
    <circle cx="80"  cy="346" r="5"  fill="#94a3b8" />
    <circle cx="132" cy="346" r="5"  fill="#94a3b8" />
    <rect x="394" y="112" width="56" height="140" rx="3" fill="#e2e8f0" />
    <rect x="394" y="112" width="56" height="11"  rx="3" fill="#cbd5e1" />
    {[0, 24, 48, 72, 96].map((y) => (
      <React.Fragment key={y}>
        <rect x="403" y={y + 128} width="13" height="11" rx="1" fill="#F5C872" />
        <rect x="422" y={y + 128} width="13" height="11" rx="1" fill="#F5C872" />
      </React.Fragment>
    ))}
    <circle cx="278" cy="80" r="18" fill="#D98A10" />
    <path d="M 266 92 L 278 116 L 290 92" fill="#D98A10" />
    <circle cx="278" cy="80" r="8" fill="white" />
    <circle cx="278" cy="80" r="4" fill="#D98A10" />
    <path d="M 174 278 Q 218 238 270 210" stroke="#D98A10" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.5" />
    <path d="M 378 270 Q 344 236 316 206" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
    <circle cx="78" cy="168" r="26" fill="none" stroke="#D98A10" strokeWidth="1.8" opacity="0.4" />
    <ellipse cx="78" cy="168" rx="10" ry="26" fill="none" stroke="#D98A10" strokeWidth="1.2" opacity="0.28" />
    <line x1="52" y1="168" x2="104" y2="168" stroke="#D98A10" strokeWidth="1.2" opacity="0.28" />
    <path d="M 463 248 L 463 218" stroke="#D98A10" strokeWidth="3" strokeLinecap="round" />
    <path d="M 453 228 L 463 218 L 473 228" stroke="#D98A10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="460" cy="148" r="6" fill="#D98A10" opacity="0.8" />
    <circle cx="478" cy="115" r="4" fill="#B8750D"  opacity="0.6" />
    <circle cx="92"  cy="132" r="7" fill="#1a1a1a"  opacity="0.55" />
    <circle cx="108" cy="108" r="4" fill="#333"     opacity="0.45" />
    <rect x="348" y="130" width="32" height="20" rx="4" fill="white" opacity="0.88" />
    <line x1="354" y1="138" x2="374" y2="138" stroke="#D98A10" strokeWidth="2" />
    <line x1="354" y1="144" x2="368" y2="144" stroke="#d1d5db" strokeWidth="1.5" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */
const customerBenefits = [
  {
    title: 'Convenience & Ease',
    desc: "Conveniently allow customers to browse the world's packaging selection and a full selection of packaging products and services all on one digital platform.",
  },
  {
    title: 'Cost & Time Saving',
    desc: 'Get effortless packaging services with our volume advantage, vast packaging network and data driven system. Customers get full access to competitive logistics and production costs.',
  },
  {
    title: 'Quality & Reliability',
    desc: 'Customer satisfaction guaranteed. PakFactory is rated as the most authoritative and reputable source for custom packaging. Every product and service is governed by the most stringent quality standards.',
  },
];

const partnerBenefits = [
  {
    title: 'Revenue & Potential',
    desc: "Partners gain access to the world's packaging demand and unlimited revenue potential. Partners are scaled and obtain volumes proportional to their performance.",
  },
  {
    title: 'Efficiency & Scalability',
    desc: 'Consistent stream of production ready and standardized orders that are intelligently distributed by our digital platform. Manage orders, productions and logistics with real-time statuses.',
  },
  {
    title: 'Cost Reduction & Higher Profit',
    desc: 'Automated processes that reduce unnecessary costs in marketing, sales, customer service, order management and logistics. More sustainable business model and higher profit.',
  },
];

const coreValues = [
  {
    title: 'CUSTOMER OBSESSION',
    desc: 'Our customers are our reason for existence. With unrelenting commitment and focus, we start with the customer in every decision and action we make.',
    bg: 'bg-[#D98A10] hover:bg-[#B8750D]',
  },
  {
    title: 'PARTNERSHIP FOR A SHARED FUTURE',
    desc: 'We care for and seek alignment with our customers, employees, vendors, and shareholders for life-long relationships that foster a shared future for mutual success.',
    bg: 'bg-black hover:bg-gray-900',
  },
  {
    title: 'EXCELLENCE IS NEVER-ENDING',
    desc: 'We continuously strive for the highest efficiency and effectiveness in all of our business processes and functions. One success is another beginning.',
    bg: 'bg-[#D98A10] hover:bg-[#B8750D]',
  },
  {
    title: 'INTEGRITY BUILDS TRUST',
    desc: 'Success without integrity is a failure. We always do things the right way or not do it at all. We uphold the highest standards that serve as trust in everything we do.',
    bg: 'bg-black hover:bg-gray-900',
  },
  {
    title: 'PASSION FUELS EVERYTHING',
    desc: 'We maintain and cultivate individual passion to drive innovation and evolution, while maximizing individual talent. We encourage ambitious goals to stimulate progress.',
    bg: 'bg-[#D98A10] hover:bg-[#B8750D]',
  },
  {
    title: 'CHANGE IS A CONSTANT',
    desc: 'The world is changing. We embrace change with an open mind, understanding that every change is an opportunity for improvement.',
    bg: 'bg-black hover:bg-gray-900',
  },
];

/* ─── Mission section data ──────────────────────────────────── */
const impactStats = [
  {
    number: '10K+',
    label: 'Customers Served',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '50+',
    label: 'Countries Reached',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    number: '500+',
    label: 'Trusted Partners',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
      </svg>
    ),
  },
  {
    number: '15M+',
    label: 'Boxes Delivered',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

const missionPillars = [
  {
    keyword: 'Better',
    desc: 'Raising the bar on every product with relentless quality control and innovation-first thinking.',
  },
  {
    keyword: 'Easier',
    desc: 'A single digital platform that removes friction from every step — quote to delivery.',
  },
  {
    keyword: 'Affordable',
    desc: 'Leveraging global scale so competitive pricing is the baseline, not an exception.',
  },
];

const futureCards = [
  {
    title: 'For Employees',
    desc: 'Seeking exciting opportunities with unlimited growth potential? Come take a look as we always have positions open everywhere. Come build the future of packaging with us!',
    link: 'Work With Us',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=450&fit=crop&q=80',
  },
  {
    title: 'For Investors',
    desc: 'Find our project exciting and looking into investing? We are always open to connecting and looking to improve our business with people who believe the same values we do!',
    link: "Let's Talk",
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&h=450&fit=crop&q=80',
  },
];

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE — BODY ONLY (header + footer handled separately)
═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── SECTION 1 : OUR VISION ─────────────────────────────── */}
      <section className="pt-28 md:pt-36 mt-8 pb-16 md:pb-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text side */}
          <div className="lg:w-1/2 max-w-lg">
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-[0.25em] mb-5">
              OUR VISION
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-[3.8rem] font-extrabold leading-[1.1] mb-7 text-gray-900">
              The world's go-to{' '}
              <span style={{ color: '#D98A10' }}>brand &amp; platform</span>{' '}
              for{' '}
              <span style={{ color: '#D98A10' }}>custom packaging.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              PakFactory will be the first brand that comes to mind when the world thinks about
              customized packaging. We aim to become the world's most trustworthy, well-known
              packaging brand &amp; platform.
            </p>
          </div>

          {/* Illustration side */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <PackagingIllustration />
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : FUTURE PACKAGING PLATFORM ──────────────── */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
              Future Packaging Platform
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
              PakFactory will digitize a significant portion of the packaging industry. We will
              become the world's packaging platform connecting customers with partners, serving as a
              central hub of global packaging commerce that fulfills millions of customers' needs in
              a fully-managed experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-24 max-w-5xl mx-auto">

            {/* CUSTOMERS */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FEF3E0' }}
                >
                  <svg className="w-7 h-7" style={{ color: '#D98A10' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-gray-900">
                  CUSTOMERS
                </h3>
              </div>
              <div className="space-y-6">
                {customerBenefits.map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <GoldCheck />
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
                      <p className="text-base text-gray-700 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PARTNERS */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-gray-900">
                  PARTNERS
                </h3>
              </div>
              <div className="space-y-6">
                {partnerBenefits.map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <GoldCheck />
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
                      <p className="text-base text-gray-700 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── SECTION 3 : OUR TIMELESS MISSION  (NEW — LUXURY)  ──
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-black overflow-hidden">

        {/* Decorative top gold rule */}
        <div
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #D98A10 40%, #F5C872 60%, transparent 100%)',
          }}
        />

        {/* Subtle radial gold glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(217,138,16,0.10) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-0 md:pt-28">

          {/* Label */}
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-center mb-6"
            style={{ color: '#D98A10' }}
          >
            OUR TIMELESS MISSION
          </p>

          {/* Hero headline — cream/gold, no white */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-[1.08] max-w-4xl mx-auto mb-6"
            style={{ color: '#F5E6C8' }}
          >
            To make packaging{' '}
            <span style={{ color: '#D98A10' }}>better</span>,{' '}
            <span style={{ color: '#D98A10' }}>easier</span>,
            {' '}and more{' '}
            <span style={{ color: '#D98A10' }}>affordable</span>
            {' '}—{' '}for everyone, everywhere.
          </h2>

          {/* Supporting line — muted gold, no white */}
          <p
            className="text-center text-lg max-w-2xl mx-auto mb-20 leading-relaxed"
            style={{ color: 'rgba(217,138,16,0.55)' }}
          >
            Every decision we make traces back to this single promise. It's not a tagline — it's our
            operating principle.
          </p>

          {/* ── Three mission pillars — gold dividers, no white ── */}
          <div
            className="grid md:grid-cols-3 rounded-2xl overflow-hidden mb-20"
            style={{ gap: '1px', backgroundColor: 'rgba(217,138,16,0.18)' }}
          >
            {missionPillars.map(({ keyword, desc }, i) => (
              <div
                key={keyword}
                className="bg-black p-8 md:p-10 group hover:bg-[#0A0A0A] transition-colors duration-300"
              >
                {/* Number marker */}
                <p
                  className="text-xs font-extrabold uppercase tracking-[0.25em] mb-5"
                  style={{ color: '#D98A10' }}
                >
                  0{i + 1}
                </p>
                {/* Keyword — cream, no white */}
                <h3
                  className="text-3xl font-extrabold mb-3 transition-colors duration-300"
                  style={{ color: '#F5C872' }}
                >
                  {keyword}
                </h3>
                {/* Thin gold rule */}
                <div
                  className="mb-4 h-px w-10 group-hover:w-16 transition-all duration-500"
                  style={{ background: '#D98A10' }}
                />
                {/* Description — muted gold, no white */}
                <p
                  className="leading-relaxed text-base"
                  style={{ color: 'rgba(217,138,16,0.5)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── Impact stats strip — gold dividers, no white ── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: '1px', backgroundColor: 'rgba(217,138,16,0.18)' }}
          >
            {impactStats.map(({ number, label, icon }) => (
              <div
                key={label}
                className="bg-black px-6 py-10 flex flex-col items-center text-center group hover:bg-[#0A0A0A] transition-colors duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(217,138,16,0.12)', color: '#D98A10' }}
                >
                  {icon}
                </div>
                <p
                  className="text-4xl md:text-5xl font-extrabold mb-2 leading-none"
                  style={{ color: '#D98A10' }}
                >
                  {number}
                </p>
                {/* Label — muted gold, no white */}
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'rgba(217,138,16,0.45)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative bottom gold rule */}
        <div
          className="mt-0"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #D98A10 40%, #F5C872 60%, transparent 100%)',
          }}
        />
      </section>

      {/* ── SECTION 4 : OUR CORE VALUES ───────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <p
            className="text-xs font-extrabold uppercase tracking-[0.25em] text-center mb-3"
            style={{ color: '#D98A10' }}
          >
            OUR CORE VALUES
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
            Values that path everything we do
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
            These are some of the values we live by, as a company. We work by them, too: we're
            building a platform and product we believe in knowing there is real value to be gained
            from helping people, wherever they are, simplify whatever it is that they do and bring
            more of themselves to their work.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map(({ title, desc, bg }) => (
              <div
                key={title}
                className={`${bg} text-white rounded-2xl p-8 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <h3 className="text-sm font-extrabold uppercase tracking-wider mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-base text-white/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 : OUR MANIFESTO ─────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="bg-gray-50 rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch">

            {/* Text */}
            <div className="md:w-5/12 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
                Our Manifesto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-9 text-lg">
                Our manifesto is the guiding principle and driving gut of beliefs for everything we
                do and who we set up to be, but most importantly it defines who we are.
              </p>
              <div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#D98A10] hover:bg-[#B8750D] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors duration-200 shadow-sm"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="md:w-7/12 h-72 md:h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=600&fit=crop&q=80"
                alt="Team celebrating together"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 : COME BUILD THE FUTURE ─────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
            Come build the future with us
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12 leading-relaxed text-lg">
            Whether you are here to work with us or to partner with us, we will welcome everyone with
            open arms! Join us on this exciting journey of unifying the entire packaging industry!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {futureCards.map(({ title, desc, link, img }) => (
              <div
                key={title}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">{desc}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-bold text-base hover:gap-3 transition-all duration-200"
                    style={{ color: '#D98A10' }}
                  >
                    {link}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}