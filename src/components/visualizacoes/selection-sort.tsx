"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { selectionSort } from "@/lib/algorithms/selectionSort";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "ordenar",
    label: "Ordenar com Selection Sort",
    run: (state) => selectionSort(state),
  },
];

export default function SelectionSortPlayground() {
  const initialState = useMemo(() => makeArrayState([5, 2, 8, 1, 9, 3]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ArrayRenderer}
      legend={[
        { label: "menor atual", color: "var(--color-highlight-visit)" },
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "trocando", color: "var(--color-highlight-new)" },
        { label: "posição final", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
