import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Qual estratégia o Merge Sort usa para ordenar?",
    opcoes: [
      "Comparar elementos adjacentes repetidamente",
      "Dividir o array em metades recursivamente e depois intercalar as partes ordenadas",
      "Escolher um pivô e particionar",
      "Inserir cada elemento na posição certa de uma lista já ordenada",
    ],
    correta: 1,
    explicacao: "Merge Sort é o exemplo clássico de 'dividir para conquistar': divide, ordena as partes, e intercala.",
  },
  {
    id: "q2",
    enunciado: "Qual é a complexidade do Merge Sort, e em quais casos ela vale?",
    opcoes: [
      "O(n²) sempre",
      "O(n log n) em todos os casos (melhor, médio e pior)",
      "O(n) no melhor caso, O(n²) no pior",
      "O(log n) sempre",
    ],
    correta: 1,
    explicacao: "Diferente de algoritmos O(n²), o Merge Sort garante O(n log n) mesmo no pior caso, graças à divisão sempre balanceada.",
  },
  {
    id: "q3",
    enunciado: "Por que o Merge Sort precisa de memória extra O(n)?",
    opcoes: [
      "Porque ele não é eficiente",
      "Porque a etapa de intercalação (merge) monta o resultado combinado em um espaço auxiliar antes de copiar de volta",
      "Porque ele usa duas cópias completas do array o tempo todo",
      "Não precisa de memória extra",
    ],
    correta: 1,
    explicacao: "Ao intercalar duas metades, é preciso um espaço auxiliar temporário para montar a sequência combinada corretamente.",
  },
];
