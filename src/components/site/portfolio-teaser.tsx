import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

// TODO: replace with curated portfolio entries — these are placeholders sourced from Haritha's gallery
const PROJECTS = [
  {
    slug: "haritha-40th",
    title: "Haritha’s 40th — Stone Brewery",
    category: "Events",
    imageUrl:
      "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/09079dde-3a23-4762-83e7-31fd9aab2600/public",
  },
  {
    slug: "anna-david",
    title: "Anna & David — Encinitas",
    category: "Weddings",
    imageUrl:
      "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/271ed8b4-2732-4272-1a92-2a4b31f42b00/public",
  },
  {
    slug: "studio-q1-2026",
    title: "Studio sessions — Q1 2026",
    category: "Editorial",
    imageUrl:
      "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/c677437a-cb68-4084-39f7-84ca10557700/public",
  },
];

export function PortfolioTeaser() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-1 items-end gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/60">
                03 <span className="mx-2 text-ink/40">/</span> Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Recent projects.
              </h2>
            </Reveal>
          </div>
          <div className="lg:flex lg:justify-end">
            <Reveal delay={0.2}>
              <Link
                href="/portfolio"
                className="focus-ring group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
              >
                View full portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <Link href="/portfolio" className="focus-ring group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block" />
                  <div className="absolute bottom-0 left-0 right-0 hidden p-6 opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100 lg:block">
                    <p className="mb-2 font-body text-xs uppercase tracking-widest text-paper/80">
                      {project.category}
                    </p>
                    <h3 className="font-display text-2xl leading-tight text-paper">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 lg:hidden">
                  <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted-foreground">
                    {project.category}
                  </p>
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
