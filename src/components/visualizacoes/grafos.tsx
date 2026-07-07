"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { GraphRenderer } from "@/components/visualizer/renderers/GraphRenderer";
import { makeGraphState, graphBFS, graphDFS } from "@/lib/algorithms/graph";
import { graphDijkstra } from "@/lib/algorithms/dijkstra";
import type { GraphState } from "@/lib/algorithms/graph";
import type { OperationDef } from "@/lib/types";

const operations: OperationDef<GraphState>[] = [
  {
    id: "bfs",
    label: "BFS (busca em largura)",
    inputs: [{ id: "start", label: "Nó inicial (A-F)", type: "text", placeholder: "A" }],
    run: (state, values) => graphBFS(state, values.start ?? ""),
  },
  {
    id: "dfs",
    label: "DFS (busca em profundidade)",
    inputs: [{ id: "start", label: "Nó inicial (A-F)", type: "text", placeholder: "A" }],
    run: (state, values) => graphDFS(state, values.start ?? ""),
  },
  {
    id: "dijkstra",
    label: "Dijkstra (caminho mínimo)",
    inputs: [{ id: "start", label: "Nó inicial (A-F)", type: "text", placeholder: "A" }],
    run: (state, values) => graphDijkstra(state, values.start ?? ""),
  },
];

export default function GrafosPlayground() {
  const initialState = useMemo(() => makeGraphState(), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={GraphRenderer}
      legend={[
        { label: "atual", color: "var(--color-highlight-compare)" },
        { label: "na fila/pilha", color: "var(--color-highlight-new)" },
        { label: "visitado", color: "var(--color-highlight-visit)" },
        { label: "concluído", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
