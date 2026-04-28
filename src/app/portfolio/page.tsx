import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { getPortfolioGalleries } from "@/lib/portfolio-public";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const OG_IMAGE = `${CF}/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public`;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Paul Dal Studio — weddings, events, business, and editorial photography in San Diego and beyond. Full archive on request.",
  alternates: { canonical: "https://pauldalstudios.com/portfolio" },
  openGraph: {
    title: "Portfolio — Paul Dal Studio",
    description:
      "Selected work by Paul Dal Studio — weddings, events, business, and editorial photography in San Diego and beyond.",
    url: "https://pauldalstudios.com/portfolio",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studio portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Paul Dal Studio",
    description:
      "Selected work by Paul Dal Studio — weddings, events, business, and editorial photography in San Diego and beyond.",
    images: [OG_IMAGE],
  },
};

export default async function PortfolioPage() {
  const galleries = await getPortfolioGalleries();

  return (
    <>
      {/* Hero */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/70">
                Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
                Recent work.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-ink lg:text-lg">
                A selection of weddings, events, and editorial projects. Full
                archive available on request.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid or empty state */}
      <section className="bg-paper pb-24 lg:pb-32">
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
