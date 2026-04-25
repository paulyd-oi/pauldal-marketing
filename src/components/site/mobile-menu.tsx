"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/book", label: "Book" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
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
              className="text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-8">
            {MENU_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "font-display text-3xl py-6 transition-colors duration-[180ms]",
                  pathname === href
                    ? "text-oxblood"
                    : "text-ink hover:text-oxblood"
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
