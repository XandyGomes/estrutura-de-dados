"use client";

import { motion } from "motion/react";
import type { TreeState, Highlight } from "@/lib/types";
import { colorForHighlight } from "@/lib/highlightColor";
import { computeTreeLayout } from "./treeLayout";

const NODE_R = 20;
const X_SPACING = 56;
const Y_SPACING = 72;
const PADDING = 40;

type Props = {
  state: TreeState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

function pointerLabelsFor(pointers: Record<string, string> | undefined, id: string) {
  if (!pointers) return [];
  return Object.entries(pointers)
    .filter(([, targetId]) => targetId === id)
    .map(([label]) => label);
}

export function TreeRenderer({ state, highlights, pointers }: Props) {
  if (!state.rootId) {
    return (
      <div className="px-4 py-16 text-center text-sm text-[var(--color-muted)]">
        Árvore vazia.
      </div>
    );
  }

  const { positions, count, maxDepth } = computeTreeLayout(state);
  const toX = (i: number) => i * X_SPACING + PADDING;
  const toY = (d: number) => d * Y_SPACING + PADDING;
  const width = Math.max(count * X_SPACING + PADDING * 2 - X_SPACING, 200);
  const height = (maxDepth + 1) * Y_SPACING + PADDING;

  const edges: { key: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  const visibleNodes = Object.values(state.nodes).filter((n) => positions[n.id]);
  visibleNodes.forEach((node) => {
    const p = positions[node.id];
    if (node.leftId && positions[node.leftId]) {
      const c = positions[node.leftId];
      edges.push({ key: `${node.id}-L`, x1: toX(p.x), y1: toY(p.y), x2: toX(c.x), y2: toY(c.y) });
    }
    if (node.rightId && positions[node.rightId]) {
      const c = positions[node.rightId];
      edges.push({ key: `${node.id}-R`, x1: toX(p.x), y1: toY(p.y), x2: toX(c.x), y2: toY(c.y) });
    }
  });

  return (
    <div className="overflow-x-auto px-4 py-6">
      <svg width={width} height={height} className="mx-auto block">
        {edges.map((e) => (
          <motion.line
            key={e.key}
            initial={false}
            animate={{ x1: e.x1, y1: e.y1, x2: e.x2, y2: e.y2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            stroke="var(--color-border)"
            strokeWidth={2}
          />
        ))}
        {visibleNodes.map((node) => {
          const p = positions[node.id];
          const cx = toX(p.x);
          const cy = toY(p.y);
          const color = colorForHighlight(highlights, node.id);
          const labels = pointerLabelsFor(pointers, node.id);
          return (
            <motion.g key={node.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.circle
                initial={false}
                animate={{ cx, cy, fill: color ?? "var(--color-surface)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                r={NODE_R}
                stroke="var(--color-border)"
                strokeWidth={2}
              />
              <motion.text
                initial={false}
                animate={{ x: cx, y: cy }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                textAnchor="middle"
                dominantBaseline="central"
                className="select-none font-mono text-[13px] font-semibold"
                fill={color ? "#1a1206" : "var(--color-foreground)"}
              >
                {node.value}
              </motion.text>
              {labels.length > 0 && (
                <text
                  x={cx}
                  y={cy - NODE_R - 10}
                  textAnchor="middle"
                  className="select-none font-mono text-[11px] font-semibold"
                  fill="var(--color-primary)"
                >
                  {labels.join(" / ")}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
