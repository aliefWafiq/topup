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

export const getDataUser = async(id: string) => {
  try {
    const dataUser = await prisma.user.findFirst({
      where: { id }
    })
    return dataUser
  } catch (error) {
    console.log(error)
  }
}


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

export const getDataTransaksi = async(id: string) => {
  try {
    const dataTransaksi = await prisma.transaksi.findFirst({
      where: { id_transaksi: id }
    })
    return dataTransaksi
  } catch (error) {
    console.log(error)
  }
}

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



export const listDataKeuangan = async() => {
  try {
    const listDataKeuangan = await prisma.dataKeuangan.findMany({
      orderBy: { periode: "asc" }
    })

    return listDataKeuangan
  } catch (error) {
    console.log(error)
  }
}

export const getDataKeuanganBulanIni = async(periode: Date) => {
  try {
    const getDataKeuangan = await prisma.dataKeuangan.findFirst({
      where: {
        periode
      }
    })

    return getDataKeuangan
  } catch (error) {
    console.log(error)
  }
}



export const getPaymentLink = async(id_transaksi: string) => {
  try {
    const dataPaymentLink = await prisma.paymentLink.findFirst({
      where: { id_transaksi }
    })
    return dataPaymentLink
  } catch (error) {
    console.log(error)
  }
}