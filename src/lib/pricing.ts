import { subtotalCents, totalWeightGram } from "./cart";
import { applyCoupon, type CouponError } from "./coupon";
import { calcShippingCents } from "./shipping";
import type { CartItem, Coupon, Quote } from "./types";

export interface QuoteInput {
  items: CartItem[];
  cep: string;
  coupon?: Coupon | null;
  now?: Date;
}

export interface QuoteResult {
  quote: Quote;
  couponError?: CouponError;
}

export function buildQuote({ items, cep, coupon, now }: QuoteInput): QuoteResult {
  const subtotal = subtotalCents(items);
  const weight = totalWeightGram(items);
  const shipping = calcShippingCents(weight, cep);

  let discount = 0;
  let couponError: CouponError | undefined;

  if (coupon) {
    const result = applyCoupon(subtotal, coupon, now);
    if (result.ok) discount = result.discountCents;
    else couponError = result.reason;
  }

  const quote: Quote = {
    subtotalCents: subtotal,
    discountCents: discount,
    shippingCents: shipping,
    totalCents: subtotal - discount + shipping,
    totalWeightGram: weight,
  };

  return { quote, couponError };
}
