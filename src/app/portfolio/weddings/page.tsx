import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { AmbientBackplate } from "@/components/site/ambient-backplate";
import { getGalleriesByCategory } from "@/lib/portfolio-public";
import { getFavorites, filterByCategory } from "@/lib/favorites";

// Cache-bust query param — increment when shipping new OG image so iMessage,
// Slack, Facebook, and Twitter re-fetch instead of serving stale OG cache.
const OG_IMAGE = "/og-paul-dal.jpg?v=2";

export const metadata: Metadata = {
  title: "Wedding Films Portfolio | Paul Dal Studios",
  description:
    "Selected wedding film work from Paul Dal Studios. 70+ weddings documented across San Diego and beyond. Cinematic films from $4,995.",
  alternates: {
    canonical: "https://www.pauldalstudios.com/portfolio/weddings",
  },
  openGraph: {
    title: "Wedding Films Portfolio — Paul Dal Studios",
    description:
      "Selected wedding film work from Paul Dal Studios. 70+ weddings documented across San Diego and beyond.",
    url: "https://www.pauldalstudios.com/portfolio/weddings",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Paul Dal — San Diego photographer and videographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Films Portfolio — Paul Dal Studios",
    description:
      "Selected wedding film work from Paul Dal Studios. 70+ weddings documented.",
    images: [OG_IMAGE],
  },
};

export default async function WeddingsPortfolioPage() {
  const [galleries, allFavorites] = await Promise.all([
    getGalleriesByCategory("WEDDING"),
    getFavorites(),
  ]);
  const initialFavorites = filterByCategory(allFavorites, "WEDDING");

  return (
    <>
      {/* Hero — ambient cycling reel of wedding favorites */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-ink">
        <AmbientBackplate
          category="WEDDING"
          initialItems={initialFavorites}
          priorityFirst
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
          <Reveal>
            <Link
              href="/portfolio"
              className="focus-ring group mb-8 inline-flex items-center font-body text-xs uppercase tracking-widest text-paper/60 transition-colors hover:text-paper"
            >
              <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
          </Reveal>
          <div className="max-w-3xl">
            <Reveal delay={0.05}>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70">
                Wedding Films
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-paper lg:text-8xl">
                Wedding Films — Paul Dal Studios.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-paper/80 lg:text-lg">
                Selected work from 70+ weddings in San Diego and beyond.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid or empty state */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          {galleries.length === 0 ? (
            <Reveal>
              <p className="font-body text-base text-ink/70 lg:text-lg">
                Wedding portfolio coming soon.{" "}
                <Link
                  href="/portfolio"
                  className="focus-ring underline underline-offset-4 hover:text-oxblood"
                >
                  View all work →
                </Link>
              </p>
            </Reveal>
          ) : (
            <PortfolioGrid galleries={galleries} />
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-paper lg:text-6xl">
              Tell us about your wedding.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/book?service=weddings"
              className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
            >
              Check My Date
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
