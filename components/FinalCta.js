const PackagingSections = () => {
  const industries = [
    { icon: "🛍️", title: "Retail & E-commerce" },
    { icon: "💄", title: "Beauty & Cosmetics" },
    { icon: "🍫", title: "Food & Beverage" },
    { icon: "🕯️", title: "Candles & Lifestyle" },
    { icon: "💊", title: "Health & Wellness" },
    { icon: "📦", title: "Subscription Brands" },
  ];

  const features = [
    "Free UK Delivery",
    "FSC-Certified Materials",
    "No Setup Fees",
    "Low MOQ from 50 Units",
    "100% Satisfaction Guarantee",
  ];

  return (
    <>
      {/* Industries Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-brand-orange font-semibold text-sm">
              Industries We Serve
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              Custom Packaging Built for Every UK Industry
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              From beauty to food, from e-commerce to luxury retail — our
              custom boxes work across every sector where presentation drives
              sales.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange hover:shadow-xl"
              >
                <div className="text-5xl">{industry.icon}</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {industry.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-orange-200 bg-white p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Not sure which box suits your product?
              </h3>

              <p className="mt-2 text-slate-600">
                Our packaging experts are happy to help you choose the right
                material, finish and format for your industry.
              </p>
            </div>

            <button className="rounded-xl bg-brand-orange px-8 py-4 font-bold text-white transition hover:opacity-90">
              Talk to a Packaging Expert
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-14 text-center">

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                Ready To Grow?
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-black text-white">
                Ready to Transform Your
                <span className="block text-brand-orange">
                  Custom Packaging?
                </span>
              </h2>

              <p className="mt-6 text-lg text-slate-300">
                Thousands of UK businesses have already made the switch to
                packaging that sells. Join them and see the difference that
                purposeful, well-crafted custom boxes make to your brand,
                customer experience and bottom line.
              </p>

              <p className="mt-4 text-xl font-semibold text-white">
                Custom Packaging Boxes UK brands rely on — delivered fast,
                priced fairly and built to impress.
              </p>

              <button className="mt-8 rounded-xl bg-brand-orange px-10 py-5 text-lg font-bold text-white transition hover:scale-105">
                Get Your Free Custom Box Quote Today
              </button>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {features.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PackagingSections;