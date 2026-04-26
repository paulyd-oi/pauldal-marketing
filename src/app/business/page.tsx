import type { Metadata } from "next";
import {
  LandingPageLayout,
  type LandingPageContent,
} from "@/components/site/landing-page-layout";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const HERO_CF_ID = "e491bf5a-ef22-4627-d5bf-450844197b00";
const OG_IMAGE = `${CF}/${HERO_CF_ID}/public`;

export const metadata: Metadata = {
  title: "Brand Photography San Diego — Paul Dal Studio",
  description:
    "Brand photography and video by Paul Dal Studio. Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands. San Diego based.",
  openGraph: {
    title: "Brand Photography San Diego — Paul Dal Studio",
    description:
      "Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands. San Diego based.",
    url: "https://pauldalstudios.com/business",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Brand photography by Paul Dal Studio in San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Photography San Diego — Paul Dal Studio",
    description:
      "Headshots, brand sessions, hybrid photo + video for founders, agencies, creator brands.",
    images: [OG_IMAGE],
  },
};

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

// TODO: replace with curated business portfolio (headshots, brand, product, lifestyle)
const content: LandingPageContent = {
  hero: {
    eyebrow: "Business",
    headline: "Brand work that doesn't look like stock.",
    subhead:
      "Headshots, brand sessions, content packs, hybrid photo + video. For founders, agencies, and creator brands.",
    cta: { label: "Start your brand inquiry", href: "/book?service=business" },
    photoCfImageId: HERO_CF_ID,
    photoAlt:
      "Brand portrait photography by Paul Dal Studio — Founders Series, San Diego",
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
      "Founders, agencies, creator brands — modern business photography needs to keep up with how you actually work. I deliver polished imagery that reflects who you really are, not who a stock library thinks you should be.",
      "I shoot photo and video natively, on the same shoot, for one unified deliverable. Edited in 5–7 days. Optimized for web, social, press, and product launch.",
    ],
    photoCfImageId: "20a2e733-d9c0-4341-ab70-37e68448b000",
    photoAlt: "Brand session by Paul Dal Studio — Creative agency, San Diego",
  },
  gallery: {
    eyebrow: "Selected work",
    headline: "Recent brand work.",
    photos: [
      {
        cfImageId: "c677437a-cb68-4084-39f7-84ca10557700",
        alt: "Editorial brand portrait by Paul Dal Studio — studio session, San Diego",
      },
      {
        cfImageId: "00a26873-4171-4b0c-f991-867f2f1c6700",
        alt: "Founder portrait by Paul Dal Studio — San Diego",
      },
      {
        cfImageId: "e491bf5a-ef22-4627-d5bf-450844197b00",
        alt: "Brand portraits by Paul Dal Studio — Founders Series",
      },
      {
        cfImageId: "a18c37a2-5557-486f-c169-db88f53e4d00",
        alt: "Editorial brand story by Paul Dal Studio — Pacific coast",
      },
      {
        cfImageId: "20a2e733-d9c0-4341-ab70-37e68448b000",
        alt: "Brand session by Paul Dal Studio — creative agency, San Diego",
      },
      {
        cfImageId: "9dab2548-7334-4c7a-5724-8b711931dd00",
        alt: "Brand event coverage by Paul Dal Studio — San Diego",
      },
    ],
    caption: "Sample work — replace with curated brand portfolio",
  },
  accordion: {
    eyebrow: "What's included",
    headline: "What's included with every brand project.",
    subhead:
      "Standard across all brand packages. Content subscriptions and rush turnaround available on request.",
    items: [
      {
        title: "Brand discovery call",
        description:
          "Quick call to understand brand voice, use cases, and where these images will live (web, social, press, ads).",
      },
      {
        title: "Shot list + creative direction",
        description:
          "We align on the shots before we shoot. Mood boards welcome. Improvisation encouraged on the day.",
      },
      {
        title: "On-location or in-studio",
        description:
          "I'll shoot wherever the brand lives — your office, on-location, or in studio if you have access.",
      },
      {
        title: "Photo + video on the same shoot",
        description:
          "Hybrid native. Same setup, two unified deliverables. Saves you a separate video budget.",
      },
      {
        title: "Editorial editing",
        description:
          "Every image hand-edited and color-graded for consistency across your brand library.",
      },
      {
        title: "Full delivery in 5–7 days",
        description:
          "Standard turnaround. Rush available for product launches and press windows.",
      },
      {
        title: "Full commercial usage rights",
        description:
          "Use the work for marketing, ads, press, web, social — no licensing restrictions.",
      },
      {
        title: "Content subscription packages",
        description:
          "For brands that need ongoing content — quarterly or monthly retainers available. Inquire for pricing.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    headline: "How we work together.",
    subhead: "From first email to final delivery, here's what to expect.",
  },
  testimonial: {
    // TODO: replace with real testimonial when available
    quote:
      "We hired Paul for our launch. He delivered 80 polished images and a 90-second brand film in five days. Half our investor deck is his work.",
    attribution: "A recent client",
    context: "Founder, San Diego SaaS company",
  },
  finalCta: {
    headline: "Tell me about your brand.",
    subhead: "I read every inquiry personally. Reply within 24 hours.",
    cta: { label: "Start your brand inquiry", href: "/book?service=business" },
  },
};

export default function BusinessPage() {
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
