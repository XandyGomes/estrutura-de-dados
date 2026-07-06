import { createId } from "@/lib/id";
import type { TreeNode, TreeState } from "@/lib/types";

export function cloneTreeState(state: TreeState): TreeState {
  const nodes: Record<string, TreeNode> = {};
  for (const id in state.nodes) {
    nodes[id] = { ...state.nodes[id] };
  }
  return { nodes, rootId: state.rootId };
}

export function makeTreeState(values: number[]): TreeState {
  let state: TreeState = { nodes: {}, rootId: null };
  for (const value of values) {
    state = bstInsertPlain(state, value);
  }
  return state;
}

/** Inserção BST simples, sem gerar frames — usada só para montar o estado inicial. */
export function bstInsertPlain(state: TreeState, value: number): TreeState {
  const nextState = cloneTreeState(state);
  const newNode: TreeNode = { id: createId(), value, leftId: null, rightId: null };

  if (!nextState.rootId) {
    nextState.rootId = newNode.id;
    nextState.nodes[newNode.id] = newNode;
    return nextState;
  }

  let currentId = nextState.rootId;
  while (true) {
    const current = nextState.nodes[currentId];
    if (value < current.value) {
      if (!current.leftId) {
        current.leftId = newNode.id;
        nextState.nodes[newNode.id] = newNode;
        return nextState;
      }
      currentId = current.leftId;
    } else {
      if (!current.rightId) {
        current.rightId = newNode.id;
        nextState.nodes[newNode.id] = newNode;
        return nextState;
      }
      currentId = current.rightId;
    }
  }
}

export function heightOf(state: TreeState, id: string | null): number {
  if (!id) return 0;
  const node = state.nodes[id];
  return 1 + Math.max(heightOf(state, node.leftId), heightOf(state, node.rightId));
}

export function balanceFactorOf(state: TreeState, id: string): number {
  const node = state.nodes[id];
  return heightOf(state, node.leftId) - heightOf(state, node.rightId);
}

/** Encontra o menor nó de uma subárvore (usado na remoção de nós com dois filhos). */
export function findMin(state: TreeState, id: string): TreeNode {
  let current = state.nodes[id];
  while (current.leftId) {
    current = state.nodes[current.leftId];
  }
  return current;
}
