import Link from "next/link";

const COLUMNS = [
  {
    title: "Loja",
    links: [
      { href: "/", label: "Todos os cafés" },
      { href: "/#processo", label: "Como torramos" },
      { href: "/carrinho", label: "Carrinho" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { href: "/#sobre", label: "Prazo e frete" },
      { href: "/#sobre", label: "Trocas" },
      { href: "/#sobre", label: "Fale com a gente" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="sobre" className="mt-24 border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-extrabold tracking-tightest">
            Torra<span className="text-cherry">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70">
            Microlotes brasileiros, torrados sob demanda em pequenos batches. Cada saco sai com a
            data da torra carimbada.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-paper/50">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-paper/80 hover:text-cherry">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
          © {new Date().getFullYear()} Torra Café · CNPJ 00.000.000/0001-00 · Carmo de Minas, MG
        </p>
      </div>
    </footer>
  );
}
