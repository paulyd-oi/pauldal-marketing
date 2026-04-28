import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

const SERVICES = [
  {
    slug: "weddings",
    name: "Weddings",
    description: "Two-shooter coverage, day-of timeline, story-driven edit.",
  },
  {
    slug: "events",
    name: "Events",
    description: "Live coverage with same-day teaser delivery for social.",
  },
  {
    slug: "business",
    name: "Business",
    description: "Brand portraits, product, and content packs for teams.",
  },
  {
    slug: "editorial",
    name: "Editorial",
    description: "Creative direction and crafted imagery for stories.",
  },
];

export function ServicesTeaser() {
  return (
    <section className="bg-cream-hover py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                02 <span className="mx-2 text-ink/50">/</span> Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Four ways I work.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 font-body text-base leading-relaxed text-ink lg:text-lg">
                Each project starts the same: listen, plan, shoot, deliver.
                Below is what I&apos;m available for.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/services"
                className="focus-ring group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
              >
                View all services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={0.1 + i * 0.08}>
                <Link
                  href={`/services#${service.slug}`}
                  className="focus-ring-inset group block h-full bg-paper p-8 transition-colors hover:bg-cream-hover lg:p-10"
                >
                  <h3 className="mb-4 font-display text-2xl leading-tight text-ink lg:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mb-6 font-body text-sm leading-relaxed text-ink/70 lg:text-base">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center font-body text-xs uppercase tracking-widest text-oxblood">
                    Explore
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
