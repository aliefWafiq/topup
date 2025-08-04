import createTransaction from "@/lib/transaction";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

type Data = {
    status: boolean;
    statusCode: number;
    message: string;
}

export async function POST(req: NextRequest,){
    try{
       const body = await req.json()

       const {
        id,
        nama_produk,
        operator_produk,
        price,
        email,
        jenis_id,
        server,
        code,
        id_user
       } = body

        const params = {
            transaction_details: {
                order_id:id,
                gross_amount: price,
            },
            item_details: {
                jenis_id: jenis_id,
                id_user: id_user,
                operator_produk: operator_produk,
                name: nama_produk,   
                email: email,
                price: price,
                quantity: 1,
                server: server,
                code: code,
            },
            customer_details: {
                email
            }
        }

        try{
            if (!prisma) {
                throw new Error("Prisma client is not initialized");
            }
            await prisma.transaksi.create({
                data: {
                    id_transaksi: String(id),
                    harga: price,
                    id_user: id_user,
                    kode_produk: code,
                    operator_produk: operator_produk,
                    status: 'PENDING',
                    server: server
                }
            })
        }catch(error){
            return {message: 'Failed to add game'}
        }

        

        const transaction: any = await new Promise((resolve, reject) => {
            createTransaction(params, (result: any) => {
                resolve(result)
            })
        })


        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Transaksi berhasil dibuat',
            data: transaction
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Gagal membuat transaksi'
        }, {status: 500})
    }
}