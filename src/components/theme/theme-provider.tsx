"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  generateAccentPalette,
  type AccentId,
} from "@/lib/accent-palette";

type Theme = "light" | "dark";
type Accent = AccentId | "default";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  accent: Accent;
  setAccent: Dispatch<SetStateAction<Accent>>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const OVERRIDE_VARS = [
  "--bg",
  "--bg-panel",
  "--text-primary",
  "--text-secondary",
  "--text-muted",
  "--border",
  "--border-strong",
  "--coral",
  "--coral-soft",
  "--gold",
  "--gold-soft",
  "--teal",
  "--teal-soft",
] as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<Accent>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- theme must be read from localStorage/matchMedia, which only exist client-side after mount
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Accent theme is intentionally NOT persisted — resets to the
  // curated default palette on every fresh visit/reload.
  useEffect(() => {
    const root = document.documentElement.style;
    if (accent === "default") {
      OVERRIDE_VARS.forEach((v) => root.removeProperty(v));
      return;
    }
    const p = generateAccentPalette(accent, theme);
    root.setProperty("--bg", p.bg);
    root.setProperty("--bg-panel", p.bgPanel);
    root.setProperty("--text-primary", p.textPrimary);
    root.setProperty("--text-secondary", p.textSecondary);
    root.setProperty("--text-muted", p.textMuted);
    root.setProperty("--border", p.border);
    root.setProperty("--border-strong", p.borderStrong);
    root.setProperty("--coral", p.coral);
    root.setProperty("--coral-soft", p.coralSoft);
    root.setProperty("--gold", p.gold);
    root.setProperty("--gold-soft", p.goldSoft);
    root.setProperty("--teal", p.teal);
    root.setProperty("--teal-soft", p.tealSoft);
  }, [accent, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
