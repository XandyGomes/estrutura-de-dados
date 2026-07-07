"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { mergeSort } from "@/lib/algorithms/mergeSort";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "ordenar",
    label: "Ordenar com Merge Sort",
    run: (state) => mergeSort(state),
  },
];

export default function MergeSortPlayground() {
  const initialState = useMemo(() => makeArrayState([5, 2, 8, 1, 9, 3]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ArrayRenderer}
      legend={[
        { label: "dividindo", color: "var(--color-highlight-compare)" },
        { label: "metade esquerda", color: "var(--color-highlight-visit)" },
        { label: "metade direita", color: "var(--color-highlight-compare)" },
        { label: "intercalado", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
