"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

const cornerBase =
  "absolute h-3 w-3 border-coral/40 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:border-coral";

export function BracketFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative border border-border p-5", className)}>
      <span
        className={cn(cornerBase, "-top-px -left-px border-t-2 border-l-2")}
      />
      <span
        className={cn(cornerBase, "-top-px -right-px border-t-2 border-r-2")}
      />
      <span
        className={cn(
          cornerBase,
          "-bottom-px -left-px border-b-2 border-l-2"
        )}
      />
      <span
        className={cn(
          cornerBase,
          "-bottom-px -right-px border-b-2 border-r-2"
        )}
      />
      {children}
    </div>
  );
}
