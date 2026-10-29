import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildQuote } from "@/lib/pricing";
import { InvalidCepError } from "@/lib/shipping";
import { couponErrorMessage } from "@/lib/coupon";
import type { CartItem, Coupon } from "@/lib/types";

interface QuoteBody {
  items: { variantId: string; quantity: number }[];
  cep: string;
  couponCode?: string;
}

// Precos e peso vem do banco, nunca do cliente: o front so manda id e quantidade.
export async function POST(req: Request) {
  const body = (await req.json()) as QuoteBody;

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }

  const variants = await prisma.variant.findMany({
    where: { id: { in: body.items.map((i) => i.variantId) } },
    include: { product: true },
  });

  const items: CartItem[] = [];
  for (const line of body.items) {
    const v = variants.find((x) => x.id === line.variantId);
    if (!v) return NextResponse.json({ error: "Variante inexistente." }, { status: 400 });
    items.push({
      variantId: v.id,
      name: v.product.name,
      label: v.label,
      priceCents: v.priceCents,
      weightGram: v.weightGram,
      quantity: line.quantity,
    });
  }

  let coupon: Coupon | null = null;
  if (body.couponCode) {
    const found = await prisma.coupon.findUnique({
      where: { code: body.couponCode.trim().toUpperCase() },
    });
    if (found) {
      coupon = { ...found, type: found.type as Coupon["type"] };
    } else {
      return NextResponse.json({ error: "Cupom nao encontrado." }, { status: 404 });
    }
  }

  try {
    const { quote, couponError } = buildQuote({ items, cep: body.cep, coupon });
    return NextResponse.json({
      quote,
      couponError: couponError ?? null,
      couponMessage: couponError ? couponErrorMessage[couponError] : null,
    });
  } catch (err) {
    if (err instanceof InvalidCepError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
