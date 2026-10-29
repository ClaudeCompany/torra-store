import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatBRL } from "@/lib/money";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { variants: { orderBy: { weightGram: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Nossos cafés</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => {
          const from = Math.min(...p.variants.map((v) => v.priceCents));
          return (
            <li key={p.id} className="rounded-lg border border-torra-crema/40 bg-white p-4">
              <Link href={`/produto/${p.slug}`} className="block">
                <h2 className="text-lg font-semibold text-torra-bean">{p.name}</h2>
                <p className="mt-1 text-sm text-torra-roast">{p.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-torra-crema">
                  {p.origin} · torra {p.roast}
                </p>
                <p className="mt-3 text-sm font-medium">a partir de {formatBRL(from)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
