import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Em um min-heap, onde está o menor valor?",
    opcoes: ["Sempre na última folha", "Sempre na raiz", "Em qualquer posição", "No meio do array"],
    correta: 1,
    explicacao: "A propriedade do min-heap garante que todo nó é menor ou igual aos filhos, então a raiz é sempre o mínimo.",
  },
  {
    id: "q2",
    enunciado: "Como encontramos o filho esquerdo do nó no índice i de um heap representado como array?",
    opcoes: ["i - 1", "i / 2", "2i + 1", "2i + 2"],
    correta: 2,
    explicacao: "A fórmula 2i + 1 dá o índice do filho esquerdo; 2i + 2 dá o filho direito.",
  },
  {
    id: "q3",
    enunciado: "O que acontece ao inserir um novo valor em um heap?",
    opcoes: [
      "Ele é comparado com o pai e 'sobe' (sift-up) até restaurar a propriedade do heap",
      "O heap inteiro é reordenado do zero",
      "Ele sempre vira a nova raiz",
      "Nada, heaps não aceitam novos valores",
    ],
    correta: 0,
    explicacao: "Inserimos na última posição e comparamos com o pai repetidamente (sift-up), até no máximo O(log n) trocas.",
  },
  {
    id: "q4",
    enunciado: "Ao extrair o mínimo de um min-heap, qual elemento assume a posição da raiz antes do sift-down?",
    opcoes: ["O segundo menor valor", "Um novo valor aleatório", "O último elemento do array", "Nenhum, a raiz fica vazia"],
    correta: 2,
    explicacao: "Movemos o último elemento do array para a raiz e então aplicamos sift-down para restaurar a propriedade do heap.",
  },
];
