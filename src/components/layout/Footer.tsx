export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-center">
        <p className="text-sm text-[var(--color-foreground)]">
          Criado por{" "}
          <a
            href="https://github.com/XandyGomes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
          >
            Alexandre Gomes da Silva
          </a>
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          Professor de Estrutura de Dados · Mestre em Computação Aplicada (USP)
        </p>
      </div>
    </footer>
  );
}
