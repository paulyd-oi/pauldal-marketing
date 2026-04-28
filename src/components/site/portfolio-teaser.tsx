import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import {
  getPortfolioGalleries,
  CATEGORY_LABELS,
} from "@/lib/portfolio-public";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

export async function PortfolioTeaser() {
  const all = await getPortfolioGalleries();
  const projects = all.slice(0, 3);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="mb-16 grid grid-cols-1 items-end gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                03 <span className="mx-2 text-ink/50">/</span> Portfolio
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
          {projects.map((project, i) => {
            const categoryLabel =
              project.category && project.category !== "PERSONAL"
                ? CATEGORY_LABELS[project.category]
                : "Recent work";
            const imageUrl = `${CF}/${project.coverCfImageId}/public`;

            return (
              <Reveal key={project.id} delay={i * 0.1}>
                <Link href="/portfolio" className="focus-ring group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                    <Image
                      src={imageUrl}
                      alt={project.coverAlt || project.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block" />
                    <div className="absolute bottom-0 left-0 right-0 hidden p-6 opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100 lg:block">
                      <p className="mb-2 font-body text-xs uppercase tracking-widest text-paper/70">
                        {categoryLabel}
                      </p>
                      <h3 className="font-display text-2xl leading-tight text-paper">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 lg:hidden">
                    <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted-foreground">
                      {categoryLabel}
                    </p>
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {project.name}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
