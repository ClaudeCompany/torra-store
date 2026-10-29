"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatBRL } from "@/lib/money";

interface VariantOption {
  id: string;
  label: string;
  priceCents: number;
  weightGram: number;
  stock: number;
}

export function AddToCart({
  productName,
  variants,
}: {
  productName: string;
  variants: VariantOption[];
}) {
  const { add } = useCart();
  const firstAvailable = variants.find((v) => v.stock > 0) ?? variants[0];
  const [selectedId, setSelectedId] = useState(firstAvailable?.id ?? "");
  const [added, setAdded] = useState(false);

  const selected = variants.find((v) => v.id === selectedId);
  if (!selected) return null;

  function handleAdd() {
    if (!selected || selected.stock <= 0) return;
    add({
      variantId: selected.id,
      name: productName,
      label: selected.label,
      priceCents: selected.priceCents,
      weightGram: selected.weightGram,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const soldOut = selected.stock <= 0;

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="eyebrow mb-2">Tamanho</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const active = v.id === selectedId;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              disabled={v.stock <= 0}
              className={`flex flex-col items-start border px-4 py-2 text-left transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface text-ink hover:border-ink"
              } disabled:cursor-not-allowed disabled:border-line disabled:bg-paper disabled:text-muted disabled:opacity-60`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.1em]">{v.label}</span>
              <span className="font-display text-sm font-bold">
                {formatBRL(v.priceCents)}
                {v.stock <= 0 ? " · esgotado" : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className="flex-1 bg-cherry px-6 py-3.5 font-mono text-sm uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cherry-dark disabled:cursor-not-allowed disabled:bg-muted"
        >
          {soldOut ? "Esgotado" : added ? "Adicionado ✓" : "Adicionar ao carrinho"}
        </button>
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
        Torra iniciada após o pedido · envio em até 48h
      </p>
    </div>
  );
}
