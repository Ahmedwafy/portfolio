"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import type { Person } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { Reveal } from "@/components/ui/reveal";

export function About({ person }: { person: Person }) {
  return (
    <section id="about" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel number="02" label="About" />
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          {person.avatar?.asset?.url && (
            <Reveal delay={0.1}>
              <BracketFrame className="p-2">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={person.avatar.asset.url}
                    alt={person.avatar.alt || person.name}
                    fill
                    sizes="220px"
                    className="object-cover grayscale"
                  />
                </div>
              </BracketFrame>
            </Reveal>
          )}

          <div>
            <Reveal delay={0.15}>
              <div className="prose-sm max-w-xl space-y-4 text-sm leading-relaxed text-text-secondary [&_p]:mb-4">
                <PortableText value={person.bio} />
              </div>
            </Reveal>

            {person.skills && person.skills.length > 0 && (
              <Reveal delay={0.25}>
                <div className="mt-10">
                  <p className="mb-3 font-mono text-xs tracking-[0.15em] text-text-muted">
                    STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-border px-3 py-1.5 font-mono text-xs text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
