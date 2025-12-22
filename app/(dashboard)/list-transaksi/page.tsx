import type { Metadata } from "next";
import TransaksiTable from "@/components/table/transaksi-table";
import { getTransaksi } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SearchParamsProps } from "@/types/searchProps"
import { Suspense } from "react";
import LoadingTable from "@/components/loadingTable";

export const metadata: Metadata = {
  title: "Transaksi",
};

const TransaksiPage = async({ searchParams }: SearchParamsProps) => {
  const params = await searchParams
  const currentPage = Number(params?.page) || 1
  const transaksi = await getTransaksi(currentPage);
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen flex justify-center py-14">
        <div className="w-full md:px-6">
          <h1 className="text-2xl font-bold">List Transaksi</h1>
          <Suspense fallback={<LoadingTable />}>
            <TransaksiTable currentPage={currentPage}/>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default TransaksiPage;
