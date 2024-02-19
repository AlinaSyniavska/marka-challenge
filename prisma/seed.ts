/*
import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const fakerProduct = (): any => ({
  productName: faker.commerce.product(),
  productPrice: faker.number.int({ min: 1, max: 1000 }),
  productDescription: faker.commerce.productDescription()
});

async function main() {
  const fakerRounds = 10000;
  dotenv.config();
  console.log("Seeding...");

  for (let i = 0; i < fakerRounds; i++) {
    await prisma.products.create({ data: fakerProduct() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
  */
