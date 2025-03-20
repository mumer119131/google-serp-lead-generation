import { getEmails } from '@/app/utils/db/leads';
import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
  const emails = await getEmails();
  return NextResponse.json({ emails });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}
