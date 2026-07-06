import type { FrameSequence, OperationResult, TreeState } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneTreeState, balanceFactorOf } from "./treeCommon";

export { bstSearch as avlSearch } from "./bst";

function rotateRight(state: TreeState, yId: string): string {
  const y = state.nodes[yId];
  const xId = y.leftId as string;
  const x = state.nodes[xId];
  const t2 = x.rightId;
  x.rightId = yId;
  y.leftId = t2;
  return xId;
}

function rotateLeft(state: TreeState, xId: string): string {
  const x = state.nodes[xId];
  const yId = x.rightId as string;
  const y = state.nodes[yId];
  const t2 = y.leftId;
  y.leftId = xId;
  x.rightId = t2;
  return yId;
}

function attachToParent(state: TreeState, parentId: string | null, oldChildId: string, newChildId: string) {
  if (parentId === null) {
    state.rootId = newChildId;
    return;
  }
  const parent = state.nodes[parentId];
  if (parent.leftId === oldChildId) parent.leftId = newChildId;
  else parent.rightId = newChildId;
}

export function avlInsert(state: TreeState, value: number): OperationResult<TreeState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const nextState = cloneTreeState(state);

  if (!nextState.rootId) {
    const newNode = { id: createId(), value, leftId: null, rightId: null };
    nextState.nodes[newNode.id] = newNode;
    nextState.rootId = newNode.id;
    const frames: FrameSequence<TreeState> = [
      { id: 0, state, narration: "Árvore vazia: o novo nó se torna a raiz." },
      { id: 1, state: nextState, highlights: [{ id: newNode.id, color: "new" }], narration: `${value} inserido como raiz.` },
    ];
    return { ok: true, frames, nextState };
  }

  const frames: FrameSequence<TreeState> = [
    { id: 0, state, pointers: { raiz: nextState.rootId }, narration: `Comparando ${value} a partir da raiz...` },
  ];

  const path: string[] = [];
  let currentId = nextState.rootId;
  while (true) {
    const current = nextState.nodes[currentId];
    path.push(currentId);
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
          ? `${value} < ${current.value}: vai para a esquerda.`
          : `${value} > ${current.value}: vai para a direita.`,
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
      path.push(newNode.id);
      break;
    }
    currentId = childId;
  }

  let rebalanced = false;
  for (let i = path.length - 2; i >= 0; i--) {
    const ancestorId = path[i];
    const ancestor = nextState.nodes[ancestorId];
    const balance = balanceFactorOf(nextState, ancestorId);
    if (Math.abs(balance) <= 1) continue;

    const parentOfAncestorId = i > 0 ? path[i - 1] : null;

    if (balance > 1) {
      const leftChildId = ancestor.leftId as string;
      const leftBalance = balanceFactorOf(nextState, leftChildId);
      if (leftBalance >= 0) {
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: ancestor.id, color: "danger" }],
          narration: `Desbalanceado em ${ancestor.value} (fator ${balance}): caso Esquerda-Esquerda. Rotação simples à direita.`,
        });
        const newSubRoot = rotateRight(nextState, ancestorId);
        attachToParent(nextState, parentOfAncestorId, ancestorId, newSubRoot);
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: newSubRoot, color: "new" }],
          narration: `Rotação concluída. ${nextState.nodes[newSubRoot].value} é a nova raiz da subárvore.`,
        });
      } else {
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: ancestor.id, color: "danger" }],
          narration: `Desbalanceado em ${ancestor.value} (fator ${balance}): caso Esquerda-Direita. Rotação dupla.`,
        });
        const newLeftChild = rotateLeft(nextState, leftChildId);
        ancestor.leftId = newLeftChild;
        frames.push({ id: frames.length, state: nextState, narration: "Primeiro, rotação à esquerda no filho esquerdo." });
        const newSubRoot = rotateRight(nextState, ancestorId);
        attachToParent(nextState, parentOfAncestorId, ancestorId, newSubRoot);
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: newSubRoot, color: "new" }],
          narration: `Depois, rotação à direita. ${nextState.nodes[newSubRoot].value} é a nova raiz da subárvore.`,
        });
      }
    } else {
      const rightChildId = ancestor.rightId as string;
      const rightBalance = balanceFactorOf(nextState, rightChildId);
      if (rightBalance <= 0) {
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: ancestor.id, color: "danger" }],
          narration: `Desbalanceado em ${ancestor.value} (fator ${balance}): caso Direita-Direita. Rotação simples à esquerda.`,
        });
        const newSubRoot = rotateLeft(nextState, ancestorId);
        attachToParent(nextState, parentOfAncestorId, ancestorId, newSubRoot);
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: newSubRoot, color: "new" }],
          narration: `Rotação concluída. ${nextState.nodes[newSubRoot].value} é a nova raiz da subárvore.`,
        });
      } else {
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: ancestor.id, color: "danger" }],
          narration: `Desbalanceado em ${ancestor.value} (fator ${balance}): caso Direita-Esquerda. Rotação dupla.`,
        });
        const newRightChild = rotateRight(nextState, rightChildId);
        ancestor.rightId = newRightChild;
        frames.push({ id: frames.length, state: nextState, narration: "Primeiro, rotação à direita no filho direito." });
        const newSubRoot = rotateLeft(nextState, ancestorId);
        attachToParent(nextState, parentOfAncestorId, ancestorId, newSubRoot);
        frames.push({
          id: frames.length,
          state: nextState,
          highlights: [{ id: newSubRoot, color: "new" }],
          narration: `Depois, rotação à esquerda. ${nextState.nodes[newSubRoot].value} é a nova raiz da subárvore.`,
        });
      }
    }
    rebalanced = true;
    break;
  }

  if (!rebalanced) {
    frames.push({
      id: frames.length,
      state: nextState,
      narration: "A árvore continua balanceada (fator entre -1 e 1 em todos os nós). Nenhuma rotação necessária.",
    });
  }

  return { ok: true, frames, nextState };
}
