import type { FrameSequence, Highlight, OperationResult } from "@/lib/types";
import { neighborsOf, type GraphState } from "./graph";

function hl(id: string, color: NonNullable<Highlight["color"]>): Highlight {
  return { id, color };
}

function formatDist(dist: Record<string, number>, nodeIds: string[]): string {
  return nodeIds.map((id) => `${id}=${dist[id] === Infinity ? "∞" : dist[id]}`).join(", ");
}

export function graphDijkstra(state: GraphState, startIdRaw: string): OperationResult<GraphState> {
  const startId = startIdRaw.trim().toUpperCase();
  if (!state.nodes.some((n) => n.id === startId)) {
    return { ok: false, error: `Nó "${startId}" não existe. Use uma letra de A a F.` };
  }

  const nodeIds = state.nodes.map((n) => n.id);
  const dist: Record<string, number> = {};
  nodeIds.forEach((id) => (dist[id] = id === startId ? 0 : Infinity));
  const visited = new Set<string>();

  const frames: FrameSequence<GraphState> = [
    {
      id: 0,
      state,
      pointers: { atual: startId },
      narration: `Iniciando Dijkstra a partir de ${startId}. Distâncias: ${formatDist(dist, nodeIds)}.`,
    },
  ];

  while (visited.size < nodeIds.length) {
    let currentId: string | null = null;
    let best = Infinity;
    for (const id of nodeIds) {
      if (!visited.has(id) && dist[id] < best) {
        best = dist[id];
        currentId = id;
      }
    }
    if (currentId === null) break;

    visited.add(currentId);
    frames.push({
      id: frames.length,
      state,
      highlights: [...visited].map((id) => hl(id, id === currentId ? "compare" : "success")),
      pointers: { atual: currentId },
      narration: `Processando ${currentId} (distância definitiva: ${dist[currentId]}).`,
    });

    for (const { id: neighborId, weight } of neighborsOf(state, currentId)) {
      if (visited.has(neighborId)) continue;
      const newDist = dist[currentId] + weight;
      if (newDist < dist[neighborId]) {
        const old = dist[neighborId];
        dist[neighborId] = newDist;
        frames.push({
          id: frames.length,
          state,
          highlights: [...visited]
            .map((id) => hl(id, "success"))
            .concat([hl(neighborId, "new")]),
          pointers: { atual: currentId },
          narration: `Relaxando aresta ${currentId}-${neighborId} (peso ${weight}): ${old === Infinity ? "∞" : old} → ${newDist}. Distâncias: ${formatDist(dist, nodeIds)}.`,
        });
      }
    }
  }

  frames.push({
    id: frames.length,
    state,
    highlights: nodeIds.map((id) => hl(id, "success")),
    narration: `Dijkstra concluído. Distâncias finais a partir de ${startId}: ${formatDist(dist, nodeIds)}.`,
  });
  return { ok: true, frames, nextState: state };
}
