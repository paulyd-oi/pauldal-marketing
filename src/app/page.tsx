import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";
import { ClosingCTA } from "@/components/site/closing-cta";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Paul Dal Studio — San Diego hybrid photographer + videographer",
  description:
    "Weddings, events, business, editorial. San Diego based, available worldwide.",
  openGraph: {
    title: "Paul Dal Studio — San Diego hybrid photographer + videographer",
    description:
      "Weddings, events, business, editorial. San Diego based, available worldwide.",
    url: "https://pauldalstudios.com",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Dal Studio — San Diego hybrid photographer + videographer",
    description:
      "Weddings, events, business, editorial. San Diego based, available worldwide.",
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <PortfolioTeaser />
      <ClosingCTA />
    </>
  );
}
