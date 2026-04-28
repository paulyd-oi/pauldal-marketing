"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { PortfolioLightbox } from "./portfolio-lightbox";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface Project {
  title: string;
  category: string;
  cfImageId: string;
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : i === 0 ? projects.length - 1 : i - 1
    );
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : i === projects.length - 1 ? 0 : i + 1
    );
  }, [projects.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.cfImageId} delay={i * 0.05}>
            <button
              type="button"
              className="focus-ring group block w-full cursor-pointer text-left"
              onClick={() => setSelectedIndex(i)}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Image
                  src={`${CF}/${project.cfImageId}/public`}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block" />
                <div className="absolute bottom-0 left-0 right-0 hidden p-6 opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100 lg:block">
                  <p className="mb-2 font-body text-xs uppercase tracking-widest text-paper/70">
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
            </button>
          </Reveal>
        ))}
      </div>

      <PortfolioLightbox
        projects={projects}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
