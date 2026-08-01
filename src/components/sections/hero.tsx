"use client";

import { motion } from "framer-motion";
import type { Person } from "@/types/sanity";
import { portableTextPreview } from "@/lib/portable-text";
import { SocialIcon } from "@/components/ui/social-icon";

export function Hero({ person }: { person: Person }) {
  const eyebrow = (person.skills ?? []).slice(0, 4).join("  ·  ");
  const subtext = portableTextPreview(person.bio, 170);

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-mono text-xs tracking-[0.2em] text-accent"
          >
            {eyebrow.toUpperCase()}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl font-display text-4xl font-medium leading-[1.15] tracking-tight text-text-primary sm:text-5xl"
        >
          {person.headline}
          <motion.span
            aria-hidden
            className="text-accent"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          >
            _
          </motion.span>
        </motion.h1>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary"
          >
            {subtext}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="border border-accent px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="border border-border-strong px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            CONTACT
          </a>
          {person.resumeUrl && (
            <a
              href={person.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-[0.15em] text-text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
            >
              RESUME ↗
            </a>
          )}
        </motion.div>

        {person.socialLinks && person.socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-12 flex items-center gap-4 text-text-muted"
          >
            {person.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="transition-colors hover:text-accent"
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
