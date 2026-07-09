"use client";

import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    id: 1,
    image: "https://cheapcustompackaging.com/images/can't%20find.png",
    alt: "Can't find a size illustration",
    title: "CAN'T FIND A SIZE YOU NEED?",
    description:
      "No worries! We customize packaging to fit your exact product dimensions. Just share the length, width, and height (L×W×D) of your item, and we'll create the perfect custom-sized box tailored just for you.",
    btnText: "Talk to Our Design Expert Now",
    href: "/getaquote",
  },
  {
    id: 2,
    image: "https://cheapcustompackaging.com/images/Request_Template-01.png",
    alt: "Request box template illustration",
    title: "Request Box Template",
    description:
      "Need a specific box template? We've got you covered. Provide your product's dimensions (L×W×D), and we'll design a custom packaging template that fits your needs perfectly — making your packaging process easier and faster.",
    btnText: "Get Free Template",
    href: "/request-template",
  },
];

export default function CustomPackagingCards() {
  return (
    <section className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-[#efefef] rounded-2xl border border-slate-200 overflow-hidden flex flex-col items-center text-center px-8 py-10 transition-all duration-300 hover:border-transparent hover:shadow-xl"
          >
            {/* Top gradient line */}
            <span className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Bottom gradient line */}
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

            {/* Illustration */}
            <div className="w-full h-56 relative mb-7 flex items-center justify-center">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-extrabold text-black tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#ffa015]">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-7 ">
              {card.description}
            </p>

            {/* CTA Button */}
            <Link
              href={card.href}
              className="inline-block px-7 py-3 rounded-full border-2 border-black text-black text-sm font-semibold transition-all duration-300 hover:bg-[#ffa015] hover:border-[#ffa015] hover:text-white hover:-translate-y-0.5"
            >
              {card.btnText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
