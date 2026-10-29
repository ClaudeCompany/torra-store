import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";

const STEPS = [
  {
    n: "01",
    title: "Selecionamos o lote",
    body: "Compramos direto de produtores em Minas e na Bahia, lote a lote, provando antes de fechar.",
  },
  {
    n: "02",
    title: "Torramos sob demanda",
    body: "Nada fica parado em prateleira. A torra começa depois que seu pedido entra, em batches pequenos.",
  },
  {
    n: "03",
    title: "Enviamos em 48h",
    body: "O café sai com a data da torra carimbada no saco e chega fresco na sua casa.",
  },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { variants: { orderBy: { weightGram: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  const [featured, ...rest] = products;

  return (
    <div>
      {/* Hero: o cafe em si como tese — um microlote etiquetado ao lado do manifesto */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 px-4 md:grid-cols-2">
          <div className="flex flex-col justify-center py-14 md:py-20 md:pr-12">
            <p className="eyebrow animate-fade-up">Torrefação artesanal · desde 2019</p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.92] tracking-tightest text-ink animate-fade-up sm:text-6xl md:text-7xl">
              Café fresco
              <br />
              não espera
              <span className="text-cherry">.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted animate-fade-up">
              Microlotes brasileiros torrados no dia do seu pedido. Cada grão vem com ficha técnica:
              origem, altitude, processo e perfil de torra. Sem mistério.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
              <a
                href="#cafes"
                className="bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cherry"
              >
                Ver os cafés
              </a>
              <a
                href="#processo"
                className="border border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Como torramos
              </a>
            </div>
          </div>

          {featured && (
            <div className="relative border-l border-line">
              <ProductVisual
                name={featured.name}
                origin={featured.origin}
                variety={featured.variety}
                roast={featured.roast}
                className="h-full"
              />
            </div>
          )}
        </div>
      </section>

      {/* Catalogo */}
      <section id="cafes" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">Nossos cafés</h2>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {products.length} rótulos
          </span>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        {rest.length === 0 && products.length <= 1 && (
          <p className="mt-6 text-sm text-muted">Novos lotes entram toda semana.</p>
        )}
      </section>

      {/* Processo — sequencia real, por isso numerada */}
      <section id="processo" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="eyebrow">Como torramos</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight">
            Do pé do produtor até a sua xícara, em três passos.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="border-t-2 border-cherry pt-4">
                <span className="font-mono text-sm font-bold text-cherry">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
