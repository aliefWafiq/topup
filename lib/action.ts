"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RegisterSchema, actionSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { StatusTransaksi } from "@prisma/client";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { unknown } from "zod";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: "Failed ro register",
    };
  }

  redirect("/login");
};

export const SignInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, callbackUrl: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentiaals" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const topUp = async (orderId: string) => {
  try {
    const getOrderId = await prisma.transaksi.findUnique({
      where: { id_transaksi: orderId },
    });

    if (!getOrderId) throw new Error("Data tidak ditemukan");

    const signature = createHash("md5")
      .update(
        `${process.env.MEMBER_CODE}:${process.env.SECRET_KEY_TOKOVOUCHER}:${orderId}`
      )
      .digest("hex");

    const body = {
      ref_id: orderId,
      produk: getOrderId?.kode_produk,
      tujuan: getOrderId?.id_gameUser,
      server_id: getOrderId?.server,
      member_code: process.env.MEMBER_CODE,
      signature: signature,
    };

    const response = await fetch("https://api.tokovoucher.net/v1/transaksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);

    let mappedStatus: StatusTransaksi;
    switch (responseData.status) {
      case "pending":
        mappedStatus = "PENDING";
        break;
      case "sukses":
        mappedStatus = "COMPLETED";
        break;
      case "gagal":
        mappedStatus = "FAILED";
        break;
      default:
        mappedStatus = "FAILED";
    }

    await prisma.transaksi.update({
      where: { id_transaksi: orderId },
      data: { status: mappedStatus },
    });

    console.log(mappedStatus);
    return mappedStatus;
  } catch (error) {
    console.error("Error mengirim POST: ", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mengirim data",
    });
    {
      status: 500;
    }
  }
};

export const updateStatus = async (
  id_transaksi: string,
  statusMidtrans: string
) => {
  try {
    console.log("[updateStatus]", id_transaksi, statusMidtrans);

    let mappedStatus: StatusTransaksi;
    switch (statusMidtrans) {
      case "settlement":
        mappedStatus = "PAID";
        break;
      case "pending":
        mappedStatus = "PENDING";
        break;
      case "cancel":
        mappedStatus = "CANCELLED";
        break;
      case "expire":
        mappedStatus = "FAILED";
        break;
      case "refund":
        mappedStatus = "REFUNDED";
        break;
      default:
        mappedStatus = "FAILED";
    }

    await prisma.transaksi.update({
      where: { id_transaksi },
      data: { status: mappedStatus },
    });

    if (mappedStatus === "PAID") topUp(id_transaksi);

    console.log(mappedStatus);
    return mappedStatus;
  } catch (error) {
    console.log("Gagal", error);
    return unknown;
  }
};
