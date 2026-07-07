import Link from "next/link";
import { topicos } from "@/data/topicos";

const FASE_LABEL: Record<number, string> = {
  1: "Fase 1 · Fundamentos",
  2: "Fase 2 · Listas",
  3: "Fase 3 · Árvores",
  4: "Fase 4 · Tabelas hash",
  5: "Fase 5 · Grafos",
};

const TOPICO_ICON: Record<string, string> = {
  "big-o": "📊",
  arrays: "🔢",
  "busca-sequencial": "🔍",
  "busca-binaria": "🎯",
  pilhas: "📚",
  filas: "🎟️",
  deque: "↔️",
  "listas-ligadas": "🔗",
  "listas-duplamente-encadeadas": "🔀",
  "arvores-binarias": "🌳",
  heaps: "⛰️",
  "arvores-avl": "⚖️",
  "tabelas-hash": "🗂️",
  grafos: "🕸️",
};

const PASSOS = [
  {
    numero: "01",
    titulo: "Leia a lição",
    descricao: "Explicação curta e direta do conceito, com exemplos e tabelas de complexidade.",
    icone: "📖",
  },
  {
    numero: "02",
    titulo: "Veja acontecer",
    descricao: "Execute operações reais e assista o algoritmo se mover passo a passo, com narração.",
    icone: "🎬",
  },
  {
    numero: "03",
    titulo: "Pratique",
    descricao: "Responda perguntas com feedback na hora, pra fixar o que aprendeu.",
    icone: "✏️",
  },
];

function HeroGraphic() {
  const nodes = [
    { x: 40, y: 100, color: "var(--color-highlight-visit)" },
    { x: 130, y: 40, color: "var(--color-highlight-compare)" },
    { x: 130, y: 160, color: "var(--color-highlight-success)" },
    { x: 220, y: 20, color: "var(--color-primary)" },
    { x: 220, y: 100, color: "var(--color-highlight-new)" },
    { x: 220, y: 180, color: "var(--color-highlight-danger)" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
  ];
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-full max-w-sm" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-border-strong)"
          strokeWidth={1.5}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={9} fill={n.color} opacity={0.9} />
      ))}
    </svg>
  );
}

export default function Home() {
  const disponiveis = topicos.filter((t) => t.status === "disponivel");
  const porFase = disponiveis.reduce<Record<number, typeof topicos>>((acc, t) => {
    (acc[t.fase] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="relative mb-24 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-primary)] opacity-[0.14] blur-3xl"
          />
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            Material de aula · Estrutura de Dados
          </p>
          <h1 className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight">
            Veja a estrutura
            <br />
            se mover.
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]">
            {disponiveis.length} tópicos com lições, animações interativas passo a
            passo e exercícios práticos, em português, pra você realmente ver o
            algoritmo funcionando, não só ler sobre ele.
          </p>
          <Link
            href={`/estrutura/${disponiveis[0]?.slug ?? ""}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[#1a1206] shadow-[0_8px_24px_-8px_var(--color-primary-soft)] transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_10px_28px_-6px_rgba(217,164,65,0.5)] active:scale-[0.98]"
          >
            Começar por Big-O
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroGraphic />
        </div>
      </section>

      <section className="mb-24">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Como funciona
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PASSOS.map((p) => (
            <div key={p.numero} className="glass-panel rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{p.icone}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">{p.numero}</span>
              </div>
              <h3 className="mb-1.5 font-semibold tracking-tight">{p.titulo}</h3>
              <p className="text-sm text-[var(--color-muted)]">{p.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {Object.entries(porFase).map(([fase, itens]) => (
        <section key={fase} className="mb-14">
          <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
            {FASE_LABEL[Number(fase)]}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((t) => (
              <Link key={t.slug} href={`/estrutura/${t.slug}`}>
                <div className="glass-panel glow-on-hover group flex h-full flex-col rounded-2xl p-5">
                  <div className="mb-3 text-2xl">{TOPICO_ICON[t.slug] ?? "📌"}</div>
                  <h3 className="mb-1.5 font-semibold tracking-tight">{t.titulo}</h3>
                  <p className="mb-4 flex-1 text-sm text-[var(--color-muted)]">{t.descricao}</p>
                  <span className="text-sm font-medium text-[var(--color-primary)]">
                    Abrir lição <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
