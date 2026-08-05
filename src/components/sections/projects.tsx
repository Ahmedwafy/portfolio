import type { Project } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="border-t border-border py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel label="Selected work" />
          <h2 className="mb-12 max-w-lg font-display text-4xl font-bold text-text-primary sm:text-5xl">
            Things I&rsquo;ve built
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project._id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
