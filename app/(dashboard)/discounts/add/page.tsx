'use client'
import { SubmitButton } from "@/components/button";
import React from "react";
import { AddDiscount } from "@/lib/action";
import { useActionState } from "react";

const AddDiscountpage = () => {
  const [state, formAction] = useActionState(AddDiscount, null)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        action={formAction}
        className="flex flex-col items-center gap-3 md:w-1/2 p-6 rounded-lg shadow-2xl"
      >
        {state?.message ? (
        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
            <span className='font-medium'>{state?.message}</span>
        </div>
        ): null}
        <div className="w-full">
            <h1 className="text-2xl mb-4 font-bold">Add Diskon</h1>
        </div>
        <div className="w-full">
          <label htmlFor="nama_diskon" className="mb-2 text-lg">Nama Diskon</label>
          <input
            type="text"
            name="nama_diskon"
            placeholder="Nama Diskon"
            className="w-full border rounded py-2 px-3"
          />
          <div aria-live='polite' aria-atomic='true'>
              <span className='text-sm text-red-500 mt-2'>{state?.error?.nama_diskon}</span>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="kode_diskon" className="mb-2 text-lg">Kode Diskon</label>
          <input
            type="text"
            name="kode_diskon"
            placeholder="Kode Diskon"
            className="w-full border rounded py-2 px-3"
          />
          <div aria-live='polite' aria-atomic='true'>
              <span className='text-sm text-red-500 mt-2'>{state?.error?.kode_diskon}</span>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="persentase" className="mb-2 text-lg">Persentase Diskon</label>
          <input
            type="number"
            name="persentase"
            placeholder="Persentase Diskon"
            className="w-full border rounded py-2 px-3"
            step={0.1}
          />
          <div aria-live='polite' aria-atomic='true'>
              <span className='text-sm text-red-500 mt-2'>{state?.error?.persentase}</span>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="berlaku_hingga" className="mb-2 text-lg">Berlaku Hingga</label>
          <input
            type="datetime-local"
            name="berlaku_hingga"
            className="w-full border rounded py-2 px-3"
          />
          <div aria-live='polite' aria-atomic='true'>
              <span className='text-sm text-red-500 mt-2'>{state?.error?.berlaku_hingga}</span>
          </div>
        </div>
        <div className="mb-2 pt-4 w-full">
          <SubmitButton label="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddDiscountpage;
