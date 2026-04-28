"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mirrors the desktop services dropdown — link list is provided by the
// parent (server-fetched in src/components/site/header.tsx) so dynamic
// visibility (Option C) reflects which categories currently have
// galleries. Indented entries render as nested taxonomy categories.
export type MobileMenuLink = { href: string; label: string; indent: boolean };

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: MobileMenuLink[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!open) return;

    previousActiveRef.current = document.activeElement as HTMLElement | null;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => !el.hasAttribute("disabled")
      );

    const focusable = getFocusable();
    focusable[0]?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    previousActiveRef.current?.focus?.();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] bg-paper lg:hidden"
          initial={prefersReduced ? false : { x: "100%" }}
          animate={{ x: 0 }}
          exit={prefersReduced ? undefined : { x: "100%" }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.28, ease: [0, 0, 0.2, 1] }
          }
        >
          <div className="flex h-16 items-center justify-end px-6">
            <button
              onClick={onClose}
              className="focus-ring text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-8">
            {links.map(({ href, label, indent }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "focus-ring transition-colors duration-[180ms]",
                  indent
                    ? "py-3 pl-6 font-body text-xl text-ink/70"
                    : "py-5 font-display text-3xl text-ink",
                  pathname === href
                    ? "text-oxblood"
                    : "hover:text-oxblood"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
