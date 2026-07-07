import type { Highlight } from "./types";

const COLOR_VARS: Record<NonNullable<Highlight["color"]>, string> = {
  compare: "var(--color-highlight-compare)",
  visit: "var(--color-highlight-visit)",
  success: "var(--color-highlight-success)",
  danger: "var(--color-highlight-danger)",
  new: "var(--color-highlight-new)",
};

export function colorForHighlight(
  highlights: Highlight[] | undefined,
  id: string
): string | undefined {
  const found = highlights?.find((h) => h.id === id);
  if (!found) return undefined;
  return COLOR_VARS[found.color ?? "visit"];
}

export function hl(id: string, color: NonNullable<Highlight["color"]>): Highlight {
  return { id, color };
}
