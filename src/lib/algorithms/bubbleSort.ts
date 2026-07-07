import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { hl } from "@/lib/highlightColor";

export function bubbleSort(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O array está vazio." };

  const items = state.items.map((i) => ({ ...i }));
  const n = items.length;
  const sortedIds = new Set<string>();
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state: { items: [...items] },
      narration: "Iniciando Bubble Sort: comparar pares adjacentes e trocar se estiverem fora de ordem.",
    },
  ];

  for (let i = 0; i < n - 1; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - 1 - i; j++) {
      const a = items[j];
      const b = items[j + 1];
      frames.push({
        id: frames.length,
        state: { items: [...items] },
        highlights: [...sortedIds].map((id) => hl(id, "success")).concat([hl(a.id, "compare"), hl(b.id, "compare")]),
        narration: `Comparando ${a.value} e ${b.value}...`,
      });
      if (a.value > b.value) {
        items[j] = b;
        items[j + 1] = a;
        swappedAny = true;
        frames.push({
          id: frames.length,
          state: { items: [...items] },
          highlights: [...sortedIds].map((id) => hl(id, "success")).concat([hl(a.id, "new"), hl(b.id, "new")]),
          narration: `${a.value} > ${b.value}: troca!`,
        });
      }
    }
    sortedIds.add(items[n - 1 - i].id);
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [...sortedIds].map((id) => hl(id, "success")),
      narration: `${items[n - 1 - i].value} chegou na posição final.`,
    });
    if (!swappedAny) break;
  }

  items.forEach((it) => sortedIds.add(it.id));
  frames.push({
    id: frames.length,
    state: { items: [...items] },
    highlights: items.map((it) => hl(it.id, "success")),
    narration: `Array ordenado: ${items.map((it) => it.value).join(", ")}.`,
  });

  return { ok: true, frames, nextState: { items } };
}
