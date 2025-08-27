import { object, string, ZodNumber } from "zod";
import z from "zod";

export const SignInSchema = object({
    email: string().email('Invalid Email'),
    password: string()
    .min(0, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const RegisterSchema = object({
    name: string().min(1, "Name must be more than 1 character"),
    email: string().email('Invalid Email'),
    password: string()
    .min(0, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
    confrimPassword: string()
    .min(0, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
}).refine((data) => data.password === data.confrimPassword, {
    message: "Password does not match",
    path:["confirmPassword"],
})

export const DiscountSchema = object({
    nama_diskon: string().min(1, "Name must be more than 1 character"),
    kode_diskon: string().min(1, "Code must be more than 1 character"),
    persentase: string().min(1, "Number must be more than 1"),
    berlaku_hingga: string()
})

export const actionSchema = object({
    nama: string().min(1),
    image: string().min(1),
})