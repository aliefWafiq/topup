import { updateStatus } from "@/lib/action";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Pastikan runtime Node.js dan tidak di-cache
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Verifikasi signature Midtrans (SHA512)
function verifyMidtransSignature(body: any): boolean {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error("MIDTRANS_SERVER_KEY tidak ada di env!");
      return false;
    }

    const { order_id, status_code, gross_amount, signature_key } = body;

    // Pastikan field yang dibutuhkan ada
    if (!order_id || !status_code || !gross_amount || !signature_key) {
      console.error("Data payload tidak lengkap untuk verifikasi signature");
      return false;
    }

    const hash = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    const isValid = hash === signature_key;

    if (!isValid) {
      console.error("Signature TIDAK VALID!");
      console.error("Expected :", hash);
      console.error("Received :", signature_key);
    }

    return isValid;
  } catch (err) {
    console.error("Error saat verifikasi signature:", err);
    return false;
  }
}

// ============ WEBHOOK HANDLER ============
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();

    // Log seluruh payload (penting untuk debugging)
    console.log("=== MIDTRANS NOTIFICATION ===");
    console.log("Time    :", new Date().toISOString());
    console.log("Payload :", JSON.stringify(body, null, 2));

    // 1. Verifikasi signature → WAJIB!
    if (!verifyMidtransSignature(body)) {
      console.error("Signature verification FAILED → reject 401");
      return new NextResponse("Invalid signature", { status: 401 });
    }
    console.log("Signature OK");

    const { order_id, transaction_status, fraud_status } = body;

    // 2. Cek fraud status
    if (fraud_status === "deny" || fraud_status === "challenge") {
      console.log(`Fraud detected (${fraud_status}), cancel transaksi ${order_id}`);
      await updateStatus(order_id, "cancel");
      return NextResponse.json({ message: "Fraud detected" }, { status: 200 });
    }

    // 3. Update status sesuai yang dikirim Midtrans
    console.log(`Update status ${order_id} → ${transaction_status}`);
    const result = await updateStatus(order_id, transaction_status);

    const duration = Date.now() - startTime;
    console.log(`SUKSES update status: ${result} (${duration}ms)`);
    console.log("=====================================");

    // Hanya return 200 kalau benar-benar sukses
    return NextResponse.json(
      { success: true, message: "OK", status: result },
      { status: 200 }
    );
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error("=== WEBHOOK ERROR ===");
    console.error("Error   :", error.message);
    console.error("Duration:", duration + "ms");
    console.error("Stack   :", error.stack);

    // PENTING: JANGAN PERNAH return 200 kalau error!
    // Midtrans akan anggap sukses dan stop retry + disable auto notification
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Untuk cek endpoint masih hidup
export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Midtrans webhook endpoint aktif",
    timestamp: new Date().toISOString(),
  });
}