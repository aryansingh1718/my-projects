"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsSchema = exports.contentSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});
exports.contentSchema = zod_1.z.object({
    type: zod_1.z.string(),
    url: zod_1.z.string().url("invalid url"),
    title: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string().min(1)),
});
exports.tagsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1)
});
