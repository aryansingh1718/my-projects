import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const contentSchema = z.object({
  type:z.string(),
  url:z.string().url("invalid url"),
  title:z.string(),
  tags:z.array(z.string().min(1)),
})

export const tagsSchema = z.object({
  title:z.string().min(1)
})