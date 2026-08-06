import { PortableText } from "next-sanity";
import type { Experience as ExperienceType } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import { formatMonthYear } from "@/lib/date";

const TAG_STYLES = [
  "bg-accent-soft text-accent",
  "bg-accent-2-soft text-accent-2",
  "bg-accent-3-soft text-accent-3",
];

export function Experience({
  experience,
}: {
  experience: ExperienceType[];
}) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel label="Experience" />
          <h2 className="mb-12 max-w-lg font-display text-4xl font-bold text-text-primary sm:text-5xl">
            Where I&rsquo;ve worked
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6">
          {experience.map((entry, i) => (
            <Reveal key={entry._id} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-bg-panel p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {entry.isCurrent && (
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent-3" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-xl font-bold text-text-primary">
                        {entry.role}
                      </h3>
                      <p className="text-base text-text-secondary">
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
                  </div>
                  <p className="rounded-full bg-bg px-3 py-1.5 text-sm font-semibold text-text-muted">
                    {formatMonthYear(entry.startDate)} &mdash;{" "}
                    {entry.isCurrent
                      ? "Present"
                      : entry.endDate
                        ? formatMonthYear(entry.endDate)
                        : ""}
                  </p>
                </div>

                {entry.description && (
                  <div className="max-w-xl text-base leading-relaxed text-text-secondary [&_p]:mb-2">
                    <PortableText value={entry.description} />
                  </div>
                )}

                {entry.techStack && entry.techStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.techStack.map((tech, ti) => (
                      <span
                        key={tech}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLES[ti % TAG_STYLES.length]}`}
                      >
                        <TechIcon name={tech} size={12} />
                        {tech}
                      </span>
                    ))}
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
