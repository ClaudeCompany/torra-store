// Tipos de dominio, independentes do Prisma, para a logica de calculo ficar
// pura e testavel sem banco.

export interface CartItem {
  variantId: string;
  name: string;
  label: string;
  priceCents: number;
  weightGram: number;
  quantity: number;
}

export type CouponType = "PERCENT" | "FIXED";

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  minSubtotal: number;
  active: boolean;
  expiresAt: Date | null;
}

export interface Quote {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  totalWeightGram: number;
}
