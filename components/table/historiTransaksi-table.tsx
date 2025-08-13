import { getHistoryTransaksiUser } from "@/lib/data";
import clsx from "clsx";

const HistoryTransaksiTable = async () => {
  let transaksi = (await getHistoryTransaksiUser()) ?? []

  if (!transaksi?.length) return <h1 className="text-xl">No Data Found</h1>;

  return (
    <table className="w-full bg-white mt-14">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Id Transaksi</th>
          <th className="py-3 px-6 text-left text-sm">Id Game User</th>
          <th className="py-3 px-6 text-left text-sm">Game</th>
          <th className="py-3 px-6 text-left text-sm">Server</th>
          <th className="py-3 px-6 text-left text-sm">Harga</th>
          <th className="py-3 px-6 text-left text-sm">Status</th>
        </tr>
      </thead>
      <tbody>
        {transaksi.map((transaksi, i) => (
          <tr key={transaksi.id_transaksi}>
            <td className="py-3 px-6">{transaksi.id_transaksi}</td>
            <td className="py-3 px-6">{transaksi.id_gameUser}</td>
            <td className="py-3 px-6">{transaksi.operator_produk}</td>
            <td className="py-3 px-6">{transaksi.server}</td>
            <td className="py-3 px-6">
              Rp {transaksi.harga.toLocaleString("id-ID")}
            </td>
            <td className="p-2">
                <p className={
                  clsx(transaksi.status, {
                    'bg-red-500 text-white text-center py-3 px-3 rounded-xl': transaksi.status === "FAILED" || transaksi.status === "REFUNDED" || transaksi.status === "CANCELLED", 
                    'bg-blue-600 text-white text-center py-3 px-3 rounded-xl': transaksi.status === "COMPLETED",
                    'bg-blue-400 text-white text-center py-3 px-3 rounded-xl': transaksi.status === "PROCESSING",
                    'bg-orange-400 text-white text-center py-3 px-3 rounded-xl': transaksi.status === "PENDING",
                    'bg-green-500 text-white text-center py-3 px-3 rounded-xl': transaksi.status === "PAID"
                })}>{transaksi.status}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTransaksiTable;
