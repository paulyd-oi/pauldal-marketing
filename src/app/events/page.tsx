import type { Metadata } from "next";
import {
  LandingPageLayout,
  type LandingPageContent,
} from "@/components/site/landing-page-layout";
import { getGalleriesByCategory } from "@/lib/portfolio-public";

export const revalidate = 60;

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const HERO_CF_ID = "54e26ae7-85be-4ca8-09f6-9953ab48bb00";
const OG_IMAGE = `${CF}/${HERO_CF_ID}/public`;

export const metadata: Metadata = {
  title: "Event Photography San Diego — Paul Dal Studio",
  description:
    "Live event photography by Paul Dal Studio. Corporate events, milestone birthdays, non-profit galas, brand activations. Same-day teasers, editorial edit. San Diego.",
  openGraph: {
    title: "Event Photography San Diego — Paul Dal Studio",
    description:
      "Live event photography. Corporate, milestone, non-profit, brand. Same-day teasers, editorial edit. San Diego based, available worldwide.",
    url: "https://pauldalstudios.com/events",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Event photography by Paul Dal Studio in San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Photography San Diego — Paul Dal Studio",
    description:
      "Live event photography. Corporate, milestone, non-profit, brand. Same-day teasers, editorial edit.",
    images: [OG_IMAGE],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Event Photography",
  provider: { "@type": "Organization", name: "Paul Dal Studio" },
  areaServed: "San Diego, CA + Worldwide",
  offers: {
    "@type": "Offer",
    priceRange: "$1,500+",
  },
};

// TODO: replace with curated event portfolio (corporate, gala, milestone)
const content: LandingPageContent = {
  hero: {
    eyebrow: "Events",
    headline: "Live coverage that respects the room.",
    subhead:
      "Corporate events, milestone birthdays, non-profit galas, brand activations. San Diego based, available worldwide.",
    cta: { label: "Start your event inquiry", href: "/book?service=events" },
    photoCfImageId: HERO_CF_ID,
    photoAlt:
      "Event photography by Paul Dal Studio — live coverage in San Diego",
  },
  pricingSummary: {
    cards: [
      { label: "Half-day from", value: "$1,500" },
      { label: "Full-day from", value: "$2,800" },
      { label: "Multi-day", value: "Custom quote" },
    ],
    note: "Same-day teaser delivery included on every event.",
  },
  intro: {
    eyebrow: "About this work",
    headline: "Event coverage means working fast and reading the energy.",
    paragraphs: [
      "Whether it's a product launch, a milestone birthday, a non-profit gala, or a corporate offsite, event coverage is about being present without being seen. I deliver same-day teasers for social, full edits within a week.",
      "I've documented over 200 events. I know how to find the moment, work fast, and not get in the way. Your event runs on its own energy. My job is to capture it without disrupting it.",
    ],
    photoCfImageId: "572fc2e5-5737-4841-7c9b-a717b6413500",
    photoAlt: "Corporate gala photography by Paul Dal Studio — Del Mar, San Diego",
  },
  gallery: {
    eyebrow: "Selected work",
    headline: "Recent events.",
    photos: [
      {
        cfImageId: "09079dde-3a23-4762-83e7-31fd9aab2600",
        alt: "Event celebration photography by Paul Dal Studio — Stone Brewery, San Diego",
      },
      {
        cfImageId: "9dab2548-7334-4c7a-5724-8b711931dd00",
        alt: "Worship night event photography — Spring 2026, San Diego",
      },
      {
        cfImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
        alt: "Live event coverage by Paul Dal Studio — Encinitas, San Diego",
      },
      {
        cfImageId: "6227ea99-0217-4ef4-35bc-247a9ee7cd00",
        alt: "Milestone celebration event photography — San Diego",
      },
      {
        cfImageId: "a18c37a2-5557-486f-c169-db88f53e4d00",
        alt: "Editorial event coverage by Paul Dal Studio — California",
      },
      {
        cfImageId: "572fc2e5-5737-4841-7c9b-a717b6413500",
        alt: "Corporate gala event coverage — Del Mar, San Diego",
      },
    ],
    caption: "Sample work — replace with curated event portfolio",
  },
  accordion: {
    eyebrow: "What's included",
    headline: "What's included with every event.",
    subhead:
      "Standard across all event packages. Multi-shooter and extended coverage available on request.",
    items: [
      {
        title: "Pre-event brief",
        description:
          "Quick call to understand the event flow, key moments, and who you want photographed.",
      },
      {
        title: "Discreet on-site coverage",
        description:
          "I work fast and unobtrusively. Your guests barely notice me. Your photos look candid because they are.",
      },
      {
        title: "Same-day teaser delivery",
        description:
          "10–15 hand-picked images within 24 hours so you can share immediately on social.",
      },
      {
        title: "Editorial editing",
        description:
          "Every image hand-edited. Color-graded for consistency. No auto-presets.",
      },
      {
        title: "Full delivery within 7 days",
        description:
          "Most events deliver in a week. I give you a clear timeline upfront.",
      },
      {
        title: "Multi-shooter available",
        description:
          "For larger events or multi-room conferences, second shooter coverage is available.",
      },
      {
        title: "Online gallery",
        description:
          "Password-protected gallery for sharing with attendees, sponsors, or stakeholders.",
      },
      {
        title: "Full commercial usage rights",
        description:
          "Use the photos for marketing, social, press releases, and internal communications without restriction.",
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
      "Paul was the calmest person at our event. He captured every speaker, every room, every detail, and we didn't see him work. The teaser images hit social the same night.",
    attribution: "A recent client",
    context: "Event organizer, San Diego",
  },
  faqHeadlineImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
  faqItems: [
    {
      question: "How quickly do we get the photos?",
      answer:
        "Galleries deliver in two to four weeks depending on coverage length. Same-day teaser frames are available as an add-on if you need something to post that night.",
    },
    {
      question: "Can you turn around a recap video fast?",
      answer:
        "Yes. Standard event films deliver in four to six weeks. Rush turnaround in seven to ten days is available as an add-on for an additional fee.",
    },
    {
      question: "What kinds of events do you cover?",
      answer:
        "Corporate, conferences, fundraisers, private parties, milestone celebrations, brand launches, large-scale church and ministry events. If it has people and energy, I can document it.",
    },
    {
      question: "Do you provide photo + video together?",
      answer:
        "Yes. Hybrid coverage is the default. Hiring one team that does both means tighter coordination and a single point of contact instead of two crews getting in each other's way.",
    },
    {
      question: "How do payment plans work?",
      answer:
        "Twenty-five percent retainer locks the date. Balance is due seven days before the event. Card or bank transfer.",
    },
    {
      question: "Do you travel?",
      answer:
        "All of Southern California is included with no travel fee. Anywhere outside SoCal is quoted at cost.",
    },
  ],
  finalCta: {
    headline: "Tell me about your event.",
    subhead: "I read every inquiry personally. Reply within 24 hours.",
    cta: { label: "Start your event inquiry", href: "/book?service=events" },
  },
};

export default async function EventsPage() {
  // Auto-pull gallery section from FRAME's EVENT category. Falls back to
  // the curated hardcoded photos if zero event galleries are tagged.
  const dynamicGalleries = await getGalleriesByCategory("EVENT");
  const dynamicPhotos = dynamicGalleries.slice(0, 6).map((g) => ({
    cfImageId: g.coverCfImageId,
    alt: g.coverAlt,
  }));
  const finalContent: LandingPageContent = {
    ...content,
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
