"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  title: string;
  description: string;
}

export const DEFAULT_ACCORDION_ITEMS: AccordionItem[] = [
  {
    title: "Discovery call",
    description:
      "Pre-project call to align on creative direction, timeline, and key moments. I read the brief, then we talk it through.",
  },
  {
    title: "On-location coverage",
    description:
      "I shoot in pairs when timeline allows — one with you, one capturing the moments you're not in. Backup gear always on hand.",
  },
  {
    title: "Editorial editing",
    description:
      "Every image hand-edited. No auto-presets. The edit favors story over symmetry.",
  },
  {
    title: "Online gallery",
    description:
      "Private password-protected gallery for sharing and downloading full-resolution files. Yours forever.",
  },
  {
    title: "Same-day teaser delivery",
    description:
      "10–15 hand-picked images delivered within 24 hours so you can share immediately.",
  },
  {
    title: "Full delivery in 2–4 weeks",
    description:
      "Most projects deliver in 2–4 weeks. Weddings 4–6 weeks. I'll give you a clear timeline upfront.",
  },
  {
    title: "Print release",
    description:
      "Full personal print release on all delivered images. Print, frame, share — no restrictions.",
  },
  {
    title: "Video options available",
    description:
      "Hybrid photo + video offered on every service. Same shoot, two unified deliverables.",
  },
];

export function ServicesAccordion({
  items = DEFAULT_ACCORDION_ITEMS,
}: {
  items?: AccordionItem[];
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.title} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
            >
              <h4 className="font-display text-xl text-ink">{item.title}</h4>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ink/40 transition-transform duration-200 motion-reduce:transition-none ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 motion-reduce:transition-none ${
                isOpen ? "max-h-60 pb-6" : "max-h-0"
              }`}
            >
              <p className="font-body text-base leading-relaxed text-ink/70">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
