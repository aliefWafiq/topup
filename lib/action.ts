'use server'
import {prisma} from "@/lib/prisma"
import { redirect } from "next/navigation"
import { RegisterSchema, actionSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { EnumLike } from "zod/v3"

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

export const getStatus = async(order_id: string) => {
    const url = `https://api.sandbox.midtrans.com/v2/${order_id}/status`
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64"),
            "Accept": "application/json"
        }
    })
    const data = await res.json()

    console.log(data)
    return data
}

export const topUp = async (orderId: string, nama_produk: string, id_user: string, server: string) => {
    const body = {
        ref_id: orderId,
        produk: nama_produk,
        tujuan: id_user,
        server_id: server,
        member_code: process.env.MEMBER_CODE,
        signaure: process.env.SIGNATURE_KEY_MD5
    }


}

export const updateStatus = async(id_transaksi: string,) => {
    const transaksi = await prisma.transaksi.findUnique({
        where: { id_transaksi }
    })

    if(!transaksi) throw new Error("Transaksi tidak ditemukan")
    
    // LANJUTT INI TENTANF STATUS BELUM UPDATE SESUAI DI MIDTRANS
}