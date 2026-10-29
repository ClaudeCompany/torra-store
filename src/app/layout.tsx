import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Torra — Café torrado artesanal",
  description: "Grãos frescos, torra sob demanda, entrega pro Brasil inteiro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
