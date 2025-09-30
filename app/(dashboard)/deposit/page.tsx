"use client";
import { SubmitButton } from "@/components/button";
import React from "react";
import { DepositSaldo } from "@/lib/action";
import { useActionState } from "react";

const PageDeposit = () => {
  const [state, formAction] = useActionState(DepositSaldo, null);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        action={formAction}
        className="flex flex-col items-center gap-3 w-1/2 p-6 rounded-lg shadow-2xl"
      >
        <div className="w-full">
          <h1 className="text-2xl mb-4 font-bold">Deposit Saldo</h1>
          {state?.message && <p className="text-red-500">{state.message}</p>}
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
            <p className="text-red-500 text-sm mt-1">{state.errors.nominal}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="kode" className="mb-2 text-lg">
            Metode Pembayaran
          </label>
          <select
            name="kode"
            required
            className="border w-full py-2 px-3 rounded"
          >
            <option disabled selected>
              Pilih metode pembayaran
            </option>
            <option value="bca">BCA</option>
            <option value="qris">QRIS</option>
            <option value="briva">BRI Virtual Acount</option>
            <option value="BRI">BRI</option>
          </select>
          {state?.errors?.kode && (
            <p className="text-red-500 text-sm mt-1">{state.errors.kode}</p>
          )}
        </div>
        <div className="mb-2 pt-4 w-full">
          <SubmitButton label="submit" />
        </div>
      </form>
    </div>
  );
};

export default PageDeposit;
