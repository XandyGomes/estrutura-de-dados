export type Highlight = {
  id: string;
  color?: "compare" | "visit" | "success" | "danger" | "new";
};

export type Frame<TState> = {
  id: number;
  state: TState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
  narration: string;
};

export type FrameSequence<TState> = Frame<TState>[];

export type ArrayItem = {
  id: string;
  value: number;
};

export type ArrayState = {
  items: ArrayItem[];
};

export type TreeNode = {
  id: string;
  value: number;
  leftId: string | null;
  rightId: string | null;
};

export type TreeState = {
  nodes: Record<string, TreeNode>;
  rootId: string | null;
};

export type OperationResult<TState> =
  | { ok: true; frames: FrameSequence<TState>; nextState: TState }
  | { ok: false; error: string };

export type OperationInputDef = {
  id: string;
  label: string;
  type: "number" | "text";
  placeholder?: string;
};

export type OperationDef<TState> = {
  id: string;
  label: string;
  description?: string;
  inputs?: OperationInputDef[];
  run: (state: TState, values: Record<string, string>) => OperationResult<TState>;
};

export type QuizQuestion = {
  id: string;
  enunciado: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type TopicStatus = "disponivel" | "em-breve";

export type TopicPhase = 1 | 2 | 3 | 4 | 5;

export type TopicDef = {
  slug: string;
  titulo: string;
  descricao: string;
  fase: TopicPhase;
  status: TopicStatus;
  pdf?: string;
};
