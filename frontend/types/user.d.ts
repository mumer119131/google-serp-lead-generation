export interface User {
    id: string;
    email: string;
    password: string;
    name?: string;
    role: string;
    GOOGLE_API_KEY?: string;
    CSE_ID?: string;
    DATABASE_URL?: string;
    DIRECT_URL?: string;
    last_login?: Date;
    created_at: Date;
    updated_at: Date;
}