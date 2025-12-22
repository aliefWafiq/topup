import type { Metadata } from "next"
import HistoryTransaksiTable from "@/components/table/historiTransaksi-table"
import LoadingTable from "@/components/loadingTable"
import { Suspense } from "react"
import { SearchParamsProps } from "@/types/searchProps"

export const metadata: Metadata = {
    title: "Transaksi",
}

const HistoryTransaksiPage = async({ searchParams }: SearchParamsProps) => {

  const params = await searchParams
  const currentPage = Number(params?.page) || 1

  return (
    <div className="min-h-screen flex justify-center py-32">
        <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold text-white">Histori Transaksi</h1>
            <Suspense fallback={<LoadingTable />}>
              <HistoryTransaksiTable currentPage={currentPage}/>
            </Suspense>
        </div>
    </div>
  )
}

export default HistoryTransaksiPage