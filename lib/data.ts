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

export const getDatabaseGames = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") redirect("/");

  try {
    const games = await prisma.game.findMany();
    return games;
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksi = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") redirect("/");

  try {
    const transaksi = await prisma.transaksi.findMany();
    return transaksi;
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryTransaksiUser = async() => {
  const session = await auth()

  if(!session){
    redirect("/login")
  }

  try {
    const userId = session?.user.id
    const historyTransaksi = await prisma.transaksi.findMany({
      where: { id_user: userId},
      orderBy: { createdAt: "desc" }
    })
    return historyTransaksi
  } catch (error) {
    console.log(error)
  }
}
