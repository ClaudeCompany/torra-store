import { describe, it, expect } from "vitest";
import { buildQuote } from "@/lib/pricing";
import type { CartItem, Coupon } from "@/lib/types";

const items: CartItem[] = [
  { variantId: "v1", name: "Cafe", label: "500g", priceCents: 5000, weightGram: 500, quantity: 2 },
];

const coupon: Coupon = {
  code: "BEMVINDO10",
  type: "PERCENT",
  value: 10,
  minSubtotal: 0,
  active: true,
  expiresAt: null,
};

describe("buildQuote", () => {
  it("subtotal + frete sem cupom", () => {
    const { quote, couponError } = buildQuote({ items, cep: "01310100" });
    expect(quote.subtotalCents).toBe(10000);
    expect(quote.totalWeightGram).toBe(1000);
    expect(quote.shippingCents).toBe(1500);
    expect(quote.discountCents).toBe(0);
    expect(quote.totalCents).toBe(11500);
    expect(couponError).toBeUndefined();
  });

  it("aplica cupom valido", () => {
    const { quote, couponError } = buildQuote({ items, cep: "01310100", coupon });
    expect(quote.discountCents).toBe(1000);
    expect(quote.totalCents).toBe(10500);
    expect(couponError).toBeUndefined();
  });

  it("reporta cupom invalido sem derrubar o calculo", () => {
    const { quote, couponError } = buildQuote({
      items,
      cep: "01310100",
      coupon: { ...coupon, minSubtotal: 999999 },
    });
    expect(couponError).toBe("BELOW_MINIMUM");
    expect(quote.discountCents).toBe(0);
    expect(quote.totalCents).toBe(11500);
  });

  it("frete gratis acima do limite", () => {
    const freeItems: CartItem[] = [
      {
        variantId: "v2",
        name: "Cafe Especial",
        label: "1kg",
        priceCents: 20000,
        weightGram: 1000,
        quantity: 1,
      },
    ];

    const { quote } = buildQuote({ items: freeItems, cep: "01310100" });
    expect(quote.shippingCents).toBe(0);
  });

  it("frete gratis exatamente no limite (15000)", () => {
    const freeItems: CartItem[] = [
      {
        variantId: "v2",
        name: "Cafe Especial",
        label: "1kg",
        priceCents: 15000,
        weightGram: 1000,
        quantity: 1,
      },
    ];
    const { quote } = buildQuote({ items: freeItems, cep: "01310100" });
    expect(quote.shippingCents).toBe(0);
  });

  it("cobra frete abaixo do limite", () => {
    const paidItems: CartItem[] = [
      {
        variantId: "v2",
        name: "Cafe Especial",
        label: "1kg",
        priceCents: 10000,
        weightGram: 1000,
        quantity: 1,
      },
    ];
    const { quote } = buildQuote({ items: paidItems, cep: "01310100" });
    expect(quote.shippingCents).toBe(1500);
  });
});
