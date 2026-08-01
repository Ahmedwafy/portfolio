import type { Project } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel number="03" label="Work" />
          <h2 className="mb-10 max-w-lg font-display text-2xl font-medium text-text-primary sm:text-3xl">
            Selected projects
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
