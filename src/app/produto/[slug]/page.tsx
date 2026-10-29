import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AddToCart } from "@/components/AddToCart";
import { RoastMeter } from "@/components/RoastMeter";
import { ProductVisual } from "@/components/ProductVisual";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: { orderBy: { weightGram: "asc" } } },
  });

  if (!product || !product.active) notFound();

  const spec = [
    { label: "Origem", value: product.origin },
    { label: "Variedade", value: product.variety },
    { label: "Processo", value: product.process },
    { label: "Altitude", value: product.altitude },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <Link href="/" className="hover:text-ink">
          Cafés
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="border border-line bg-surface">
          <ProductVisual
            name={product.name}
            origin={product.origin}
            variety={product.variety}
            roast={product.roast}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-4xl font-extrabold tracking-tightest text-ink">
            {product.name}
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-cherry">
            {product.notes}
          </p>

          <p className="mt-5 leading-relaxed text-muted">{product.description}</p>

          <dl className="mt-6 border-t border-line font-mono text-sm">
            {spec.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-line py-2.5"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 max-w-xs">
            <RoastMeter roast={product.roast} />
          </div>

          <AddToCart productName={product.name} variants={product.variants} />
        </div>
      </div>
    </div>
  );
}
