"use client";

import { motion } from "motion/react";
import type { Highlight } from "@/lib/types";
import type { GraphState } from "@/lib/algorithms/graph";
import { colorForHighlight } from "@/lib/highlightColor";

const NODE_R = 22;

type Props = {
  state: GraphState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

function pointerLabelsFor(pointers: Record<string, string> | undefined, id: string) {
  if (!pointers) return [];
  return Object.entries(pointers)
    .filter(([, targetId]) => targetId === id)
    .map(([label]) => label);
}

export function GraphRenderer({ state, highlights, pointers }: Props) {
  const width = 440;
  const height = 300;

  return (
    <div className="overflow-x-auto px-4 py-6">
      <svg width={width} height={height} className="mx-auto block">
        {state.edges.map((edge) => {
          const from = state.nodes.find((n) => n.id === edge.fromId);
          const to = state.nodes.find((n) => n.id === edge.toId);
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          return (
            <g key={edge.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--color-border)"
                strokeWidth={2}
              />
              <rect x={midX - 11} y={midY - 9} width={22} height={16} rx={4} fill="var(--background)" />
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="central"
                className="select-none font-mono text-[10px]"
                fill="var(--color-muted)"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}
        {state.nodes.map((node) => {
          const color = colorForHighlight(highlights, node.id);
          const labels = pointerLabelsFor(pointers, node.id);
          return (
            <g key={node.id}>
              {labels.length > 0 && (
                <text
                  x={node.x}
                  y={node.y - NODE_R - 10}
                  textAnchor="middle"
                  className="select-none font-mono text-[11px] font-semibold"
                  fill="var(--color-primary)"
                >
                  {labels.join(" / ")}
                </text>
              )}
              <motion.circle
                animate={{ fill: color ?? "var(--color-surface)" }}
                transition={{ duration: 0.3 }}
                cx={node.x}
                cy={node.y}
                r={NODE_R}
                stroke="var(--color-border)"
                strokeWidth={2}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="select-none font-mono text-sm font-semibold"
                fill={color ? "#1a1206" : "var(--color-foreground)"}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
