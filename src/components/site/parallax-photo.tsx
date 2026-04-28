"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface ParallaxPhotoProps {
  cfId: string;
  alt: string;
  // Add hero priority hint when this is the first image visible.
  priority?: boolean;
  // translateY range as a fraction of frame height. 0.3 → ±15% across full viewport scroll.
  magnitude?: number;
  // Frame aspect ratio (width / height). Reserves layout space pre-load to keep CLS at 0.
  // Default 1.5 (3:2 landscape) — beats use mixed orientations; per-call override where needed.
  aspect?: number;
  className?: string;
}

export function ParallaxPhoto({
  cfId,
  alt,
  priority = false,
  magnitude = 0.3,
  aspect = 1.5,
  className,
}: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect prefers-reduced-motion (live-updates if the user toggles it).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Detect mobile (<768px) — disable parallax entirely (jitter risk + low value on small screens).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver — only run scroll math when the frame is on/near screen.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Scroll handler — rAF-throttled, only when visible + motion allowed + not mobile.
  useEffect(() => {
    if (!isVisible || reduceMotion || isMobile) {
      setTranslateY(0);
      return;
    }
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const viewportH = window.innerHeight;
        // progress: -1 (entering bottom) → 0 (centered) → 1 (exiting top)
        const progress = ((rect.top + rect.height / 2) / viewportH - 0.5) * 2;
        const ty = -progress * rect.height * magnitude * 0.5;
        setTranslateY(ty);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible, reduceMotion, isMobile, magnitude]);

  const cfUrl = `${CF_BASE}/${cfId}/public`;
  const animate = isVisible && !reduceMotion && !isMobile;

  return (
    <div
      ref={ref}
      className={`parallax-photo-frame relative overflow-hidden bg-ink ${className ?? ""}`}
      // Reserve aspect-ratio'd box pre-load so CLS stays at 0.
      style={{ aspectRatio: aspect }}
    >
      <div
        // Inner is 130% of frame height — gives ±15% room for parallax translate
        // before edges show. Translate is clamped by progress * magnitude * 0.5.
        className="absolute inset-x-0 top-0"
        style={{
          height: "130%",
          transform: `translate3d(0, ${translateY}px, 0)`,
          willChange: animate ? "transform" : "auto",
        }}
      >
        <Image
          src={cfUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
