import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-slate-200 pt-20 pb-10 mt-auto font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <Image
            src="/logos/Sire-Printing-UK-Logo-White.svg"
            alt="Sire Printing UK"
            width={220}
            height={60}
            priority
            className="h-12 lg:h-14 w-auto"
          />
          <div className="relative group max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-black text-white py-3 px-4 border border-slate-800 focus:border-[#ffa015] focus:outline-none transition-colors"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#ffa015] hover:bg-[#e08d13] text-white transition-colors">
              ➔
            </button>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Subscribe to our newsletter for exclusive packaging trends, product
            updates, and industry insights.
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h4 className="text-[#ffa015] font-bold uppercase text-xs mb-6 tracking-[0.2em]">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3 hover:text-white transition-colors">
              <span className="text-[#ffa015]">📞</span> (332) 222-4710
            </li>
            <li className="flex items-start gap-3 hover:text-white transition-colors">
              <span className="text-[#ffa015]">✉️</span>{" "}
              support@sireprinting.com
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ffa015]">📍</span> 626 92nd Street
              Brooklyn NY 11220
            </li>
            <li className="flex items-start gap-3 text-[#ffa015] font-semibold">
              <span>🚚</span> 100% Free Shipping USA
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-[#ffa015] font-bold uppercase text-xs mb-6 tracking-[0.2em]">
            Hot Selling
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {[
              "Kraft Paper Boxes",
              "Custom Retail",
              "Cardboard Boxes",
              "Christmas Boxes",
              "Display Boxes",
              "Woven Labels",
            ].map((link) => (
              <li
                key={link}
                className="hover:text-[#ffa015] hover:translate-x-1 transition-all cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Useful Links */}
        <div>
          <h4 className="text-[#ffa015] font-bold uppercase text-xs mb-6 tracking-[0.2em]">
            Useful Links
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {[
              { name: "About Us", path: "/about" },
              { name: "Contact Us", path: "/contactus" },
              { name: "Portfolio", path: "/portfolio" },
              { name: "Blogs", path: "/blogs" },
              { name: "Privacy Policy", path: "/privacypolicy" },
              { name: "Terms & Conditions", path: "/termsandconditions" },
            ].map((link) => (
              <li
                key={link.name}
                className="hover:text-[#ffa015] transition-colors"
              >
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-slate-900 flex justify-center items-center text-[10px] text-slate-600 uppercase tracking-widest">
        <p>Copyright © 2011 - 2026 Sire Printing | All Rights Reserved</p>
      </div>
    </footer>
  );
}
