// PLACEHOLDER COPY — replace when strategy chat Deliverable 6 lands.
// Skeleton scaffold so Google can begin indexing the route while
// the strategic copy is being finalized. Faith-forward register here
// is intentional and isolated to this single SEO landing page; no
// other public surface uses overt Christian language.

import type { Metadata } from "next";
import {
  LandingPageLayout,
  type LandingPageContent,
} from "@/components/site/landing-page-layout";
import { TrustStrip } from "@/components/site/trust-strip";
import { getGalleriesByCategory } from "@/lib/portfolio-public";
import { buildCategoryPageMetadata } from "@/lib/seo";

export const revalidate = 60;

const HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";

export async function generateMetadata(): Promise<Metadata> {
  return buildCategoryPageMetadata({
    category: "WEDDING",
    title:
      "San Diego Christian Wedding Videographer | Paul Dal Studios",
    description:
      "Cinematic wedding films for Christian couples honoring God in their covenant. Catholic Mass coverage, scripture-honoring storytelling. Films begin at $4,995.",
    path: "/san-diego-christian-wedding-videographer",
    ogImageAlt:
      "San Diego Christian wedding videographer Paul Dal Studios",
  });
}

const christianServiceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://pauldalstudios.com/#business",
      name: "Paul Dal Studios",
      url: "https://pauldalstudios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Diego",
        addressRegion: "CA",
        addressCountry: "US",
      },
      priceRange: "$$$",
      areaServed: [
        { "@type": "City", name: "San Diego" },
        { "@type": "State", name: "California" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Christian Wedding Videography",
      name: "Christian Wedding Videography",
      provider: { "@id": "https://pauldalstudios.com/#business" },
      areaServed: "San Diego, California",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "4995",
      },
    },
  ],
};

const content: LandingPageContent = {
  hero: {
    eyebrow: "Christian Weddings",
    headline: "San Diego Christian Wedding Videographer.",
    subhead:
      "Cinematic wedding films for couples honoring God in their covenant. Soft-Christian register, scripture-honoring, faith-filled storytelling.",
    cta: {
      label: "Check My Date",
      href: "/book?service=weddings",
    },
    photoCfImageId: HERO_CF_ID,
    photoAlt:
      "Christian wedding ceremony coverage by Paul Dal Studios in San Diego",
  },
  investmentBlock: {
    products: [
      {
        eyebrow: "ELOPEMENTS & INTIMATE CEREMONIES",
        priceLabel: "from $2,000",
        description:
          "Up to 4 hours, single camera, 2-3 minute cinematic film. Designed for small ceremonies, micro-weddings, and vow renewals.",
      },
      {
        eyebrow: "WEDDING FILMS",
        priceLabel: "from $4,995",
        description:
          "Most couples invest $6,000–$10,000. Full-day cinematic coverage, multi-camera, highlight film + ceremony cut.",
      },
      {
        eyebrow: "PHOTO + VIDEO BUNDLES",
        priceLabel: "from $7,495",
        description:
          "Hybrid coverage with editorial photography included.",
      },
    ],
  },
  intro: {
    // TODO(deliverable-6): replace with strategy-chat-final copy.
    eyebrow: "About this work",
    headline: "Reverence is part of the craft.",
    paragraphs: [
      "Christian weddings carry weight that's older than the venue. The processional, the reading of vows, the breaking of bread, the recessional — every beat is a story God has been telling for thousands of years. Our job is to film it with the reverence it deserves, not flatten it into a highlight reel.",
      "I have documented weddings across denominations — Catholic Mass, Protestant ceremonies, intimate scripture readings under oaks, full sanctuary services with a thousand witnesses. The work shows up the same way every time: present, quiet, and prepared to honor what's actually happening.",
    ],
    photoCfImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
    photoAlt: "Christian wedding ceremony by Paul Dal Studios — San Diego",
  },
  gallery: {
    eyebrow: "Selected work",
    headline: "Recent ceremonies.",
    photos: [],
    caption: "",
  },
  accordion: {
    // TODO(deliverable-6): refine list with operator's preferred capture priorities.
    eyebrow: "What we capture",
    headline: "What we capture during a Christian ceremony.",
    subhead:
      "The moments that matter to you, your family, and your faith — filmed with the reverence they deserve.",
    items: [
      {
        title: "Mass and full liturgy",
        description:
          "Full Catholic Mass coverage including the Liturgy of the Word, Liturgy of the Eucharist, and the nuptial blessing. We work with your celebrant in advance to know the order of worship.",
      },
      {
        title: "Communion and the breaking of bread",
        description:
          "Captured with discretion. We position cameras so the sacrament is honored, not interrupted.",
      },
      {
        title: "Vows and ring exchange",
        description:
          "Multi-camera coverage with pro audio so every word lands. Most wedding films have unusable vow audio. Ours don't.",
      },
      {
        title: "Processional and recessional",
        description:
          "The walk in and the walk out — both filmed with intention. The arc of the day begins and ends here.",
      },
      {
        title: "Scripture readings and homilies",
        description:
          "Captured in full when requested, with edited highlight cuts available for the social-cut deliverables.",
      },
      {
        title: "Family blessings and cultural traditions",
        description:
          "Whatever your tradition includes — unity candle, lasso, arras, foot washing — we've filmed it. Tell us in advance and we'll plan the shot.",
      },
    ],
  },
  faqHeadlineImageId: "271ed8b4-2732-4272-1a92-2a4b31f42b00",
  faqItems: [
    {
      question: "Are you comfortable filming a full Catholic Mass?",
      answer:
        "Yes. We've filmed full nuptial Masses across the diocese. We follow the celebrant's guidance on camera positioning, work silently during the consecration, and keep the gear out of sight from the congregation.",
    },
    {
      question: "Will the cameras distract from the ceremony?",
      answer:
        "No. We use long lenses from the back and sides during the most reverent moments. Every wedding we shoot, the celebrant tells us afterward they didn't notice us. That's the goal.",
    },
    {
      question: "Can you incorporate scripture into the highlight film?",
      answer:
        "Yes. If there's a verse that matters to you both — from your vows, from a reading, from a homily — we can build the highlight around it. Tell us during the discovery call.",
    },
    {
      question: "Do you film outside the Catholic tradition?",
      answer:
        "Yes. Protestant, non-denominational, intimate house ceremonies, outdoor scripture readings — we've filmed across denominations and traditions. The reverence translates.",
    },
  ],
  finalCta: {
    headline: "Tell us about your wedding.",
    subhead:
      "We read every inquiry personally. Reply within 24 hours.",
    cta: {
      label: "Check My Date",
      href: "/book?service=weddings",
    },
  },
};

export default async function ChristianWeddingVideographerPage() {
  // Reuse FRAME WEDDING galleries for hero, intro, gallery, FAQ photos —
  // same dataflow pattern as /weddings.
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
      photoCfImageId:
        latestGallery?.coverCfImageId ?? content.hero.photoCfImageId,
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
      photos: dynamicPhotos,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(christianServiceJsonLd),
        }}
      />
      <LandingPageLayout
        content={finalContent}
        beforeFinalCta={<TrustStrip />}
      />
    </>
  );
}
