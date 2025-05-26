/*
 File: server/db/prisma.ts
 Created: Prior to 2025-04-10
 Last Modified: 2025-04-10 12:00 UTC
 Purpose: Initialize and export Prisma client instance
 Changes:
 - 2025-04-10 12:00 UTC: Modified import statement to support CommonJS module
*/

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({});

export default prisma;