import React from 'react'

const PagePembayaran = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
          <div
            className="flex flex-col items-center gap-3 w-1/2 p-6 rounded-lg shadow-2xl"
          >
            <div className="w-full">
              <h1 className="text-2xl mb-4 font-bold">Deposit Saldo</h1>
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
            </div>
            <div className="mb-2 pt-4 w-full">
            </div>
          </div>
        </div>
  )
}

export default PagePembayaran