import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que é o 'caso base' de uma função recursiva?",
    opcoes: [
      "A primeira linha da função",
      "A condição que faz a função parar de chamar a si mesma e retornar um valor direto",
      "Um erro de programação",
      "O nome da função",
    ],
    correta: 1,
    explicacao: "Sem caso base, a função chamaria a si mesma indefinidamente, causando estouro de pilha.",
  },
  {
    id: "q2",
    enunciado: "Qual estrutura de dados está diretamente por trás de como a recursão funciona?",
    opcoes: ["Fila", "Pilha (a pilha de chamadas)", "Árvore", "Tabela hash"],
    correta: 1,
    explicacao: "Cada chamada empilha um novo quadro; quando uma chamada retorna, seu quadro é desempilhado (LIFO).",
  },
  {
    id: "q3",
    enunciado: "O que pode acontecer se uma recursão nunca chegar ao caso base?",
    opcoes: [
      "Nada, o programa continua normalmente",
      "Estouro de pilha (stack overflow), porque os quadros continuam se empilhando sem nunca serem removidos",
      "O resultado fica sempre igual a zero",
      "O programa fica mais rápido",
    ],
    correta: 1,
    explicacao: "Cada chamada consome memória na pilha; sem parar, a pilha cresce até estourar o limite disponível.",
  },
];
