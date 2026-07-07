"use client";

import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { StackRenderer } from "@/components/visualizer/renderers/StackRenderer";
import { recursaoFatorial } from "@/lib/algorithms/recursion";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "fatorial",
    label: "Calcular fatorial(n)",
    inputs: [{ id: "n", label: "n (0 a 7)", type: "number", placeholder: "5" }],
    run: (state, values) => recursaoFatorial(state, Number(values.n)),
  },
];

const initialState: ArrayState = { items: [] };

export default function RecursividadePlayground() {
  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={StackRenderer}
      legend={[
        { label: "nova chamada", color: "var(--color-highlight-new)" },
        { label: "caso base", color: "var(--color-highlight-success)" },
        { label: "calculando ao retornar", color: "var(--color-highlight-compare)" },
      ]}
    />
  );
}
