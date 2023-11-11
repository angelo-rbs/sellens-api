import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function disconnectPrisma() {
	await prisma.$disconnect();
}

export { prisma, disconnectPrisma };
