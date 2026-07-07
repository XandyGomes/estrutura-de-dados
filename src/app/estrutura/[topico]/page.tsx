import Link from "next/link";
import { notFound } from "next/navigation";
import { topicosDisponiveis, getTopico } from "@/data/topicos";
import { TopicTabs } from "@/components/layout/TopicTabs";
import { QuizRunner } from "@/components/quiz/QuizRunner";

export function generateStaticParams() {
  return topicosDisponiveis.map((t) => ({ topico: t.slug }));
}

export const dynamicParams = false;

export default async function TopicoPage({
  params,
}: {
  params: Promise<{ topico: string }>;
}) {
  const { topico: slug } = await params;
  const topico = getTopico(slug);
  if (!topico || topico.status !== "disponivel") notFound();

  const [{ default: Licao }, { default: Visualizacao }, { quiz }] = await Promise.all([
    import(`@/content/licoes/${slug}.mdx`),
    import(`@/components/visualizacoes/${slug}`),
    import(`@/data/quizzes/${slug}.quiz`),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
      >
        ← Todos os tópicos
      </Link>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
        Estrutura de Dados
      </p>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">{topico.titulo}</h1>
      <p className="mb-4 text-[var(--color-muted)]">{topico.descricao}</p>

      <div className="mb-8 flex flex-wrap gap-2">
        {topico.pdf && (
          <a
            href={topico.pdf}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]"
          >
            📄 Baixar PDF da aula
          </a>
        )}
        <a
          href="https://github.com/XandyGomes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]"
        >
          💻 Ver código no GitHub
        </a>
      </div>

      <TopicTabs
        licao={<Licao />}
        visualizacao={<Visualizacao />}
        pratica={<QuizRunner questions={quiz} />}
      />
    </div>
  );
}
