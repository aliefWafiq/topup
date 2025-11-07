"use client";
import { SubmitButton } from "@/components/button";
import React from "react";
import { DepositSaldo } from "@/lib/action";
import { useFormState } from "react-dom";
import { SiteHeader } from "@/components/site-header";

interface ActionState {
  success: boolean;
  message?: string;
  errors?: {
    nominal?: string;
    kode?: string;
  };
  data?: any;
}

const PageDeposit = () => {
  const [state, formAction] = useFormState(DepositSaldo, null);

  return (
    <>
      <SiteHeader />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="md:w-1/2 p-6 rounded-lg shadow-2xl">
          {state?.success && state.data ? (
            <div>
              <h1 className="text-2xl mb-4 font-bold text-green-600">
                Deposit Berhasil Dibuat!
              </h1>
              <p className="mb-4">Silakan selesaikan pembayaran Anda:</p>
              <div className="space-y-3 text-left bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Metode:</strong> {state.data.data.metode}
                </p>
                <p>
                  <strong>Nomor Pembayaran:</strong>
                  <span className="block font-bold text-lg">
                    {state.data.data.pay}
                  </span>
                </p>
                <p>
                  <strong>Atas Nama:</strong> {state.data.data.pay_name}
                </p>
                <p>
                  <strong>Total Transfer:</strong>
                  <span className="block font-bold text-lg text-red-600">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      state.data.data.total_transfer
                    )}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Harap transfer sesuai total agar deposit diproses otomatis.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 hover:cursor-pointer"
              >
                Buat Deposit Baru
              </button>
            </div>
          ) : (
            <form
              action={formAction}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-full">
                <h1 className="text-2xl mb-4 font-bold">Deposit Saldo</h1>
                {state?.message && (
                  <p className="text-red-500">{state.message}</p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="nominal" className="mb-2 text-lg">
                  Nominal
                </label>
                <input
                  type="number"
                  name="nominal"
                  placeholder="Nominal Deposit"
                  className="w-full border rounded py-2 px-3"
                />
                {state?.errors?.nominal && (
                  <p className="text-sm mt-1">{state.errors.nominal}</p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="kode" className="mb-2 text-lg">
                  Metode Pembayaran
                </label>
                <select
                  name="kode"
                  required
                  defaultValue=""
                  className="border w-full py-2 px-3 rounded"
                >
                  <option value="" disabled>
                    Pilih metode pembayaran
                  </option>
                  <option value="bca">BCA</option>
                  <option value="qris">QRIS</option>
                  <option value="briva">BRI Virtual Acount</option>
                  <option value="BRI">BRI</option>
                </select>
                {state?.errors?.kode && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.kode}
                  </p>
                )}
              </div>
              <div className="mb-2 pt-4 w-full">
                <SubmitButton label="submit" />
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PageDeposit;
