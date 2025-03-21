import { NextResponse } from "next/server";
import db from '@/libs/prisma';

export async function GET() {
    // Handle GET request
    return NextResponse.json({ message: "Hello World" });
}

export async function PATCH(req: Request) {
    console.log("PATCH request");
  // Handle PATCH request
  const body = await req.json();
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "User ID not found." }, { status: 401 });
  }
  const { GOOGLE_API_KEY, CSE_ID } = body;
    // Handle backend logic here (e.g., save to database, call APIs)
    console.log(GOOGLE_API_KEY, CSE_ID);
    try{
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                GOOGLE_API_KEY,
                CSE_ID,
            }
        });
        console.log("Settings saved");
        return NextResponse.json({ message: "Settings saved." }, { status: 200 });
    }catch{
        return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
    }
}