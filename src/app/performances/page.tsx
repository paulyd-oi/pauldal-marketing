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
  const latest = await getLatestGalleryByCategory("PERFORMANCE");
  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Live Performance Photography San Diego — Paul Dal Studio",
    description:
      "Concert, worship night, tour photography by Paul Dal Studio. Comfortable in low-light venues, fast-paced sets, behind-the-scenes moments. San Diego based.",
    alternates: { canonical: "https://pauldalstudios.com/performances" },
    openGraph: {
      title: "Live Performance Photography — Paul Dal Studio",
      description:
        "Concerts, worship nights, tours. Comfortable in low-light venues. San Diego based.",
      url: "https://pauldalstudios.com/performances",
      siteName: "Paul Dal Studio",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Performance photography by Paul Dal Studio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Live Performance Photography — Paul Dal Studio",
      description:
        "Concerts, worship nights, tours. Comfortable in low-light venues. San Diego based.",
      images: [ogImage],
    },
  };
}

export default async function PerformancesPage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("PERFORMANCE"),
    getGalleriesByCategory("PERFORMANCE"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const heroAlt = latest?.coverAlt ?? "Paul Dal Studio";
  const galleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Performances",
      headline: "The energy of the stage and the connection with the audience.",
      subhead:
        "Concerts, worship nights, tours — performance photography that captures the energy of the stage and the connection with the audience.",
      cta: { label: "Book performance coverage", href: "/book?service=performances" },
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    intro: {
      eyebrow: "About this work",
      headline: "Comfortable in low-light, fast-paced sets.",
      paragraphs: [
        "Stage photography requires fast lenses, fast reflexes, and an instinct for the moment a crowd lifts its hands or a guitarist closes their eyes mid-solo. I've covered everything from intimate worship nights to full tour stops — the muscle memory is there.",
        "Full set or event coverage. Stage and audience. Behind-the-scenes access if the team allows. Gallery in two weeks. Social-media-ready edits delivered alongside full hi-res for press and promo use.",
      ],
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent performances.",
      photos: galleryPhotos,
      caption: "",
    },
    finalCta: {
      headline: "Ready to book performance coverage?",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Book performance coverage", href: "/book?service=performances" },
    },
  };

  return <LandingPageLayout content={content} />;
}
