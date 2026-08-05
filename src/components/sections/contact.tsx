import type { Person } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "./contact-form";

export function Contact({ person }: { person: Person }) {
  return (
    <section id="contact" className="border-t border-border py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel label="Get in touch" />
          <h2 className="mb-12 max-w-lg font-display text-4xl font-bold text-text-primary sm:text-5xl">
            Have a project in mind?
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-bg-panel p-8">
              <ContactForm />
            </div>
          </Reveal>

          {person.socialLinks && person.socialLinks.length > 0 && (
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3">
                {person.socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border bg-bg-panel px-5 py-4 text-base font-semibold text-text-secondary transition-colors hover:border-coral hover:text-coral"
                  >
                    <SocialIcon platform={link.platform} />
                    {link.platform}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
