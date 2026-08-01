import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-medium tracking-tight text-text-primary"
        >
          {name}
        </Link>
        <nav className="hidden items-center gap-6 font-mono text-xs tracking-[0.15em] text-text-secondary md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
