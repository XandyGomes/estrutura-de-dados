"use client";

import { motion } from "motion/react";
import type { Highlight } from "@/lib/types";
import type { SparseMatrixState } from "@/lib/algorithms/sparseMatrix";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: SparseMatrixState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

export function SparseMatrixRenderer({ state, highlights }: Props) {
  const sparseCells = state.cells.filter((c) =>
    highlights?.some((h) => h.id === c.id && h.color === "success")
  );

  return (
    <div className="flex flex-col gap-6 p-4 lg:flex-row lg:items-start">
      <div>
        <div className="mb-2 text-xs text-[var(--color-muted)]">
          Matriz densa ({state.rows}×{state.cols})
        </div>
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${state.cols}, minmax(0,1fr))` }}
        >
          {state.cells.map((cell) => {
            const color = colorForHighlight(highlights, cell.id);
            return (
              <motion.div
                key={cell.id}
                animate={{ backgroundColor: color ?? "var(--color-surface)" }}
                transition={{ duration: 0.25 }}
                className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-[var(--color-border)] font-mono text-sm font-semibold"
                style={{ color: color ? "#1a1206" : cell.value !== 0 ? "var(--color-foreground)" : "var(--color-muted)" }}
              >
                {cell.value}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs text-[var(--color-muted)]">
          Representação esparsa (linha, coluna, valor)
        </div>
        <div className="min-w-52 overflow-hidden rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] text-xs text-[var(--color-muted)]">
                <th className="px-3 py-1.5 text-left font-medium">linha</th>
                <th className="px-3 py-1.5 text-left font-medium">coluna</th>
                <th className="px-3 py-1.5 text-left font-medium">valor</th>
              </tr>
            </thead>
            <tbody>
              {sparseCells.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-xs text-[var(--color-muted)]">
                    vazia
                  </td>
                </tr>
              )}
              {sparseCells.map((c) => (
                <tr key={c.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-3 py-1.5 font-mono">{c.row}</td>
                  <td className="px-3 py-1.5 font-mono">{c.col}</td>
                  <td className="px-3 py-1.5 font-mono font-semibold text-[var(--color-highlight-success)]">
                    {c.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
