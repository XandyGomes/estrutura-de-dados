import type { ArrayItem, ArrayState, FrameSequence, OperationResult, TreeState } from "@/lib/types";
import { createId } from "@/lib/id";

export function arrayToCompleteTree(state: ArrayState): TreeState {
  const nodes: TreeState["nodes"] = {};
  state.items.forEach((item, i) => {
    const leftItem = state.items[2 * i + 1];
    const rightItem = state.items[2 * i + 2];
    nodes[item.id] = {
      id: item.id,
      value: item.value,
      leftId: leftItem ? leftItem.id : null,
      rightId: rightItem ? rightItem.id : null,
    };
  });
  return { nodes, rootId: state.items[0]?.id ?? null };
}

function parentIndex(i: number) {
  return Math.floor((i - 1) / 2);
}

export function heapInsert(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem: ArrayItem = { id: createId(), value };
  const items = [...state.items, newItem];

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Inserindo ${value} na última posição do array (heap quase completo)...` },
    {
      id: 1,
      state: { items: [...items] },
      highlights: [{ id: newItem.id, color: "new" }],
      narration: `${value} adicionado. Agora vamos restaurar a propriedade do heap (sift-up).`,
    },
  ];

  let i = items.length - 1;
  while (i > 0) {
    const pIndex = parentIndex(i);
    if (items[pIndex].value <= items[i].value) {
      frames.push({
        id: frames.length,
        state: { items: [...items] },
        highlights: [{ id: items[i].id, color: "success" }],
        narration: `Pai (${items[pIndex].value}) já é menor ou igual: propriedade do heap restaurada.`,
      });
      return { ok: true, frames, nextState: { items } };
    }
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [
        { id: items[i].id, color: "compare" },
        { id: items[pIndex].id, color: "compare" },
      ],
      narration: `${items[i].value} < pai (${items[pIndex].value}): trocar (sift-up).`,
    });
    [items[i], items[pIndex]] = [items[pIndex], items[i]];
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [{ id: items[pIndex].id, color: "new" }],
      narration: "Trocado. Continuando a subir...",
    });
    i = pIndex;
  }

  frames.push({
    id: frames.length,
    state: { items: [...items] },
    highlights: [{ id: items[0].id, color: "success" }],
    narration: `${value} chegou à raiz: é o menor valor do heap. Inserção é O(log n).`,
  });
  return { ok: true, frames, nextState: { items } };
}

export function heapExtractMin(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O heap está vazio." };

  const items = [...state.items];
  const min = items[0];
  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, highlights: [{ id: min.id, color: "danger" }], narration: `Removendo a raiz (o mínimo): ${min.value}.` },
  ];

  const last = items.pop() as ArrayItem;
  if (items.length === 0) {
    frames.push({ id: frames.length, state: { items: [] }, narration: `${min.value} removido. O heap ficou vazio.` });
    return { ok: true, frames, nextState: { items: [] } };
  }

  items[0] = last;
  frames.push({
    id: frames.length,
    state: { items: [...items] },
    highlights: [{ id: last.id, color: "new" }],
    narration: `O último elemento (${last.value}) move para a raiz. Restaurando a propriedade do heap (sift-down)...`,
  });

  let i = 0;
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let smallest = i;
    if (l < items.length && items[l].value < items[smallest].value) smallest = l;
    if (r < items.length && items[r].value < items[smallest].value) smallest = r;

    if (smallest === i) {
      frames.push({
        id: frames.length,
        state: { items: [...items] },
        highlights: [{ id: items[i].id, color: "success" }],
        narration: `${items[i].value} já é menor que os filhos: propriedade do heap restaurada.`,
      });
      break;
    }

    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [
        { id: items[i].id, color: "compare" },
        { id: items[smallest].id, color: "compare" },
      ],
      narration: `Filho menor (${items[smallest].value}) < pai (${items[i].value}): trocar (sift-down).`,
    });
    [items[i], items[smallest]] = [items[smallest], items[i]];
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      narration: "Trocado. Continuando a descer...",
    });
    i = smallest;
  }

  return { ok: true, frames, nextState: { items } };
}
