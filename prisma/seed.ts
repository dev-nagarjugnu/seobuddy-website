// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' // <-- NEW: Import bcryptjs

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding with passwords ...`)

  // Define a plain-text password for seeding
  const plainPassword = 'password123'
  const hashedPassword = await bcrypt.hash(plainPassword, 10) // Hash the password

  // Alice - will be a regular USER
  await prisma.user.upsert({
    where: { email: 'alice@seobuddy.io' }, // Changed domain for clarity
    update: {
      password: hashedPassword,
      role: 'USER', // Ensure Alice is USER
    },
    create: {
      email: 'alice@seobuddy.io',
      name: 'Alice User',
      password: hashedPassword,
      role: 'USER',
    },
  })

  // Bob - will be an ADMIN
  await prisma.user.upsert({
    where: { email: 'bob@seobuddy.io' }, // Changed domain for clarity
    update: {
      password: hashedPassword,
      role: 'ADMIN', // Ensure Bob is ADMIN
    },
    create: {
      email: 'bob@seobuddy.io',
      name: 'Bob Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })