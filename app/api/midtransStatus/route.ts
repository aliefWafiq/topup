import { updateStatus } from "@/lib/action";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function verifyMidtransSignature(body: any): boolean {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error("MIDTRANS_SERVER_KEY not found!");
      return false;
    }

    const signatureKey = body.signature_key;
    const orderId = body.order_id;
    const statusCode = body.status_code;
    const grossAmount = body.gross_amount;

    const hash = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex');

    const isValid = hash === signatureKey;
    
    if (!isValid) {
      console.error("Invalid signature!");
      console.error("Expected:", hash);
      console.error("Received:", signatureKey);
    }

    return isValid;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    
    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      status_code,
      gross_amount
    } = body;

    console.log("=== MIDTRANS WEBHOOK RECEIVED ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Order ID:", order_id);
    console.log("Transaction Status:", transaction_status);
    console.log("Fraud Status:", fraud_status);
    console.log("Status Code:", status_code);

    if (!verifyMidtransSignature(body)) {
      console.error("Signature verification failed!");
      return NextResponse.json(
        { message: "Unauthorized - Invalid signature" },
        { status: 401 }
      );
    }

    console.log("Signature verified");

    if (fraud_status === 'deny' || fraud_status === 'challenge') {
      console.log(`Fraud status: ${fraud_status}`);
      await updateStatus(order_id, 'cancel');
      return NextResponse.json(
        { message: "Transaction flagged as fraud" },
        { status: 200 }
      );
    }

    console.log("Processing status update...");
    
    const result = await updateStatus(order_id, transaction_status);
    
    const duration = Date.now() - startTime;
    console.log(`Status updated to: ${result} (${duration}ms)`);
    console.log("===================================");

    return NextResponse.json(
      {
        success: true,
        message: "Notification processed",
        status: result
      },
      { status: 200 }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error("Webhook Error:", error.message);
    console.error("Duration:", duration + "ms");
    console.error("Stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        message: "Error processing notification",
        error: error.message
      },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Midtrans webhook endpoint is running",
    timestamp: new Date().toISOString()
  });
}