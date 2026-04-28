import type { Metadata } from "next";
import {
  LandingPageLayout,
  type LandingPageContent,
} from "@/components/site/landing-page-layout";
import { getGalleriesByCategory } from "@/lib/portfolio-public";

export const revalidate = 60;

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";
const OG_IMAGE = `${CF}/${HERO_CF_ID}/public`;

export const metadata: Metadata = {
  title: "Wedding Photography San Diego — Paul Dal Studio",
  description:
    "Editorial wedding photography and film by Paul Dal Studio. San Diego based, available worldwide. Two-shooter coverage, hand-edited galleries, story-first approach.",
  openGraph: {
    title: "Wedding Photography San Diego — Paul Dal Studio",
    description:
      "Editorial wedding photography and film. Two-shooter coverage, hand-edited galleries, story-first. San Diego based, available worldwide.",
    url: "https://pauldalstudios.com/weddings",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding photography by Paul Dal Studio in San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Photography San Diego — Paul Dal Studio",
    description:
      "Editorial wedding photography and film. Two-shooter coverage, hand-edited galleries, story-first.",
    images: [OG_IMAGE],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Wedding Photography",
  provider: { "@type": "Organization", name: "Paul Dal Studio" },
  areaServed: "San Diego, CA + Worldwide",
  offers: {
    "@type": "Offer",
    priceRange: "$2,500 - $7,500",
  },
};

// TODO: replace with curated wedding portfolio entries
const content: LandingPageContent = {
  hero: {
    eyebrow: "Weddings",
    headline: "The day you'll want to remember in detail.",
    subhead:
      "Editorial wedding photography and film. San Diego based, available worldwide.",
    cta: { label: "Start your wedding inquiry", href: "/book?service=weddings" },
    photoCfImageId: HERO_CF_ID,
    photoAlt:
      "Wedding photography by Paul Dal Studio — celebration captured in golden light, San Diego",
  },
  pricingSummary: {
    cards: [
      { label: "Starting from", value: "$2,500" },
      { label: "Most couples invest", value: "$3,500–$5,000" },
      { label: "Premium up to", value: "$7,500" },
    ],
    note: "Hybrid photo + video bundling available on every package.",
  },
  intro: {
    eyebrow: "About this work",
    headline: "Weddings demand presence.",
    paragraphs: [
      "I shoot in pairs when timeline allows. One photographer with you, one capturing the moments you're not in. The edit favors story over symmetry. You get the candid laughs and the quiet seconds, not just the posed lineups.",
      "I've documented over 200 events for a community of ten thousand. The same eye that watches a quiet hand-hold during a vow goes into your day. Photography is how I pay attention.",
    ],
    photoCfImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
    photoAlt: "Wedding portrait by Paul Dal Studio — Encinitas, San Diego",
  },
  gallery: {
    eyebrow: "Selected work",
    headline: "Recent weddings.",
    photos: [
      {
        cfImageId: "6c0df0fa-2eda-4511-b622-a532ab1ee000",
        alt: "Wedding photography by Paul Dal Studio — La Jolla, San Diego",
      },
      {
        cfImageId: "54e26ae7-85be-4ca8-09f6-9953ab48bb00",
        alt: "Wedding ceremony coverage by Paul Dal Studio — San Diego",
      },
      {
        cfImageId: "9dab2548-7334-4c7a-5724-8b711931dd00",
        alt: "Wedding moment captured by Paul Dal Studio — San Diego",
      },
      {
        cfImageId: "a18c37a2-5557-486f-c169-db88f53e4d00",
        alt: "Editorial wedding photography — Pacific coast, California",
      },
      {
        cfImageId: "09079dde-3a23-4762-83e7-31fd9aab2600",
        alt: "Wedding celebration by Paul Dal Studio — San Diego",
      },
      {
        cfImageId: "c677437a-cb68-4084-39f7-84ca10557700",
        alt: "Wedding portrait session by Paul Dal Studio — San Diego",
      },
    ],
    caption: "Sample work — replace with curated wedding portfolio",
  },
  accordion: {
    eyebrow: "What's included",
    headline: "What's included with every wedding.",
    subhead:
      "Standard across all wedding packages. Custom add-ons available for destination weddings or extended coverage.",
    items: [
      {
        title: "Pre-wedding consultation",
        description:
          "Discovery call to align on creative direction, timeline, and key moments. I read the brief, then we talk it through.",
      },
      {
        title: "Engagement session (optional)",
        description:
          "Available as an add-on. Get comfortable in front of the camera before the day.",
      },
      {
        title: "Day-of timeline support",
        description:
          "I help you build a realistic timeline that respects the day. No rushing, no shot lists, no stiff poses.",
      },
      {
        title: "Two-photographer coverage",
        description:
          "Available on full-day packages. One with you, one capturing the moments you're not in.",
      },
      {
        title: "Same-day teaser delivery",
        description:
          "10–15 hand-picked images delivered within 24 hours so you can share immediately.",
      },
      {
        title: "Editorial editing",
        description:
          "Every image hand-edited. No auto-presets. The edit favors story over symmetry.",
      },
      {
        title: "Online gallery + downloads",
        description:
          "Private password-protected gallery for sharing and downloading full-resolution files. Yours forever.",
      },
      {
        title: "Full delivery in 4–6 weeks",
        description:
          "Full edited gallery in 4–6 weeks. I'll give you a clear timeline upfront.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    headline: "How we work together.",
    subhead: "From first email to final gallery, here's what to expect.",
  },
  testimonial: {
    // TODO: replace with real testimonial when available
    quote:
      "Paul didn't just take photos — he was part of the day. He read the room, knew when to step back, and somehow captured every moment that mattered.",
    attribution: "A recent client",
    context: "Wedding client, San Diego",
  },
  testimonialVariant: "marquee",
  faqHeadlineImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
  faqItems: [
    {
      question: "How long until we get our photos and video?",
      answer:
        "Photo galleries deliver in two to four weeks. Wedding films deliver in six to eight weeks. You'll get a teaser of ten to fifteen favorite frames within forty-eight hours so you have something to share right away.",
    },
    {
      question: "Do you deliver raw files?",
      answer:
        "No. The edit is half the work. Raw files don't represent the final image and they don't represent how the work is meant to be seen. You'll receive high-resolution edited JPEGs with a print release.",
    },
    {
      question: "Will you help us plan the day?",
      answer:
        "Yes. I send a detailed timeline questionnaire sixty days out and we build the photo and video timeline together. I've shot a hundred plus events. I know how the day flows.",
    },
    {
      question: "How do payment plans work?",
      answer:
        "Twenty-five percent retainer locks the date. The balance splits into payments that finish two weeks before the wedding. No fees for splitting. Card or bank transfer.",
    },
    {
      question: "Do you travel?",
      answer:
        "Yes. San Diego is home base. All of Southern California is included with no travel fee. Anywhere outside SoCal, travel is quoted at cost.",
    },
    {
      question: "Can we book just photo or just video?",
      answer:
        "Yes. Photo-only and video-only are both available. The hybrid package exists because hiring two separate teams usually means they don't talk to each other and the day suffers. One team that does both keeps things calm.",
    },
  ],
  finalCta: {
    headline: "Tell me about your wedding.",
    subhead: "I read every inquiry personally. Reply within 24 hours.",
    cta: { label: "Start your wedding inquiry", href: "/book?service=weddings" },
  },
};

export default async function WeddingsPage() {
  // Auto-pull hero, intro, FAQ headline and gallery photos from FRAME's
  // WEDDING category. Each section uses a different gallery so visitors
  // see varied work. Falls back to the curated hardcoded ids if zero
  // wedding galleries are tagged on FRAME.
  const dynamicGalleries = await getGalleriesByCategory("WEDDING");
  const latestGallery = dynamicGalleries[0];
  const secondGallery = dynamicGalleries[1];
  const dynamicPhotos = dynamicGalleries.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));

  const finalContent: LandingPageContent = {
    ...content,
    hero: {
      ...content.hero,
      photoCfImageId: latestGallery?.coverCfImageId ?? content.hero.photoCfImageId,
      photoAlt: latestGallery?.coverAlt ?? content.hero.photoAlt,
    },
    intro: {
      ...content.intro,
      photoCfImageId:
        secondGallery?.coverCfImageId ?? content.intro.photoCfImageId,
      photoAlt: secondGallery?.coverAlt ?? content.intro.photoAlt,
    },
    faqHeadlineImageId:
      latestGallery?.coverCfImageId ?? content.faqHeadlineImageId,
    gallery: {
      ...content.gallery,
      photos: dynamicPhotos.length > 0 ? dynamicPhotos : content.gallery.photos,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <LandingPageLayout content={finalContent} />
    </>
  );
}
