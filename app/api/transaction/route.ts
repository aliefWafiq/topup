import createTransaction from "@/lib/transaction";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    status: boolean;
    statusCode: number;
    message: string;
}

export async function POST(req: NextRequest,){
    try{
        const {id, jenis_id, operator_produk, nama_produk, price, email, server} = await req.json()

        const params = {
            transaction_details: {
                order_id: id,
                gross_amount: price + 2000,
            },
            item_detail: {
                jenis_id: jenis_id,
                operator_produk: operator_produk,
                nama_produk: nama_produk,
                email: email,
                server: 'prod_official_asia'
            }
        }

        const transaction = await new Promise((resolve, reject) => {
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