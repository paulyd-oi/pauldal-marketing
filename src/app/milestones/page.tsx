import type { Metadata } from "next";
import {
  LandingPageLayout,
  type LandingPageContent,
} from "@/components/site/landing-page-layout";
import {
  getGalleriesByCategory,
  getLatestGalleryByCategory,
} from "@/lib/portfolio-public";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const PLACEHOLDER_HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const latest = await getLatestGalleryByCategory("MILESTONE_CELEBRATION");
  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Milestone Celebration Photography San Diego — Paul Dal Studios",
    description:
      "Quinceañera, Sweet 16, milestone birthday photography by Paul Dal Studios. Cinematic coverage that captures the joy, the family, the details. San Diego based.",
    alternates: { canonical: "https://pauldalstudios.com/milestones" },
    openGraph: {
      title: "Milestone Celebration Photography — Paul Dal Studios",
      description:
        "Quinceañeras, Sweet 16s, milestone birthdays. Cinematic coverage. San Diego based.",
      url: "https://pauldalstudios.com/milestones",
      siteName: "Paul Dal Studios",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Milestone celebration photography by Paul Dal Studios" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Milestone Celebration Photography — Paul Dal Studios",
      description:
        "Quinceañeras, Sweet 16s, milestone birthdays. Cinematic coverage. San Diego based.",
      images: [ogImage],
    },
  };
}

export default async function MilestonesPage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("MILESTONE_CELEBRATION"),
    getGalleriesByCategory("MILESTONE_CELEBRATION"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const heroAlt = latest?.coverAlt ?? "Paul Dal Studios";
  const galleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Milestone Celebrations",
      headline: "The celebrations you spent months planning.",
      subhead:
        "Quinceañeras, Sweet 16s, milestone birthdays — life's biggest celebrations deserve photography as memorable as the moment itself.",
      cta: { label: "Plan your celebration coverage", href: "/book?service=milestones" },
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    intro: {
      eyebrow: "About this work",
      headline: "Cinematic coverage that captures the joy.",
      paragraphs: [
        "Family portraits, candid moments on the dance floor, the small details that took months to plan — milestone celebrations have so many threads, and the goal is to weave them together into a complete story you'll want to revisit.",
        "Four to six hours of coverage typically. Online gallery delivered in three weeks. Full hi-res downloads with a print release for everything in the family. Custom durations available for multi-day celebrations.",
      ],
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent celebrations.",
      photos: galleryPhotos,
      caption: "",
    },
    finalCta: {
      headline: "Ready to plan your celebration coverage?",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Plan your celebration coverage", href: "/book?service=milestones" },
    },
  };

  return <LandingPageLayout content={content} ambientCategory="ALL" />;
}
