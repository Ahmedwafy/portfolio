"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import type { Person } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { SkillsPlayground } from "@/components/effects/skills-playground";

export function About({ person }: { person: Person }) {
  return (
    <section id="about" className="border-t border-border py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel label="About me" />
        </Reveal>

        <div className="grid gap-14 md:grid-cols-[260px_1fr]">
          {person.avatar?.asset?.url && (
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-border bg-bg-panel p-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src={person.avatar.asset.url}
                    alt={person.avatar.alt || person.name}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          )}

          <div>
            <Reveal delay={0.15}>
              <div className="max-w-xl space-y-4 text-lg leading-relaxed text-text-secondary [&_p]:mb-4">
                <PortableText value={person.bio} />
              </div>
            </Reveal>

            {person.skills && person.skills.length > 0 && (
              <Reveal delay={0.25}>
                <div className="mt-10">
                  <p className="mb-3 text-sm font-semibold text-text-muted">
                    Tools I reach for — drag them around
                  </p>
                  <SkillsPlayground skills={person.skills} />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
