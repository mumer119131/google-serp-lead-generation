import { Lead } from '@/types/leads';
import db from '@/libs/prisma';

export async function connect(): Promise<void> {
    /** Connect to the database. */
    await db.$connect();
}

export async function disconnect(): Promise<void> {
    /** Disconnect from the database. */
    await db.$disconnect();
}

export async function getLeadsByUserId(userId: string): Promise<Lead[]> {
    /** Retrieve all email records from Prisma by user ID. */
    const emails = await db.leads.findMany({ where: { userId } });
    return emails;
}

export async function getLeadsByStatus(status: string): Promise<Lead[]> {
    /** Retrieve all email records from Prisma by status. */
    const emails = await db.leads.findMany({ where: { status } });
    return emails;
}

export async function insertEmails(data: Lead[]): Promise<Lead[]> {
    /** Insert multiple email records into Prisma. */
    const createdEmails = await Promise.all(data.map(record => db.leads.create({ data: record })));
    return createdEmails;
}

export async function getEmails(): Promise<Lead[]> {
    /** Retrieve all email records from Prisma. */
    const emails = await db.leads.findMany();
    return emails;
}

export async function getEmailsByStatus(status: string): Promise<Lead[]> {
    /** Retrieve all email records from Prisma by status. */
    const emails = await db.leads.findMany({ where: { status } });
    return emails;
}

export async function getOnlyEmails(): Promise<string[]> {
    /** Retrieve all email records from Prisma as a list. */
    const leads = await db.leads.findMany();
    const emails: string[] = leads.map((emailLead: { email: string }) => emailLead.email);
    return emails;
}

export async function getLinksList(): Promise<string[]> {
    /** Retrieve all email records from Prisma as a list. */
    const leads = await db.leads.findMany();
    const links: string[] = leads
        .filter((leads: { link: string | null }) => leads.link !== null)
        .map((leads: { link: string | null }) => leads.link as string);
    return links;
}
