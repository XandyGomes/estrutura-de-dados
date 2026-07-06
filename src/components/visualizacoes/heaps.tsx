"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { HeapRenderer } from "@/components/visualizer/renderers/HeapRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { heapInsert, heapExtractMin } from "@/lib/algorithms/heap";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "inserir",
    label: "Inserir valor",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "5" }],
    run: (state, values) => heapInsert(state, Number(values.value)),
  },
  {
    id: "extrair",
    label: "Extrair mínimo",
    run: (state) => heapExtractMin(state),
  },
];

export default function HeapsPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 15, 30, 40, 50, 25]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={HeapRenderer}
      legend={[
        { label: "comparando / trocando", color: "var(--color-highlight-compare)" },
        { label: "restaurado / raiz", color: "var(--color-highlight-success)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "recém-movido", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
