// lib/prisma.ts  atau  app/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Ini yang paling benar & aman untuk Next.js App Router + Pages Router + Vercel
const prisma = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma