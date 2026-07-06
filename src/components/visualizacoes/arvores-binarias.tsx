"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { TreeRenderer } from "@/components/visualizer/renderers/TreeRenderer";
import { makeTreeState } from "@/lib/algorithms/treeCommon";
import { bstInsert, bstSearch, bstRemove, bstTraverse } from "@/lib/algorithms/bst";
import type { OperationDef, TreeState } from "@/lib/types";

const operations: OperationDef<TreeState>[] = [
  {
    id: "inserir",
    label: "Inserir valor",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => bstInsert(state, Number(values.value)),
  },
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "value", label: "Valor a buscar", type: "number", placeholder: "40" }],
    run: (state, values) => bstSearch(state, Number(values.value)),
  },
  {
    id: "remover",
    label: "Remover valor",
    inputs: [{ id: "value", label: "Valor a remover", type: "number", placeholder: "40" }],
    run: (state, values) => bstRemove(state, Number(values.value)),
  },
  {
    id: "pre-ordem",
    label: "Percurso pré-ordem",
    run: (state) => bstTraverse(state, "pre"),
  },
  {
    id: "em-ordem",
    label: "Percurso em ordem",
    run: (state) => bstTraverse(state, "in"),
  },
  {
    id: "pos-ordem",
    label: "Percurso pós-ordem",
    run: (state) => bstTraverse(state, "pos"),
  },
];

export default function ArvoresBinariasPlayground() {
  const initialState = useMemo(() => makeTreeState([50, 30, 70, 20, 40, 60, 80]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={TreeRenderer}
      legend={[
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "visitado", color: "var(--color-highlight-visit)" },
        { label: "encontrado / atual", color: "var(--color-highlight-success)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
