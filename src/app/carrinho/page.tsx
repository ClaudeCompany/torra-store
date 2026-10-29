"use client";

import { useState } from "react";
import Link from "next/link";
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
        setMessage(data.error ?? "Não foi possível calcular agora.");
        return;
      }
      setQuote(data.quote);
      if (data.couponMessage) setMessage(data.couponMessage);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <p className="eyebrow">Carrinho</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tightest">
          Ainda sem café por aqui.
        </h1>
        <p className="mt-3 text-muted">
          Escolha um microlote e ele começa a torrar assim que você fechar.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-cherry"
        >
          Ver os cafés
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold tracking-tightest">Seu carrinho</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((i) => (
            <li key={i.variantId} className="flex items-center justify-between gap-4 py-5">
              <div>
                <p className="font-display text-lg font-bold">{i.name}</p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  {i.label} · {formatBRL(i.priceCents)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  value={i.quantity}
                  onChange={(e) => setQuantity(i.variantId, Number(e.target.value))}
                  aria-label={`Quantidade de ${i.name}`}
                  className="w-16 border border-line bg-surface px-2 py-1.5 text-center font-mono"
                />
                <button
                  onClick={() => remove(i.variantId)}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-cherry"
                >
                  remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-line bg-surface p-6 lg:sticky lg:top-24">
          <p className="eyebrow">Resumo</p>

          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                CEP
              </span>
              <input
                placeholder="01310-100"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="mt-1 w-full border border-line bg-paper px-3 py-2 font-mono"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                Cupom
              </span>
              <input
                placeholder="BEMVINDO10"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="mt-1 w-full border border-line bg-paper px-3 py-2 font-mono uppercase"
              />
            </label>
          </div>

          <button
            onClick={calcular}
            disabled={loading}
            className="mt-4 w-full bg-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cherry disabled:opacity-50"
          >
            {loading ? "Calculando..." : "Calcular frete e total"}
          </button>

          {message && (
            <p className="mt-3 border-l-2 border-cherry pl-3 text-sm text-cherry-dark">{message}</p>
          )}

          {quote && (
            <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
              <Row label="Subtotal" value={formatBRL(quote.subtotalCents)} />
              {quote.discountCents > 0 && (
                <Row label="Desconto" value={`− ${formatBRL(quote.discountCents)}`} accent />
              )}
              <Row label="Frete" value={formatBRL(quote.shippingCents)} />
              <div className="flex items-end justify-between border-t border-line pt-3">
                <dt className="font-display text-lg font-bold">Total</dt>
                <dd className="font-display text-2xl font-extrabold">
                  {formatBRL(quote.totalCents)}
                </dd>
              </div>
            </dl>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "text-cherry-dark" : "text-ink"}>{value}</dd>
    </div>
  );
}
