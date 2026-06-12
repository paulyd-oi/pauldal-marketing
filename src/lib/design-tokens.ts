// Brand value swap 2026-06: oxblood → deep green #1f3d2b. Token names
// kept (oxblood / oxbloodSoft) to avoid a 27-file rename across components;
// only the hex value moves. Future debt: rename to brand / brandSoft.
export const colors = {
  paper: "#faf8f3",
  ink: "#1a1a1a",
  oxblood: "#1f3d2b",
  oxbloodSoft: "#e1ebe4",
  hairline: "#d9ceb9",
  muted: "#6b5d52",
  whiteCard: "#ffffff",
  creamHover: "#f2ecde",
} as const;

export const fonts = {
  display: {
    family: "Fraunces",
    variable: "--font-display",
    weights: ["variable"] as const,
    axes: ["opsz", "SOFT"] as const,
  },
  body: {
    family: "IBM Plex Sans",
    variable: "--font-body",
    weights: [300, 400, 500, 600] as const,
  },
  mono: {
    family: "JetBrains Mono",
    variable: "--font-mono",
    weights: [400, 500] as const,
  },
} as const;

export const radius = {
  none: "0px",
} as const;

export type BrandColor = keyof typeof colors;
