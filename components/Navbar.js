"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  Search,
  Phone,
  Mail,
  Box,
  Layers,
  Star,
  Layout,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

/* ─── DATA (unchanged from original) ─────────────────────────── */

const PRODUCTS = [
  {
    title: "CBD Packaging",
    desc: "Eco-friendly premium oil boxes",
    icon: <Box className="w-4 h-4" />,
  },
  {
    title: "Custom Boxes",
    desc: "Tailor-made structural designs",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    title: "Box Styles",
    desc: "Explore our folding library",
    icon: <Layout className="w-4 h-4" />,
  },
  {
    title: "Stickers",
    desc: "High-gloss custom decals",
    icon: <Star className="w-4 h-4" />,
  },
];

const TICKER_NEWS = [
  "⏱ Enjoy a quick turnaround time and get your orders delivered in just 7 days!",
  "🔥 Limited Time Offer: Get 20% Off on All Custom CBD Packaging!",
  "🚚 Free Shipping on orders over $500 — Order Now!",
  "✨ New Box Styles added to our Portfolio — Check them out!",
];

const GLOBAL_FLAGS = [
  { src: "/united-states.png", label: "US", href: "https://sireprinting.com/" },
  { src: "/united-kingdom.png", label: "UK", href: "/" },
];
/* ─── COLOUR TOKENS ───────────────────────────────────────────── */
// #ffa015 · black · white
const C = {
  ticker: "#000000", // black ticker strip
  primary: "#ffa015", // orange — button & active underline
  primaryHover: "#e08800", // darker orange on hover
  accent: "#ffa015", // phone number, search icon
  navText: "#111111", // near-black nav text
};

