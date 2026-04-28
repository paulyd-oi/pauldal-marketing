"use client";

// About-page hero carousel — auto-advancing Embla cycle through one
// cover photo per category. 5 second interval, infinite loop, doesn't
// stop on user interaction (so brief mouseover doesn't pause the show).
//
// Categories with zero galleries are filtered server-side via
// getCategoriesWithGalleries; this component just renders whatever
// covers it receives. Empty array → renders nothing.

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type AboutCarouselCover = {
  id: string;
  coverImageUrl: string;
  coverAlt: string;
  categoryLabel: string;
};

interface Props {
  covers: AboutCarouselCover[];
}

export function AboutHeroCarousel({ covers }: Props) {
  const autoplay = useCallback(
    () => Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false }),
    [],
  );
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay()]);

  if (covers.length === 0) return null;

  return (
    <section className="bg-ink">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {covers.map((cover, i) => (
            <div
              key={cover.id}
              className="relative aspect-[16/9] flex-[0_0_100%] lg:aspect-[21/9]"
            >
              <Image
                src={cover.coverImageUrl}
                alt={cover.coverAlt}
                fill
                // Only the first slide gets priority — preloading every slide
                // competes for bandwidth and pushes LCP past 2.5s on mobile.
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                <p className="font-body text-xs uppercase tracking-widest text-paper/80 lg:text-sm">
                  {cover.categoryLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
