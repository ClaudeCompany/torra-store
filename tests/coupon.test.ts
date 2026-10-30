import { describe, it, expect } from "vitest";
import { applyCoupon } from "@/lib/coupon";
import type { Coupon } from "@/lib/types";

const coupon = (over: Partial<Coupon> = {}): Coupon => ({
  code: "BEMVINDO10",
  type: "PERCENT",
  value: 10,
  minSubtotal: 0,
  active: true,
  expiresAt: null,
  ...over,
});

describe("applyCoupon", () => {
  it("aplica desconto percentual arredondando para baixo", () => {
    const r = applyCoupon(9999, coupon({ type: "PERCENT", value: 10 }));
    expect(r).toEqual({ ok: true, discountCents: 999 });
  });

  it("aplica desconto fixo", () => {
    const r = applyCoupon(5000, coupon({ type: "FIXED", value: 1500 }));
    expect(r).toEqual({ ok: true, discountCents: 1500 });
  });

  it("desconto fixo nunca passa do subtotal", () => {
    const r = applyCoupon(1000, coupon({ type: "FIXED", value: 1500 }));
    expect(r).toEqual({ ok: true, discountCents: 1000 });
  });

  it("recusa cupom inativo", () => {
    expect(applyCoupon(5000, coupon({ active: false }))).toEqual({
      ok: false,
      reason: "INACTIVE",
    });
  });

  it("recusa cupom expirado", () => {
    const r = applyCoupon(
      5000,
      coupon({ expiresAt: new Date("2020-01-01") }),
      new Date("2026-01-01"),
    );
    expect(r).toEqual({ ok: false, reason: "EXPIRED" });
  });

  it("aceita cupom no limite da expiracao (nao expirado ainda)", () => {
    const exp = new Date("2026-06-01T12:00:00Z");
    const r = applyCoupon(5000, coupon({ expiresAt: exp }), exp);
    expect(r.ok).toBe(true);
  });

  it("recusa abaixo do subtotal minimo", () => {
    expect(applyCoupon(4999, coupon({ minSubtotal: 5000 }))).toEqual({
      ok: false,
      reason: "BELOW_MINIMUM",
    });
  });

  it("aceita cupom com valor igual ao minimo aceitável", () => {
    expect(applyCoupon(10000, coupon({ minSubtotal: 10000 }))).toEqual({
      ok: true,
      discountCents: 1000,
    });
  });
});
