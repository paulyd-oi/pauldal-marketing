"use client";

import { useEffect } from "react";

type FbqWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

export function WeddingsPageView() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as FbqWindow;
    if (typeof w.fbq === "function") {
      w.fbq("track", "ViewContent", {
        content_name: "wedding-films",
        content_category: "weddings",
      });
    }
  }, []);
  return null;
}
