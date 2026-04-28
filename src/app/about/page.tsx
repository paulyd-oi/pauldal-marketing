import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ParallaxPhoto, FadingQuote } from "@/components/site/about-scroll-effects";
import { SectionDivider } from "@/components/site/section-divider";
import {
  AboutHeroCarousel,
  type AboutCarouselCover,
} from "@/components/site/about-hero-carousel";
import {
  CATEGORY_LABELS,
  getCategoriesWithGalleries,
  getLatestGalleryByCategory,
} from "@/lib/portfolio-public";

export const revalidate = 60;

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

const PORTRAIT =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/00a26873-4171-4b0c-f991-867f2f1c6700/public";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Paul Dal — San Diego hybrid photographer and videographer. Born in the Philippines, 200+ events documented, editorial eye. Available worldwide.",
  alternates: { canonical: "https://pauldalstudios.com/about" },
  openGraph: {
    title: "About — Paul Dal Studios",
    description:
      "Meet Paul Dal — San Diego hybrid photographer and videographer. Born in the Philippines, editorial eye. Available worldwide.",
    url: "https://pauldalstudios.com/about",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Paul Dal Studios",
    description:
      "Meet Paul Dal — San Diego hybrid photographer and videographer. Born in the Philippines, editorial eye. Available worldwide.",
    images: [OG_IMAGE],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Dal",
  jobTitle: "Photographer and Videographer",
  worksFor: {
    "@type": "Organization",
    name: "Paul Dal Studios",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Diego",
    addressRegion: "CA",
    addressCountry: "US",
  },
  url: "https://pauldalstudios.com/about",
  sameAs: ["https://instagram.com/pauldalstudio"],
};

export default async function AboutPage() {
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

      {/* Photo + origin story */}
      <section className="bg-paper pb-24 lg:pb-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <ParallaxPhoto>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <Image
                    src={PORTRAIT}
                    alt="Paul Dal — San Diego hybrid photographer and videographer"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </ParallaxPhoto>
            </Reveal>

            <div className="max-w-md lg:pt-12">
              <Reveal delay={0.1}>
                <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                  I was born in the Philippines and moved to the United States
                  when I was five. Growing up between two cultures taught me to
                  notice details: how light fills a room differently depending
                  on where you are, how people carry themselves when they feel at
                  home.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                  I picked up a camera in 2019 and never put it down. What
                  started as documenting moments for friends turned into a
                  discipline: learning to read light, anticipate movement, and
                  stay present when it matters.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
                  I shoot both photo and video because some moments need
                  stillness, and others need motion. The camera I reach for
                  depends on the story, not the deliverable.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Faith + community */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-12">
          <Reveal>
            <FadingQuote>
              <blockquote className="mb-10 font-display text-3xl italic leading-snug tracking-tight text-ink lg:text-5xl">
                &ldquo;Photography is how I pay attention.&rdquo;
              </blockquote>
            </FadingQuote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
              For the last four years I&apos;ve served as the creative director
              and videographer at my church, a community of ten thousand
              members. I&apos;ve documented over two hundred events: services,
              conferences, worship nights, baptisms, outreach.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
              That work sharpened everything: speed, instinct, storytelling
              under pressure. It also grounded me. My faith is central to how I
              see the world and the people in it. I bring that same attention to
              every project, whether it&apos;s a wedding, a brand shoot, or an
              editorial story.
            </p>
          </Reveal>
        </div>
      </section>

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
