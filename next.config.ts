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
};

export default nextConfig;
