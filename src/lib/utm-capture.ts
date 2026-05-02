"use client";

// Marketing attribution capture. Reads UTM/click-id parameters from the
// current URL on first landing, then persists them to sessionStorage so
// that an ad → /weddings → /book multi-page journey still carries the
// original campaign source on form submission.
//
// Mounted at landing time via <AttributionCapture /> in the root layout,
// and consumed at submit time by book-form via captureUtmData().

export interface UtmData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  landingPath?: string;
  referrer?: string;
}

interface StoredUtm extends UtmData {
  capturedAt: number;
}

const STORAGE_KEY = "pds_utm";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function readUrlParams(): UtmData {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
  };
}

function hasAny(data: UtmData): boolean {
  return Object.values(data).some((v) => v !== undefined);
}

function readStored(): StoredUtm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredUtm;
    if (!parsed?.capturedAt || Date.now() - parsed.capturedAt > TTL_MS) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(data: UtmData): void {
  if (typeof window === "undefined") return;
  try {
    const stored: StoredUtm = { ...data, capturedAt: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // sessionStorage may be unavailable (private browsing, quota) — non-fatal.
  }
}

/**
 * Capture UTM/attribution data. Call once on initial landing (via the
 * AttributionCapture component) to seed sessionStorage; call again at
 * form submit time to read the seeded values.
 *
 * Precedence: fresh URL params > sessionStorage (within 24h TTL) >
 * current page state alone (landingPath + referrer for organic/direct).
 */
export function captureUtmData(): UtmData {
  if (typeof window === "undefined") return {};

  const fromUrl = readUrlParams();
  const landingPath = window.location.pathname;
  const referrer = document.referrer || undefined;

  if (hasAny(fromUrl)) {
    const next: UtmData = { ...fromUrl, landingPath, referrer };
    writeStored(next);
    return next;
  }

  const stored = readStored();
  if (stored) {
    return {
      utmSource: stored.utmSource,
      utmMedium: stored.utmMedium,
      utmCampaign: stored.utmCampaign,
      utmContent: stored.utmContent,
      utmTerm: stored.utmTerm,
      gclid: stored.gclid,
      fbclid: stored.fbclid,
      landingPath: stored.landingPath,
      referrer: stored.referrer,
    };
  }

  // No fresh UTM and no stored attribution — return current page state for
  // organic / direct attribution.
  return { landingPath, referrer };
}
