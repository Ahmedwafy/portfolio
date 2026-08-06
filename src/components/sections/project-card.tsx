"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/sanity";
import { TechIcon } from "@/components/ui/tech-icon";

const TAG_STYLES = [
  "bg-accent-soft text-accent",
  "bg-accent-2-soft text-accent-2",
  "bg-accent-3-soft text-accent-3",
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-panel"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.coverImage.asset.url}
            alt={project.coverImage.alt || project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="relative flex flex-1 flex-col p-6">
          <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-base leading-relaxed text-text-secondary">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={tech}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLES[i % TAG_STYLES.length]}`}
              >
                <TechIcon name={tech} size={12} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
