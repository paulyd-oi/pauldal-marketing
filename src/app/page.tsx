import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";
import { ClosingCTA } from "@/components/site/closing-cta";
import { SectionDivider } from "@/components/site/section-divider";
import { EditorialTestimonial } from "@/components/site/editorial-testimonial";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Paul Dal Studio — Photography is how I pay attention",
  description:
    "Paul Dal Studio — San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented. Available worldwide.",
  openGraph: {
    title: "Paul Dal Studio — Photography is how I pay attention",
    description:
      "San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented. Available worldwide.",
    url: "https://pauldalstudios.com",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studio — San Diego hybrid photographer and videographer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Dal Studio — Photography is how I pay attention",
    description:
      "San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented. Available worldwide.",
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      {/* TODO: replace with real homepage testimonial */}
      <EditorialTestimonial
        quote="He doesn't shoot what's there. He shoots what mattered."
        attribution="A recent client"
        context="Wedding, San Diego — 2025"
        bgVariant="cream"
      />
      <AboutTeaser />
      <ServicesTeaser />
      <PortfolioTeaser />
      <SectionDivider />
      <ClosingCTA />
    </>
  );
}
