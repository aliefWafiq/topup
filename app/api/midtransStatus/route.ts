import { updateStatus } from "@/lib/action";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const arrayBuffer = await req.arrayBuffer()
    const raw = await Buffer.from(arrayBuffer)
    const bodyString = raw.toString("utf-8");

    const parsed = JSON.parse(bodyString)
    const { order_id, transaction_status } = parsed

    console.log("Received Midtrans Notification:", parsed);
    setImmediate(() => {  
      updateStatus(order_id, transaction_status)
      .catch(error => console.log(error))
    })

    return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
  } catch (err) {
    console.error("Error membaca body:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}