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
  const result = GenerateLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: 'Invalid input', errors: result.error }, { status: 400 });
    }

    const { pages, query } = result.data;
    await scrape(10, pages, query);
    return NextResponse.json({ message: 'Scraping complete' }, { status: 201 });
}
