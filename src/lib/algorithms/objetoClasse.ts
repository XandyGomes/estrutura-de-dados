import type { FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { hl } from "@/lib/highlightColor";

export type CampoCheck = {
  id: string;
  label: string;
  detalhe: string;
};

export type ObjetoState = {
  base: string;
  altura: string;
  tipo: string;
  checks: CampoCheck[];
  area: number | null;
  erro: string | null;
  modo: "livre" | "classe" | null;
};

export function makeObjetoState(): ObjetoState {
  return { base: "", altura: "", tipo: "", checks: [], area: null, erro: null, modo: null };
}

function calcArea(base: number, altura: number, tipo: string): number | null {
  switch (tipo) {
    case "R":
      return base * altura;
    case "T":
      return (base * altura) / 2;
    case "E":
      return (base / 2) * (altura / 2) * Math.PI;
    default:
      return null;
  }
}

export function criarObjetoLivre(
  state: ObjetoState,
  baseRaw: string,
  alturaRaw: string,
  tipoRaw: string
): OperationResult<ObjetoState> {
  const base = Number(baseRaw);
  const altura = Number(alturaRaw);
  const tipo = tipoRaw.trim().toUpperCase();

  const checks: CampoCheck[] = [
    { id: createId(), label: "base", detalhe: baseRaw || "(vazio)" },
    { id: createId(), label: "altura", detalhe: alturaRaw || "(vazio)" },
    { id: createId(), label: "tipo", detalhe: tipo || "(vazio)" },
  ];

  const nextState: ObjetoState = {
    base: baseRaw,
    altura: alturaRaw,
    tipo,
    checks,
    area: null,
    erro: null,
    modo: "livre",
  };

  const frames: FrameSequence<ObjetoState> = [
    {
      id: 0,
      state: { ...nextState, checks, area: null, erro: null },
      narration: `Criando um objeto comum, com base = ${baseRaw}, altura = ${alturaRaw}, tipo = ${tipo}, sem nenhuma classe por trás. Nada garante que esses valores fazem sentido.`,
    },
  ];

  const area = calcArea(base, altura, tipo);
  const final: ObjetoState = { ...nextState, area, erro: area === null ? `calcularArea() não reconhece o tipo "${tipo}" e retorna nulo.` : null };
  frames.push({
    id: 1,
    state: final,
    highlights: checks.map((c) => hl(c.id, area === null ? "danger" : "new")),
    narration:
      area === null
        ? `O objeto foi criado sem nenhum problema (nada impede isso sem uma classe validando), mas calcularArea() não sabe o que fazer com tipo "${tipo}" e retorna nulo. O erro só aparece depois, longe de onde o objeto foi criado.`
        : `O objeto foi criado e calcularArea() devolveu ${area.toFixed(2)}. Funcionou desta vez, mas nada no código impede alguém de passar base negativa, ou um tipo inválido, e só descobrir o problema muito depois.`,
  });

  return { ok: true, frames, nextState: final };
}

export function criarComClasse(
  state: ObjetoState,
  baseRaw: string,
  alturaRaw: string,
  tipoRaw: string
): OperationResult<ObjetoState> {
  const base = Number(baseRaw);
  const altura = Number(alturaRaw);
  const tipo = tipoRaw.trim().toUpperCase();

  const checkBase = { id: createId(), label: "base", detalhe: baseRaw || "(vazio)" };
  const checkAltura = { id: createId(), label: "altura", detalhe: alturaRaw || "(vazio)" };
  const checkTipo = { id: createId(), label: "tipo", detalhe: tipo || "(vazio)" };
  const checks = [checkBase, checkAltura, checkTipo];

  const baseState: ObjetoState = { base: baseRaw, altura: alturaRaw, tipo, checks, area: null, erro: null, modo: "classe" };

  const frames: FrameSequence<ObjetoState> = [
    {
      id: 0,
      state: baseState,
      narration: `new FormaGeometrica(${baseRaw}, ${alturaRaw}, "${tipo}") chama o construtor, que passa cada valor pelo setter correspondente antes de aceitar qualquer coisa.`,
    },
  ];

  if (!Number.isFinite(base) || base <= 0) {
    const erro = `ERRO: a base precisa ser numérica e maior que zero (recebeu "${baseRaw}").`;
    const final: ObjetoState = { ...baseState, erro };
    frames.push({
      id: 1,
      state: final,
      highlights: [hl(checkBase.id, "danger")],
      narration: `O setter de base rejeita o valor na hora: "${erro}" O objeto nunca chega a existir com um dado inválido.`,
    });
    return { ok: true, frames, nextState: final };
  }
  frames.push({
    id: frames.length,
    state: baseState,
    highlights: [hl(checkBase.id, "success")],
    narration: `Validando base (${baseRaw}): numérico e positivo, aceito.`,
  });

  if (!Number.isFinite(altura) || altura <= 0) {
    const erro = `ERRO: a altura precisa ser numérica e maior que zero (recebeu "${alturaRaw}").`;
    const final: ObjetoState = { ...baseState, erro };
    frames.push({
      id: frames.length,
      state: final,
      highlights: [hl(checkBase.id, "success"), hl(checkAltura.id, "danger")],
      narration: `O setter de altura rejeita o valor: "${erro}"`,
    });
    return { ok: true, frames, nextState: final };
  }
  frames.push({
    id: frames.length,
    state: baseState,
    highlights: [hl(checkBase.id, "success"), hl(checkAltura.id, "success")],
    narration: `Validando altura (${alturaRaw}): numérico e positivo, aceito.`,
  });

  if (!["R", "T", "E"].includes(tipo)) {
    const erro = `ERRO: o tipo precisa ser um dos valores: "R", "T" ou "E" (recebeu "${tipo}").`;
    const final: ObjetoState = { ...baseState, erro };
    frames.push({
      id: frames.length,
      state: final,
      highlights: [hl(checkBase.id, "success"), hl(checkAltura.id, "success"), hl(checkTipo.id, "danger")],
      narration: `O setter de tipo rejeita o valor: "${erro}"`,
    });
    return { ok: true, frames, nextState: final };
  }
  frames.push({
    id: frames.length,
    state: baseState,
    highlights: [hl(checkBase.id, "success"), hl(checkAltura.id, "success"), hl(checkTipo.id, "success")],
    narration: `Validando tipo ("${tipo}"): valor reconhecido, aceito.`,
  });

  const area = calcArea(base, altura, tipo) as number;
  const final: ObjetoState = { ...baseState, area, erro: null };
  frames.push({
    id: frames.length,
    state: final,
    highlights: checks.map((c) => hl(c.id, "success")),
    narration: `Todos os setters aceitaram os valores, o objeto existe com dados garantidamente válidos. area = ${area.toFixed(2)}.`,
  });

  return { ok: true, frames, nextState: final };
}
