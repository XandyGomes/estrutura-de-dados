import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que caracteriza uma matriz esparsa?",
    opcoes: [
      "Uma matriz sem nenhum valor zero",
      "Uma matriz onde a grande maioria dos valores é zero",
      "Uma matriz quadrada",
      "Uma matriz com menos de 10 elementos",
    ],
    correta: 1,
    explicacao: "O termo 'esparsa' se refere justamente à baixa densidade de valores não-zero.",
  },
  {
    id: "q2",
    enunciado: "Como a representação esparsa guarda os dados?",
    opcoes: [
      "Guardando todos os valores, incluindo os zeros",
      "Guardando apenas triplas (linha, coluna, valor) para os elementos não-zero",
      "Guardando só o maior valor da matriz",
      "Comprimindo a matriz em uma imagem",
    ],
    correta: 1,
    explicacao: "Só os elementos não-zero são armazenados, cada um com sua posição (linha, coluna) e valor.",
  },
  {
    id: "q3",
    enunciado: "Qual é o principal trade-off (contrapartida) de usar uma matriz esparsa?",
    opcoes: [
      "Nenhum, ela é sempre superior à densa",
      "Acesso a um elemento específico fica mais lento (O(k) em vez de O(1)), mas economiza muita memória",
      "Ela não pode representar valores negativos",
      "Ela só funciona com matrizes quadradas",
    ],
    correta: 1,
    explicacao: "A representação densa acessa qualquer posição em O(1); a esparsa precisa procurar entre as triplas guardadas, mais lento, mas usa muito menos memória quando há poucos valores não-zero.",
  },
];
