import { PortableText } from "next-sanity";
import type { Experience as ExperienceType } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { formatMonthYear } from "@/lib/date";

export function Experience({
  experience,
}: {
  experience: ExperienceType[];
}) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel number="04" label="Experience" />
        </Reveal>

        <div className="mt-4 border-l border-border">
          {experience.map((entry, i) => (
            <Reveal key={entry._id} delay={i * 0.1}>
              <div className="relative border-b border-border py-8 pl-8 last:border-b-0">
                <span
                  className={`absolute -left-[5px] top-9 h-[9px] w-[9px] rounded-full ${
                    entry.isCurrent ? "bg-teal" : "bg-border-strong"
                  }`}
                />
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-medium text-text-primary">
                      {entry.role}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {entry.companyUrl ? (
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent"
                        >
                          {entry.company}
                        </a>
                      ) : (
                        entry.company
                      )}
                    </p>
                  </div>
                  <p className="font-mono text-xs tracking-wide text-text-muted">
                    {formatMonthYear(entry.startDate)} &mdash;{" "}
                    {entry.isCurrent
                      ? "Present"
                      : entry.endDate
                        ? formatMonthYear(entry.endDate)
                        : ""}
                  </p>
                </div>

                {entry.description && (
                  <div className="max-w-xl text-sm leading-relaxed text-text-secondary [&_p]:mb-2">
                    <PortableText value={entry.description} />
                  </div>
                )}

                {entry.techStack && entry.techStack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-teal">
                    {entry.techStack.join("  ·  ")}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
