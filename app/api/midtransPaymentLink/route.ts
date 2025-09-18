import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id_transaksi,
      kode_produk,
      operator_produk,
      price,
      server,
      id_user,
      id_gameUser,
    } = body;

    const params = {
      transaction_details: {
        order_id: id_transaksi,
        gross_amount: price,
        payment_link_id: "",
      },
      customer_required: false,
      usage_limit: 1,
      expiry: {
        start_time: "",
        duration: 20,
        unit: "days",
      },
      item_details: {
        id_user: id_user,
        id_gameUser: id_gameUser,
        operator_produk: operator_produk,
        kode_produk: kode_produk,
        price: price,
        quantity: 1,
        server: server,
      },
      customer_details: {
        id_user: id_user
      },
    }

    
  } catch (error) {
    console.log(error);
  }
}
