// Frete por zona (prefixo do CEP) + peso. Primeiro quilo incluso na base;
// cada quilo iniciado alem do primeiro soma o incremento da zona.
// Regras completas em docs/business-rules.md.

export type ShippingZone = "SUDESTE" | "SUL" | "NORDESTE" | "NORTE_CENTRO";

interface ZoneRate {
  baseCents: number;
  perKgCents: number;
}

const ZONE_RATES: Record<ShippingZone, ZoneRate> = {
  SUDESTE: { baseCents: 1500, perKgCents: 500 },
  SUL: { baseCents: 2000, perKgCents: 600 },
  NORDESTE: { baseCents: 2500, perKgCents: 800 },
  NORTE_CENTRO: { baseCents: 3000, perKgCents: 1000 },
};

export class InvalidCepError extends Error {
  constructor(cep: string) {
    super(`CEP invalido: ${cep}`);
    this.name = "InvalidCepError";
  }
}

export function normalizeCep(cep: string): string {
  return cep.replace(/\D/g, "");
}

export function zoneFromCep(cep: string): ShippingZone {
  const digits = normalizeCep(cep);
  if (digits.length !== 8) throw new InvalidCepError(cep);

  const first = digits[0];
  if ("0123".includes(first)) return "SUDESTE";
  if ("89".includes(first)) return "SUL";
  if ("45".includes(first)) return "NORDESTE";
  return "NORTE_CENTRO"; // 6, 7
}

export function calcShippingCents(totalWeightGram: number, cep: string): number {
  const rate = ZONE_RATES[zoneFromCep(cep)];
  const billedKg = Math.max(1, Math.ceil(totalWeightGram / 1000));
  return rate.baseCents + rate.perKgCents * (billedKg - 1);
}
