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
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex px-8 py-4 rounded-full bg-[#ffa015] text-[#ffffff] font-bold text-xs uppercase tracking-widest">
              Industries We Serve
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Custom Packaging Built for Every UK Industry
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="relative group bg-white p-8 text-center border border-slate-200 overflow-hidden"
              >
                {/* 4 Gradient Border Lines */}
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#f4a11d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#f4a11d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-10"></span>
                <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-black to-[#f4a11d] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10"></span>
                <span className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-black to-[#f4a11d] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10"></span>

                <div className="text-5xl mb-6">{industry.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">
                  {industry.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Expert Help Box */}
          <div className="mt-16 rounded-[2rem] border border-orange-100 bg-white p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Not sure which box suits your product?
              </h3>
              <p className="mt-2 text-slate-600 font-medium">
                Our packaging experts are ready to help you choose the right
                material and format.
              </p>
            </div>
            <button className="whitespace-nowrap rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition hover:bg-[#f4a11d]">
              Talk to a Packaging Expert
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-14 text-center">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="inline-flex rounded-full border border-[#ffa015] bg-black-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
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
