"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, User, FolderGit2, Award, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Work", icon: FolderGit2 },
  { href: "#experience", label: "Experience", icon: Award },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Nav({ name }: { name: string }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-3">
        <Link
          href="/"
          className="hidden shrink-0 rounded-full border border-border bg-bg-panel/90 px-4 py-2.5 font-display text-sm font-bold tracking-tight text-text-primary shadow-lg backdrop-blur md:block"
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-bg-panel/90 p-1.5 text-sm font-semibold text-text-secondary shadow-lg backdrop-blur md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-bg hover:text-text-primary"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-bg-panel/90 p-1.5 shadow-lg backdrop-blur md:ml-0">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
