import type { ArrayState, FrameSequence, Highlight, OperationResult } from "@/lib/types";
import { hl } from "@/lib/highlightColor";

export function quickSort(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O array está vazio." };

  const items = state.items.map((i) => ({ ...i }));
  const sortedIds = new Set<string>();
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state: { items: [...items] },
      narration: "Iniciando Quick Sort: escolher um pivô e particionar o array ao redor dele.",
    },
  ];

  function pushFrame(highlights: Highlight[], narration: string) {
    frames.push({ id: frames.length, state: { items: [...items] }, highlights, narration });
  }

  function partition(low: number, high: number): number {
    const pivot = items[high];
    pushFrame(
      [...sortedIds].map((id) => hl(id, "success")).concat([hl(pivot.id, "danger")]),
      `Pivô escolhido: ${pivot.value} (último elemento do intervalo).`
    );

    let i = low - 1;
    for (let j = low; j < high; j++) {
      pushFrame(
        [...sortedIds].map((id) => hl(id, "success")).concat([hl(pivot.id, "danger"), hl(items[j].id, "compare")]),
        `Comparando ${items[j].value} com o pivô ${pivot.value}...`
      );
      if (items[j].value <= pivot.value) {
        i++;
        if (i !== j) {
          const tmp = items[i];
          items[i] = items[j];
          items[j] = tmp;
          pushFrame(
            [...sortedIds].map((id) => hl(id, "success")).concat([hl(pivot.id, "danger"), hl(items[i].id, "new")]),
            `${items[i].value} ≤ pivô: troca para a posição ${i}.`
          );
        }
      }
    }

    const tmp = items[i + 1];
    items[i + 1] = items[high];
    items[high] = tmp;
    sortedIds.add(items[i + 1].id);
    pushFrame(
      [...sortedIds].map((id) => hl(id, "success")),
      `Pivô ${items[i + 1].value} vai para a posição ${i + 1}: essa é a posição final dele.`
    );
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const p = partition(low, high);
      sort(low, p - 1);
      sort(p + 1, high);
    } else if (low === high) {
      sortedIds.add(items[low].id);
    }
  }

  sort(0, items.length - 1);
  frames.push({
    id: frames.length,
    state: { items: [...items] },
    highlights: items.map((it) => hl(it.id, "success")),
    narration: `Array ordenado: ${items.map((i) => i.value).join(", ")}.`,
  });

  return { ok: true, frames, nextState: { items } };
}
