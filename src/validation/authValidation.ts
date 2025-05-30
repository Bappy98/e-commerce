import {z} from "zod";

export const registerSchema = z.object({
    name: z.string({message: "Name is required"}).min(5, {message: "Name must be at least 5 characters"}),
    email: z.string({message: "Email is required"}).email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
    confirmPassword: z.string({message: "Confirm password is required"}).min(6),
    // role: z.enum(["admin", "user", "supperadmin"])
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const loginSchema = z.object({
    email: z.string({message: "Email is required"}).email({message: "Invalid email address"}),
    password: z.string({message: "Password is required"}).min(6, {message: "Password must be at least 6 characters"})
})
