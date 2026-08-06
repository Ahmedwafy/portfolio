"use client";

import { motion } from "framer-motion";
import type { Person } from "@/types/sanity";
import { portableTextPreview } from "@/lib/portable-text";
import { SocialIcon } from "@/components/ui/social-icon";
import { ConstellationBackground } from "@/components/effects/constellation-background";

export function Hero({ person }: { person: Person }) {
  const eyebrow = (person.skills ?? []).slice(0, 3).join("   ·   ");
  const subtext = portableTextPreview(person.bio, 180);

  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-20"
    >
      <ConstellationBackground density={45} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 30%, var(--color-bg) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-3-soft px-4 py-2 text-sm font-semibold text-accent-3"
          >
            <span className="h-2 w-2 rounded-full bg-accent-3" />
            {eyebrow}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
        >
          {person.headline}
        </motion.h1>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-text-secondary"
          >
            {subtext}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            View work
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-border-strong px-7 py-3.5 text-base font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Contact
          </a>
          {person.resumeUrl && (
            <a
              href={person.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Resume ↗
            </a>
          )}
        </motion.div>

        {person.socialLinks && person.socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-14 flex items-center gap-4"
          >
            {person.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
