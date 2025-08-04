'use server'
import {prisma} from "@/lib/prisma"
import { redirect } from "next/navigation"
import { RegisterSchema, actionSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const submit = async (prevState: unknown, FormData: FormData) => {
    const validatedData = actionSchema.safeParse(
        Object.fromEntries(FormData.entries())
    )

    if(!validatedData.success){
        return {
            error: validatedData.error.flatten().fieldErrors
        }
    }

    const {nama, image} = validatedData.data
    try{
        await prisma.game.create({
            data: {
                nama,
                image: image,
            }
        })
    }catch(error){
        return {message: 'Failed to add game'}
    }

    redirect('/')
}

export const signUpCredentials = async(prevState: unknown, formData: FormData) => {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success){
        return{
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {name, email, password} = validatedFields.data
    const hashedPassword = hashSync(password, 10)

    try{
        await prisma.user.create({
            data: {
                name,
                email,
                password:hashedPassword
            }
        })
    }catch(error) {
        return {
            message:"Failed ro register"
        }
    }

    redirect("/login")
}

export const SignInCredentials = async (prevState: unknown ,formData: FormData) => {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success){
        return{
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {email, password} = validatedFields.data

    try {
        await signIn("credentials", {email, password, redirectTo: "/"})
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {message: "Invalid Credentiaals"}
                default:
                    return {message: "Something went wrong"}
            }
        }
        throw error
    }
}