import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Por que o algoritmo se chama 'Bubble Sort' (ordenação por bolha)?",
    opcoes: [
      "Porque usa uma estrutura chamada bolha",
      "Porque o maior valor não ordenado 'borbulha' até o final a cada passada",
      "Porque foi inventado em um laboratório de física",
      "Não tem relação com o nome",
    ],
    correta: 1,
    explicacao: "A cada passada completa, o maior elemento restante sobe (como uma bolha) até sua posição final.",
  },
  {
    id: "q2",
    enunciado: "Qual é a complexidade de tempo do Bubble Sort no pior caso?",
    opcoes: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correta: 2,
    explicacao: "Dois laços aninhados percorrendo o array geram O(n²) comparações no pior caso.",
  },
  {
    id: "q3",
    enunciado: "Qual otimização permite ao Bubble Sort terminar mais cedo em um array quase ordenado?",
    opcoes: [
      "Pular elementos pares",
      "Parar assim que uma passada completa não fizer nenhuma troca",
      "Ordenar só a metade do array",
      "Não existe otimização possível",
    ],
    correta: 1,
    explicacao: "Se uma passada inteira não troca nada, o array já está ordenado — não faz sentido continuar.",
  },
];
