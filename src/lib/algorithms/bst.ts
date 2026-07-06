import type { FrameSequence, OperationResult, TreeNode, TreeState } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneTreeState } from "./treeCommon";

export function bstInsert(state: TreeState, value: number): OperationResult<TreeState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const nextState = cloneTreeState(state);

  if (!nextState.rootId) {
    const newNode = { id: createId(), value, leftId: null, rightId: null };
    nextState.nodes[newNode.id] = newNode;
    nextState.rootId = newNode.id;
    const frames: FrameSequence<TreeState> = [
      { id: 0, state, narration: "Árvore vazia: o novo nó se torna a raiz." },
      {
        id: 1,
        state: nextState,
        highlights: [{ id: newNode.id, color: "new" }],
        pointers: { raiz: newNode.id },
        narration: `${value} inserido como raiz.`,
      },
    ];
    return { ok: true, frames, nextState };
  }

  const frames: FrameSequence<TreeState> = [
    { id: 0, state, pointers: { raiz: nextState.rootId }, narration: `Comparando ${value} a partir da raiz...` },
  ];

  let currentId = nextState.rootId;
  while (true) {
    const current = nextState.nodes[currentId];
    if (value === current.value) {
      return { ok: false, error: `O valor ${value} já existe na árvore.` };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: current.id, color: "compare" }],
      pointers: { atual: current.id },
      narration:
        value < current.value
          ? `${value} < ${current.value}: vai para a subárvore esquerda.`
          : `${value} > ${current.value}: vai para a subárvore direita.`,
    });

    const goLeft = value < current.value;
    const childId = goLeft ? current.leftId : current.rightId;
    if (!childId) {
      const newNode = { id: createId(), value, leftId: null, rightId: null };
      nextState.nodes[newNode.id] = newNode;
      if (goLeft) current.leftId = newNode.id;
      else current.rightId = newNode.id;
      frames.push({
        id: frames.length,
        state: nextState,
        highlights: [{ id: newNode.id, color: "new" }],
        narration: `${value} inserido como filho ${goLeft ? "esquerdo" : "direito"} de ${current.value}.`,
      });
      return { ok: true, frames, nextState };
    }
    currentId = childId;
  }
}

export function bstSearch(state: TreeState, value: number): OperationResult<TreeState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico para buscar." };
  if (!state.rootId) return { ok: false, error: "A árvore está vazia." };

  const frames: FrameSequence<TreeState> = [
    { id: 0, state, pointers: { raiz: state.rootId }, narration: `Buscando ${value} a partir da raiz...` },
  ];

  let currentId: string | null = state.rootId;
  while (currentId) {
    const current: TreeNode = state.nodes[currentId];
    if (value === current.value) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: current.id, color: "success" }],
        pointers: { atual: current.id },
        narration: `Encontrado! ${value} está na árvore.`,
      });
      return { ok: true, frames, nextState: state };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: current.id, color: "compare" }],
      pointers: { atual: current.id },
      narration:
        value < current.value
          ? `${value} < ${current.value}: vai para a esquerda.`
          : `${value} > ${current.value}: vai para a direita.`,
    });
    currentId = value < current.value ? current.leftId : current.rightId;
  }

  frames.push({ id: frames.length, state, narration: `${value} não está na árvore. Busca é O(log n) em média, O(n) no pior caso (árvore desbalanceada).` });
  return { ok: true, frames, nextState: state };
}

