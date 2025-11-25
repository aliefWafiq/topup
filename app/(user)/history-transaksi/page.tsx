import type { Metadata } from "next"
import HistoryTransaksiTable from "@/components/table/historiTransaksi-table"

export const metadata: Metadata = {
    title: "Transaksi",
}

const HistoryTransaksiPage = () => {
  return (
    <div className="min-h-screen flex justify-center py-32">
        <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold text-white">Histori Transaksi</h1>
            <HistoryTransaksiTable />
        </div>
    </div>
  )
}

export default HistoryTransaksiPage