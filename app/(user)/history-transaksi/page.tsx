import type { Metadata } from "next"
import HistoryTransaksiTable from "@/components/table/historiTransaksi-table"

export const metadata: Metadata = {
    title: "Transaksi",
}

const HistoryTransaksiPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex justify-center py-32">
        <div className=" py-10">
            <h1 className="text-2xl font-bold">Histori Transaksi</h1>
            <HistoryTransaksiTable />
        </div>
    </div>
  )
}

export default HistoryTransaksiPage