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
  const latest = await getLatestGalleryByCategory("HEADSHOTS");
  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Headshots & Personal Branding San Diego — Paul Dal Studios",
    description:
      "Professional headshots that look like you on your best day. LinkedIn portraits, personal branding shoots, polished web-ready files. San Diego based.",
    alternates: { canonical: "https://www.pauldalstudios.com/headshots" },
    openGraph: {
      title: "Headshots & Personal Branding — Paul Dal Studios",
      description:
        "Professional headshots that look like you on your best day. San Diego based.",
      url: "https://www.pauldalstudios.com/headshots",
      siteName: "Paul Dal Studios",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Headshot photography by Paul Dal Studios" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Headshots & Personal Branding — Paul Dal Studios",
      description:
        "Professional headshots that look like you on your best day. San Diego based.",
      images: [ogImage],
    },
  };
}

export default async function HeadshotsPage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("HEADSHOTS"),
    getGalleriesByCategory("HEADSHOTS"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const heroAlt = latest?.coverAlt ?? "Paul Dal Studios";
  const galleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  const galleryDisplayPhotos =
    galleryPhotos.length > 0
      ? galleryPhotos
      : [{ cfImageId: PLACEHOLDER_HERO_CF_ID, alt: "Paul Dal Studios" }];

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Headshots & Personal Branding",
      headline: "You on your best day. Not stiff corporate stock.",
      subhead:
        "Professional headshots that look like you on your best day. Whether you need a single LinkedIn portrait or a full personal-branding shoot for your website.",
      cta: { label: "Book your headshot session", href: "/book?service=headshots" },
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    intro: {
      eyebrow: "About this work",
      headline: "Easy energy, polished results.",
      paragraphs: [
        "Studio or on-location, multiple looks and setups, retouched hero images for the ones you'll use most. The session is paced; quick coaching on posture and expression keeps things from feeling stiff.",
        "Web-ready and print-ready files delivered in your inbox. Useful for LinkedIn, agency rosters, founder profiles, speaker bios — anywhere you need to look like the version of yourself you want people to meet.",
      ],
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent headshot sessions.",
      photos: galleryDisplayPhotos,
      caption: "",
    },
    finalCta: {
      headline: "Ready to book your headshot session?",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Book your headshot session", href: "/book?service=headshots" },
    },
  };

  return <LandingPageLayout content={content} />;
}
