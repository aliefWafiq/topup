"use client";
import React, { useEffect, useState } from "react";
import { FormPayment } from "@/components/form-checkout";
import { useSession } from "next-auth/react";

export default function LayoutFormPayment({
  onClose,
  namaProduk,
  hargaProduk,
  jenis_id,
  operator_produk,
  code,
  serverOption,
  id_user,
  email
}: {
  onClose: () => void;
  namaProduk: string;
  hargaProduk: number;
  jenis_id: string;
  operator_produk: string;
  code: string;
  serverOption: { name: string; value: string }[];
  id_user: string
  email: string
}) {
  const [dateInfo, setDateInfo] = useState<{
    dayName: string;
    date: number;
    month: string;
    year: number;
  } | null>(null);

  useEffect(() => {
    const days = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];
    const currentDay = new Date();
    const dayIndex = currentDay.getDay();
    setDateInfo({
      dayName: days[dayIndex],
      date: currentDay.getDate(),
      month: currentDay.toLocaleString("id-ID", { month: "long" }),
      year: currentDay.getFullYear(),
    });
  }, []);
  return (
    <>
      <div className="z-50 fixed w-full h-full py-10 top-0 left-0 flex justify-center items-center hover:cursor-auto">
        <div className="bg-white w-full lg:w-1/4 h-fit p-5 rounded-lg relative flex flex-col z-50 mx-12">
          <button
            onClick={onClose}
            className="hover:cursor-pointer absolute top-3"
          >
            X
          </button>
          <div className="w-full h-fit text-center mb-4">
            <h1 className="text-3xl font-bold">Top Up Receipt</h1>
          </div>
          {dateInfo ? (
            <>
              <p>
                {dateInfo.dayName}, {dateInfo.month} {dateInfo.date},{" "}
                {dateInfo.year}
              </p>
              <p>{email}</p>
            </>
          ) : (
            <>
              <p className="animate-pulse bg-gray-300 rounded w-1/2 h-4"></p>
              <p>{email}</p>
            </>
          )}
          <div className="w-full border-b-2 border-slate-600 py-2">
            <p>Transaction Detail</p>
          </div>
          <FormPayment
            namaProduk={namaProduk}
            hargaProduk={hargaProduk}
            jenis_id={jenis_id}
            operator_produk={operator_produk}
            code={code}
            id_user={id_user}
            email={email}
            serverOption={serverOption}
          />
        </div>
      </div>
      <div className="bg-black opacity-85 fixed z-40 w-full h-full top-0 left-0"></div>
    </>
  );
}
