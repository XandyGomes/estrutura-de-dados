import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { hl } from "@/lib/highlightColor";

export function selectionSort(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O array está vazio." };

  const items = state.items.map((i) => ({ ...i }));
  const n = items.length;
  const sortedIds = new Set<string>();
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state: { items: [...items] },
      narration: "Iniciando Selection Sort: encontrar o menor elemento e colocá-lo na posição correta.",
    },
  ];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [...sortedIds].map((id) => hl(id, "success")).concat([hl(items[i].id, "visit")]),
      narration: `Procurando o menor valor a partir da posição ${i}...`,
    });

    for (let j = i + 1; j < n; j++) {
      frames.push({
        id: frames.length,
        state: { items: [...items] },
        highlights: [...sortedIds]
          .map((id) => hl(id, "success"))
          .concat([hl(items[minIdx].id, "visit"), hl(items[j].id, "compare")]),
        narration: `Comparando o menor atual (${items[minIdx].value}) com ${items[j].value}...`,
      });
      if (items[j].value < items[minIdx].value) {
        minIdx = j;
        frames.push({
          id: frames.length,
          state: { items: [...items] },
          highlights: [...sortedIds].map((id) => hl(id, "success")).concat([hl(items[minIdx].id, "visit")]),
          narration: `Novo menor encontrado: ${items[minIdx].value}.`,
        });
      }
    }

    if (minIdx !== i) {
      const tmp = items[i];
      items[i] = items[minIdx];
      items[minIdx] = tmp;
      frames.push({
        id: frames.length,
        state: { items: [...items] },
        highlights: [...sortedIds].map((id) => hl(id, "success")).concat([hl(items[i].id, "new")]),
        narration: `Troca: ${items[i].value} vai para a posição ${i}.`,
      });
    }

    sortedIds.add(items[i].id);
    frames.push({
      id: frames.length,
      state: { items: [...items] },
      highlights: [...sortedIds].map((id) => hl(id, "success")),
      narration: `${items[i].value} está na posição final.`,
    });
  }

  sortedIds.add(items[n - 1].id);
  frames.push({
    id: frames.length,
    state: { items: [...items] },
    highlights: items.map((it) => hl(it.id, "success")),
    narration: `Array ordenado: ${items.map((it) => it.value).join(", ")}.`,
  });

  return { ok: true, frames, nextState: { items } };
}
