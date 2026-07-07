import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";

export function recursaoFatorial(state: ArrayState, nRaw: number): OperationResult<ArrayState> {
  if (!Number.isInteger(nRaw) || nRaw < 0) {
    return { ok: false, error: "Informe um número inteiro não negativo." };
  }
  if (nRaw > 7) {
    return { ok: false, error: "Escolha um valor até 7 para a pilha de chamadas não ficar grande demais na tela." };
  }

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state: { items: [] }, narration: `Chamando fatorial(${nRaw})...` },
  ];

  let stack: ArrayState = { items: [] };
  const frameIds: string[] = [];

  for (let k = nRaw; k >= 0; k--) {
    const item = { id: createId(), value: k };
    frameIds[k] = item.id;
    stack = { items: [...stack.items, item] };
    frames.push({
      id: frames.length,
      state: stack,
      highlights: [{ id: item.id, color: k === 0 ? "success" : "new" }],
      pointers: { topo: item.id },
      narration:
        k === 0
          ? "Caso base: fatorial(0) = 1. Agora desempilhamos e calculamos de baixo para cima."
          : `fatorial(${k}) precisa do resultado de fatorial(${k - 1}) antes de calcular. Empilha novo quadro.`,
    });
  }

  let acc = 1;
  for (let k = 1; k <= nRaw; k++) {
    stack = { items: stack.items.slice(0, -1) };
    const prevAcc = acc;
    acc = acc * k;
    frames.push({
      id: frames.length,
      state: stack,
      highlights: [{ id: frameIds[k], color: "compare" }],
      pointers: { topo: frameIds[k] },
      narration: `fatorial(${k - 1}) retornou ${prevAcc}. fatorial(${k}) = ${k} × ${prevAcc} = ${acc}.`,
    });
  }

  frames.push({
    id: frames.length,
    state: { items: [] },
    narration: `fatorial(${nRaw}) = ${acc}. A pilha de chamadas esvaziou.`,
  });

  return { ok: true, frames, nextState: { items: [] } };
}
