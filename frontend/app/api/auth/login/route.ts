
import { LoginRequestSchema } from '@/libs/validations';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '@/app/utils/db/auth';

// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: 'GET request to the login endpoint' });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const result = LoginRequestSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({ message: 'Invalid input', errors: result.error }, { status: 400 });
    }
    const {email, password} = result.data;
    // Authenticate user
    const user = await authenticateUser(email, password);
    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials', errors: 'Invalid credentials' }, { status: 400 });
    }
    // Generate token
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const response = NextResponse.json({ message: 'User logged in !!' });
    response.cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
    return response;
}
