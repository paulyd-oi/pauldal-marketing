import type { Metadata } from "next";
import { HomepageHero } from "@/components/site/homepage-hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";
import { ClosingCTA } from "@/components/site/closing-cta";
import { SectionDivider } from "@/components/site/section-divider";
import { MarqueeTestimonial } from "@/components/site/marquee-testimonial";
import { FavoritesMarquee } from "@/components/site/favorites-marquee";
import { TrustStrip } from "@/components/site/trust-strip";
import { AuthorityStrip } from "@/components/home/authority-strip";
import {
  getFeaturedHomepageGalleries,
  pickByDate,
} from "@/lib/portfolio-public";

export const revalidate = 60;

// Cache-bust query param — increment when shipping new OG image so iMessage,
// Slack, Facebook, and Twitter re-fetch instead of serving stale OG cache.
const OG_IMAGE = "/og-paul-dal.jpg?v=2";

export const metadata: Metadata = {
  title: "Paul Dal Studios — Photography is how I pay attention",
  description:
    "Paul Dal Studios — San Diego hybrid photographer and videographer. Weddings, events, business, editorial. 200+ events documented. Available worldwide.",
  alternates: { canonical: "https://pauldalstudios.com" },
  openGraph: {
    title: "San Diego Photographer & Videographer",
    description: "pauldalstudios.com",
    url: "https://pauldalstudios.com",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Paul Dal — San Diego photographer and videographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "San Diego Photographer & Videographer",
    description: "pauldalstudios.com",
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
          useAmbient
        />
      )}
      <AuthorityStrip />
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
      <TrustStrip />
      {/* Featured Work — full-bleed favorites marquee. The dark left
          panel ("He shows up early...") was placeholder copy and has
          been removed; the marquee speaks for itself across the full
          container width. AsymmetricPanel component is now unused on
          this page but kept in the codebase for potential future reuse. */}
      <section className="bg-paper">
        <FavoritesMarquee
          category="ALL"
          durationSeconds={60}
          heightPx={500}
          mobileHeightPx={320}
          direction="left"
        />
      </section>
      <SectionDivider />
      <ClosingCTA />
    </>
  );
}
