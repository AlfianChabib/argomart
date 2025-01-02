import { PRODUCTS } from "@/utils/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const products = PRODUCTS.forEach(async (product) => {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        productType: product.productType,
      },
    });
  });

  Promise.all([products]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
