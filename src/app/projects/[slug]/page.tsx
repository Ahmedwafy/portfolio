import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getPerson, getProjectBySlug, getProjectSlugs } from "@/sanity/fetchers";
import { Nav } from "@/components/layout/nav";

const TAG_STYLES = [
  "bg-coral-soft text-coral",
  "bg-gold-soft text-gold",
  "bg-teal-soft text-teal",
];

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project ? project.title : "Project not found",
    description: project?.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, person] = await Promise.all([
    getProjectBySlug(slug),
    getPerson(),
  ]);

  if (!project) notFound();

  return (
    <>
      {person && <Nav name={person.name} />}
      <main className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-coral"
        >
          <ArrowLeft size={16} />
          Back to work
        </Link>

        <h1 className="mb-4 font-display text-4xl font-bold text-text-primary sm:text-5xl">
          {project.title}
        </h1>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary">
          {project.summary}
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Live demo ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-border-strong px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-coral hover:text-coral"
            >
              Source code ↗
            </a>
          )}
        </div>

        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border">
          <Image
            src={project.coverImage.asset.url}
            alt={project.coverImage.alt || project.title}
            fill
            sizes="768px"
            className="object-cover"
            priority
          />
        </div>

        {project.description && (
          <div className="mb-10 max-w-2xl text-base leading-relaxed text-text-secondary [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
            <PortableText value={project.description} />
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={img.asset.url}
                  alt={img.alt || `${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-semibold text-text-muted">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={tech}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${TAG_STYLES[i % TAG_STYLES.length]}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
