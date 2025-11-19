"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Games } from "@/types/game";

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

export const getJumlahUser = async () => {
  try {
    const jumlahUser = await prisma.user.count();
    return jumlahUser;
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

export const getDataUser = async (id: string) => {
  try {
    const dataUser = await prisma.user.findFirst({
      where: { id },
    });
    return dataUser;
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

export const getDataTransaksi = async (id: string) => {
  try {
    const dataTransaksi = await prisma.transaksi.findFirst({
      where: { id_transaksi: id },
    });
    return dataTransaksi;
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

export const checkUsedDiscount = async (id_discount: string) => {
  try {
    const checkUsedDicounts = await prisma.usedDiscount.findFirst({
      where: { discountId: id_discount },
    });

    return checkUsedDicounts ? true : false;
  } catch (error) {
    console.log(error);
  }
};

export const listDataKeuangan = async () => {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);
    const listDataKeuangan = await prisma.dataKeuangan.findMany({
      where: {
        periode: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { periode: "asc" },
    });

    return listDataKeuangan;
  } catch (error) {
    console.log(error);
  }
};

export const getDataKeuanganBulanIni = async (periode: Date) => {
  try {
    const getDataKeuangan = await prisma.dataKeuangan.findFirst({
      where: {
        periode,
      },
    });

    return getDataKeuangan;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentLink = async (id_transaksi: string) => {
  try {
    const dataPaymentLink = await prisma.paymentLink.findFirst({
      where: { id_transaksi },
    });
    return dataPaymentLink;
  } catch (error) {
    console.log(error);
  }
};

export const checkSaldo = async () => {
  const url = `https://api.tokovoucher.net/member?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const saldo = json.data.saldo;

  return saldo
};

export const getGameRekomendasi = async () => {
  try {
    const dataGame = await prisma.transaksi.findMany({
      where: {
        operator_produk: 'desc',
      },
      take: 5
    })

    return dataGame[0]?.operator_produk
  } catch (error) {
    console.log(error);
  }
}

export async function getGame(id: string): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/jenis/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id=" + id)
    const json = await res.json()
    const games = json.data

    return games
}

export async function getGameProducts(id: string): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id_jenis=" + id)
    const json = await res.json()
    const gameProduct = json.data

    return gameProduct
}

export async function listUserGameId(id: string) {
  try {
    const dataId = await prisma.id_game_user.findMany({
      where: {
        userId: id
      }
    })

    return dataId
  } catch (error) {
    console.error(error)
  }
}

export async function getUserGameId(id: string, idGame: string) {
  try {
    const dataId = await prisma.id_game_user.findFirst({
      where: {
        userId: id,
        gameId: idGame
      }
    })

    return dataId?.idGameUser
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getNamaGameUser(id: string, idGame: string) {
    try {
    const dataId = await prisma.id_game_user.findFirst({
      where: {
        userId: id,
        gameId: idGame
      }
    })

    return dataId?.namagame
  } catch (error) {
    console.error(error)
    return null
  }
}