export function bstRemove(state: TreeState, value: number): OperationResult<TreeState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  if (!state.rootId) return { ok: false, error: "A árvore está vazia." };

  const nextState = cloneTreeState(state);
  const frames: FrameSequence<TreeState> = [
    { id: 0, state, pointers: { raiz: state.rootId }, narration: `Procurando ${value} para remover...` },
  ];

  let parentId: string | null = null;
  let currentId: string | null = nextState.rootId;
  while (currentId && nextState.nodes[currentId].value !== value) {
    const current = nextState.nodes[currentId];
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: current.id, color: "compare" }],
      pointers: { atual: current.id },
      narration:
        value < current.value
          ? `${value} < ${current.value}: vai para a esquerda.`
          : `${value} > ${current.value}: vai para a direita.`,
    });
    parentId = currentId;
    currentId = value < current.value ? current.leftId : current.rightId;
  }

  if (!currentId) {
    return { ok: false, error: `O valor ${value} não está na árvore.` };
  }

  const target = nextState.nodes[currentId];
  frames.push({
    id: frames.length,
    state,
    highlights: [{ id: target.id, color: "danger" }],
    pointers: { atual: target.id },
    narration: `Encontrado: ${value}.`,
  });

  function replaceChild(pId: string | null, oldId: string, newId: string | null) {
    if (pId === null) {
      nextState.rootId = newId;
    } else {
      const parent = nextState.nodes[pId];
      if (parent.leftId === oldId) parent.leftId = newId;
      else parent.rightId = newId;
    }
  }

  if (!target.leftId && !target.rightId) {
    replaceChild(parentId, target.id, null);
    delete nextState.nodes[target.id];
    frames.push({ id: frames.length, state: nextState, narration: `${value} era uma folha: removido diretamente. O(log n) em média.` });
  } else if (!target.leftId || !target.rightId) {
    const childId = (target.leftId ?? target.rightId) as string;
    replaceChild(parentId, target.id, childId);
    delete nextState.nodes[target.id];
    frames.push({ id: frames.length, state: nextState, narration: `${value} tinha um único filho: ele assume o lugar do nó removido.` });
  } else {
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: target.id, color: "danger" }],
      narration: `${value} tem dois filhos: buscando o sucessor (o menor valor da subárvore direita)...`,
    });
    let succParentId = target.id;
    let succId = target.rightId;
    while (nextState.nodes[succId].leftId) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: nextState.nodes[succId].id, color: "compare" }],
        narration: `Descendo à esquerda: ${nextState.nodes[succId].value}...`,
      });
      succParentId = succId;
      succId = nextState.nodes[succId].leftId as string;
    }
    const successor = nextState.nodes[succId];
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: successor.id, color: "success" }],
      narration: `Sucessor encontrado: ${successor.value}.`,
    });

    target.value = successor.value;
    replaceChild(succParentId, successor.id, successor.rightId);
    delete nextState.nodes[successor.id];

    frames.push({
      id: frames.length,
      state: nextState,
      highlights: [{ id: target.id, color: "new" }],
      narration: `${successor.value} substitui o valor removido; o nó duplicado é descartado.`,
    });
  }

  return { ok: true, frames, nextState };
}

type TraversalOrder = "pre" | "in" | "pos";

const ORDER_LABEL: Record<TraversalOrder, string> = {
  pre: "pré-ordem (raiz, esquerda, direita)",
  in: "em ordem (esquerda, raiz, direita)",
  pos: "pós-ordem (esquerda, direita, raiz)",
};

export function bstTraverse(state: TreeState, order: TraversalOrder): OperationResult<TreeState> {
  if (!state.rootId) return { ok: false, error: "A árvore está vazia." };

  const sequence: string[] = [];
  const visit = (id: string | null) => {
    if (!id) return;
    const node = state.nodes[id];
    if (order === "pre") sequence.push(node.id);
    visit(node.leftId);
    if (order === "in") sequence.push(node.id);
    visit(node.rightId);
    if (order === "pos") sequence.push(node.id);
  };
  visit(state.rootId);

  const frames: FrameSequence<TreeState> = [
    { id: 0, state, narration: `Percurso ${ORDER_LABEL[order]}: visitando os nós um a um...` },
  ];

  sequence.forEach((id, i) => {
    frames.push({
      id: frames.length,
      state,
      highlights: sequence.slice(0, i + 1).map((nid, j) => ({ id: nid, color: j === i ? "success" : "visit" })),
      narration: `Visitando ${state.nodes[id].value} (${i + 1}/${sequence.length}).`,
    });
  });

  const order_str = sequence.map((id) => state.nodes[id].value).join(", ");
  frames.push({ id: frames.length, state, narration: `Ordem final: ${order_str}.` });
  return { ok: true, frames, nextState: state };
}
