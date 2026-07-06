"use client";

import type { ArrayState, Highlight } from "@/lib/types";
import { arrayToCompleteTree } from "@/lib/algorithms/heap";
import { TreeRenderer } from "./TreeRenderer";

type Props = {
  state: ArrayState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

export function HeapRenderer({ state, highlights, pointers }: Props) {
  return <TreeRenderer state={arrayToCompleteTree(state)} highlights={highlights} pointers={pointers} />;
}
