-- CreateEnum
CREATE TYPE "StatusTransaksi" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateTable
CREATE TABLE "Game" (
    "jenis_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "margin" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("jenis_id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "kode_produk" TEXT NOT NULL,
    "operator_produk" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "status" "StatusTransaksi" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);
