import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { getPerson, getProjectBySlug, getProjectSlugs } from "@/sanity/fetchers";
import { Nav } from "@/components/layout/nav";

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
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/#projects"
          className="mb-10 inline-block font-mono text-xs tracking-[0.15em] text-text-muted transition-colors hover:text-accent"
        >
          &larr; BACK TO WORK
        </Link>

        <h1 className="mb-3 font-display text-3xl font-medium text-text-primary sm:text-4xl">
          {project.title}
        </h1>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-text-secondary">
          {project.summary}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent px-4 py-2 font-mono text-xs tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              LIVE DEMO ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-strong px-4 py-2 font-mono text-xs tracking-[0.15em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              SOURCE CODE ↗
            </a>
          )}
        </div>

        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden border border-border">
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
          <div className="mb-10 max-w-2xl text-sm leading-relaxed text-text-secondary [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-text-primary [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
            <PortableText value={project.description} />
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden border border-border"
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
          <p className="mb-3 font-mono text-xs tracking-[0.15em] text-text-muted">
            STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-border px-3 py-1.5 font-mono text-xs text-text-secondary"
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
