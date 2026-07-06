import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que é o 'fator de balanceamento' de um nó?",
    opcoes: [
      "A soma dos valores da subárvore",
      "A diferença entre a altura da subárvore esquerda e da direita",
      "O número total de nós na árvore",
      "A profundidade do nó a partir da raiz",
    ],
    correta: 1,
    explicacao: "fator = altura(esquerda) - altura(direita). Uma árvore AVL mantém esse valor entre -1 e 1 em todo nó.",
  },
  {
    id: "q2",
    enunciado: "Quando o caso é 'Esquerda-Esquerda' (LL), qual rotação resolve o desbalanceamento?",
    opcoes: ["Rotação dupla", "Rotação simples à direita", "Rotação simples à esquerda", "Nenhuma rotação"],
    correta: 1,
    explicacao: "No caso LL, uma única rotação à direita no nó desbalanceado já restaura o balanceamento.",
  },
  {
    id: "q3",
    enunciado: "Por que o caso Esquerda-Direita (LR) precisa de duas rotações?",
    opcoes: [
      "Porque o filho esquerdo está inclinado para a direita, então é preciso primeiro alinhá-lo antes da rotação principal",
      "Porque a árvore tem mais de 10 nós",
      "É só uma convenção, uma rotação também resolveria",
      "Porque o valor inserido é negativo",
    ],
    correta: 0,
    explicacao: "Uma rotação simples não bastaria porque o desequilíbrio está 'na direção errada' dentro do filho; a rotação no filho corrige isso antes da rotação principal.",
  },
  {
    id: "q4",
    enunciado: "Qual é a garantia de complexidade que a árvore AVL oferece para busca, mesmo no pior caso?",
    opcoes: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correta: 1,
    explicacao: "Como a AVL nunca deixa a altura crescer além de ~1.44 log₂(n), todas as operações dependentes de altura ficam O(log n) garantido.",
  },
];
