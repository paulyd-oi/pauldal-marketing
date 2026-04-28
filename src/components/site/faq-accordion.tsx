"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
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
    <section className="bg-paper px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-3xl flex-col">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <div key={item.question} className="border-b border-hairline py-5">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="focus-ring flex w-full cursor-pointer items-center justify-between text-left"
              >
                <span className="font-display text-sm uppercase tracking-widest text-ink">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-ink/40 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="font-body text-base leading-relaxed text-ink/70">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
