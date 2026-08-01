import type { Person } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "./contact-form";

export function Contact({ person }: { person: Person }) {
  return (
    <section id="contact" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel number="05" label="Contact" />
          <h2 className="mb-10 max-w-lg font-display text-2xl font-medium text-text-primary sm:text-3xl">
            Have a project in mind, or just want to say hi?
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <BracketFrame>
              <ContactForm />
            </BracketFrame>
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
                    className="flex items-center gap-3 border border-border px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
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
