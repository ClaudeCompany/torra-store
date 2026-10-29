"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Header() {
  const { count } = useCart();
  return (
    <header className="border-b border-torra-crema/40 bg-torra-foam">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-torra-bean">
          ☕ Torra
        </Link>
        <Link href="/carrinho" className="text-sm font-medium text-torra-roast hover:underline">
          Carrinho ({count})
        </Link>
      </div>
    </header>
  );
}
