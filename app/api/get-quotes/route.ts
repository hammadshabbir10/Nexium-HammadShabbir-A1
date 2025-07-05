// app/api/get-quotes/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const client = await db;
    const collection = client.db('quoteApp').collection('userQuotes');
    
    const quotes = await collection.find({ userId }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, quotes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}