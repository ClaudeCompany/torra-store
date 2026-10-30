import type { Coupon } from "./types";

export type CouponError = "INACTIVE" | "EXPIRED" | "BELOW_MINIMUM";

export type CouponResult = { ok: true; discountCents: number } | { ok: false; reason: CouponError };

// Desconto nunca passa do subtotal (nao existe total negativo).
export function applyCoupon(
  subtotalCents: number,
  coupon: Coupon,
  now: Date = new Date(),
): CouponResult {
  if (!coupon.active) return { ok: false, reason: "INACTIVE" };
  if (coupon.expiresAt && now > coupon.expiresAt) return { ok: false, reason: "EXPIRED" };
  if (subtotalCents < coupon.minSubtotal) return { ok: false, reason: "BELOW_MINIMUM" };

  const raw =
    coupon.type === "PERCENT" ? Math.floor((subtotalCents * coupon.value) / 100) : coupon.value;

  return { ok: true, discountCents: Math.min(raw, subtotalCents) };
}

export const couponErrorMessage: Record<CouponError, string> = {
  INACTIVE: "Cupom invalido ou desativado.",
  EXPIRED: "Cupom expirado.",
  BELOW_MINIMUM: "Subtotal abaixo do minimo exigido pelo cupom.",
};
