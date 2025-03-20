import { getEmails } from '@/app/utils/db/leads';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  const emails = await getEmails();
  return NextResponse.json({ emails, userId });
}

// Handle POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}
