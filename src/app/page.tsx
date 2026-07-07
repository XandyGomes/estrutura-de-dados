import Link from "next/link";
import { topicos } from "@/data/topicos";

const FASE_LABEL: Record<number, string> = {
  1: "Fase 1: fundamentos",
  2: "Fase 2: listas",
  3: "Fase 3: árvores",
  4: "Fase 4: hash",
  5: "Fase 5: grafos",
};

export default function Home() {
  const disponiveis = topicos.filter((t) => t.status === "disponivel");
  const emBreve = topicos.filter((t) => t.status !== "disponivel");
  const porFase = emBreve.reduce<Record<number, typeof topicos>>((acc, t) => {
    (acc[t.fase] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="relative mb-20 max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-primary)] opacity-[0.10] blur-3xl"
        />
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
          Material de aula · Estrutura de Dados
        </p>
        <h1 className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight">
          Veja a estrutura
          <br />
          se mover.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
          Lições curtas, visualizações interativas passo a passo e exercícios
          práticos, em português, para acompanhar as aulas.
        </p>
        <div className="mt-8 flex gap-8 border-t border-[var(--color-border)] pt-6 font-mono text-sm">
          <div>
            <div className="text-2xl font-semibold text-[var(--color-foreground)]">
              {disponiveis.length}
            </div>
            <div className="text-[var(--color-muted)]">tópicos prontos</div>
          </div>
          {emBreve.length > 0 && (
            <div>
              <div className="text-2xl font-semibold text-[var(--color-foreground)]">
                {emBreve.length}
              </div>
              <div className="text-[var(--color-muted)]">no roadmap</div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Disponível agora
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {disponiveis.map((t, i) => (
            <Link key={t.slug} href={`/estrutura/${t.slug}`}>
              <div className="glass-panel glow-on-hover h-full rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted)]">
                    {FASE_LABEL[t.fase]}
                  </span>
                </div>
                <h3 className="mb-1.5 font-semibold tracking-tight">{t.titulo}</h3>
                <p className="text-sm text-[var(--color-muted)]">{t.descricao}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {emBreve.length > 0 && (
      <section>
        <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Roadmap
        </h2>
        <div className="flex flex-col gap-4">
          {Object.entries(porFase).map(([fase, itens]) => (
            <div
              key={fase}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] p-5 sm:flex-row sm:items-center"
            >
              <span className="w-40 shrink-0 font-mono text-xs text-[var(--color-muted)]">
                {FASE_LABEL[Number(fase)]}
              </span>
              <div className="flex flex-wrap gap-2">
                {itens.map((t) => (
                  <span
                    key={t.slug}
                    title={t.descricao}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs text-[var(--color-muted)]"
                  >
                    {t.titulo}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
