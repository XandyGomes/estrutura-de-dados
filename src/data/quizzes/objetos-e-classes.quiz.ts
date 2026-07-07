import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que é um Tipo Abstrato de Dados (TAD)?",
    opcoes: [
      "Um tipo de variável que só existe em linguagens tipadas",
      "Uma estrutura definida pelos dados que guarda, pelas operações válidas sobre eles e pelas regras que precisam respeitar",
      "Um array sem tipo definido",
      "Um objeto que não pode ser modificado",
    ],
    correta: 1,
    explicacao: "TAD é definido pelo comportamento (operações e regras), não só pelos dados brutos armazenados.",
  },
  {
    id: "q2",
    enunciado: "Qual o problema de criar um objeto sem passar por uma classe que valide seus dados?",
    opcoes: [
      "Não é possível criar um objeto sem uma classe",
      "Nada impede que os campos tenham valores inválidos, e o erro só aparece quando o objeto for usado, longe de onde foi criado",
      "Objetos sem classe são sempre mais lentos",
      "Objetos sem classe não podem ter métodos",
    ],
    correta: 1,
    explicacao: "Sem uma classe validando os dados na criação, qualquer valor é aceito, e o problema só se manifesta depois, na hora do uso.",
  },
  {
    id: "q3",
    enunciado: "Em Java, o que indica que um atributo de classe é privado?",
    opcoes: [
      "A palavra-chave private antes do tipo e do nome do atributo",
      "O nome do atributo começar com um caractere especial",
      "O atributo estar dentro do construtor",
      "Não existe atributo privado em Java",
    ],
    correta: 0,
    explicacao: "Em Java, atributos privados são declarados com o modificador private, e só podem ser acessados de dentro da própria classe, geralmente por meio de getters e setters públicos.",
  },
  {
    id: "q4",
    enunciado: "Qual a função de um setter numa classe?",
    opcoes: [
      "Apenas ler o valor de um atributo privado",
      "Permitir alterar um atributo privado, validando o novo valor antes de aceitá-lo",
      "Criar um novo objeto a partir do zero",
      "Deletar um atributo da classe",
    ],
    correta: 1,
    explicacao: "O setter intercepta a tentativa de alterar um atributo privado e pode rejeitar valores inválidos antes de aceitá-los.",
  },
  {
    id: "q5",
    enunciado: "Por que entender classes ajuda a entender as próximas estruturas de dados (pilha, fila, lista, árvore)?",
    opcoes: [
      "Porque todas elas são, na prática, implementadas como classes que definem operações válidas e garantem certas regras",
      "Porque não tem relação nenhuma, são assuntos separados",
      "Porque pilhas e filas não podem ser implementadas com classes",
      "Porque classes só servem para geometria",
    ],
    correta: 0,
    explicacao: "Cada estrutura de dados é um TAD implementado como classe: define as operações permitidas (push/pop, enqueue/dequeue...) e mantém suas regras sempre válidas.",
  },
];
