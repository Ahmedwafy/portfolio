import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-text-secondary last:mb-0">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-coral underline underline-offset-4 hover:text-coral/80"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-text-primary">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-text-secondary">
        {children}
      </ul>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-sm">
      <PortableText value={value} components={components} />
    </div>
  );
}
