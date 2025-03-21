import { z } from "zod";

// Define a validation schema
export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const GenerateLeadSchema = z.object({
    pages: z.number().int().positive(),
    query: z.string().nonempty(),
});

export const LoginRequestSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Invalid password"),
});

export const SignUpRequestSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const UpdateSettingsSchema = z.object({
    GOOGLE_API_KEY: z.string().nonempty("GOOGLE_API_KEY is required"),
    CSE_ID: z.string().nonempty("CSE_ID is required"),
});

export const CreateLeadSchema = z.object({
    query: z.string().nonempty().min(3, "Query must be at least 3 characters long"),
    pages: z.number().int().positive().positive("Pages must be a positive number"),
});

// Define a type based on schema
export type UserInput = z.infer<typeof userSchema>;
export type GenerateLeadInput = z.infer<typeof GenerateLeadSchema>;
export type LoginRequestInput = z.infer<typeof LoginRequestSchema>;
export type SignUpRequestInput = z.infer<typeof SignUpRequestSchema>;
export type UpdateSettingsInput = z.infer<typeof UpdateSettingsSchema>;
export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;