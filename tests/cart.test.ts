import { describe, it, expect } from "vitest";
import { subtotalCents, totalWeightGram } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

const item = (over: Partial<CartItem> = {}): CartItem => ({
  variantId: "v1",
  name: "Cafe",
  label: "250g",
  priceCents: 3200,
  weightGram: 250,
  quantity: 1,
  ...over,
});

describe("subtotalCents", () => {
  it("soma preco x quantidade", () => {
    expect(subtotalCents([item({ quantity: 2 }), item({ priceCents: 1000 })])).toBe(7400);
  });

  it("carrinho vazio e zero", () => {
    expect(subtotalCents([])).toBe(0);
  });
});

describe("totalWeightGram", () => {
  it("soma peso x quantidade", () => {
    expect(totalWeightGram([item({ weightGram: 500, quantity: 3 })])).toBe(1500);
  });
});
