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
// Placeholder hero — used until first FAMILY_LIFESTYLE gallery is tagged.
const PLACEHOLDER_HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const latest = await getLatestGalleryByCategory("FAMILY_LIFESTYLE");
  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Family & Lifestyle Photography San Diego — Paul Dal Studio",
    description:
      "Family sessions, lifestyle shoots, candid moments at home or in your favorite outdoor spots. Photography that captures who your family is right now.",
    openGraph: {
      title: "Family & Lifestyle Photography — Paul Dal Studio",
      description:
        "Family sessions and lifestyle shoots that capture who your family is right now. San Diego based.",
      url: "https://pauldalstudios.com/family-lifestyle",
      siteName: "Paul Dal Studio",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Family & lifestyle photography by Paul Dal Studio" }],
    },
  };
}

export default async function FamilyLifestylePage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("FAMILY_LIFESTYLE"),
    getGalleriesByCategory("FAMILY_LIFESTYLE"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const heroAlt = latest?.coverAlt ?? "Paul Dal Studio";
  const galleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  // Empty-state: when zero galleries exist, the gallery section uses the
  // placeholder hero as a single tile so the layout doesn't collapse to a
  // broken empty grid. Replace once first family/lifestyle gallery ships.
  const galleryDisplayPhotos =
    galleryPhotos.length > 0
      ? galleryPhotos
      : [{ cfImageId: PLACEHOLDER_HERO_CF_ID, alt: "Paul Dal Studio" }];

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Family & Lifestyle",
      headline: "Who your family is, right now.",
      subhead:
        "Family sessions, lifestyle shoots, candid moments at home or in your favorite outdoor spots — not just everyone looking at the camera.",
      cta: { label: "Book your family session", href: "/book?service=family-lifestyle" },
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    intro: {
      eyebrow: "About this work",
      headline: "Real connection, not stiff portraits.",
      paragraphs: [
        "Photography that captures who your family is right now — laughs, mess, real connection. Sessions usually run one to two hours at a location you choose: your home, a favorite trail, the beach, the backyard. Wherever your family feels most like itself.",
        "Fifty-plus edited photos. Online gallery. Print release. Optional outfit guidance if you'd like a second eye on the planning. Easy to book; designed to feel low-pressure.",
      ],
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent family sessions.",
      photos: galleryDisplayPhotos,
      caption: "",
    },
    finalCta: {
      headline: "Ready to book your family session?",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Book your family session", href: "/book?service=family-lifestyle" },
    },
  };

  return <LandingPageLayout content={content} />;
}
