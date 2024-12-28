import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const roles = await prisma.role.createMany({
    data: [{ name: 'Admin' }, { name: 'Student' }, { name: 'Teacher' }],
    skipDuplicates: true, // Skip if role already exists
  });

  // Create levels
  const levels = await prisma.level.createMany({
    data: [
      { name: 'At-Tahqiq' },
      { name: 'At-Tartil' },
      { name: 'At-Tadwir' },
      { name: 'Al-Hadr' },
    ],
    skipDuplicates: true, // Skip if level already exists
  });

  // Create admin
  const admin = await prisma.user.create({
    data: {
      username: 'Admin',
      password: 'securepassword123',
      email: 'admin@gmail.com',
      role_id: 1,
    },
  });

  console.log(`Roles seeded: ${roles.count}`);
  console.log(`Levels seeded: ${levels.count}`);
  console.log(`Admin seeded with username: ${admin.username}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
