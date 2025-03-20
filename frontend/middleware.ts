import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";



const SECRET_KEY = process.env.JWT_SECRET!;
const SECRET_KEY_BUFFER = new TextEncoder().encode(SECRET_KEY);

export async function middleware(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT using `jose`
        const { payload } = await jwtVerify(token, SECRET_KEY_BUFFER);

        if (!payload.id) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // Attach user ID to headers
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", payload.id as string);

        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch {
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
}

export const config = {
    matcher: ["/api/protected/:path*", "/api/leads/:path*"], // Protect all /api/protected/* routes
};
