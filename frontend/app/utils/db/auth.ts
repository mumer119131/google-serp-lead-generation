
import db from '@/libs/prisma';
import { SignUpRequest } from '@/types/auth';
import {User} from '@/types/users';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { DEFAULT_VERIFICATION_EMAIL_TIMEOUT } from '@/data/variables';

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

export async function verifyEmail(token: string): Promise<string> {
    /** Verify the email address of a user. */
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    let userId: string;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = (decoded as { userId: string }).userId;
    } catch {
        throw new Error('Invalid token');
    }
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.isVerified) {
        throw new Error('Email already verified');
    }
    await db.user.update({ where: { id: userId }, data: { isVerified: true } });
    const newToken = jwt.sign({ id: userId, isVerified: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return newToken;
}

export async function sendVerificationEmail(userId: string): Promise<string> {
    const user = await db.user.findUnique({ where: { id: userId } });
    const lastVerificationEmail = user?.lastVerificationEmailSent;
    if(lastVerificationEmail && (Date.now() - new Date(lastVerificationEmail).getTime()) < DEFAULT_VERIFICATION_EMAIL_TIMEOUT){
        throw new Error('Email already sent, wait for 1 minute');
    }
    if(user?.isVerified){
        throw new Error('Email already verified');
    }
    const to = user?.email;
    console.log('to', to);
    if (!to) {
        throw new Error('User not found');
    }
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const verificationToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${verificationToken}`;
    const subject = 'Email Verification';
    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h1 style="color: #333;">Email Verification</h1>
            <p style="font-size: 16px; color: #555;">Click the button below to verify your email address:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p style="font-size: 14px; color: #999; margin-top: 20px;">If you did not request this email, please ignore it.</p>
        </div>
    `;

    // Create a Nodemailer transporter using an SMTP service (Gmail, for example)
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or your email provider's SMTP service
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // App password or SMTP password
        },
    });

    try {
        // Sending the email
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender's email
            to, // Recipient's email
            subject, // Email subject
            html: emailTemplate, // Email body
        });
        if (user) {
            user.lastVerificationEmailSent = new Date();
        }
        await db.user.update({ where: { id: userId }, data: { lastVerificationEmailSent: new Date() } });
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}

