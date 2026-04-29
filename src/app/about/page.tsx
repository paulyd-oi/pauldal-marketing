import type { Metadata } from "next";
import { AboutHeroPinned } from "@/components/site/about-hero-pinned";
import { AboutBeatSection } from "@/components/site/about-beat-section";
import { AboutMarquee } from "@/components/site/about-marquee";
import { AboutClosingPinned } from "@/components/site/about-closing-pinned";
import { TrustStrip } from "@/components/site/trust-strip";
import { getPersonalPhotoByCfId } from "@/lib/portfolio-public";
import { ABOUT_PHOTO_IDS } from "@/lib/about-photos";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const heroPhoto = await getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.hero);
  return buildMetadata({
    title: "About — Paul Dal Studios",
    description:
      "Meet Paul Dal — San Diego hybrid photographer and videographer. Born in the Philippines, 200+ events documented, editorial eye. Available worldwide.",
    path: "/about",
    ogImage: heroPhoto?.url,
    ogImageAlt: heroPhoto?.alt ?? "Paul Dal Studios — About",
  });
}

const BEAT_1_BODY =
  "Photo and film started as a hobby. I was always drawn to cameras, edits, music, movement, and the way a moment could feel different when it was framed with intention. But it was not until I started serving at my church in 2021 that this became more than a hobby.";

const BEAT_2_BODY =
  "Serving in church unlocked a real passion for storytelling. I believe creativity, photo, and video are gifts God has given me. Because of that, this work has never really felt like work. I genuinely love what I get to do, especially when it blesses people, preserves meaningful moments, and helps others see the beauty in what they lived through.";

const BEAT_3_BODY =
  "Since then in San Diego, I have served as creative director, led photo teams, directed and contributed to film projects, helped shoot a pilot episode, captured more than 200 events, and documented over 70 weddings. That same experience now carries into weddings, engagements, events, brands, and editorial work through Paul Dal Studios. I work fluently across both photography and video with a documentary eye, an editorial finish, and a craft I am still actively growing.";

export default async function AboutPage() {
  const [
    heroPhoto,
    personPhoto,
    beat1Photo,
    beat2Photo,
    beat3Photo,
    beat4Photo,
  ] = await Promise.all([
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.hero),
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.personImage),
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.beat1),
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.beat2),
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.beat3),
    getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.beat4),
  ]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paul Dal",
    jobTitle: "Photographer and Videographer",
    worksFor: {
      "@type": "Organization",
      name: "Paul Dal Studios",
    },
    image: personPhoto?.url ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
    url: "https://pauldalstudios.com/about",
    sameAs: [
      "https://instagram.com/pauldalstudio",
      "https://www.linkedin.com/in/paul-dal-4571443b7/",
      "https://completewedo.com/san-diego/videographers/paul-dal/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Visually-hidden H1 for SEO. The visible page title is rendered as
          a single h2 caption inside AboutHeroPinned. The h1 lives here for
          crawlers and screen readers. */}
      <h1 className="sr-only">Called to serve.</h1>

      <AboutHeroPinned
        cfId={ABOUT_PHOTO_IDS.hero}
        alt={heroPhoto?.alt ?? "Paul Dal — San Diego hybrid photographer and videographer"}
        caption="Called to serve."
      />

      <AboutBeatSection
        variant="photoPlate"
        textPosition="bottomLeft"
        eyebrow="01 — THE BEGINNING"
        headline="It started with a camera."
        body={BEAT_1_BODY}
        cfId={ABOUT_PHOTO_IDS.beat1}
        alt={beat1Photo?.alt ?? "Paul Dal — early work"}
      />

      <AboutBeatSection
        variant="creamInterlude"
        eyebrow="02 — THE CALLING"
        headline="Then I started serving."
        body={BEAT_2_BODY}
        cfId={ABOUT_PHOTO_IDS.beat2}
        alt={beat2Photo?.alt ?? "Paul Dal — serving in community"}
      />

      <AboutBeatSection
        variant="photoPlate"
        textPosition="bottomRight"
        eyebrow="03 — THE CRAFT"
        headline="Now it's a craft."
        body={BEAT_3_BODY}
        cfId={ABOUT_PHOTO_IDS.beat3}
        alt={beat3Photo?.alt ?? "Paul Dal — directing on set"}
      />

      <AboutMarquee />

      <TrustStrip />

      <AboutClosingPinned
        cfId={ABOUT_PHOTO_IDS.beat4}
        alt={beat4Photo?.alt ?? "Paul Dal — at work"}
      />
    </>
  );
}
