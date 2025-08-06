import type { Metadata } from "next"
import TransaksiTable from "@/components/table/transaksi-table"

export const metadata: Metadata = {
    title: "Transaksi",
}

const TransaksiPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex justify-center">
        <div className=" py-10">
            <h1 className="text-2xl font-bold">Transaksi List</h1>
            <TransaksiTable />
        </div>
    </div>
  )
}

export default TransaksiPage