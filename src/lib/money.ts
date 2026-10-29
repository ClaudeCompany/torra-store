// Dinheiro em centavos (inteiro). Float para moeda gera erro de arredondamento
// (0.1 + 0.2 !== 0.3). Converte para Real so na hora de exibir.

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function reaisToCents(reais: number): number {
  return Math.round(reais * 100);
}
