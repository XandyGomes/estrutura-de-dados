import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que é o 'pivô' no Quick Sort?",
    opcoes: [
      "O primeiro elemento sempre",
      "Um elemento escolhido para particionar o array: tudo menor fica de um lado, tudo maior do outro",
      "O maior elemento do array",
      "Uma estrutura de dados auxiliar",
    ],
    correta: 1,
    explicacao: "O pivô serve como referência de comparação: após particionar, ele já está na posição final correta.",
  },
  {
    id: "q2",
    enunciado: "Qual é o pior caso de complexidade do Quick Sort, e quando ele acontece?",
    opcoes: [
      "O(n log n), sempre",
      "O(n²), quando o pivô escolhido é repetidamente o menor ou o maior elemento do intervalo",
      "O(1), em qualquer situação",
      "O Quick Sort não tem pior caso",
    ],
    correta: 1,
    explicacao: "Se a partição for sempre muito desbalanceada (pivô extremo), a recursão degenera para O(n²), como no Bubble Sort.",
  },
  {
    id: "q3",
    enunciado: "Depois que o particionamento termina, o que sabemos sobre a posição do pivô?",
    opcoes: [
      "Nada, ele pode se mover de novo depois",
      "Ele já está na posição final definitiva do array ordenado",
      "Ele sempre vai para o índice 0",
      "Ele é removido do array",
    ],
    correta: 1,
    explicacao: "Essa é a garantia central do particionamento: o pivô nunca mais precisa se mover após essa etapa.",
  },
];
