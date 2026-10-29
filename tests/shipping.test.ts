import { describe, it, expect } from "vitest";
import { calcShippingCents, zoneFromCep, InvalidCepError } from "@/lib/shipping";

describe("zoneFromCep", () => {
  it("mapeia prefixo para zona", () => {
    expect(zoneFromCep("01310-100")).toBe("SUDESTE");
    expect(zoneFromCep("90010-000")).toBe("SUL");
    expect(zoneFromCep("40010-000")).toBe("NORDESTE");
    expect(zoneFromCep("69900-000")).toBe("NORTE_CENTRO");
  });

  it("aceita CEP com ou sem mascara", () => {
    expect(zoneFromCep("01310100")).toBe("SUDESTE");
  });

  it("rejeita CEP com tamanho errado", () => {
    expect(() => zoneFromCep("123")).toThrow(InvalidCepError);
  });
});

describe("calcShippingCents", () => {
  it("primeiro quilo incluso na base", () => {
    expect(calcShippingCents(250, "01310100")).toBe(1500);
    expect(calcShippingCents(1000, "01310100")).toBe(1500);
  });

  it("cobra incremento por quilo iniciado alem do primeiro", () => {
    // 1001g => 2kg faturados => base + 1 incremento
    expect(calcShippingCents(1001, "01310100")).toBe(2000);
    // 2500g => 3kg => base + 2 incrementos
    expect(calcShippingCents(2500, "01310100")).toBe(2500);
  });

  it("peso zero ainda fatura 1kg", () => {
    expect(calcShippingCents(0, "01310100")).toBe(1500);
  });
});
