"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// IsWhite prop default mein false hai, aap <Breadcrumbs isWhite={true} /> call kar sakte hain
export default function Breadcrumbs({ isWhite = false }) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((item) => item !== "");

  if (pathSegments.length === 0) return null;

  const formatLabel = (string) => {
    return decodeURIComponent(string)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Color classes define kar rahe hain
  const textColor = isWhite ? "text-white" : "text-[#222222]";
  const subTextColor = isWhite ? "text-white/70" : "text-gray-600";
  const hoverColor = isWhite ? "hover:text-white" : "hover:text-black";
  const dividerColor = isWhite ? "text-white/40" : "text-gray-400";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`relative z-50 block w-full mx-auto pt-6 pb-2 text-lg font-medium ${textColor} clear-both bg-transparent col-span-full`}
    >
      <ol className="flex flex-wrap items-center space-x-1 md:space-x-2">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={`${subTextColor} ${hoverColor} transition-colors inline-flex items-center`}
          >
            <svg
              className="w-4 h-4 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        {/* Dynamic Segments */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="inline-flex items-center">
              <span className={`mx-2 ${dividerColor} text-xs select-none`}>
                »
              </span>

              {isLast ? (
                <span
                  className={`font-semibold ${textColor} capitalize`}
                  aria-current="page"
                >
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className={`${subTextColor} ${hoverColor} transition-colors capitalize`}
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
