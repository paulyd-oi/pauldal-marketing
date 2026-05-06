import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { AmbientBackplate } from "@/components/site/ambient-backplate";
import { getPortfolioGalleries } from "@/lib/portfolio-public";
import { getFavorites } from "@/lib/favorites";

// Cache-bust query param — increment when shipping new OG image so iMessage,
// Slack, Facebook, and Twitter re-fetch instead of serving stale OG cache.
const OG_IMAGE = "/og-paul-dal.jpg?v=2";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Paul Dal Studios — weddings, events, business, and editorial photography in San Diego and beyond. Full archive on request.",
  alternates: { canonical: "https://www.pauldalstudios.com/portfolio" },
  openGraph: {
    title: "Portfolio — Paul Dal Studios",
    description:
      "Selected work by Paul Dal Studios — weddings, events, business, and editorial photography in San Diego and beyond.",
    url: "https://www.pauldalstudios.com/portfolio",
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
    title: "Portfolio — Paul Dal Studios",
    description:
      "Selected work by Paul Dal Studios — weddings, events, business, and editorial photography in San Diego and beyond.",
    images: [OG_IMAGE],
  },
};

export default async function PortfolioPage() {
  const [galleries, initialFavorites] = await Promise.all([
    getPortfolioGalleries(),
    getFavorites(),
  ]);

  return (
    <>
      {/* Hero — ambient cycling reel of public favorites */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-ink">
        <AmbientBackplate
          category="ALL"
          initialItems={initialFavorites}
          priorityFirst
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70">
                Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-paper lg:text-8xl">
                Recent work.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-paper/80 lg:text-lg">
                A selection of weddings, events, and editorial projects. Full
                archive available on request.
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
                Recent work coming soon.
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
              Have a project in mind?
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