/* ─── MAIN COMPONENT ──────────────────────────────────────────── */

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  // Scroll hone par opacity 0 ho jayegi
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);
  const height = useTransform(scrollY, [0, 50], [35, 0]); // Height bhi shrink hogi

  const close = () => setActiveDropdown(null);

  return (
    <>
      {" "}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full font-sans">
        {/* ── TIER 1 · SCROLLING TICKER ───────────────────────────── */}
        <div
          className="w-full overflow-hidden  text-white"
          style={{ backgroundColor: C.ticker }}
        >
          <motion.div
            style={{ opacity, height, backgroundColor: "#000000" }}
            className="w-full overflow-hidden text-white flex items-center"
          >
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                duration: 60, // Speed adjust kari hai
                ease: "linear",
              }}
              className="whitespace-nowrap flex gap-20 text-[11px] font-semibold"
            >
              {[...TICKER_NEWS, ...TICKER_NEWS].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── TIER 2 · MAIN HEADER ────────────────────────────────── */}
        <div className="w-full bg-white border-b border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="w-full px-6 md:px-10 py-4 flex items-center gap-5">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="https://sireprinting.com/img/brand/Sire-Printing.png"
                alt="Sire Printing"
                className="h-[52px] w-auto object-contain"
              />
            </Link>

            {/* Search bar — wide, pill shaped */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full py-[10px] pl-5 pr-12 text-sm
                         text-gray-700 placeholder:text-gray-400
                         outline-none focus:border-[#ffa015] transition-colors duration-200"
              />
              <button
                aria-label="Search"
                className="absolute right-0 top-0 h-full px-5 transition-colors"
                style={{ color: C.accent }}
              >
                <Search size={18} />
              </button>
            </div>

            {/* Contact block + CTA — hidden on small screens */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <div className="text-right leading-snug">
                <p className="text-[11px] text-gray-500 font-medium">
                  Speak with a Packaging Expert
                </p>
                <a
                  href="tel:3322224710"
                  className="flex items-center justify-end gap-1.5 font-bold text-[15px] mt-0.5"
                  style={{ color: C.accent }}
                >
                  <Phone size={13} />
                  (332) 222-4710
                </a>
              </div>

              {/* Vertical divider */}
              <div className="h-10 w-px bg-gray-200" />

              <Link href="/getaquote">
                <button
                  className="text-white font-bold text-[12px] uppercase tracking-widest
                           px-7 py-[11px] transition-colors duration-200"
                  style={{ backgroundColor: C.primary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = C.primaryHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = C.primary)
                  }
                >
                  Get a Free Quote
                </button>
              </Link>
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── TIER 3 · BOTTOM NAV ─────────────────────────────────── */}
        <div className="hidden lg:block w-full bg-white border-b border-gray-200">
          <div className="w-full px-6 md:px-10 flex items-center justify-between h-[42px]">
            {/* Nav items */}
            <nav className="flex items-center h-full">
              <NavItem title="All Products" hasDropdown />

              <NavItem
                title="Categories"
                hasDropdown
                isActive={activeDropdown === "categories"}
                onEnter={() => setActiveDropdown("categories")}
                onLeave={close}
                dropdown={<CategoriesMenu />}
              />

              <NavItem title="Portfolio" />

              <NavItem title="Styles" hasDropdown />

              <NavItem title="Wholesale" />

              <NavItem title="Track Order" />
            </nav>

            {/* Global Operations */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-600 font-medium">
                Global Operations:
              </span>
              <div className="flex items-center gap-3">
                {GLOBAL_FLAGS.map((f) => (
                  <a
                    key={f.label}
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <img
                      src={f.src}
                      alt={f.label}
                      className="w-8 h-auto cursor-pointer object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE SIDEBAR ──────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[110]"
              />

              {/* Drawer */}
              <motion.aside
                key="drawer"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 210 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-white z-[120]
                         shadow-2xl flex flex-col p-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <img
                    src="https://sireprinting.com/img/brand/Sire-Printing.png"
                    alt="Sire Printing"
                    className="h-8 object-contain"
                  />
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-5 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-800">
                  {[
                    "All Products",
                    "Portfolio",
                    "Styles",
                    "Wholesale",
                    "Track Order",
                  ].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="pb-3 border-b border-gray-100 hover:text-[#ffa015] transition-colors"
                    >
                      {link}
                    </a>
                  ))}

                  {/* Categories sub-list */}
                  <div>
                    <p className="text-[10px] text-gray-400 mb-3 normal-case tracking-wider">
                      Categories
                    </p>
                    {PRODUCTS.map((p) => (
                      <a
                        key={p.title}
                        href="#"
                        className="flex items-center gap-3 py-2 pl-2 hover:text-[#ffa015] transition-colors"
                      >
                        <span style={{ color: C.accent }}>{p.icon}</span>
                        <span className="text-[11px]">{p.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-auto space-y-3 pt-8">
                  <a
                    href="tel:3322224710"
                    className="flex items-center gap-2 text-[13px] font-bold"
                    style={{ color: C.accent }}
                  >
                    <Phone size={15} /> (332) 222-4710
                  </a>
                  <a
                    href="mailto:support@sireprinting.com"
                    className="flex items-center gap-2 text-[11px] text-gray-500"
                  >
                    <Mail size={13} /> support@sireprinting.com
                  </a>
                  <button
                    className="w-full text-white font-bold text-[11px] uppercase tracking-widest
                             py-3.5 mt-1 transition-colors duration-200"
                    style={{ backgroundColor: C.primary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = C.primaryHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = C.primary)
                    }
                  >
                    Get a Free Quote
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
      <div className="h-[110px] md:h-[110px] w-full" />
    </>
  );
}

/* ─── NAV ITEM ────────────────────────────────────────────────── */

function NavItem({
  title,
  hasDropdown = false,
  isActive = false,
  onEnter,
  onLeave,
  dropdown,
}) {
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <a
        href="#"
        className={`
          flex items-center gap-[3px] px-4 h-full text-[13px] font-medium whitespace-nowrap
          transition-colors duration-150 border-b-2
          ${
            isActive
              ? "text-[#ffa015] border-[#ffa015]"
              : "text-gray-700 border-transparent hover:text-[#ffa015]"
          }
        `}
      >
        {title}
        {hasDropdown && (
          <ChevronDown
            size={13}
            className={`mt-px transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
          />
        )}
      </a>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isActive && dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full left-0 bg-white border border-gray-200
                       rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {dropdown}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── CATEGORIES MEGA-MENU ────────────────────────────────────── */

function CategoriesMenu() {
  return (
    <div className="w-[440px] p-4 grid grid-cols-2 gap-2">
      {PRODUCTS.map((item) => (
        <a
          key={item.title}
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div
            className="p-2.5 rounded-lg flex-shrink-0 transition-all duration-200
                       text-[#ffa015] bg-[#ffa015]/10
                       group-hover:bg-[#ffa015] group-hover:text-white"
          >
            {item.icon}
          </div>
          <div>
            <p className="text-[12px] font-bold text-gray-900 leading-tight">
              {item.title}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
