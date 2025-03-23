import { sendVerificationEmail } from "@/app/utils/db/auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const userId = req.headers.get('x-user-id');
    console.log('userId in resend', userId);
    if (!userId) {
        // return NextResponse.redirect('/login');
        return NextResponse.json({ error: 'User not found' });
    }
    
    sendVerificationEmail(userId);
    return NextResponse.json({ userId });
}