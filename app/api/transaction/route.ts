import createTransaction from "@/lib/transaction";
import { NextRequest, NextResponse } from "next/server";

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
        server
       } = body

       console.log("📥 Email diterima di server:", email)

        const params = {
            transaction_details: {
                order_id:id,
                gross_amount: price,
            },
            item_details: {
                jenis_id: jenis_id,
                operator_produk: operator_produk,
                name: nama_produk,   
                email: email,
                price: price,
                quantity: 1,
                server: server
            },
            customer_details: {
                email
            }
        }

        const transaction: any = await new Promise((resolve, reject) => {
            createTransaction(params, (result: any) => {
                resolve(result)
            })
        })

        console.log(transaction.token)

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