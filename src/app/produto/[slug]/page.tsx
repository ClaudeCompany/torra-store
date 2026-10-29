import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AddToCart } from "@/components/AddToCart";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: { orderBy: { weightGram: "asc" } } },
  });

  if (!product || !product.active) notFound();

  return (
    <article>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-torra-crema">
        {product.origin} · torra {product.roast}
      </p>
      <p className="mt-4 text-torra-roast">{product.description}</p>
      <AddToCart productName={product.name} variants={product.variants} />
    </article>
  );
}
