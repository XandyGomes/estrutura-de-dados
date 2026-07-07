import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Qual estrutura de dados o BFS usa para decidir a ordem de visita dos nós?",
    opcoes: ["Uma pilha", "Uma fila", "Uma árvore", "Uma tabela hash"],
    correta: 1,
    explicacao: "BFS usa uma fila (FIFO): os vizinhos são visitados na ordem em que foram descobertos, camada por camada.",
  },
  {
    id: "q2",
    enunciado: "Por que o DFS é frequentemente implementado com recursão?",
    opcoes: [
      "Porque é a única forma possível",
      "Porque a pilha de chamadas da recursão já se comporta como a pilha (LIFO) que o DFS precisa",
      "Porque recursão é sempre mais rápida",
      "DFS não pode ser implementado com recursão",
    ],
    correta: 1,
    explicacao: "A pilha de chamadas naturalmente mantém o caminho atual sendo explorado, dispensando uma pilha explícita.",
  },
  {
    id: "q3",
    enunciado: "O que é 'relaxamento de aresta' no algoritmo de Dijkstra?",
    opcoes: [
      "Remover uma aresta do grafo",
      "Verificar se passar por uma aresta oferece um caminho mais curto até o vizinho, e atualizar a distância se sim",
      "Diminuir o peso de todas as arestas",
      "Ignorar arestas com peso alto",
    ],
    correta: 1,
    explicacao: "Relaxar uma aresta (u,v) significa checar se dist[u] + peso(u,v) < dist[v], atualizando dist[v] quando for menor.",
  },
  {
    id: "q4",
    enunciado: "Por que o BFS encontra o caminho com menos arestas, mas não necessariamente o de Dijkstra encontraria o mesmo caminho?",
    opcoes: [
      "BFS e Dijkstra sempre dão o mesmo resultado",
      "Porque BFS ignora pesos: um caminho com menos arestas pode custar mais se as arestas tiverem pesos altos",
      "Porque BFS é mais lento que Dijkstra",
      "Porque Dijkstra só funciona em árvores",
    ],
    correta: 1,
    explicacao: "BFS conta apenas o número de arestas (assume peso 1 para todas); Dijkstra considera o peso real de cada aresta, podendo preferir um caminho com mais arestas, mas de menor custo total.",
  },
];
