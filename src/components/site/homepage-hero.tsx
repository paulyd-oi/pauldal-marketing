"use client";

// Homepage Direction 5 — full-bleed primary cover + scroll-revealing grid.
//
// Server passes a hero gallery (deterministic daily rotation via
// pickByDate over featuredOnHomepage galleries) and a tail of additional
// covers for the grid. Framer Motion handles the title fade-in and the
// scroll-revealing grid stagger via whileInView.
//
// Editorial / prestige feel — calm, considered, no auto-play. Pure
// scroll-driven reveals.

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AmbientBackplate } from "./ambient-backplate";

export type HomepageHeroGallery = {
  id: string;
  name: string;
  coverImageUrl: string;
  coverAlt: string;
};

interface Props {
  heroGallery: HomepageHeroGallery;
  gridGalleries: HomepageHeroGallery[];
  // When true, the static heroGallery cover is replaced with the
  // AmbientBackplate cycling reel pulled from FRAME's photographer
  // favorites (category=ALL — mixed wedding/event/etc. for homepage
  // variety). The bottom-up gradient + motion text stay intact in
  // both modes. Default false so Storybook + future consumers keep
  // the static-image behavior.
  useAmbient?: boolean;
}

export function HomepageHero({ heroGallery, gridGalleries, useAmbient = false }: Props) {
  return (
    <>
      {/* Full-bleed primary cover */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-ink">
        {useAmbient ? (
          <AmbientBackplate category="ALL" priorityFirst />
        ) : (
          <Image
            src={heroGallery.coverImageUrl}
            alt={heroGallery.coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-end px-6 pb-16 lg:px-12 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-screen-2xl">
            <p className="mb-4 font-body text-xs uppercase tracking-widest text-paper/70 lg:text-sm">
              Paul Dal Studios
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl">
              Photography for the moments that matter.
            </h1>
          </div>
        </motion.div>
      </section>

      {/* Scroll-revealing grid of additional covers */}
      {gridGalleries.length > 0 && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              className="mb-16 max-w-2xl lg:mb-20"
            >
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                Recent work
              </p>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                What I&apos;ve been working on.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {gridGalleries.map((gallery, i) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 3) * 0.1,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-ink"
                >
                  <Image
                    src={gallery.coverImageUrl}
                    alt={gallery.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center lg:mt-20">
              <Link
                href="/portfolio"
                className="focus-ring inline-flex items-center border border-ink/30 px-8 py-4 font-body text-sm tracking-wide text-ink transition-colors duration-200 hover:border-oxblood hover:text-oxblood"
              >
                View full portfolio →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
