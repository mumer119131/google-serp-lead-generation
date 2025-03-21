import db from '@/libs/prisma';
import { User } from '@/types/users';




export async function getUserById(userId: string): Promise<User | null> {
    /** Retrieve a user record from Prisma by user ID. */
    const user = await db.user.findUnique({ where: { id: userId } });
    return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    /** Retrieve a user record from Prisma by email. */
    const user = await db.user.findUnique({ where: { email } });
    return user;
}
