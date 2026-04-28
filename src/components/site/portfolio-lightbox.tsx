"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { PortfolioGallery } from "@/lib/portfolio-public";

interface PortfolioLightboxProps {
  gallery: PortfolioGallery | null;
  photoIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CHROME_BUTTON =
  "inline-flex items-center justify-center rounded-full bg-black/40 text-white transition-[background-color,transform] duration-150 hover:bg-black/60 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function PortfolioLightbox({
  gallery,
  photoIndex,
  onClose,
  onPrev,
  onNext,
}: PortfolioLightboxProps) {
  const reduced = useReducedMotion();
  const isOpen = gallery !== null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  const photo = gallery ? gallery.photos[photoIndex] : null;
  const totalPhotos = gallery?.photos.length ?? 0;

  return (
    <AnimatePresence>
      {gallery && photo && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className={`${CHROME_BUTTON} absolute right-4 top-4 z-20 h-11 w-11`}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          {totalPhotos > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className={`${CHROME_BUTTON} absolute left-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 md:left-4 md:h-14 md:w-14`}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className={`${CHROME_BUTTON} absolute right-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 md:right-4 md:h-14 md:w-14`}
                aria-label="Next photo"
              >
                <ChevronRight className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
              </button>
            </>
          )}

          <div
            className="relative mx-16 flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                key={photo.id}
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
              <span className="inline-flex items-center rounded-full bg-black/40 px-3 py-1 font-body text-base font-medium tracking-wide text-white">
                {photoIndex + 1} / {totalPhotos}
              </span>
              {totalPhotos > 1 && (
                <p className="mt-2 hidden font-body text-xs text-white/50 md:block">
                  Use arrow keys to navigate
                </p>
              )}
              <h3 className="mt-3 font-display text-xl text-paper">
                {gallery.name}
              </h3>
              <Link
                href="/book"
                onClick={onClose}
                className="focus-ring group mt-4 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-paper/70 transition-colors hover:text-oxblood"
              >
                Inquire about this work
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
