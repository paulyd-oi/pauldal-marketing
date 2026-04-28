// Locked Cloudflare image IDs for /about + brand-content surfaces.
// These IDs come from the "About Paul" PERSONAL gallery in FRAME.
// If a photo is deleted or replaced in FRAME, update here.
//
// Why hardcoded IDs and not "first 5 photos":
// - Deterministic narrative pairing (Beat 3 must be the Awaken 2030 clapperboard photo)
// - Survives admin drag-sort reordering
// - Falls back gracefully when getPersonalPhotoByCfId returns null

export const ABOUT_PHOTO_IDS = {
  hero: "8cc114f6-102f-4cea-37c2-779252b6bb00",
  personImage: "2be78c22-00fd-452f-34c1-229b70005a00",
  beat1: "ba107fac-8d18-48dc-a885-960a0a3b5400",
  beat2: "1df59cdf-519c-42f0-9887-e6f5514c9b00",
  beat3: "c4751a29-7908-4127-9ab1-781761b7db00",
  beat4: "66855c5a-5f1b-4ee1-b09a-701ca2dccd00",
} as const;

export type AboutPhotoKey = keyof typeof ABOUT_PHOTO_IDS;
