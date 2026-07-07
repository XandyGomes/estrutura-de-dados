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
  {
    id: "q5",
    enunciado: "O problema das Pontes de Königsberg, resolvido por Euler em 1736, perguntava:",
    opcoes: [
      "Qual a menor distância entre duas pontes",
      "Se era possível atravessar cada uma das 7 pontes exatamente uma vez, voltando ao ponto de partida",
      "Quantas pontes seriam necessárias para conectar a cidade",
      "Qual o peso máximo que cada ponte suportava",
    ],
    correta: 1,
    explicacao: "Euler provou que isso só é possível se todo nó do grafo tiver um número par de arestas — em Königsberg, todas as 4 áreas tinham número ímpar de pontes, então era impossível.",
  },
  {
    id: "q6",
    enunciado: "O que caracteriza um grafo bipartido?",
    opcoes: [
      "Ele tem exatamente dois nós",
      "Os nós podem ser divididos em dois grupos, e toda aresta conecta um nó de um grupo a um nó do outro",
      "Ele sempre tem peso nas arestas",
      "Ele nunca tem ciclos",
    ],
    correta: 1,
    explicacao: "Nenhuma aresta conecta dois nós do mesmo grupo — um exemplo clássico é 'pessoas' de um lado e 'produtos que elas compraram' do outro.",
  },
  {
    id: "q7",
    enunciado: "Resolver um Sudoku pode ser modelado como qual problema de grafos?",
    opcoes: [
      "Caminho mínimo (Dijkstra)",
      "Coloração de grafos: cada célula é um nó, e células na mesma linha/coluna/quadrante não podem ter a mesma 'cor' (número)",
      "Árvore geradora mínima",
      "Detecção de ciclos",
    ],
    correta: 1,
    explicacao: "Cada célula vira um nó conectado às demais da mesma linha, coluna e quadrante; preencher os números é como colorir o grafo sem que nós vizinhos tenham a mesma cor.",
  },
];
