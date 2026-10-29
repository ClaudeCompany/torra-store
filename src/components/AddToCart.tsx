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
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  const selected = variants.find((v) => v.id === selectedId);
  if (!selected) return null;

  function handleAdd() {
    if (!selected) return;
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

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedId(v.id)}
            disabled={v.stock <= 0}
            className={`rounded border px-3 py-1 text-sm ${
              v.id === selectedId
                ? "border-torra-roast bg-torra-roast text-white"
                : "border-torra-crema/60 bg-white text-torra-bean"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {v.label} — {formatBRL(v.priceCents)}
            {v.stock <= 0 ? " (esgotado)" : ""}
          </button>
        ))}
      </div>
      <button
        onClick={handleAdd}
        disabled={selected.stock <= 0}
        className="mt-4 rounded bg-torra-bean px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
      >
        {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}
