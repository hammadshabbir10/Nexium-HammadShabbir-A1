// app/api/save-quote/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, quote } = await request.json();
    const client = await db;
    const collection = client.db('quoteApp').collection('userQuotes');
    
    const result = await collection.insertOne({
      userId,
      quote,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save quote' },
      { status: 500 }
    );
  }
}