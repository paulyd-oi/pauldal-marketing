import type { Metadata } from "next";
import { HomepageHero } from "@/components/site/homepage-hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";
import { ClosingCTA } from "@/components/site/closing-cta";
import { SectionDivider } from "@/components/site/section-divider";
import { MarqueeTestimonial } from "@/components/site/marquee-testimonial";
import { AsymmetricPanel } from "@/components/site/asymmetric-panel";
import {
  getFeaturedHomepageGalleries,
  pickByDate,
} from "@/lib/portfolio-public";

export const revalidate = 60;

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

export default async function Home() {
  // Direction 5 hero: full-bleed primary cover (deterministic daily
  // rotation through featuredOnHomepage galleries) + scroll-revealing
  // grid of additional covers below. Falls back to all galleries if
  // none are flagged for homepage curation.
  const homepageGalleries = await getFeaturedHomepageGalleries();
  const heroGallery =
    pickByDate(homepageGalleries) ?? homepageGalleries[0] ?? null;
  const gridGalleries = heroGallery
    ? homepageGalleries.filter((g) => g.id !== heroGallery.id).slice(0, 8)
    : [];

  return (
    <>
      {heroGallery && (
        <HomepageHero
          heroGallery={heroGallery}
          gridGalleries={gridGalleries}
        />
      )}
      <SectionDivider />
      {/* TODO: replace with real homepage testimonial */}
      <MarqueeTestimonial
        eyebrow="TAYLOR + SAM"
        quote="He doesn't shoot what's there. He shoots what mattered."
        attribution="Wedding, San Diego"
        marqueeText="CLIENT LOVE"
        bgVariant="ink"
      />
      <AboutTeaser />
      <ServicesTeaser />
      <PortfolioTeaser />
      {/* TODO: Swap to real case study when first feature is ready */}
      <AsymmetricPanel
        eyebrow="FEATURED WORK"
        pullQuote="He shows up early, watches everything, then quietly catches the moments nobody asks him to catch."
        body="Full-day documentary coverage. Photo and video by one team. Delivered in twelve days."
        ctaLabel="See more work"
        ctaHref="/portfolio"
        imageId="09079dde-3a23-4762-83e7-31fd9aab2600"
        imageAlt="Featured wedding documentary work by Paul Dal Studio"
        photoSide="right"
        panelVariant="ink"
      />
      <SectionDivider />
      <ClosingCTA />
    </>
  );
}
