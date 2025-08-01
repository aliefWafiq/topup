'use server'
import prisma from "@/lib/prisma"
import {z} from "zod"
import { redirect } from "next/navigation"

const actionSchema = z.object({
    nama: z.string().min(1),
    image: z.string().min(1),
})

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
        if (!prisma) {
            throw new Error("Prisma client is not initialized");
        }
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