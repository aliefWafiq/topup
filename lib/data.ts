import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") redirect("/");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksi = async () => {
  try {
    const transaksi = await prisma.transaksi.findMany({
      orderBy: { createdAt: "desc" },
    });
    return transaksi;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscounts = async () => {
  try {
    const discount = await prisma.discount.findMany({
      orderBy: { created_at: "desc" },
    });
    return discount;
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryTransaksiUser = async () => {
  const session = await auth();

  try {
    const userId = session?.user.id;
    const historyTransaksi = await prisma.transaksi.findMany({
      where: { id_user: userId },
      orderBy: { createdAt: "desc" },
    });
    return historyTransaksi;
  } catch (error) {
    console.log(error);
  }
};

export const getJumlahTransaksi = async () => {
  try {
    const jumlahTransaksi = await prisma.transaksi.count();
    return jumlahTransaksi;
  } catch (error) {
    console.log(error);
  }
};

export const getJumlahUser = async () => {
  try {
    const jumlahUser = await prisma.user.count();
    return jumlahUser;
  } catch (error) {
    console.log(error);
  }
};

export const getDatakeuangan = async(bulan: string, tahun: string) => {
  try {
    const dataTransaksi = await prisma.dataKeuangan.findMany({
      where: { bulan: bulan, tahun: tahun }
    })
    return dataTransaksi
  } catch (error) {
    console.log(error)
  }
}