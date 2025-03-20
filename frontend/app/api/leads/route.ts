import { getLeadsByUserId } from '@/app/utils/db/leads';
import { DEFAULT_RESULTS_PER_PAGE } from '@/data/variables';
import { paginationFormat } from '@/helpers/pagination';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  if (!userId) {
    return NextResponse.json({ message: 'User ID not found' }, { status: 400 });
  }
  const emails = await getLeadsByUserId(userId);
  const results  = paginationFormat(emails, Number(page));

  return NextResponse.json({
    metadata: {
      page: Number(page),
      total: emails.length,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
    },
    results
  });
}

// Handle POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}
