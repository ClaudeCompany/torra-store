"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatBRL } from "@/lib/money";
import type { Quote } from "@/lib/types";

export default function CartPage() {
  const { items, setQuantity, remove } = useCart();
  const [cep, setCep] = useState("");
  const [coupon, setCoupon] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function calcular() {
    setLoading(true);
    setMessage(null);
    setQuote(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          cep,
          couponCode: coupon || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Erro ao calcular.");
        return;
      }
      setQuote(data.quote);
      if (data.couponMessage) setMessage(data.couponMessage);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return <p className="text-torra-roast">Seu carrinho está vazio.</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Carrinho</h1>

      <ul className="space-y-3">
        {items.map((i) => (
          <li
            key={i.variantId}
            className="flex items-center justify-between rounded border border-torra-crema/40 bg-white p-3"
          >
            <div>
              <p className="font-medium">
                {i.name} — {i.label}
              </p>
              <p className="text-sm text-torra-roast">{formatBRL(i.priceCents)}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={i.quantity}
                onChange={(e) => setQuantity(i.variantId, Number(e.target.value))}
                className="w-16 rounded border border-torra-crema/60 px-2 py-1"
              />
              <button onClick={() => remove(i.variantId)} className="text-sm text-red-700">
                remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <input
          placeholder="CEP (ex: 01310-100)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="rounded border border-torra-crema/60 px-3 py-2"
        />
        <input
          placeholder="Cupom (opcional)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="rounded border border-torra-crema/60 px-3 py-2"
        />
      </div>

      <button
        onClick={calcular}
        disabled={loading}
        className="mt-4 rounded bg-torra-bean px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
      >
        {loading ? "Calculando..." : "Calcular frete e total"}
      </button>

      {message && <p className="mt-3 text-sm text-red-700">{message}</p>}

      {quote && (
        <dl className="mt-6 space-y-1 border-t border-torra-crema/40 pt-4 text-sm">
          <Row label="Subtotal" value={formatBRL(quote.subtotalCents)} />
          {quote.discountCents > 0 && (
            <Row label="Desconto" value={`- ${formatBRL(quote.discountCents)}`} />
          )}
          <Row label="Frete" value={formatBRL(quote.shippingCents)} />
          <Row label="Total" value={formatBRL(quote.totalCents)} strong />
        </dl>
      )}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "font-bold text-base" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
