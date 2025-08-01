// 'use server'
// import prisma from "@/lib/prisma"
// import {z} from "zod"
// import { redirect } from "next/navigation"
// import { Transaksi, StatusTransaksi } from "@/types/transaksi"


// const actionSchema = z.object({
//     id_transaksi: z.string().min(1),
//     harga: z.number().min(1),
//     id_user: z.string().min(1),
//     kode_produk: z.string().min(1),
//     operator_produk: z.string().min(1),
//     server: z.string().min(1),
//     status: z.nativeEnum(StatusTransaksi)
// })

// export const TransactionHistory = async (prevState: unknown, FormData: FormData) => {
//     const validatedData = actionSchema.parse(
//         Object.fromEntries(FormData.entries())
//     )

//    if(!validatedData.success){
//        return (
//            error: validatedData.error.flatten().fieldErrors
//        )
//    }

//     const {id_transaksi, harga, id_user, kode_produk, operator_produk, server, status} = validatedData.data
//      try{
//         if (!prisma) {
//             throw new Error("Prisma client is not initialized");
//         }
//         await prisma.transaksi.create({
//             data: {
//                 id_transaksi,
//                 harga,
//                 id_user,
//                 kode_produk
//             }
//         })
//     }catch(error){
//         return {message: 'Failed to add game'}
//     }

//     redirect('/')
// }