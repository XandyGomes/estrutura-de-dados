import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que o Selection Sort faz em cada iteração do laço externo?",
    opcoes: [
      "Compara todos os pares de elementos",
      "Procura o menor elemento restante e o troca para a posição correta",
      "Divide o array ao meio",
      "Insere um elemento aleatório",
    ],
    correta: 1,
    explicacao: "Ele 'seleciona' o menor valor da parte não ordenada e o move para o lugar certo, uma posição por vez.",
  },
  {
    id: "q2",
    enunciado: "Qual a principal vantagem do Selection Sort sobre o Bubble Sort?",
    opcoes: [
      "É mais rápido no pior caso",
      "Faz muito menos trocas de elementos (no máximo uma por posição)",
      "Não precisa comparar elementos",
      "Funciona só com números pares",
    ],
    correta: 1,
    explicacao: "O Selection Sort faz no máximo n-1 trocas no total, enquanto o Bubble Sort pode trocar várias vezes por passada.",
  },
  {
    id: "q3",
    enunciado: "O Selection Sort tem uma otimização de parada antecipada para arrays já ordenados, como o Bubble Sort?",
    opcoes: [
      "Sim, sempre para no O(n) nesse caso",
      "Não, ele sempre faz o mesmo número de comparações, independente da ordem inicial",
      "Só em arrays com menos de 10 elementos",
      "Depende da linguagem de programação",
    ],
    correta: 1,
    explicacao: "Diferente do Bubble Sort, o Selection Sort sempre percorre e compara tudo, mesmo que o array já esteja ordenado.",
  },
];
