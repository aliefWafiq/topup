import type { Metadata } from "next";
import TransaksiTable from "@/components/table/transaksi-table";
import { getTransaksi } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Transaksi",
};

const TransaksiPage = async () => {
  const transaksi = await getTransaksi();
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen flex justify-center py-14">
        <div className="w-full md:px-6">
          <h1 className="text-2xl font-bold">List Transaksi</h1>
          <TransaksiTable />
        </div>
      </div>
    </>
  );
};

export default TransaksiPage;
