export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-text-muted">
      <span className="text-accent">SEC.{number}</span>
      <span className="h-px flex-1 max-w-8 bg-border-strong" />
      <span>{label.toUpperCase()}</span>
    </div>
  );
}
