import * as z from "zod"

export const userSignupSchema  = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email().trim(),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const userSigninSchema = z.object({
    email: z.email().trim(),
    password: z.string()
})