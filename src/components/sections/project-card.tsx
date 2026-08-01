"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/sanity";
import { BracketFrame } from "@/components/ui/bracket-frame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link href={`/projects/${project.slug}`}>
        <BracketFrame className="h-full p-3">
          <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.coverImage.asset.url}
              alt={project.coverImage.alt || project.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="px-1 pb-1">
            <h3 className="mb-1.5 font-display text-base font-medium text-text-primary">
              {project.title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-teal">
              {project.techStack.slice(0, 4).join("  ·  ")}
            </div>
          </div>
        </BracketFrame>
      </Link>
    </motion.div>
  );
}
