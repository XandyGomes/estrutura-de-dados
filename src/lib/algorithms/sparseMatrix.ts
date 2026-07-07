import type { FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { hl } from "@/lib/highlightColor";

export type SparseCell = {
  id: string;
  row: number;
  col: number;
  value: number;
};

export type SparseMatrixState = {
  rows: number;
  cols: number;
  cells: SparseCell[];
};

export function makeSparseMatrixState(): SparseMatrixState {
  const rows = 4;
  const cols = 5;
  const nonZero: Record<string, number> = {
    "0,2": 5,
    "1,4": 8,
    "2,0": 3,
    "3,3": 9,
  };
  const cells: SparseCell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ id: createId(), row: r, col: c, value: nonZero[`${r},${c}`] ?? 0 });
    }
  }
  return { rows, cols, cells };
}

export function gerarRepresentacaoEsparsa(state: SparseMatrixState): OperationResult<SparseMatrixState> {
  const frames: FrameSequence<SparseMatrixState> = [
    { id: 0, state, narration: `Percorrendo a matriz ${state.rows}×${state.cols} célula por célula, linha por linha...` },
  ];

  const foundIds: string[] = [];
  for (const cell of state.cells) {
    if (cell.value === 0) {
      frames.push({
        id: frames.length,
        state,
        highlights: foundIds.map((id) => hl(id, "success")).concat([hl(cell.id, "compare")]),
        narration: `(${cell.row}, ${cell.col}) = 0: não entra na lista esparsa.`,
      });
    } else {
      foundIds.push(cell.id);
      frames.push({
        id: frames.length,
        state,
        highlights: foundIds.map((id) => hl(id, "success")),
        narration: `(${cell.row}, ${cell.col}) = ${cell.value}: valor não-zero, adiciona à lista esparsa!`,
      });
    }
  }

  const total = state.rows * state.cols;
  const pct = Math.round((foundIds.length / total) * 100);
  frames.push({
    id: frames.length,
    state,
    highlights: foundIds.map((id) => hl(id, "success")),
    narration: `Pronto! De ${total} células, só ${foundIds.length} são não-zero (${pct}% preenchida). A representação esparsa guarda só essas ${foundIds.length} triplas (linha, coluna, valor), economizando memória.`,
  });

  return { ok: true, frames, nextState: state };
}
