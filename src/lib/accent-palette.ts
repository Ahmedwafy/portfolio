export type AccentId = "red" | "blue" | "yellow" | "purple";

const BASE_HUES: Record<AccentId, number> = {
  red: 355,
  blue: 214,
  yellow: 42,
  purple: 268,
};

export const ACCENT_SWATCH: Record<AccentId, string> = {
  red: "hsl(355, 75%, 52%)",
  blue: "hsl(214, 80%, 55%)",
  yellow: "hsl(42, 90%, 55%)",
  purple: "hsl(268, 65%, 58%)",
};

interface GeneratedPalette {
  bg: string;
  bgPanel: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderStrong: string;
  coral: string;
  coralSoft: string;
  gold: string;
  goldSoft: string;
  teal: string;
  tealSoft: string;
}

// Full theme swap driven by a single base hue: background, panels, text,
// borders, and the accent trio all shift together — not just accents —
// so each pick feels like a genuinely different themed look.
export function generateAccentPalette(
  accent: AccentId,
  mode: "light" | "dark"
): GeneratedPalette {
  const h = BASE_HUES[accent];
  const h2 = (h + 25) % 360;
  const h3 = (h + 180) % 360;

  if (mode === "light") {
    return {
      bg: `hsl(${h}, 35%, 97%)`,
      bgPanel: `hsl(${h}, 30%, 100%)`,
      textPrimary: `hsl(${h}, 30%, 11%)`,
      textSecondary: `hsl(${h}, 15%, 34%)`,
      textMuted: `hsl(${h}, 10%, 52%)`,
      border: `hsl(${h}, 25%, 88%)`,
      borderStrong: `hsl(${h}, 25%, 78%)`,

      coral: `hsl(${h}, 70%, 45%)`,
      coralSoft: `hsl(${h}, 75%, 93%)`,
      gold: `hsl(${h2}, 65%, 40%)`,
      goldSoft: `hsl(${h2}, 75%, 93%)`,
      teal: `hsl(${h3}, 50%, 38%)`,
      tealSoft: `hsl(${h3}, 55%, 92%)`,
    };
  }

  return {
    bg: `hsl(${h}, 35%, 7%)`,
    bgPanel: `hsl(${h}, 30%, 11%)`,
    textPrimary: `hsl(${h}, 20%, 95%)`,
    textSecondary: `hsl(${h}, 14%, 76%)`,
    textMuted: `hsl(${h}, 10%, 56%)`,
    border: `hsl(${h}, 25%, 20%)`,
    borderStrong: `hsl(${h}, 25%, 28%)`,

    coral: `hsl(${h}, 75%, 62%)`,
    coralSoft: `hsl(${h}, 45%, 18%)`,
    gold: `hsl(${h2}, 70%, 65%)`,
    goldSoft: `hsl(${h2}, 40%, 18%)`,
    teal: `hsl(${h3}, 55%, 60%)`,
    tealSoft: `hsl(${h3}, 32%, 16%)`,
  };
}
