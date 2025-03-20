
import db from '@/libs/prisma';
import { SignUpRequest } from '@/types/auth';
import {User} from '@/types/users';
import bcrypt from 'bcryptjs';


export async function getUsers(): Promise<User[]> {
    /** Retrieve all user records from Prisma. */
    const users = await db.user.findMany();
    return users;
}

export async function createUser(data: SignUpRequest): Promise<User> {
    /** Insert a user record into Prisma. */
    const userExists = await db.user.findUnique({ where: { email: data.email } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const createdUser = await db.user.create({ data });
    return createdUser;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
    /** Authenticate a user by email and password. */
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user;
}