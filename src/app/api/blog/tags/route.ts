import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const tag = await prisma.tag.create({ data: { name } });
  return NextResponse.json(tag);
} 