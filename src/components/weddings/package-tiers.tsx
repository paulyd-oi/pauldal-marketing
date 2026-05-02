"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

type Tier = {
  slug: "elopement" | "vow" | "covenant" | "legacy";
  name: string;
  price: string;
  badge: string | null;
  bullets: string[];
};

const TIERS: Tier[] = [
  {
    slug: "elopement",
    name: "The Elopement Film",
    price: "$2,000",
    badge: null,
    bullets: [
      "Up to 4 hours of coverage",
      "Single camera, cinematic film",
      "2–3 minute final film",
      "Designed for courthouse, micro-weddings, vow renewals",
    ],
  },
  {
    slug: "vow",
    name: "The Vow",
    price: "$4,995",
    badge: null,
    bullets: [
      "6 hours coverage, two cameras",
      "4–5 minute cinematic highlight",
      "Full edited ceremony",
      "1 vertical social cut",
      "San Diego County included",
    ],
  },
  {
    slug: "covenant",
    name: "The Covenant",
    price: "$6,995",
    badge: "Most booked",
    bullets: [
      "8 hours coverage, three cameras",
      "6–8 minute cinematic highlight",
      "Full ceremony + toasts edit",
      "Drone aerial coverage",
      "Pro audio, 2 vertical social cuts",
      "Southern California included",
    ],
  },
  {
    slug: "legacy",
    name: "The Legacy",
    price: "$9,995",
    badge: null,
    bullets: [
      "10 hours coverage, lead + 2nd videographer",
      "8–12 minute feature film",
      "Full ceremony + reception + toasts",
      "Drone, slow-motion, advanced grading",
      "Same-day teaser within 48 hours",
      "All of California included",
    ],
  },
];

export type PackageTierThumb = {
  cfImageId: string;
  alt: string;
};

const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export function PackageTiers({ thumbs }: { thumbs?: PackageTierThumb[] }) {
  const reduced = useReducedMotion();

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 max-w-2xl lg:mb-20">
          <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
            Packages
          </p>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
            Three film tiers, one elopement option.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {TIERS.map((tier, i) => {
            const thumb = thumbs?.[i];
            return (
              <motion.article
                key={tier.slug}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 1.0,
                  ease: MOTION_EASE,
                  delay: i * 0.15,
                }}
                className={`flex flex-col border bg-paper p-8 ${
                  tier.badge ? "border-oxblood" : "border-hairline"
                }`}
              >
                {thumb && (
                  <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden bg-ink">
                    <Image
                      src={`${CF_BASE}/${thumb.cfImageId}/public`}
                      alt={thumb.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                {tier.badge && (
                  <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">
                    {tier.badge}
                  </span>
                )}
                <h3 className="mb-2 font-display text-2xl text-ink">
                  {tier.name}
                </h3>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  from
                </p>
                <p className="mb-8 font-display text-4xl text-ink">
                  {tier.price}
                </p>
                <ul className="mb-8 flex-grow space-y-3 font-body text-sm leading-relaxed text-ink">
                  {tier.bullets.map((b) => (
                    <li key={b}>— {b}</li>
                  ))}
                </ul>
                <Link
                  href={`/book?service=weddings&tier=${tier.slug}`}
                  className="focus-ring font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood transition-colors hover:text-oxblood-hover"
                >
                  Inquire about {tier.name} →
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-base text-ink">
            Need photo + video together? Bundles start at{" "}
            <strong>$7,495</strong>.{" "}
            <span className="font-body text-sm italic text-ink/50">
              (Other bundle tiers available on request — ask on your discovery
              call.)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
