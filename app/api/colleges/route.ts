import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connectToDatabase();
  const colleges = await db.collection('colleges').find().toArray();
  return NextResponse.json(colleges);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { db } = await connectToDatabase();

  const newCollege = {
    ...body,
    createdAt: new Date()
  };

  await db.collection('colleges').insertOne(newCollege);
  return NextResponse.json({ success: true });
}
