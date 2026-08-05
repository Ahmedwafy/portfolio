"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/sanity";

const TAG_STYLES = [
  "bg-coral-soft text-coral",
  "bg-gold-soft text-gold",
  "bg-teal-soft text-teal",
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
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-panel"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.coverImage.asset.url}
            alt={project.coverImage.alt || project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
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
                className={`rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLES[i % TAG_STYLES.length]}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
