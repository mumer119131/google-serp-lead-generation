import { NextRequest, NextResponse } from "next/server";
import { verifyEmail } from "@/app/utils/db/auth";



export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
    }
    try{
        const newToken = await verifyEmail(token);
        const response = NextResponse.redirect(new URL('/verified', request.url).toString());
        response.cookies.set('token', newToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
        return response;
    }catch(e){
        console.log(e);
        if (e instanceof Error) {
            return NextResponse.json({ message: e.message }, { status: 400 });
        }
        return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

}