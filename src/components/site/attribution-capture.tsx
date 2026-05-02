"use client";

import { useEffect } from "react";
import { captureUtmData } from "@/lib/utm-capture";

/**
 * Renders nothing. Calls captureUtmData() on first mount so UTM/click-id
 * params from the landing URL are seeded into sessionStorage before the
 * visitor navigates anywhere — including from /weddings to /book, or
 * from a tier card to the form.
 *
 * Mounted in the root layout next to <MetaPixel />.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureUtmData();
  }, []);
  return null;
}
