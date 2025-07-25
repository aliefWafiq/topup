'use server'
import prisma from "@/lib/prisma";
import {z} from "zod";
import {put} from "@vercel/blob"
import { redirect } from "next/navigation";

const actionSchema = z.object({
    nama: z.string().min(1),
    image: z.any(),
    margin: z.string().min(0)
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

    const {nama, image, margin} = validatedData.data
    const {url} = await put(image.name, image, {
        access: 'public',
        multipart: true,
    })

    try{
        await prisma.Game.create({
            data: {
                nama,
                image: url,
                margin: margin,
            }
        })
    }catch(error){
        return {message: 'Failed to add game'}
    }

    redirect('/')
}