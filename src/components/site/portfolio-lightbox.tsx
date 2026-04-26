"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  cfImageId: string;
}

interface PortfolioLightboxProps {
  projects: Project[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PortfolioLightbox({
  projects,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: PortfolioLightboxProps) {
  const reduced = useReducedMotion();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedIndex, handleKeyDown]);

  const project = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <AnimatePresence>
      {project && (
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
            className="absolute right-4 top-4 z-10 p-2 text-paper/70 transition-colors hover:text-paper"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {projects.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-paper/50 transition-colors hover:text-oxblood"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-paper/50 transition-colors hover:text-oxblood"
                aria-label="Next photo"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div
            className="relative mx-16 max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={`https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/${project.cfImageId}/public`}
                alt={project.title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-body text-xs uppercase tracking-widest text-paper/60">
                {project.category}
              </p>
              <h3 className="mt-1 font-display text-xl text-paper">
                {project.title}
              </h3>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
