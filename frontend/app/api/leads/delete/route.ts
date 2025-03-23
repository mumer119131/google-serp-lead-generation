import { checkLeadAuthorization, deleteLeadsByIds } from '@/app/utils/db/leads';
import { NextResponse } from 'next/server';




export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const leads = body.leads;
        const userId = req.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        for (const lead of leads) {
            if (await checkLeadAuthorization(userId, lead) === false) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }
        await deleteLeadsByIds(leads);
        return NextResponse.json({ message: 'Leads deleted successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
    }
}