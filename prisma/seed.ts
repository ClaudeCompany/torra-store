import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "bourbon-amarelo",
    name: "Bourbon Amarelo",
    description:
      "Nosso carro-chefe doce. Corpo aveludado e doçura de caramelo que aguenta leite sem perder identidade.",
    origin: "Carmo de Minas, MG",
    roast: "media",
    process: "Natural",
    altitude: "1100-1300m",
    variety: "Bourbon Amarelo",
    notes: "caramelo, amêndoa, mel",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3200, stock: 40 },
      { label: "500g", weightGram: 500, priceCents: 5800, stock: 25 },
      { label: "1kg", weightGram: 1000, priceCents: 10500, stock: 10 },
    ],
  },
  {
    slug: "catuai-vermelho",
    name: "Catuaí Vermelho",
    description:
      "Para quem gosta de xícara limpa e viva. Acidez cítrica brilhante e final que lembra chá.",
    origin: "Chapada Diamantina, BA",
    roast: "clara",
    process: "Cereja descascado",
    altitude: "1200-1400m",
    variety: "Catuaí Vermelho",
    notes: "laranja, jasmim, mel de cana",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3600, stock: 30 },
      { label: "500g", weightGram: 500, priceCents: 6600, stock: 18 },
    ],
  },
  {
    slug: "blend-da-casa",
    name: "Blend da Casa",
    description:
      "Encorpado e achocolatado, pensado pra render tanto no coado do dia a dia quanto no espresso.",
    origin: "Sul de Minas + Cerrado Mineiro",
    roast: "escura",
    process: "Natural",
    altitude: "900-1200m",
    variety: "Mundo Novo + Catuaí",
    notes: "chocolate amargo, castanha, melaço",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 2800, stock: 60 },
      { label: "500g", weightGram: 500, priceCents: 5000, stock: 35 },
      { label: "1kg", weightGram: 1000, priceCents: 9000, stock: 20 },
    ],
  },
  {
    slug: "geisha-experimental",
    name: "Geisha Experimental",
    description:
      "Microlote raro, fermentação controlada. Floral intenso e complexo — pra quem quer provar o topo.",
    origin: "Matas de Minas, MG",
    roast: "clara",
    process: "Fermentação anaeróbica",
    altitude: "1300-1450m",
    variety: "Geisha",
    notes: "bergamota, pêssego, floral",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 7900, stock: 12 },
      { label: "500g", weightGram: 500, priceCents: 14800, stock: 6 },
    ],
  },
  {
    slug: "catucai-cerrado",
    name: "Catucaí Cerrado",
    description:
      "Equilibrado e versátil. A escolha segura quando você não quer errar na dose da manhã.",
    origin: "Cerrado Mineiro, MG",
    roast: "media",
    process: "Lavado",
    altitude: "1000-1250m",
    variety: "Catucaí Amarelo",
    notes: "nozes, chocolate ao leite, maçã",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3000, stock: 45 },
      { label: "500g", weightGram: 500, priceCents: 5400, stock: 28 },
      { label: "1kg", weightGram: 1000, priceCents: 9600, stock: 15 },
    ],
  },
  {
    slug: "descafeinado-serra",
    name: "Descafeinado da Serra",
    description:
      "Descafeinado por água (sem solvente químico). Mantém corpo e doçura pra quem evita cafeína à noite.",
    origin: "Serra da Mantiqueira, MG",
    roast: "media",
    process: "Descafeinado a água",
    altitude: "1150-1300m",
    variety: "Acaiá",
    notes: "cacau, caramelo, baunilha",
    variants: [
      { label: "250g", weightGram: 250, priceCents: 3800, stock: 22 },
      { label: "500g", weightGram: 500, priceCents: 7000, stock: 14 },
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
        process: p.process,
        altitude: p.altitude,
        variety: p.variety,
        notes: p.notes,
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
