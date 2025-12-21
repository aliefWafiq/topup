"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { RegisterSchema, SignInSchema, DiscountSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { StatusTransaksi } from "@prisma/client";
import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import {
  getDataTransaksi,
  getDataUser,
  getPaymentLink,
} from "@/lib/data";

import { Discount } from "@/types/discount";
import { State } from "@/types/state";

const STATUS_PRIORITY: Record<string, number> = {
  'FAILED': 1,
  'CANCELLED': 2,
  'PENDING': 3,
  'PAID': 4,
  'REFUNDED': 5,
  'PROCESSING': 6,
  'COMPLETED': 7,
};

interface ActionState {
  success: boolean;
  message?: string;
  errors?: {
    nominal?: string;
    kode?: string;
  };
  data?: any;
}

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
    await signIn("credentials", { email, password, redirectTo: "/home" });
  } catch (error) {
    if (
      error instanceof Error &&
      (error as any).digest?.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    if (error instanceof AuthError) {
      return { message: "Gagal login setelah daftar." };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email sudah terdaftar." };
      }
    }

    console.error("Register Error:", error);
    return { message: "Gagal untuk register." };
  }
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

// DEPOSIT SALDO
export const DepositSaldo = async (
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> => {
  const nominal = formData.get("nominal");
  const kode = formData.get("kode");
  const errors: ActionState["errors"] = {};

  if (!nominal || Number(nominal) <= 0) {
    errors.nominal = "Nominal wajib diisi.";
  } else if (Number(nominal) < 100000) {
    errors.nominal = "Minimal deposit adalah Rp 100.000.";
  }

  if (!kode) {
    return {
      success: false,
      message: "Nominal dan metode pembayaran wajib diisi.",
    };
  }

  const nominalValue = Number(nominal);
  if (isNaN(nominalValue) || nominalValue <= 0) {
    return { success: false, message: "Nominal harus berupa angka positif." };
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "" };
  }

  try {
    const url = `https://api.tokovoucher.net/v1/deposit?member_code=${process.env.MEMBER_CODE}&secret=${process.env.SECRET_KEY_TOKOVOUCHER}&nominal=${nominal}&kode=${kode}`;

    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.message || "Gagal melakukan deposit",
      };
    }

    const resultData = await res.json();
    console.log(resultData);

    return {
      success: true,
      data: resultData,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server. Silakan coba lagi.",
    };
  }
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
    console.log(`[TopUp] Starting for order: ${orderId}`);

    const getOrderId = await prisma.transaksi.findUnique({
      where: { id_transaksi: orderId },
      select: {
        kode_produk: true,
        id_gameUser: true,
        server: true,
        harga: true,
      }
    });

    if (!getOrderId) {
      throw new Error("Data tidak ditemukan");
    }

    const signature = createHash("md5")
      .update(`${process.env.MEMBER_CODE}:${process.env.SECRET_KEY_TOKOVOUCHER}:${orderId}`)
      .digest('hex');

    console.log(`[TopUp] Signature generated`);
    
    const total = getOrderId.harga;
    const totalBersih = total - 2000;

    const body = {
      ref_id: orderId,
      produk: getOrderId.kode_produk,
      tujuan: getOrderId.id_gameUser,
      server_id: getOrderId.server,
      member_code: process.env.MEMBER_CODE,
      signature: signature,
    };

    // console.log(`[TopUp] Calling API Tokovoucher...`);

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
    console.log(`[TopUp] API Response:`, responseData);

    let mappedStatus: StatusTransaksi;
    switch (responseData.status?.toLowerCase()) {
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

    await prisma.transaksi.update({
      where: { id_transaksi: orderId },
      data: { status: mappedStatus },
    });

    console.log(`[TopUp] Updated to ${mappedStatus}`);

    const currentDate = new Date();
    const periode = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const existing = await prisma.dataKeuangan.findFirst({
      where: { periode },
    });

    if (existing) {
      await prisma.dataKeuangan.update({
        where: { id: existing.id },
        data: {
          total: { increment: total },
          totalBersih: { increment: totalBersih },
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

    console.log(`[TopUp] Completed successfully for ${orderId}`);
    return mappedStatus;

  } catch (error: any) {
    console.error(`[TopUp] Error for ${orderId}:`, error.message);
    await prisma.transaksi.update({
      where: { id_transaksi: orderId },
      data: { status: "FAILED" },
    });
    throw error; 
  }
};

// UPDATE STATUS
export const updateStatus = async (
  id_transaksi: string,
  statusMidtrans: string
) => {
  try {
    const actualId = id_transaksi.split('-')[0];
    // console.log(`[${new Date().toISOString()}] Webhook received`);
    // console.log("Order ID dari Midtrans:", id_transaksi);
    // console.log("ID setelah parsing:", actualId);
    // console.log("Status Midtrans:", statusMidtrans);

    if (statusMidtrans.toLowerCase() === "pending") {
      console.log("Skipping pending status (already default)");
      return "PENDING";
    }

    const transaksi = await prisma.transaksi.findUnique({
      where: { id_transaksi: actualId },
      select: {
        status: true,
        id_user: true,
        harga: true,
        kode_produk: true,
        id_gameUser: true,
        server: true,
      }
    });

    if (!transaksi) {
      console.error(`Transaksi dengan ID ${actualId} tidak ditemukan`);
      return "FAILED";
    }

    // Map status
    let mappedStatus: StatusTransaksi;
    switch (statusMidtrans.toLowerCase()) {
      case "settlement":
        mappedStatus = "PAID";
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

    const currentPriority = STATUS_PRIORITY[transaksi.status] || 0;
    const newPriority = STATUS_PRIORITY[mappedStatus] || 0;

    if (newPriority <= currentPriority) {
      console.log(`⏭️ Skip update: ${mappedStatus} (${newPriority}) <= ${transaksi.status} (${currentPriority})`);
      return transaksi.status;
    }

    const updated = await prisma.transaksi.updateMany({
      where: {
        id_transaksi: actualId,
        status: transaksi.status
      },
      data: { status: mappedStatus }
    });

    if (updated.count === 0) {
      console.log("⏭️ Already updated by another webhook");
      return mappedStatus;
    }

    console.log(`✅ Status updated: ${transaksi.status} → ${mappedStatus}`);

    if (mappedStatus === "PAID" && transaksi.status !== "PAID") {
      console.log(`Triggering topUp for ${actualId}`);
      
      topUp(actualId)
        .then((result) => {
          console.log(`TopUp completed for ${actualId}:`, result);
        })
        .catch((error) => {
          console.error(`TopUp failed for ${actualId}:`, error);
        });
    }

    return mappedStatus;

  } catch (error: any) {
    console.error("Error updateStatus:", error.message);
    
    if (error.code === 'P2024') {
      console.error("CONNECTION POOL EXHAUSTED - Increase connection_limit!");
    }
    
    return "FAILED";
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

// UPDATE PROFILE
export const UpdateProfile = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
      },
    });

    revalidatePath("/profile");
    return {
      message: "Berhasil update profile!",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Gagal update profile!",
      error: error,
    };
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

  const order_id = `${dataTransaksi?.id_transaksi}-${Date.now()}`;

  const body = {
    transaction_details: {
      order_id: order_id,
      gross_amount: dataTransaksi?.harga,
      payment_link_id: "",
    },
    customer_required: false,
    usage_limit: 1,
    expiry: {
      start_time: startTime.toISOString(), 
      duration: 20,
      unit: "days",
    },
    item_details: [
      {
        id: dataTransaksi?.kode_produk,
        name: dataTransaksi?.kode_produk,
        price: dataTransaksi?.harga,
        quantity: 1,
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

  const checkData = await getPaymentLink(dataTransaksi?.id_transaksi || "");

  if (!checkData) {
    const res = await response.json();
    await AddPaymentLink(dataTransaksi?.id_transaksi || "", res.payment_url);
    console.log("Payment URL:", res.payment_url);

    return res.payment_url;
  } else {
    return checkData?.link_payment || "";
  }
};

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

// UPDATE FOTO USER

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

function validateFile(
  file: File | null,
  fieldName: string
): { valid: boolean; error?: string } {
  if (!file || file.size === 0) {
    return { valid: true };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Format ${fieldName} tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF`,
    };
  }
  return { valid: true };
}

async function uploadFile(
  file: File,
  folder: string,
  userId: string,
  oldUrl: string | null
): Promise<string> {
  if (oldUrl) {
    try {
      await del(oldUrl);
    } catch (error) {
      console.error(`Error deleting old ${folder}:`, error);
    }
  }
  const fileExtension = file.name.split(".").pop() || "jpg";
  const blob = await put(
    `${folder}/${userId}-${Date.now()}.${fileExtension}`,
    file,
    { access: "public" }
  );
  return blob.url;
}

export async function updateUserPhoto(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const banner = formData.get("banner") as File | null;
    const photo = formData.get("photo") as File | null;

    if (!userId) {
      return { success: false, message: "User ID tidak ditemukan" };
    }

    const bannerValidation = validateFile(banner, "banner");
    if (!bannerValidation.valid) {
      return { success: false, message: bannerValidation.error! };
    }

    const photoValidation = validateFile(photo, "foto profil");
    if (!photoValidation.valid) {
      return { success: false, message: photoValidation.error! };
    }

    const hasBanner = banner && banner.size > 0;
    const hasPhoto = photo && photo.size > 0;

    if (!hasBanner && !hasPhoto) {
      return {
        success: false,
        message: "Pilih minimal satu file untuk diupload",
      };
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profile_image: true, banner_image: true },
    });

    if (!currentUser) {
      return { success: false, message: "User tidak ditemukan" };
    }

    const updateData: { banner_image?: string; profile_image?: string } = {};

    if (hasBanner) {
      updateData.banner_image = await uploadFile(
        banner!,
        "banners",
        userId,
        currentUser.banner_image
      );
    }

    if (hasPhoto) {
      updateData.profile_image = await uploadFile(
        photo!,
        "photos",
        userId,
        currentUser.profile_image
      );
    }

    console.log("Updating database with:", updateData);

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/profile");

    const messages = {
      both: "Banner dan foto profil berhasil diupdate",
      banner: "Banner berhasil diupdate",
      photo: "Foto profil berhasil diupdate",
    };

    const messageKey =
      hasBanner && hasPhoto ? "both" : hasBanner ? "banner" : "photo";

    return { success: true, message: messages[messageKey] };
  } catch (error) {
    console.error("Error update photo:", error);

    if (error instanceof Error) {
      const errorMessages: Record<string, string> = {
        "rate limit": "Terlalu banyak upload. Coba lagi nanti",
        quota: "Kuota storage habis",
      };

      for (const [key, message] of Object.entries(errorMessages)) {
        if (error.message.toLowerCase().includes(key)) {
          return { success: false, message };
        }
      }
    }

    return {
      success: false,
      message: "Gagal mengupdate foto. Silakan coba lagi",
    };
  }
}

// ADD ID GAME USER
export async function AddIdGameUser(
  prevState: ActionState | null,
  formdata: FormData
): Promise<ActionState> {
  const userId = formdata.get("userId") as string;
  const idGameUser = formdata.get("idGameUser") as string;
  const namagame = formdata.get("namagame") as string;
  const gameId = formdata.get("gameId") as string;

  try {
    await prisma.id_game_user.create({
      data: {
        userId,
        namagame,
        gameId,
        idGameUser,
      },
    });

    revalidatePath("/list-id-game");
    redirect("/list-id-game");
  } catch (error: any) {
    console.error("Database Error:", error);

    if (error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    if (error.code === "P2002") {
      return {
        success: false,
        message: "User ini sudah memiliki ID game terdaftar",
      };
    }

    return {
      success: false,
      message: "Gagal menyimpan data. Silakan coba lagi.",
    };
  }
}

export async function EditIdGameUser(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const userId = formData.get("userId") as string;
  const idGameUser = formData.get("idGameUser") as string;
  const namagame = formData.get("namagame") as string;
  const gameId = formData.get("gameId") as string;

  try {
    await prisma.id_game_user.update({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId,
        },
      },
      data: {
        idGameUser: idGameUser,
      },
    });

    revalidatePath("/list-id-game");
    redirect("/list-id-game");
  } catch (error:any) {
    if (error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message: "Gagal menyimpan data. Silakan coba lagi.",
    };
  }
}

// jadikan parameter untuk variabel nyaa 

export const Checkout = async (
  server: string, 
  id_gameUser: string, 
  totalHarga: number, 
  orderId: number, 
  id_user: string, 
  namaProduk: string, 
  jenis_id: string,
  operator_produk: string,
  code: string,
  idDiscount: string | null,
  email: string
) => {
      const body = {
        id_transaksi: String(orderId),
        id_user: id_user,
        id_gameUser: id_gameUser,
        nama_produk: namaProduk,
        price: totalHarga,
        jenis_id: jenis_id,
        operator_produk: operator_produk,
        server: server,
        code: code,
        id_discount: idDiscount != null ? idDiscount : "",
        email,
      };

      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();
      if (json.status && json.data?.token) {
        window.snap.pay(json.data.token);
      } else {
        alert("Transaksi gagal: " + json.message);
      }
    
  };