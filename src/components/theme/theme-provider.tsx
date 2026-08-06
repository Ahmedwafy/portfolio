"use client";

import { AccentId } from "@/lib/accent-palette";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  accent: AccentId | "default";
  setAccent: (accent: AccentId | "default") => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<AccentId | "default">(() => {
    try {
      const stored = window?.localStorage.getItem("accent") as AccentId | "default" | null;
      return stored ?? ("slate" as AccentId);
    } catch {
      return "slate" as AccentId;
    }
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSetAccent = (a: AccentId | "default") => {
    setAccent(a);
    try {
      window.localStorage.setItem("accent", a);
    } catch {
      /* ignore */
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, accent, setAccent: handleSetAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
