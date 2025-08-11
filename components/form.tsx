"use client";
import { CheckOut } from "@/components/button";
import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

export function FormPayment({
  namaProduk,
  hargaProduk,
  jenis_id,
  operator_produk,
  code,
  id_user,
  email,
  serverOption
}: {
  namaProduk: string;
  hargaProduk: number;
  jenis_id: string;
  operator_produk: string;
  code: string;
  id_user: string;
  email: string;
  serverOption: {name: string, value: string}[]
}) {

  const serverRef = useRef<HTMLSelectElement>(null);
  const id_gameUserRef = useRef<HTMLInputElement>(null);
  const total = hargaProduk + 2000;
  const orderId = Math.floor(Math.random() * 100) + Date.now();

  const handleCheckout = async () => {
    const server = serverRef.current?.value || "";
    const id_gameUser = id_gameUserRef.current?.value;
    const body = {
      id_transaksi: String(orderId),
      id_user: id_user,
      id_gameUser: id_gameUser,
      nama_produk: namaProduk,
      price: total,
      jenis_id: jenis_id,
      operator_produk: operator_produk,
      server: server,
      code: code,
      email
    };

    console.log("Received:", {
      orderId,
      namaProduk,
      total,
      jenis_id,
      operator_produk,
      id_user,
      id_gameUser,
      server,
      email
    });

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

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="flex flex-col items-center px-6 gap-3 w-full">
        <div className="mb-4 pt-2 w-2/3">
          <input
            type="text"
            name="nama_produk"
            placeholder="Nama Produk"
            value={namaProduk}
            className="py-2 px-4 rounded-sm border border-gray-400 w-full hover:cursor-not-allowed bg-slate-100"
            readOnly
          />
        </div>
        <div className="mb-4 pt-2 w-2/3">
          <input
            type="number"
            name="hargaProduk"
            placeholder={total.toLocaleString("id-ID")}
            value={total}
            className="py-2 px-4 rounded-sm border border-gray-400 w-full hover:cursor-not-allowed bg-slate-100"
            readOnly
          />
        </div>
        <div className="mb-4 pt-2 w-2/3">
          <input
            type="text"
            name="id_gameUser"
            placeholder="Masukkan ID Game User"
            className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            ref={id_gameUserRef}
          />
        </div>
        <div className="mb-4 w-2/3">
          <select
            name="server"
            className="border w-full py-2 px-3"
            ref={serverRef}
          >
            {serverOption.map((server, idx) => (
               <option key={idx} value={server.value}>{server.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 pt-4 w-2/3">
          <CheckOut onClick={handleCheckout} />
        </div>
      </div>
    </>
  );
}
