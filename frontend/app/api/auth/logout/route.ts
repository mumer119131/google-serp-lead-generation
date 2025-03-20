import { NextResponse } from "next/server";


export async function GET() {

return NextResponse.json(
    { message: 'User logged out' },
    {
        status: 200,
        headers: {
            'Set-Cookie': 'token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        },
    }
);
}