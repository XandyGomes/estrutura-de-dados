import type { FrameSequence, Highlight, OperationResult } from "@/lib/types";

function hl(id: string, color: NonNullable<Highlight["color"]>): Highlight {
  return { id, color };
}

export type GraphNode = {
  id: string;
  x: number;
  y: number;
};

export type GraphEdge = {
  id: string;
  fromId: string;
  toId: string;
  weight: number;
};

export type GraphState = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function makeGraphState(): GraphState {
  return {
    nodes: [
      { id: "A", x: 60, y: 150 },
      { id: "B", x: 175, y: 55 },
      { id: "C", x: 175, y: 245 },
      { id: "D", x: 300, y: 55 },
      { id: "E", x: 300, y: 245 },
      { id: "F", x: 400, y: 150 },
    ],
    edges: [
      { id: "A-B", fromId: "A", toId: "B", weight: 4 },
      { id: "A-C", fromId: "A", toId: "C", weight: 2 },
      { id: "B-D", fromId: "B", toId: "D", weight: 5 },
      { id: "C-D", fromId: "C", toId: "D", weight: 8 },
      { id: "C-E", fromId: "C", toId: "E", weight: 10 },
      { id: "D-E", fromId: "D", toId: "E", weight: 2 },
      { id: "D-F", fromId: "D", toId: "F", weight: 6 },
      { id: "E-F", fromId: "E", toId: "F", weight: 3 },
    ],
  };
}

export function neighborsOf(state: GraphState, nodeId: string): { id: string; weight: number }[] {
  const result: { id: string; weight: number }[] = [];
  for (const edge of state.edges) {
    if (edge.fromId === nodeId) result.push({ id: edge.toId, weight: edge.weight });
    else if (edge.toId === nodeId) result.push({ id: edge.fromId, weight: edge.weight });
  }
  return result.sort((a, b) => a.id.localeCompare(b.id));
}

function circularLayout(nodeIds: string[], width = 440, height = 300): Record<string, { x: number; y: number }> {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 40;
  const positions: Record<string, { x: number; y: number }> = {};
  nodeIds.forEach((id, i) => {
    const angle = (2 * Math.PI * i) / nodeIds.length - Math.PI / 2;
    positions[id] = { x: Math.round(cx + r * Math.cos(angle)), y: Math.round(cy + r * Math.sin(angle)) };
  });
  return positions;
}

