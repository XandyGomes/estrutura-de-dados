import type { TopicDef } from "@/lib/types";

export const topicos: TopicDef[] = [
  {
    slug: "big-o",
    titulo: "Big-O e Complexidade",
    descricao: "Como medir e comparar a eficiência de algoritmos.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "arrays",
    titulo: "Arrays",
    descricao: "Acesso, inserção, remoção e busca por índice.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "busca-sequencial",
    titulo: "Busca Sequencial",
    descricao: "Percorrendo o array elemento a elemento.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "busca-binaria",
    titulo: "Busca Binária",
    descricao: "Dividindo o problema ao meio a cada passo.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "pilhas",
    titulo: "Pilhas (Stack)",
    descricao: "Last In, First Out: push, pop e peek.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "filas",
    titulo: "Filas (Queue)",
    descricao: "First In, First Out: enqueue e dequeue.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "deque",
    titulo: "Deque (Fila de Duas Pontas)",
    descricao: "Inserção e remoção nas duas extremidades.",
    fase: 1,
    status: "disponivel",
  },
  {
    slug: "listas-ligadas",
    titulo: "Listas Ligadas",
    descricao: "Nós conectados por ponteiros: inserir, remover, buscar.",
    fase: 2,
    status: "disponivel",
  },
  {
    slug: "listas-duplamente-encadeadas",
    titulo: "Listas Duplamente Encadeadas",
    descricao: "Ponteiros para os dois vizinhos: anterior e próximo.",
    fase: 2,
    status: "disponivel",
  },
  {
    slug: "arvores-binarias",
    titulo: "Árvores Binárias e BST",
    descricao: "Inserção, remoção, busca e percursos em árvores.",
    fase: 3,
    status: "disponivel",
  },
  {
    slug: "heaps",
    titulo: "Heaps (Min/Max)",
    descricao: "Sift-up e sift-down em uma árvore binária quase completa.",
    fase: 3,
    status: "disponivel",
  },
  {
    slug: "arvores-avl",
    titulo: "Árvores AVL",
    descricao: "Árvores balanceadas e as quatro rotações.",
    fase: 3,
    status: "disponivel",
  },
  {
    slug: "tabelas-hash",
    titulo: "Tabelas Hash",
    descricao: "Funções de hash, colisões e encadeamento.",
    fase: 4,
    status: "em-breve",
  },
  {
    slug: "grafos",
    titulo: "Grafos, BFS, DFS e Dijkstra",
    descricao: "Representação, travessias e caminho mínimo.",
    fase: 5,
    status: "em-breve",
  },
];

export function getTopico(slug: string): TopicDef | undefined {
  return topicos.find((t) => t.slug === slug);
}

export const topicosDisponiveis = topicos.filter((t) => t.status === "disponivel");
