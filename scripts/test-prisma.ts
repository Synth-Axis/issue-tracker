import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  try {
    const issues = await prisma.issue.findMany();
    console.log("✅ Issues:", issues);
  } catch (err) {
    console.error("❌ Erro ao fetchar issues com Prisma:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
