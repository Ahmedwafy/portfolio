import { PortableText } from "next-sanity";
import type { Experience as ExperienceType } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { formatMonthYear } from "@/lib/date";

const TAG_STYLES = [
  "bg-coral-soft text-coral",
  "bg-gold-soft text-gold",
  "bg-teal-soft text-teal",
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
              <div className="rounded-3xl border border-border bg-bg-panel p-8">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {entry.isCurrent && (
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-teal" />
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
                            className="hover:text-coral"
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
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLES[ti % TAG_STYLES.length]}`}
                      >
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
