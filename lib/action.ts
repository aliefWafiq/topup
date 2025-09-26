"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RegisterSchema, SignInSchema, DiscountSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { StatusTransaksi } from "@prisma/client";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { unknown } from "zod";
import { revalidatePath } from "next/cache";
import {
  getDataKeuanganBulanIni,
  getDataTransaksi,
  getDataUser,
  getPaymentLink
} from "@/lib/data";

import { Discount } from "@/types/discount";

// SIGN UP
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

// SIGN IN
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

// ADD DISCOUNT
export const AddDiscount = async (prevState: unknown, formData: FormData) => {
  const validatedFields = DiscountSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nama_diskon, kode_diskon, persentase, berlaku_hingga } =
    validatedFields.data;
  const persentaseDiskon = parseFloat(persentase);
  const tglKadaluarsa = new Date(berlaku_hingga);

  try {
    await prisma.discount.create({
      data: {
        nama_diskon,
        kode_diskon,
        persentase: persentaseDiskon,
        berlaku_hingga: tglKadaluarsa,
        status: true,
      },
    });
  } catch (error) {
    return {
      message: "Failed to add",
    };
  }

  redirect("/discounts");
};

// GET DISCOUNT
export const getDiscount = async (
  kode_discount: string
): Promise<Discount | null> => {
  if (!kode_discount) return null;

  try {
    const getDiscountCode = await prisma.discount.findUnique({
      where: { kode_diskon: kode_discount },
    });

    return getDiscountCode ? getDiscountCode : null;
  } catch (error) {
    throw error;
  }
};

// TOPUP
const topUp = async (orderId: string) => {
  try {
    const getOrderId = await prisma.transaksi.findUnique({
      where: { id_transaksi: orderId },
    });

    if (!getOrderId) throw new Error("Data tidak ditemukan");

    const signature = createHash("md5")
      .update(
        `${process.env.MEMBER_CODE}:${process.env.SECRET_KEY_TOKOVOUCHER}:${orderId}`
      )

    console.log(signature);
    const total = getOrderId.harga;
    const totalBersih = total - 2000;

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

    const currentDate = new Date();
    const periode = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const dataKeuangan = await getDataKeuanganBulanIni(periode);

    const responseData = await response.json();
    console.log(responseData);

    let mappedStatus: StatusTransaksi;
    switch (responseData.status) {
      case "pending":
        mappedStatus = "PROCESSING";
        break;
      case "sukses":
        mappedStatus = "COMPLETED";
        break;
      case "gagal":
        mappedStatus = "FAILED";
        break;
      default:
        mappedStatus = "CANCELLED";
    }

    console.log("TOP UP");

    await prisma.transaksi.update({
      where: { id_transaksi: orderId },
      data: { status: mappedStatus },
    });

    const existing = await prisma.dataKeuangan.findFirst({
      where: {
        periode,
      },
    });

    if (existing) {
      const totalAkhir = (dataKeuangan?.total ?? 0) + total;
      const totalBersihAkhir = (dataKeuangan?.totalBersih ?? 0) + totalBersih;
      await prisma.dataKeuangan.update({
        where: { id: existing.id },
        data: {
          total: totalAkhir,
          totalBersih: totalBersihAkhir,
        },
      });
    } else {
      await prisma.dataKeuangan.create({
        data: {
          periode,
          total,
          totalBersih,
        },
      });
    }

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

// UPDATE STATUS
export const updateStatus = async (
  id_transaksi: string,
  statusMidtrans: string
) => {
  try {
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
    console.log(statusMidtrans);

    return mappedStatus;
  } catch (error) {
    console.log("Gagal", error);
    return unknown;
  }
};

// UPDATE DISCOUNT STATUS
export const updateDiscountStatus = async (id: string) => {
  try {
    const checkStatus = await prisma.discount.findUnique({
      where: { id },
    });

    if (checkStatus?.status != true) {
      await prisma.discount.update({
        where: { id },
        data: {
          status: false,
        },
      });
    }
  } catch (error) {
    return { message: "Data gagal diupdate" };
  }
};

// DELETE DISCOUNT
export const DeleteDiscount = async (id: string) => {
  try {
    await prisma.discount.delete({
      where: {
        id,
      },
    });

    revalidatePath("/discounts");
    return { message: "Data berhasil dihapus" };
  } catch (error) {
    return { message: "Data gagal dihapus" };
  }
};

// PAYMENT LINK
export const PaymentLinkMidtrans = async (id: string) => {
  const dataTransaksi = await getDataTransaksi(id);
  const startTime = new Date();
  const dataUser = await getDataUser(dataTransaksi?.id_user || "");

  const body = {
    transaction_details: {
      order_id: dataTransaksi?.id_transaksi,
      gross_amount: dataTransaksi?.harga,
      payment_link_id: "",
    },
    customer_required: false,
    usage_limit: 1,
    expiry: {
      start_time: startTime,
      duration: 20,
      unit: "days",
    },
    item_details: [
      {
        id_user: dataTransaksi?.id_user,
        id_gameUser: dataTransaksi?.id_gameUser,
        operator_produk: dataTransaksi?.operator_produk,
        name: dataTransaksi?.kode_produk,
        price: dataTransaksi?.harga,
        quantity: 1,
        server: dataTransaksi?.server,
      },
    ],
    customer_details: {
      first_name: dataUser?.name,
      email: dataUser?.email,
    },
  };

  const base64Encode = Buffer.from(
    process.env.MIDTRANS_SERVER_KEY + ":"
  ).toString("base64");

  const authHeader = `Basic ${base64Encode}`;

  const response = await fetch(`${process.env.URL_PAYMENTLINK}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(body),
  });

  const checkData = await getPaymentLink(dataTransaksi?.id_transaksi || "")

  if(!checkData) {
    const res = await response.json();
    AddPaymentLink(dataTransaksi?.id_transaksi || "", res.payment_url);
    console.log(res.payment_url)

    // INI HARUS DI DEBUG KARNA DI HOSTING VERCEL DIA ERROR LINK NYA KEK JADI GK VALID

    return res.payment_url;
  }else {
    return checkData?.link_payment || ""
  }
}

export const AddPaymentLink = async (
  id_transaksi: string,
  link_payment: string
) => {
  try {
    await prisma.paymentLink.create({
      data: {
        id_transaksi,
        link_payment,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
