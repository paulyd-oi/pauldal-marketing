import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ServicesAccordion } from "@/components/site/services-accordion";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, event, business, and editorial photography + video by Paul Dal Studio. San Diego hybrid creative. Packages and process.",
  openGraph: {
    title: "Services — Paul Dal Studio",
    description:
      "Wedding, event, business, and editorial photography + video by Paul Dal Studio. San Diego hybrid creative.",
    url: "https://pauldalstudios.com/services",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Paul Dal Studio",
    description:
      "Wedding, event, business, and editorial photography + video by Paul Dal Studio. San Diego hybrid creative.",
    images: [OG_IMAGE],
  },
};

const SERVICES = [
  {
    id: "weddings",
    headline: "The day you'll want to remember in detail.",
    prose: [
      "Weddings demand presence. I shoot in pairs when timeline allows — one photographer with you, one capturing the moments you're not in. The edit favors story over symmetry. You get the candid laughs and the quiet seconds, not just the posed lineups.",
    ],
    included: [
      "8–10 hours coverage",
      "Two-shooter team for full-day weddings",
      "Day-of timeline planning",
      "500+ edited photos delivered in 4–6 weeks",
      "Online gallery for sharing + downloads",
    ],
    process: [
      "Discovery call to understand the day",
      "Engagement or pre-wedding shoot (optional)",
      "Day-of coverage with timeline support",
      "First-look gallery within 72 hours",
      "Full delivery in 4–6 weeks",
    ],
    investment: [
      "Starting from $2,500 for half-day coverage.",
      "Most couples invest $3,500–$5,000 for full-day photo + video.",
      "Premium packages up to $7,500.",
      "Custom quotes for destination weddings or extended coverage.",
    ],
    bg: "bg-paper",
  },
  {
    id: "events",
    headline: "Live coverage that respects the room.",
    prose: [
      "Whether it's a corporate launch, a milestone birthday, or a non-profit gala, event coverage means working fast and reading the energy. I deliver same-day teasers for social, full edits within a week.",
    ],
    included: [
      "3–8 hours coverage",
      "Same-day teaser delivery (5–10 photos)",
      "Full edited gallery within 7 days",
      "Online gallery for guests",
    ],
    process: [
      "Brief call to understand event flow + key moments",
      "Day-of coverage",
      "Same-day teaser delivery",
      "Full delivery within 7 days",
    ],
    investment: [
      "Half-day events from $1,500.",
      "Full-day coverage from $2,800.",
      "Same-day teaser delivery included.",
    ],
    bg: "bg-cream-hover",
  },
  {
    id: "business",
    headline: "Brand work that doesn't look like stock.",
    prose: [
      "Headshots, team portraits, product, content packs — business photography is about consistency and speed. I work with founders, agencies, and creator brands who need polished imagery that reflects how they actually look in real life.",
    ],
    included: [
      "Half-day or full-day shoots",
      "On-location or in-studio",
      "Brand portrait sets",
      "Product and content photography",
      "Edited delivery within 5–7 days",
    ],
    process: [
      "Brief on brand voice + use cases",
      "Shot list + creative direction",
      "Shoot day",
      "Edits + delivery within a week",
    ],
    investment: [
      "Half-day brand sessions from $1,500.",
      "Full-day brand sessions from $2,800.",
      "Hybrid brand package (photo + video) from $4,500.",
      "Hourly add-on: $300/hr.",
    ],
    bg: "bg-paper",
  },
  {
    id: "editorial",
    headline: "Stories told in light.",
    prose: [
      "Editorial work is where creative direction matters most. I collaborate with magazines, publications, and brands on long-form visual stories. Concept-led, execution-focused. Available for one-off shoots or ongoing series.",
    ],
    included: [
      "Concept development + creative direction",
      "Half-day to multi-day production",
      "Polished editorial imagery",
      "Selected film + digital workflows",
      "Usage rights tailored to publication needs",
    ],
    process: [
      "Concept + treatment alignment",
      "Pre-production (location, talent, styling)",
      "Production day(s)",
      "Post + delivery on agreed timeline",
    ],
    investment: [
      "Project-based pricing — inquire with your brief for a tailored quote.",
      "Half-day editorial from $1,800.",
      "Full-day editorial from $4,500+.",
    ],
    bg: "bg-cream-hover",
  },
] as const;

function DetailBlock({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="mb-3 font-body text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="font-body text-sm leading-relaxed text-ink/85"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper py-32 lg:py-48">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/70">
                Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
                Four ways I work.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-ink/85 lg:text-lg">
                Each project starts the same — listen, plan, shoot, deliver.
                Below is what&apos;s available.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service sections */}
      {SERVICES.map((service) => (
        <section key={service.id} className={`${service.bg} py-24 lg:py-32`}>
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-muted-foreground">
                {service.id}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-12 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:mb-16 lg:text-6xl">
                {service.headline}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Prose */}
              <div className="max-w-md">
                {service.prose.map((p, pi) => (
                  <Reveal key={pi} delay={0.2 + pi * 0.1}>
                    <p className="mb-6 font-body text-base leading-relaxed text-ink/85 lg:text-lg">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Structured details */}
              <div>
                <Reveal delay={0.2}>
                  <DetailBlock
                    title="What's included"
                    items={service.included}
                  />
                </Reveal>
                <Reveal delay={0.3}>
                  <DetailBlock title="Process" items={service.process} />
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mb-8">
                    <h4 className="mb-3 font-body text-xs uppercase tracking-widest text-muted-foreground">
                      Investment
                    </h4>
                    <ul className="space-y-1.5">
                      {service.investment.map((line) => (
                        <li
                          key={line}
                          className="font-body text-sm leading-relaxed text-ink/85"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.5}>
                  <Link
                    href="/book"
                    className="group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
                  >
                    Inquire about{" "}
                    {service.id.charAt(0).toUpperCase() + service.id.slice(1)}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* How it works */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/60">
                05 <span className="mx-2 text-ink/40">/</span> Process
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                How we work together.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-base leading-relaxed text-ink/70 lg:text-lg">
                From first email to delivery, here&apos;s what to expect.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                num: "1",
                title: "Reach out",
                desc: "Tell me about your project — date, location, vision. I read every inquiry personally and respond within 24 hours.",
              },
              {
                num: "2",
                title: "Get the details",
                desc: "I'll send pricing, packages, and a deeper look at how I work. No pressure, no auto-replies.",
              },
              {
                num: "3",
                title: "We talk it through",
                desc: "Quick discovery call to align on creative direction, timeline, and what success looks like for you.",
              },
              {
                num: "4",
                title: "Lock the date",
                desc: "Sign the contract, send a 25% deposit. Your date is yours.",
              },
              {
                num: "5",
                title: "Show up and shoot",
                desc: "I arrive prepared. We work through the timeline together. You stay present, I handle the rest.",
              },
              {
                num: "6",
                title: "Deliver the work",
                desc: "Sneak peeks within 72 hours. Full edited gallery in 2–4 weeks. We celebrate it together.",
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-oxblood font-body text-sm font-medium text-paper">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-xl text-ink">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ink/70">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/60">
                06 <span className="mx-2 text-ink/40">/</span> Included
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                What&apos;s included with every project.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-sm leading-relaxed text-ink/70">
                Standard across all services. Custom packages may add or extend
                these.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ServicesAccordion />
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <h2 className="mb-4 font-display text-4xl leading-[1.05] tracking-tight text-paper lg:text-6xl">
              Not sure which fits?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-10 font-body text-base text-paper/70 lg:text-lg">
              Tell me what you&apos;re planning.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/book"
              className="group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
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
