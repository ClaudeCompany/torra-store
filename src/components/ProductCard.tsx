import Link from "next/link";
import { formatBRL } from "@/lib/money";
import { RoastMeter } from "./RoastMeter";
import { ProductVisual } from "./ProductVisual";

export interface ProductCardData {
  slug: string;
  name: string;
  origin: string;
  roast: string;
  process: string;
  variety: string;
  notes: string;
  variants: { priceCents: number; stock: number }[];
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const fromCents = Math.min(...product.variants.map((v) => v.priceCents));
  const soldOut = product.variants.every((v) => v.stock <= 0);

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group flex flex-col overflow-hidden border border-line bg-surface transition-colors hover:border-ink"
    >
      <div className="relative">
        <ProductVisual
          name={product.name}
          origin={product.origin}
          variety={product.variety}
          roast={product.roast}
          compact
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {soldOut && (
          <span className="absolute left-4 top-4 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">{product.name}</h3>
          <p className="mt-1 text-sm leading-snug text-muted">{product.notes}</p>
        </div>

        <div className="flex items-center justify-between border-y border-line py-2 font-mono text-[11px]">
          <span className="text-muted">Processo</span>
          <span className="text-ink">{product.process}</span>
        </div>

        <RoastMeter roast={product.roast} />

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="eyebrow">A partir de</p>
            <p className="font-display text-xl font-bold text-ink">{formatBRL(fromCents)}</p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-cherry group-hover:underline">
            Ver →
          </span>
        </div>
      </div>
    </Link>
  );
}
