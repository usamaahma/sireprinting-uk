// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   serverExternalPackages: ["mongoose"],

//   // Turbopack ko temporarily disable kar rahe hain kyunki yeh issue de raha hai
//   turbopack: {
//     // empty for now
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com", // Standard Cloudinary host
//       },
//       {
//         protocol: "https",
//         hostname: "images.cloudinary.com", // Used by some older Cloudinary setups
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],

  // Turbopack ko temporarily disable kar rahe hain kyunki yeh issue de raha hai
  turbopack: {
    // empty for now
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.cloudinary.com",
      },
      // Yahan humne naya hostname add kar diya hai
      {
        protocol: "https",
        hostname: "cheapcustompackaging.com",
      },
    ],
  },
};

export default nextConfig;
