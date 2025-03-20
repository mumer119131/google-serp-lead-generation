import { getEmails } from '@/app/utils/db/leads';
import { scrape } from '@/app/utils/scraper/lead';
import { GenerateLeadSchema } from '@/libs/validations';
import { NextResponse } from 'next/server';


// Handle GET requests
export async function GET() {
  const emails = await getEmails();
  return NextResponse.json({ emails });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const userId = req.headers.get('x-user-id');
  const result = GenerateLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: 'Invalid input', errors: result.error }, { status: 400 });
    }

    const { pages, query } = result.data;
    if (!userId) {
        return NextResponse.json({ message: 'User ID not found' }, { status: 400 });
    }
    await scrape(10, pages, query, userId);
    return NextResponse.json({ message: 'Scraping complete' }, { status: 201 });
}
