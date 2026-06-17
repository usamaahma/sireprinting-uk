import React from "react";

export default function ContentSection() {
  return (
    <div>
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-brand-orange">
              How It Works
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              From Idea to Your UK Door in 3 Simple Steps
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              You focus on your business. We handle everything else.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange hover:shadow-xl">
              <div className="absolute right-4 top-4 text-6xl font-black text-slate-100">
                01
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange text-xl font-bold text-white">
                01
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Choose Your Box Style
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Pick from our full range of custom box types, sizes and
                materials — or ask us to suggest the right fit for your product.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange hover:shadow-xl">
              <div className="absolute right-4 top-4 text-6xl font-black text-slate-100">
                02
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange text-xl font-bold text-white">
                02
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Share Your Design
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Upload your artwork, use our free design support, or start from
                scratch with our in-house creative team.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange hover:shadow-xl">
              <div className="absolute right-4 top-4 text-6xl font-black text-slate-100">
                03
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange text-xl font-bold text-white">
                03
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                We Print, Pack & Deliver
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Once approved, we produce your custom boxes and dispatch them
                free to any UK address — usually within 6 to 10 working days.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-xl bg-brand-orange px-8 py-4 font-bold text-white transition hover:scale-105">
              Start Your Order Today
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Side: Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block bg-orange-100 text-brand-orange font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                Premium Quality Since 2010
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                The <span className="text-brand-orange">Custom Packaging</span>{" "}
                Partner <span className="text-brand-orange">UK </span> Brands
                Actually Trust
              </h2>

              <div className="w-20 h-2 bg-brand-orange rounded-full"></div>
              <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
                    <div className="text-3xl md:text-4xl font-black text-brand-orange">
                      500+
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      UK Brands Served
                    </p>
                  </div>

                  <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
                    <div className="text-3xl md:text-4xl font-black text-brand-orange">
                      15+
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      Years in Business
                    </p>
                  </div>

                  <div className="p-6 text-center md:border-r border-slate-200">
                    <div className="text-3xl md:text-4xl font-black text-brand-orange">
                      4.9★
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      Average Rating
                    </p>
                  </div>

                  <div className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-black text-brand-orange">
                      100%
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      FSC-Certified
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  We started <strong>Sire Printing</strong>, with a single
                  belief that great packaging should not be a luxury reserved
                  for big brands. For over 15 years, we have helped hundreds of
                  UK businesses turn ordinary products into branded experiences
                  people remember.
                </p>
                <p>
                  Every box we produce goes through a rigorous quality check
                  before it leaves our facility. Whether you are ordering 50
                  units for a product launch or 5,000 for peak season, every
                  single box gets the same level of attention and craftsmanship.
                </p>
                <p>
                  {" "}
                  We use FSC-certified materials as standard, because the UK
                  market cares about sustainability and so do we. Our print
                  technology gives you sharp, vivid results across every run —
                  from matte and gloss lamination to spot UV and foil finishing.
                </p>
                <p>
                  No pushy sales calls. No hidden setup fees. Just
                  straightforward, honest packaging that does what it promises.
                </p>
              </div>

              {/* Feature List (Quick Wins) */}
            </div>

            {/* Right Side: Image with Decorative Elements */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src="https://oxopackaging.com/assets/images/custom-kraft-brown-takeout-boxes.webp"
                  alt="Sire Printing Workshop"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Background Decorative Boxes (Design Feel) */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-3xl -z-10 rotate-12"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-100 rounded-3xl -z-10 -rotate-6 border border-slate-200"></div>

              {/* Stats Badge */}
              <div className="absolute bottom-10 -right-5 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-20">
                <div className="text-3xl font-black text-brand-orange">
                  100%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
