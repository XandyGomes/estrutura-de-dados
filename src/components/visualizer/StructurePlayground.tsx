"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import type { Highlight, OperationDef } from "@/lib/types";
import { useVisualizer } from "./useVisualizer";
import { VisualizerControls } from "./VisualizerControls";

type RendererProps<TState> = {
  state: TState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

type Props<TState> = {
  initialState: TState;
  operations: OperationDef<TState>[];
  Renderer: ComponentType<RendererProps<TState>>;
  legend?: { label: string; color: string }[];
};

export function StructurePlayground<TState>({
  initialState,
  operations,
  Renderer,
  legend,
}: Props<TState>) {
  const [structureState, setStructureState] = useState(initialState);
  const [selectedOpId, setSelectedOpId] = useState(operations[0]?.id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [frames, setFrames] = useState<Parameters<typeof useVisualizer<TState>>[0]>([
    { id: 0, state: initialState, narration: "Escolha uma operação e clique em Executar." },
  ]);

  const visualizer = useVisualizer(frames);
  const selectedOp = operations.find((op) => op.id === selectedOpId) ?? operations[0];

  const handleExecute = () => {
    if (!selectedOp) return;
    const result = selectedOp.run(structureState, values);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setFrames(result.frames);
    setStructureState(result.nextState);
  };

  const handleReiniciar = () => {
    setStructureState(initialState);
    setFrames([{ id: 0, state: initialState, narration: "Estrutura reiniciada." }]);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-panel flex flex-wrap items-end gap-3 rounded-2xl p-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-muted)]">Operação</label>
          <select
            value={selectedOp?.id}
            onChange={(e) => {
              setSelectedOpId(e.target.value);
              setError(null);
            }}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm"
          >
            {operations.map((op) => (
              <option key={op.id} value={op.id}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        {selectedOp?.inputs?.map((input) => (
          <div key={input.id} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--color-muted)]">{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
              className="w-28 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleExecute}
          className="rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm font-medium text-[#1a1206] shadow-[0_4px_16px_-4px_var(--color-primary-soft)] transition-all hover:bg-[var(--color-primary-hover)] active:scale-95"
        >
          Executar
        </button>
        <button
          type="button"
          onClick={handleReiniciar}
          className="rounded-md border border-[var(--color-border)] px-4 py-1.5 text-sm transition-all hover:bg-[var(--color-surface-muted)] active:scale-95"
        >
          Reiniciar estrutura
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="animate-[shake_0.4s] rounded-md border border-[var(--color-highlight-danger)] bg-[color-mix(in_srgb,var(--color-highlight-danger)_12%,transparent)] px-4 py-2 text-sm text-[var(--color-highlight-danger)]"
        >
          {error}
        </div>
      )}

      <div className="glass-panel rounded-2xl">
        <Renderer
          state={visualizer.currentFrame?.state ?? structureState}
          highlights={visualizer.currentFrame?.highlights}
          pointers={visualizer.currentFrame?.pointers}
        />
      </div>

      {legend && (
        <div className="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      )}

      <VisualizerControls visualizer={visualizer} />
    </div>
  );
}
