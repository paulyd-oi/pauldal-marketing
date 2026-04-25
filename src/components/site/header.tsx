"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0);
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
          scrolled
            ? "border-hairline bg-paper/80 backdrop-blur-sm"
            : "border-transparent bg-paper"
        )}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:h-20 lg:px-12">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-ink lg:text-xl"
          >
            Paul Dal Studio
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                  pathname === href
                    ? "text-oxblood underline decoration-1 underline-offset-4"
                    : "text-foreground/70 hover:text-oxblood"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/book"
              className="bg-oxblood font-body text-sm tracking-wide text-paper transition-colors duration-[180ms] hover:bg-oxblood-hover max-lg:px-4 max-lg:py-1.5 lg:px-5 lg:py-2"
            >
              Book
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
