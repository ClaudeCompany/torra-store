import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "bourbon-amarelo",
    name: "Bourbon Amarelo",
    description: "Doce, corpo medio, notas de caramelo e amendoa.",
    origin: "Carmo de Minas, MG",
    roast: "media",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3200, stock: 40 },
      { label: "500g", weightGram: 500, priceCents: 5800, stock: 25 },
      { label: "1kg", weightGram: 1000, priceCents: 10500, stock: 10 },
    ],
  },
  {
    slug: "catuai-vermelho",
    name: "Catuai Vermelho",
    description: "Acidez citrica, aromatico, final limpo.",
    origin: "Chapada Diamantina, BA",
    roast: "clara",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3600, stock: 30 },
      { label: "500g", weightGram: 500, priceCents: 6600, stock: 18 },
    ],
  },
  {
    slug: "blend-da-casa",
    name: "Blend da Casa",
    description: "Encorpado e achocolatado, otimo no coado e no espresso.",
    origin: "Sul de Minas + Cerrado Mineiro",
    roast: "escura",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 2800, stock: 60 },
      { label: "500g", weightGram: 500, priceCents: 5000, stock: 35 },
      { label: "1kg", weightGram: 1000, priceCents: 9000, stock: 20 },
    ],
  },
];

const coupons = [
  { code: "BEMVINDO10", type: "PERCENT", value: 10, minSubtotal: 0, active: true, expiresAt: null },
  {
    code: "TORRA20",
    type: "FIXED",
    value: 2000,
    minSubtotal: 10000,
    active: true,
    expiresAt: null,
  },
  {
    code: "EXPIRADO",
    type: "PERCENT",
    value: 50,
    minSubtotal: 0,
    active: true,
    expiresAt: new Date("2024-01-01"),
  },
];

async function main() {
  await prisma.coupon.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        origin: p.origin,
        roast: p.roast,
        variants: { create: p.variants },
      },
    });
  }

  for (const c of coupons) {
    await prisma.coupon.create({ data: c });
  }

  console.log(`Seed ok: ${products.length} produtos, ${coupons.length} cupons.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
