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
// Used as hero photo + OG image when no gallery has been tagged ENGAGEMENT
// yet. Curated brand image — same as homepage default.
const PLACEHOLDER_HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const latest = await getLatestGalleryByCategory("ENGAGEMENT");
  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Engagement Photography San Diego — Paul Dal Studios",
    description:
      "Engagement photography by Paul Dal Studios. Coast, vineyard, or somewhere meaningful — find a setting that feels true to you. San Diego based, available worldwide.",
    alternates: { canonical: "https://www.pauldalstudios.com/engagements" },
    openGraph: {
      title: "Engagement Photography San Diego — Paul Dal Studios",
      description:
        "Engagement sessions in settings that feel true to you. San Diego based, available worldwide.",
      url: "https://www.pauldalstudios.com/engagements",
      siteName: "Paul Dal Studios",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Engagement photography by Paul Dal Studios" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Engagement Photography San Diego — Paul Dal Studios",
      description:
        "Engagement sessions in settings that feel true to you. San Diego based, available worldwide.",
      images: [ogImage],
    },
  };
}

export default async function EngagementsPage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("ENGAGEMENT"),
    getGalleriesByCategory("ENGAGEMENT"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? PLACEHOLDER_HERO_CF_ID;
  const heroAlt = latest?.coverAlt ?? "Paul Dal Studios";
  const galleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Engagements",
      headline: "The chapter before your wedding day.",
      subhead:
        "An engagement session is the perfect way to celebrate this chapter together — and to get comfortable in front of the camera before your wedding day.",
      cta: { label: "Start your engagement inquiry", href: "/book?service=engagements" },
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    intro: {
      eyebrow: "About this work",
      headline: "Find a setting that feels true to you.",
      paragraphs: [
        "Coast, vineyard, or somewhere meaningful to you — we'll find a location that feels true to who you are as a couple. The session is unhurried; it's as much about getting comfortable together as it is about the photos.",
        "Most sessions run one to two hours with one or two locations. You'll get fifty-plus edited high-res photos, an online gallery, and a print release. Outfit guidance optional if you'd like a second eye on the planning.",
      ],
      photoCfImageId: heroCfId,
      photoAlt: heroAlt,
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent engagements.",
      photos: galleryPhotos,
      caption: "",
    },
    finalCta: {
      headline: "Ready to book your engagement session?",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Start your engagement inquiry", href: "/book?service=engagements" },
    },
  };

  return <LandingPageLayout content={content} />;
}
