
import { SignUpRequestSchema } from '@/libs/validations';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser } from '@/app/utils/db/auth';
import jwt from 'jsonwebtoken';
// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: 'GET request to the login endpoint' });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const result = SignUpRequestSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({ message: 'Invalid input', errors: result.error }, { status: 400 });
    }
    const {name, email, password} = result.data;
    const hashedPassword = await hashPassword(password);
    const data = {name, email, password: hashedPassword, role: 'user'};
    try{
        const user = await createUser(data);
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return NextResponse.json({ message: 'User created !!', data: {token} }, { status: 201 });
    }catch{
        return NextResponse.json({ message: 'User already exists', errors: 'User already exists' }, { status: 400 });
    }
}




const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}