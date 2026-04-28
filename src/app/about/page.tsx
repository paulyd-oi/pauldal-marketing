import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionDivider } from "@/components/site/section-divider";
import {
  AboutHeroCarousel,
  type AboutCarouselCover,
} from "@/components/site/about-hero-carousel";
import {
  CATEGORY_LABELS,
  getCategoriesWithGalleries,
  getLatestGalleryByCategory,
  getPersonalPhotoByCfId,
} from "@/lib/portfolio-public";
import { ABOUT_PHOTO_IDS } from "@/lib/about-photos";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

function cfUrl(cfId: string): string {
  return `${CF_BASE}/${cfId}/public`;
}

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

export default async function AboutPage() {
  const [personPhoto, beat1Photo, beat2Photo, beat3Photo, beat4Photo] =
    await Promise.all([
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
    sameAs: ["https://instagram.com/pauldalstudio"],
  };

  // Auto-rotating carousel of one cover per category. Categories with
  // zero galleries are filtered out (so empty FAMILY_LIFESTYLE /
  // HEADSHOTS don't surface placeholder slides). Renders nothing if
  // somehow zero categories have galleries.
  const categories = await getCategoriesWithGalleries();
  const heroCovers = (
    await Promise.all(categories.map((c) => getLatestGalleryByCategory(c)))
  )
    .map((g, i) => {
      if (!g) return null;
      const cover: AboutCarouselCover = {
        id: g.id,
        coverImageUrl: g.coverImageUrl,
        coverAlt: g.coverAlt,
        categoryLabel: CATEGORY_LABELS[categories[i]],
      };
      return cover;
    })
    .filter((c): c is AboutCarouselCover => c !== null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutHeroCarousel covers={heroCovers} />
      {/* Hero */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-muted-foreground">
                About
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
                Born in Manila. Sharpened in San&nbsp;Diego.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-ink lg:text-lg">
                I&apos;m Paul, a hybrid photographer and videographer based in
                San Diego, available anywhere in the world you need me.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Beat 1 — The beginning */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 font-body text-xs uppercase tracking-widest text-muted-foreground">
              01 — The beginning
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
              Photo and film started as a hobby. I was always drawn to cameras,
              edits, music, movement, and the way a moment could feel different
              when it was framed with intention. But it was not until I started
              serving at my church in 2021 that this became more than a hobby.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Parallax stub — beat 1 */}
      <div className="parallax-photo-frame mx-auto my-12 max-w-4xl overflow-hidden bg-ink">
        <img
          src={cfUrl(ABOUT_PHOTO_IDS.beat1)}
          alt={beat1Photo?.alt ?? "Paul Dal — early work"}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Beat 2 — The calling */}
      <section className="bg-cream-hover py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 font-body text-xs uppercase tracking-widest text-muted-foreground">
              02 — The calling
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
              Serving in church unlocked a real passion for storytelling. I
              believe creativity, photo, and video are gifts God has given me.
              Because of that, this work has never really felt like work. I
              genuinely love what I get to do, especially when it blesses
              people, preserves meaningful moments, and helps others see the
              beauty in what they lived through.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Parallax stub — beat 2 */}
      <div className="parallax-photo-frame mx-auto my-12 max-w-4xl overflow-hidden bg-ink">
        <img
          src={cfUrl(ABOUT_PHOTO_IDS.beat2)}
          alt={beat2Photo?.alt ?? "Paul Dal — serving in community"}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Beat 3 — The craft */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 font-body text-xs uppercase tracking-widest text-muted-foreground">
              03 — The craft
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
              Since then in San Diego, I have served as creative director, led
              photo teams, directed and contributed to film projects, helped
              shoot a pilot episode, captured more than 200 events, and
              documented over 70 weddings. That same experience now carries
              into weddings, engagements, events, brands, and editorial work
              through Paul Dal Studios. I work fluently across both photography
              and video with a documentary eye, an editorial finish, and a
              craft I am still actively growing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Parallax stub — beat 3 (clapperboard / Awaken 2030) */}
      <div className="parallax-photo-frame mx-auto my-12 max-w-4xl overflow-hidden bg-ink">
        <img
          src={cfUrl(ABOUT_PHOTO_IDS.beat3)}
          alt={beat3Photo?.alt ?? "Paul Dal — directing on set"}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Parallax stub — beat 4 (pre-CTA punctuation) */}
      <div className="parallax-photo-frame mx-auto my-12 max-w-4xl overflow-hidden bg-ink">
        <img
          src={cfUrl(ABOUT_PHOTO_IDS.beat4)}
          alt={beat4Photo?.alt ?? "Paul Dal — at work"}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Closing CTA */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-paper lg:text-6xl">
              Ready to work together?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/book"
              className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
            >
              Start a project
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
