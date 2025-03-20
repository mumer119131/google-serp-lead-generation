export interface User {
    id: string;
    name: string | null;
    email: string;
    password: string;
    role: string;
    GOOGLE_API_KEY?: string | null;
    CSE_ID?: string | null;
    DATABASE_URL?: string | null;
    DIRECT_URL?: string | null;
    last_login?: Date | null;
    created_at: Date;
    updated_at: Date;
}