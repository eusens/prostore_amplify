import 'dotenv/config';

import { prisma } from '@/lib/prisma';
import sampleData from './sample-data';

async function main() {
  console.log('Starting seed…');

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log('Database seeded successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