export function graphAddNode(state: GraphState, labelRaw: string): OperationResult<GraphState> {
  const label = labelRaw.trim().toUpperCase();
  if (!label || label.length > 2) {
    return { ok: false, error: "Informe um nome curto para o nó (ex: G)." };
  }
  if (state.nodes.some((n) => n.id === label)) {
    return { ok: false, error: `Já existe um nó chamado "${label}".` };
  }

  const nodeIds = [...state.nodes.map((n) => n.id), label];
  const positions = circularLayout(nodeIds);
  const nodes = nodeIds.map((id) => ({ id, x: positions[id].x, y: positions[id].y }));
  const nextState: GraphState = { nodes, edges: state.edges };

  const frames: FrameSequence<GraphState> = [
    { id: 0, state, narration: `Adicionando o nó ${label}...` },
    {
      id: 1,
      state: nextState,
      highlights: [hl(label, "new")],
      pointers: { atual: label },
      narration: `Nó ${label} adicionado. O grafo agora tem ${nodes.length} nós.`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function graphAddEdge(
  state: GraphState,
  fromRaw: string,
  toRaw: string,
  weightRaw: string
): OperationResult<GraphState> {
  const from = fromRaw.trim().toUpperCase();
  const to = toRaw.trim().toUpperCase();
  const weight = Number(weightRaw);

  if (!state.nodes.some((n) => n.id === from)) return { ok: false, error: `Nó "${from}" não existe.` };
  if (!state.nodes.some((n) => n.id === to)) return { ok: false, error: `Nó "${to}" não existe.` };
  if (from === to) return { ok: false, error: "Uma aresta precisa conectar dois nós diferentes." };
  if (!Number.isFinite(weight) || weight <= 0) {
    return { ok: false, error: "Informe um peso numérico positivo para a aresta." };
  }
  if (state.edges.some((e) => (e.fromId === from && e.toId === to) || (e.fromId === to && e.toId === from))) {
    return { ok: false, error: `Já existe uma aresta entre ${from} e ${to}.` };
  }

  const newEdge: GraphEdge = { id: `${from}-${to}-${Date.now()}`, fromId: from, toId: to, weight };
  const nextState: GraphState = { nodes: state.nodes, edges: [...state.edges, newEdge] };

  const frames: FrameSequence<GraphState> = [
    {
      id: 0,
      state,
      highlights: [hl(from, "new"), hl(to, "new")],
      narration: `Conectando ${from} e ${to} com peso ${weight}...`,
    },
    {
      id: 1,
      state: nextState,
      highlights: [hl(from, "new"), hl(to, "new")],
      narration: `Aresta ${from}-${to} (peso ${weight}) adicionada.`,
    },
  ];
  return { ok: true, frames, nextState };
}

function validateStart(state: GraphState, startId: string): string | null {
  if (!state.nodes.some((n) => n.id === startId)) {
    return `Nó "${startId}" não existe. Use uma letra de A a F.`;
  }
  return null;
}

export function graphBFS(state: GraphState, startIdRaw: string): OperationResult<GraphState> {
  const startId = startIdRaw.trim().toUpperCase();
  const error = validateStart(state, startId);
  if (error) return { ok: false, error };

  const visited = new Set<string>([startId]);
  const queue: string[] = [startId];
  const order: string[] = [];
  const frames: FrameSequence<GraphState> = [
    { id: 0, state, pointers: { atual: startId }, narration: `Iniciando BFS a partir de ${startId}. Fila: [${startId}].` },
  ];

  while (queue.length > 0) {
    const current = queue.shift() as string;
    order.push(current);
    frames.push({
      id: frames.length,
      state,
      highlights: order.map((id) => hl(id, id === current ? "compare" : "visit")),
      pointers: { atual: current },
      narration: `Visitando ${current}.`,
    });

    const neighbors = neighborsOf(state, current)
      .map((n) => n.id)
      .filter((id) => !visited.has(id));
    neighbors.forEach((id) => visited.add(id));
    queue.push(...neighbors);

    if (neighbors.length > 0) {
      frames.push({
        id: frames.length,
        state,
        highlights: order
          .map((id) => hl(id, id === current ? "compare" : "visit"))
          .concat(neighbors.map((id) => hl(id, "new"))),
        pointers: { atual: current },
        narration: `Vizinhos não visitados de ${current} entram na fila: ${neighbors.join(", ")}. Fila: [${queue.join(", ")}].`,
      });
    }
  }

  frames.push({
    id: frames.length,
    state,
    highlights: order.map((id) => hl(id, "success")),
    narration: `BFS concluída. Ordem de visita: ${order.join(" → ")}.`,
  });
  return { ok: true, frames, nextState: state };
}

export function graphDFS(state: GraphState, startIdRaw: string): OperationResult<GraphState> {
  const startId = startIdRaw.trim().toUpperCase();
  const error = validateStart(state, startId);
  if (error) return { ok: false, error };

  const visited = new Set<string>();
  const order: string[] = [];
  const frames: FrameSequence<GraphState> = [
    { id: 0, state, pointers: { atual: startId }, narration: `Iniciando DFS a partir de ${startId}.` },
  ];

  function visit(nodeId: string) {
    visited.add(nodeId);
    order.push(nodeId);
    frames.push({
      id: frames.length,
      state,
      highlights: order.map((id) => hl(id, id === nodeId ? "compare" : "visit")),
      pointers: { atual: nodeId },
      narration: `Visitando ${nodeId}.`,
    });

    const neighbors = neighborsOf(state, nodeId)
      .map((n) => n.id)
      .filter((id) => !visited.has(id));
    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) continue;
      frames.push({
        id: frames.length,
        state,
        highlights: order.map((id) => hl(id, "visit")),
        pointers: { atual: nodeId },
        narration: `De ${nodeId}, descendo para ${neighborId}...`,
      });
      visit(neighborId);
    }
  }

  visit(startId);
  frames.push({
    id: frames.length,
    state,
    highlights: order.map((id) => hl(id, "success")),
    narration: `DFS concluída. Ordem de visita: ${order.join(" → ")}.`,
  });
  return { ok: true, frames, nextState: state };
}
