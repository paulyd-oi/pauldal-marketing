import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SocialProofBadge } from "@/components/site/social-proof-badge";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pauldalstudios.com"),
  title: {
    default: "Paul Dal Studio — Photography is how I pay attention",
    template: "%s — Paul Dal Studio",
  },
  description:
    "Paul Dal Studio — San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented. Available worldwide.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Paul Dal Studio",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  "@id": "https://pauldalstudios.com/#business",
  name: "Paul Dal Studio",
  description:
    "San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented since 2019. Available worldwide.",
  url: "https://pauldalstudios.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Diego",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
  priceRange: "$$",
  image:
    "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.7157,
    longitude: -117.1611,
  },
  sameAs: [
    "https://instagram.com/pauldal",
    "https://www.linkedin.com/in/paul-dal-4571443b7/",
  ],
  founder: {
    "@type": "Person",
    name: "Paul Dal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plex.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-body bg-paper text-ink min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SocialProofBadge />
        </div>
      </body>
    </html>
  );
}
