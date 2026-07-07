import type { ArrayItem, ArrayState, FrameSequence, Highlight, OperationResult } from "@/lib/types";
import { hl } from "@/lib/highlightColor";

export function mergeSort(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O array está vazio." };

  const items = state.items.map((i) => ({ ...i }));
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state: { items: [...items] },
      narration: "Iniciando Merge Sort: dividir o array ao meio recursivamente, depois intercalar as metades já ordenadas.",
    },
  ];

  function pushFrame(highlights: Highlight[], narration: string) {
    frames.push({ id: frames.length, state: { items: [...items] }, highlights, narration });
  }

  function merge(left: number, mid: number, right: number) {
    const leftArr = items.slice(left, mid + 1);
    const rightArr = items.slice(mid + 1, right + 1);
    pushFrame(
      leftArr.map((it) => hl(it.id, "visit")).concat(rightArr.map((it) => hl(it.id, "compare"))),
      `Intercalando [${leftArr.map((i) => i.value).join(", ")}] com [${rightArr.map((i) => i.value).join(", ")}]...`
    );

    let i = 0;
    let j = 0;
    const merged: ArrayItem[] = [];
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].value <= rightArr[j].value) {
        merged.push(leftArr[i]);
        i++;
      } else {
        merged.push(rightArr[j]);
        j++;
      }
    }
    while (i < leftArr.length) {
      merged.push(leftArr[i]);
      i++;
    }
    while (j < rightArr.length) {
      merged.push(rightArr[j]);
      j++;
    }
    for (let m = 0; m < merged.length; m++) {
      items[left + m] = merged[m];
    }

    pushFrame(
      items.slice(left, right + 1).map((it) => hl(it.id, "success")),
      `Intercalado: [${items.slice(left, right + 1).map((i) => i.value).join(", ")}].`
    );
  }

  function sort(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    pushFrame(
      items.slice(left, right + 1).map((it) => hl(it.id, "compare")),
      `Dividindo [${items.slice(left, right + 1).map((i) => i.value).join(", ")}] ao meio...`
    );
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
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
