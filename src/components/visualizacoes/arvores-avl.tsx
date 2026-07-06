"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { TreeRenderer } from "@/components/visualizer/renderers/TreeRenderer";
import { makeTreeState } from "@/lib/algorithms/treeCommon";
import { avlInsert, avlSearch } from "@/lib/algorithms/avl";
import type { OperationDef, TreeState } from "@/lib/types";

const operations: OperationDef<TreeState>[] = [
  {
    id: "inserir",
    label: "Inserir valor",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => avlInsert(state, Number(values.value)),
  },
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "value", label: "Valor a buscar", type: "number", placeholder: "30" }],
    run: (state, values) => avlSearch(state, Number(values.value)),
  },
];

export default function ArvoresAvlPlayground() {
  const initialState = useMemo(() => makeTreeState([30, 20, 40, 10, 25]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={TreeRenderer}
      legend={[
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "desbalanceado", color: "var(--color-highlight-danger)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
        { label: "novo / nova raiz da subárvore", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
