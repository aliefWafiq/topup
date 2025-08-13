"use client";
import React from "react";
import { FormPayment } from "@/components/form";
import { useSession } from "next-auth/react";

export default function LayoutFormPayment({
  onClose,
  namaProduk,
  hargaProduk,
  jenis_id,
  operator_produk,
  code,
  serverOption,
}: {
  onClose: () => void;
  namaProduk: string;
  hargaProduk: number;
  jenis_id: string;
  operator_produk: string;
  code: string;
  serverOption: { name: string; value: string }[];
}) {
  const { data: session } = useSession();
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

  const currentDate = new Date()
  const date = currentDate.getDate()
  const month = currentDate.toLocaleString('default', {month: 'long'})
  const day = currentDate.getDay()
  const year = currentDate.getFullYear()
  const today = day - 1
  return (
    <>
      <div className="z-30 fixed w-full h-full py-10 top-0 left-0 flex justify-center items-center hover:cursor-auto">
        <div className="bg-white w-1/4 h-fit p-5 rounded-lg relative flex flex-col">
          <button
            onClick={onClose}
            className="hover:cursor-pointer absolute top-3">
            X
          </button>
          <div className="w-full h-fit text-center">
            <h1 className="text-3xl font-bold">Top Up Receipt</h1>
          </div>
          <div className="mt-8 space-y-1 border-b-2 pb-2 border-slate-600">
            <p>{days[today]}, {month} {date}, {year}</p>
            <p>{session?.user.email}</p>
          </div>
        <div className="w-full border-b-2 border-slate-600 py-2">
          <p>Transaction Detail</p>
        </div>
          <FormPayment
            namaProduk={namaProduk}
            hargaProduk={hargaProduk}
            jenis_id={jenis_id}
            operator_produk={operator_produk}
            code={code}
            id_user={session?.user.id || ""}
            email={session?.user.email || ""}
            serverOption={serverOption}
          />
        </div>
      </div>
      <div className="bg-black opacity-85 fixed z-20 w-full h-full top-0 left-0"></div>
    </>
  );
}
