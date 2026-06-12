import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Vertical taxonomy expansion sprint (April 2026): the /business
        // landing page was migrated to /brand-content and the /business
        // route directory was deleted. Permanent redirect preserves SEO
        // value of any inbound /business links (still indexed in Google,
        // referenced from older share copy, etc.).
        source: "/business",
        destination: "/brand-content",
        permanent: true,
      },
    ];
  },
  // Baseline security headers. CSP is intentionally NOT set here — it
  // needs an inventory pass for the Meta Pixel inline init script and
  // framer-motion / gsap inline style fingerprints. Tracked as future
  // work alongside the oxblood → brand token rename.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
