import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--background)_75%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm font-semibold text-[var(--color-primary)]">
            {"{}"}
          </span>
          <span className="font-medium tracking-tight">
            Estrutura de Dados
            <span className="text-[var(--color-primary)]">.</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--color-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--color-foreground)]">
            Tópicos
          </Link>
          <Link href="/programa" className="transition-colors hover:text-[var(--color-foreground)]">
            Conteúdo Programático
          </Link>
          <a
            href="https://github.com/XandyGomes"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-foreground)]"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
