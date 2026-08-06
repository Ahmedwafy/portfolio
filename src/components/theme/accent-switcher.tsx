"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { ACCENT_SWATCH, type AccentId } from "@/lib/accent-palette";

const OPTIONS: { id: AccentId; label: string }[] = [
  { id: "red", label: "Red" },
  { id: "blue", label: "Blue" },
  { id: "yellow", label: "Yellow" },
  { id: "purple", label: "Purple" },
];

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const { accent, setAccent } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 rounded-full border border-border bg-bg-panel px-3 py-2.5 shadow-lg"
          >
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccent(accent === opt.id ? "default" : opt.id)}
                aria-label={`${opt.label} theme`}
                aria-pressed={accent === opt.id}
                className="relative h-8 w-8 rounded-full transition-transform hover:scale-110"
                style={{ background: ACCENT_SWATCH[opt.id] }}
              >
                {accent === opt.id && (
                  <motion.span
                    layoutId="accent-ring"
                    className="absolute -inset-1 rounded-full ring-2 ring-text-primary"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close theme switcher" : "Open theme switcher"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-panel text-text-secondary shadow-lg transition-colors hover:text-coral"
      >
        {open ? <X size={18} /> : <Palette size={18} />}
      </button>
    </div>
  );
}
