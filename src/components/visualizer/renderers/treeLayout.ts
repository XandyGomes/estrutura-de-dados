import type { TreeState } from "@/lib/types";

export type TreeLayout = {
  positions: Record<string, { x: number; y: number }>;
  count: number;
  maxDepth: number;
};

export function computeTreeLayout(state: TreeState): TreeLayout {
  const positions: Record<string, { x: number; y: number }> = {};
  let counter = 0;
  let maxDepth = 0;

  function visit(id: string | null, depth: number) {
    if (!id) return;
    const node = state.nodes[id];
    visit(node.leftId, depth + 1);
    positions[id] = { x: counter, y: depth };
    counter += 1;
    maxDepth = Math.max(maxDepth, depth);
    visit(node.rightId, depth + 1);
  }

  visit(state.rootId, 0);
  return { positions, count: counter, maxDepth };
}
