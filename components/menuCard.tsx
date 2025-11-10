"use client";
import React from "react";
import { Games } from "@/types/game";
import { useState } from "react";
import LayoutFormPayment from "@/components/LayoutFormPayment"
import AuthProvider from "@/app/authProvider";

function harga(price: number) {
  const total = price + 2000;
  return total.toLocaleString("id-ID");
}

const MenuCard = ({
  games,
  jenis_id,
  format_form,
  id_user,
  email,
}: {
  games: Games;
  jenis_id: string;
  format_form: any;
  id_user: string;
  email: string;
}) => {
  const [showForm, setShowForm] = useState(false);
  const formatForm = React.useMemo(() => {
    try {
      return typeof format_form === "string"
        ? JSON.parse(format_form)
        : format_form;
    } catch (error) {
      console.error("Gagal parse format_form:", error);
      return [];
    }
  }, [format_form]);

  const serverOption = React.useMemo(() => {
    const serverObj = formatForm.find((item: any) => item.name === "server_id");
    return serverObj ? serverObj.data : [];
  }, [formatForm]);

  return (
    <>
      <div
        onClick={() => setShowForm(true)}
        className="my-2 border-2 border-gray-200 rounded-md w-full lg:w-1/2 p-5 text-start hover:cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <p className="font-semibold">{games.nama_produk}</p>
        <p>Rp {harga(games.price)}</p>
      </div>
      <AuthProvider>
        {showForm && (
          <LayoutFormPayment
            onClose={() => setShowForm(false)}
            namaProduk={games.nama_produk}
            hargaProduk={games.price}
            jenis_id={jenis_id}
            operator_produk={games.operator_produk}
            code={games.code}
            serverOption={serverOption}
            id_user={id_user}
            email={email}
          />
        )}
      </AuthProvider>
    </>
  );
};

export default MenuCard;
