import type { Metadata } from "next"
import TransaksiTable from "@/components/transaksi-table"

export const metadata: Metadata = {
    title: "Transaksi",
}

const TransaksiPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="max-w-screen-md mx-auto py-10">
            <h1 className="text-2xl font-bold">Transaksi List</h1>
            <TransaksiTable />
        </div>
    </div>
  )
}

export default TransaksiPage