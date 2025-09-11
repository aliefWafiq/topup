import createTransaction from "@/lib/transaction";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id_transaksi,
      nama_produk,
      operator_produk,
      price,
      email,
      jenis_id,
      server,
      code,
      id_user,
      id_gameUser,
      id_discount
    } = body;

    const params = {
      transaction_details: {
        order_id: id_transaksi,
        gross_amount: price,
      },
      item_details: {
        jenis_id: jenis_id,
        id_user: id_user,
        id_gameUser: id_gameUser,
        operator_produk: operator_produk,
        name: nama_produk,
        email: email,
        price: price,
        quantity: 1,
        server: server,
        code: code,
      },
      customer_details: {
        email,
      },
    };

    console.log("Received:", {
      id_transaksi,
      nama_produk,
      price,
      jenis_id,
      operator_produk,
      id_user,
      id_gameUser,
      server,
      email,
      code,
      id_discount
    });

    try {
      if (!prisma) {
        throw new Error("Prisma client is not initialized");
      }

      if(id_discount != "") {
        await prisma.usedDiscount.create({
          data: {
            userId: id_user,
            discountId: id_discount,
            usedAt: new Date(),
          }
        })
      }

      await prisma.transaksi.create({
        data: {
          id_transaksi: String(id_transaksi),
          harga: price,
          id_gameUser: id_gameUser,
          id_user: id_user,
          kode_produk: code,
          operator_produk: operator_produk,
          status: "PENDING", 
          server: server,
        },
      });

    } catch (error) {
      return NextResponse.json(
        {
          status: false,
          statusCode: 500,
          message: "Failed to make transaction"
        },
        { status: 500 }
      );
    }

    const transaction: unknown = await new Promise((resolve) => {
        createTransaction(params, (result: unknown) => {
        resolve(result);
      });
    });

    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Transaksi berhasil dibuat",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: "Gagal membuat transaksi",
      },
      { status: 500 }
    );
  }
}
