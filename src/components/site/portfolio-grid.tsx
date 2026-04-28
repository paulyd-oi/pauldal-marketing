"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { PortfolioLightbox } from "./portfolio-lightbox";
import type { PortfolioGallery } from "@/lib/portfolio-public";

export function PortfolioGrid({
  galleries,
}: {
  galleries: PortfolioGallery[];
}) {
  const [openGalleryId, setOpenGalleryId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openGallery =
    galleries.find((g) => g.id === openGalleryId) ?? null;
  const photoCount = openGallery?.photos.length ?? 0;

  const handleClose = useCallback(() => {
    setOpenGalleryId(null);
    setPhotoIndex(0);
  }, []);

  const handlePrev = useCallback(() => {
    setPhotoIndex((i) =>
      photoCount === 0 ? 0 : i === 0 ? photoCount - 1 : i - 1
    );
  }, [photoCount]);

  const handleNext = useCallback(() => {
    setPhotoIndex((i) => (photoCount === 0 ? 0 : (i + 1) % photoCount));
  }, [photoCount]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {galleries.map((gallery, i) => (
          <Reveal key={gallery.id} delay={i * 0.05}>
            <button
              type="button"
              className="focus-ring group block w-full cursor-pointer text-left"
              onClick={() => {
                setPhotoIndex(0);
                setOpenGalleryId(gallery.id);
              }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Image
                  src={gallery.coverImageUrl}
                  alt={gallery.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block" />
                <div className="absolute bottom-0 left-0 right-0 hidden p-6 opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100 lg:block">
                  <p className="mb-2 font-body text-xs uppercase tracking-widest text-paper/70">
                    {gallery.photoCount} photos
                  </p>
                  <h3 className="font-display text-2xl leading-tight text-paper">
                    {gallery.name}
                  </h3>
                </div>
              </div>
              <div className="mt-4 lg:hidden">
                <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted-foreground">
                  {gallery.photoCount} photos
                </p>
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {gallery.name}
                </h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <PortfolioLightbox
        gallery={openGallery}
        photoIndex={photoIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
