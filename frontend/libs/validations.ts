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

// Define a type based on schema
export type UserInput = z.infer<typeof userSchema>;
export type GenerateLeadInput = z.infer<typeof GenerateLeadSchema>;
export type LoginRequestInput = z.infer<typeof LoginRequestSchema>;
export type SignUpRequestInput = z.infer<typeof SignUpRequestSchema>;