import type { PortableTextBlock } from "next-sanity";

export function portableTextPreview(
  blocks: PortableTextBlock[] | undefined,
  maxChars = 160
): string {
  if (!blocks || blocks.length === 0) return "";

  const firstBlock = blocks.find((block) => block._type === "block");
  if (!firstBlock || !("children" in firstBlock)) return "";

  const text = (
    firstBlock.children as Array<{ text?: string }>
  )
    .map((child) => child.text ?? "")
    .join("");

  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + "…";
}
