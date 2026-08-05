export function SectionLabel({ label }: { number?: string; label: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-coral-soft px-4 py-1.5 text-sm font-semibold text-coral">
      {label}
    </div>
  );
}
