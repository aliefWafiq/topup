"use client";
import { CheckOut } from "@/components/button";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { getDiscount, updateDiscountStatus } from "@/lib/action";
import { checkUsedDiscount } from "@/lib/data";
import { checkSaldo } from "@/lib/data";
import { check } from "zod";

declare global {
  interface Window {
    snap: any;
  }
}

type DiscountProps = {
  initialPrice: number;
};

export function FormPayment({
  namaProduk,
  hargaProduk,
  jenis_id,
  operator_produk,
  code,
  id_user,
  email,
  serverOption,
}: {
  namaProduk: string;
  hargaProduk: number;
  jenis_id: string;
  operator_produk: string;
  code: string;
  id_user: string;
  email: string;
  serverOption: { name: string; value: string }[];
}) {
  const serverRef = useRef<HTMLSelectElement>(null);
  const id_gameUserRef = useRef<HTMLInputElement>(null);
  const hargaToko = hargaProduk + 2000;
  const orderId = Math.floor(Math.random() * 100) + Date.now();

  const [totalHarga, setTotalHarga] = useState<number>(hargaToko);
  const [kodeDiskon, setKodeDiskon] = useState<string>("");
  const [discountMessage, setDiscountMessage] = useState<string>("");
  const [idDiscount, setIdDiscount] = useState<string | null>(null);

  const handleDiscountChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentCode = event.target.value;
    setKodeDiskon(currentCode);

    const discount = await getDiscount(currentCode);

    if (discount !== null) {
      const isUsed = await checkUsedDiscount(discount.id);
      if (isUsed) {
        setTotalHarga(hargaToko);
        setKodeDiskon("");
        setDiscountMessage("Kode diskon sudah pernah digunakan.");
      } else if (
        new Date() > discount.berlaku_hingga &&
        discount.status != true
      ) {
        updateDiscountStatus(discount.id);
        setTotalHarga(hargaToko);
        setKodeDiskon("");
        setDiscountMessage("Kode diskon sudah tidak berlaku.");
      } else {
        const potongan = hargaToko * (discount.persentase / 100);
        setTotalHarga(Math.floor(hargaToko - potongan));
        setIdDiscount(discount.id);
        setDiscountMessage("Kode diskon berhasil diterapkan!");
      }
    } else {
      setTotalHarga(hargaToko);
      if (currentCode) {
        setDiscountMessage("Kode diskon tidak valid.");
      } else {
        setDiscountMessage("");
      }
    }
  };

  const handleCheckout = async () => {
    const server = serverRef.current?.value || "";
    const id_gameUser = id_gameUserRef.current?.value;
    const getSaldo = await checkSaldo();

    if (id_gameUser == "") {
      alert("Mohon isi id game");
    } else if (getSaldo < totalHarga) {
      alert(
        "Maaf saldo sistem sedang tidak mencukupi, silahkan melakukan top up lain kali"
      );
    } else {
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
    }
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="w-full mt-5 mb-3">
          <input
            type="text"
            name="nama_produk"
            placeholder="Nama Produk"
            value={namaProduk}
            className="w-full hover:cursor-not-allowed text-lg font-bold"
            readOnly
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="id_gameUser"
            placeholder="Masukkan ID Game User"
            className="w-full border rounded py-2 px-3"
            ref={id_gameUserRef}
          />
        </div>
        {serverOption && serverOption.length > 0 && (
          <div className="w-full">
            <select
              name="server"
              className="border w-full py-2 px-3 rounded"
              ref={serverRef}
            >
              {serverOption.map((server, idx) => (
                <option key={idx} value={server.value}>
                  {server.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="w-full">
          <input
            type="text"
            name="Kode Diskon"
            placeholder="Masukkan Kode Diskon (opsional)"
            className="w-full border rounded py-2 px-3"
            value={kodeDiskon}
            onChange={handleDiscountChange}
          />
          <p>{discountMessage}</p>
        </div>
        <div className="w-full border-t-2 border-slate-600 py-2 flex mt-3">
          <p className="w-1/3 text-lg font-semibold">Total</p>
          <div className="w-full">
            <input
              type="number"
              name="hargaProduk"
              placeholder={totalHarga.toLocaleString("id-ID")}
              value={totalHarga}
              className="w-full text-end hover:cursor-not-allowed text-lg font-bold"
              readOnly
            />
          </div>
        </div>
        <div className="mb-2 pt-4 w-full">
          <CheckOut onClick={handleCheckout} />
        </div>
      </div>
    </>
  );
}
