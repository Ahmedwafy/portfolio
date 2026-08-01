import { getPerson, getProjects, getExperience } from "@/sanity/fetchers";
import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default async function Home() {
  const [person, projects, experience] = await Promise.all([
    getPerson(),
    getProjects(),
    getExperience(),
  ]);

  if (!person) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="max-w-sm font-mono text-sm text-text-muted">
          No person document found in Sanity. Add and publish your About Me
          entry in /studio to see the site.
        </p>
      </main>
    );
  }

  return (
    <>
      <Nav name={person.name} />
      <main>
        <Hero person={person} />
        <About person={person} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Contact person={person} />
      </main>
    </>
  );
}
