// Brand Content & Commercial Photography landing page.
//
// Migrated from /business in the vertical taxonomy expansion sprint
// (April 2026). All curated copy preserved verbatim. The gallery section
// is now auto-pulled from FRAME's BRAND_CONTENT category instead of
// hardcoded — falls back to the prior curated photo IDs if zero brand
// galleries are tagged on FRAME.
//
// /business → /brand-content 308 redirect lives in next.config.ts.

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
const FALLBACK_HERO_CF_ID = "e491bf5a-ef22-4627-d5bf-450844197b00";

// Curated fallback photo IDs preserved from the prior /business page —
// used only if zero BRAND_CONTENT galleries are tagged on FRAME.
const FALLBACK_GALLERY_PHOTOS = [
  { cfImageId: "c677437a-cb68-4084-39f7-84ca10557700", alt: "Editorial brand portrait by Paul Dal Studio — studio session, San Diego" },
  { cfImageId: "00a26873-4171-4b0c-f991-867f2f1c6700", alt: "Founder portrait by Paul Dal Studio — San Diego" },
  { cfImageId: "e491bf5a-ef22-4627-d5bf-450844197b00", alt: "Brand portraits by Paul Dal Studio — Founders Series" },
  { cfImageId: "a18c37a2-5557-486f-c169-db88f53e4d00", alt: "Editorial brand story by Paul Dal Studio — Pacific coast" },
  { cfImageId: "20a2e733-d9c0-4341-ab70-37e68448b000", alt: "Brand session by Paul Dal Studio — creative agency, San Diego" },
  { cfImageId: "9dab2548-7334-4c7a-5724-8b711931dd00", alt: "Brand event coverage by Paul Dal Studio — San Diego" },
];

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const latest = await getLatestGalleryByCategory("BRAND_CONTENT");
  const heroCfId = latest?.coverCfImageId ?? FALLBACK_HERO_CF_ID;
  const ogImage = `${CF}/${heroCfId}/public`;
  return {
    title: "Brand Photography San Diego — Paul Dal Studio",
    description:
      "Brand photography and video by Paul Dal Studio. Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands. San Diego based.",
    openGraph: {
      title: "Brand Photography San Diego — Paul Dal Studio",
      description:
        "Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands. San Diego based.",
      url: "https://pauldalstudios.com/brand-content",
      siteName: "Paul Dal Studio",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Brand photography by Paul Dal Studio in San Diego" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Brand Photography San Diego — Paul Dal Studio",
      description:
        "Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands.",
      images: [ogImage],
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Brand Photography",
  provider: { "@type": "Organization", name: "Paul Dal Studio" },
  areaServed: "San Diego, CA + Worldwide",
  offers: {
    "@type": "Offer",
    priceRange: "$1,500 - $4,500+",
  },
};

export default async function BrandContentPage() {
  const [latest, all] = await Promise.all([
    getLatestGalleryByCategory("BRAND_CONTENT"),
    getGalleriesByCategory("BRAND_CONTENT"),
  ]);

  const heroCfId = latest?.coverCfImageId ?? FALLBACK_HERO_CF_ID;
  const dynamicGalleryPhotos = all.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));
  const galleryPhotos =
    dynamicGalleryPhotos.length > 0 ? dynamicGalleryPhotos : FALLBACK_GALLERY_PHOTOS;

  const content: LandingPageContent = {
    hero: {
      eyebrow: "Brand Content",
      headline: "Brand work that doesn't look like stock.",
      subhead:
        "Headshots, brand sessions, content packs, hybrid photo + video. For founders, agencies, and creator brands.",
      cta: { label: "Start your brand inquiry", href: "/book?service=brand-content" },
      photoCfImageId: heroCfId,
      photoAlt: latest?.coverAlt ?? "Brand portrait photography by Paul Dal Studio — Founders Series, San Diego",
    },
    pricingSummary: {
      cards: [
        { label: "Half-day from", value: "$1,500" },
        { label: "Full-day from", value: "$2,800" },
        { label: "Hybrid (photo + video)", value: "$4,500+" },
      ],
      note: "Hourly add-on available at $300/hr.",
    },
    intro: {
      eyebrow: "About this work",
      headline: "Brand photography is about consistency and speed.",
      paragraphs: [
        "Founders, agencies, creator brands. Modern business photography needs to keep up with how you actually work. I deliver polished imagery that reflects who you really are, not who a stock library thinks you should be.",
        "I shoot photo and video natively, on the same shoot, for one unified deliverable. Edited in 5–7 days. Optimized for web, social, press, and product launch.",
      ],
      photoCfImageId: "20a2e733-d9c0-4341-ab70-37e68448b000",
      photoAlt: "Brand session by Paul Dal Studio — Creative agency, San Diego",
    },
    gallery: {
      eyebrow: "Selected work",
      headline: "Recent brand work.",
      photos: galleryPhotos,
      caption: "",
    },
    accordion: {
      eyebrow: "What's included",
      headline: "What's included with every brand project.",
      subhead:
        "Standard across all brand packages. Content subscriptions and rush turnaround available on request.",
      items: [
        { title: "Brand discovery call", description: "Quick call to understand brand voice, use cases, and where these images will live (web, social, press, ads)." },
        { title: "Shot list + creative direction", description: "We align on the shots before we shoot. Mood boards welcome. Improvisation encouraged on the day." },
        { title: "On-location or in-studio", description: "I'll shoot wherever the brand lives: your office, on-location, or in studio if you have access." },
        { title: "Photo + video on the same shoot", description: "Hybrid native. Same setup, two unified deliverables. Saves you a separate video budget." },
        { title: "Editorial editing", description: "Every image hand-edited and color-graded for consistency across your brand library." },
        { title: "Full delivery in 5–7 days", description: "Standard turnaround. Rush available for product launches and press windows." },
        { title: "Full commercial usage rights", description: "Use the work for marketing, ads, press, web, social. No licensing restrictions." },
        { title: "Content subscription packages", description: "For brands that need ongoing content. Quarterly or monthly retainers available. Inquire for pricing." },
      ],
    },
    process: {
      eyebrow: "Process",
      headline: "How we work together.",
      subhead: "From first email to final delivery, here's what to expect.",
    },
    testimonial: {
      quote:
        "We hired Paul for our launch. He delivered 80 polished images and a 90-second brand film in five days. Half our investor deck is his work.",
      attribution: "A recent client",
      context: "Founder, San Diego SaaS company",
    },
    faqHeadlineImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
    faqItems: [
      { question: "What's included in a brand shoot?", answer: "On-location coverage, art-directed setups based on the brief, full editorial editing, online gallery delivery, and a commercial usage license for your owned channels." },
      { question: "How long until we get the deliverables?", answer: "Edited photo galleries deliver in two to three weeks. Brand video edits deliver in four to six weeks. Quick-turn social cuts available as an add-on." },
      { question: "Can we book hourly for a single shoot?", answer: "Yes. Hourly add-on coverage is available at three hundred per hour on top of any package. Useful for additional locations, talent, or product setups." },
      { question: "Do you provide a commercial license?", answer: "Yes. All business work includes a commercial usage license for owned channels (website, social, email, decks). Paid media usage is quoted separately." },
      { question: "Can you work from a brief or moodboard?", answer: "Yes. A creative brief or moodboard sharpens the shoot. If you don't have one, I can build a simple shot list from a thirty-minute discovery call." },
      { question: "Do you travel for shoots?", answer: "All of Southern California is included with no travel fee. Outside SoCal is quoted at cost." },
    ],
    finalCta: {
      headline: "Tell me about your brand.",
      subhead: "I read every inquiry personally. Reply within 24 hours.",
      cta: { label: "Start your brand inquiry", href: "/book?service=brand-content" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <LandingPageLayout content={content} />
    </>
  );
}
