import type { CartItem } from "./types";

export function subtotalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export function totalWeightGram(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.weightGram * item.quantity, 0);
}
