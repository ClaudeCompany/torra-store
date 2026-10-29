"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/", label: "Cafés" },
  { href: "/#processo", label: "Como torramos" },
  { href: "/#sobre", label: "Sobre" },
];

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tightest text-ink"
          aria-label="Torra — página inicial"
        >
          Torra<span className="text-cherry">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/carrinho"
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink"
        >
          Carrinho
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-cherry px-1.5 text-[11px] font-bold text-paper">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}
