"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { SparseMatrixRenderer } from "@/components/visualizer/renderers/SparseMatrixRenderer";
import { makeSparseMatrixState, gerarRepresentacaoEsparsa } from "@/lib/algorithms/sparseMatrix";
import type { SparseMatrixState } from "@/lib/algorithms/sparseMatrix";
import type { OperationDef } from "@/lib/types";

const operations: OperationDef<SparseMatrixState>[] = [
  {
    id: "gerar",
    label: "Gerar representação esparsa",
    run: (state) => gerarRepresentacaoEsparsa(state),
  },
];

export default function MatrizEsparsaPlayground() {
  const initialState = useMemo(() => makeSparseMatrixState(), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={SparseMatrixRenderer}
      legend={[
        { label: "verificando", color: "var(--color-highlight-compare)" },
        { label: "não-zero (na lista esparsa)", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
