import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Em uma BST, onde ficam os valores menores que o de um nó?",
    opcoes: ["Na subárvore direita", "Na subárvore esquerda", "Sempre nas folhas", "Não há regra"],
    correta: 1,
    explicacao: "A propriedade da BST garante que valores menores ficam à esquerda e maiores à direita de cada nó.",
  },
  {
    id: "q2",
    enunciado: "Qual percurso de uma BST visita os valores em ordem crescente?",
    opcoes: ["Pré-ordem", "Pós-ordem", "Em ordem", "Nenhum deles"],
    correta: 2,
    explicacao: "O percurso em ordem (esquerda, raiz, direita) sempre produz os valores em ordem crescente numa BST.",
  },
  {
    id: "q3",
    enunciado: "Ao remover um nó com dois filhos, o que fazemos?",
    opcoes: [
      "Removemos os dois filhos junto",
      "Copiamos o valor do sucessor (menor da subárvore direita) e removemos o sucessor",
      "É impossível remover esse nó",
      "Substituímos pelo nó pai",
    ],
    correta: 1,
    explicacao: "O sucessor mantém a propriedade da BST intacta após substituir o valor removido.",
  },
  {
    id: "q4",
    enunciado: "Por que uma BST pode degenerar para O(n) nas operações?",
    opcoes: [
      "Se os valores forem inseridos em ordem crescente/decrescente, a árvore vira uma lista ligada",
      "BSTs sempre são O(n)",
      "Isso nunca acontece",
      "Só acontece com valores negativos",
    ],
    correta: 0,
    explicacao: "Sem balanceamento, inserir valores já ordenados cria uma árvore totalmente 'torta', sem ganho sobre uma lista ligada.",
  },
];
