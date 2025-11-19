import { getHistoryTransaksiUser } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { PaymentLink } from "@/components/button";

const HistoryTransaksiTable = async () => {
  let transaksi = (await getHistoryTransaksiUser()) ?? [];

  if (!transaksi?.length)
    return <h1 className="text-xl mt-8">No Data Found</h1>;

  return (
    <div className="overflow-hidden rounded-lg border mt-4">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="py-3 px-6 text-left text-sm">
              Id Transaksi
            </TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">
              Id Game User
            </TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">Game</TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">
              Server
            </TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">Harga</TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">
              Status
            </TableHead>
            <TableHead className="py-3 px-6 text-left text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaksi.map((transaksi, i) => (
            <TableRow key={transaksi.id_transaksi} className="bg-slate-100">
              <TableCell className="py-3 px-6">
                {transaksi.id_transaksi}
              </TableCell>
              <TableCell className="py-3 px-6">
                {transaksi.id_gameUser}
              </TableCell>
              <TableCell className="py-3 px-6">
                {transaksi.operator_produk}
              </TableCell>
              <TableCell className="py-3 px-6">{transaksi.server}</TableCell>
              <TableCell className="py-3 px-6">
                Rp {transaksi.harga.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="p-2">
                <Badge
                  variant={"outline"}
                  className={"text-muted-foreground px-1.5"}
                >
                  {transaksi.status === "COMPLETED" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ) : transaksi.status === "CANCELLED" ||
                    transaksi.status === "FAILED" ||
                    transaksi.status === "REFUNDED" ? (
                    <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                  ) : transaksi.status === "PROCESSING" ? (
                    <IconCircleCheckFilled className="fill-blue-500 dark:fill-blue-400" />
                  ) : transaksi.status === "PAID" ? (
                    <IconCircleCheckFilled className="fill-emerald-500 dark:fill-emerald-400" />
                  ) : transaksi.status === "PENDING" ? (
                    <IconCircleCheckFilled className="fill-orange-500 dark:fill-orange-400" />
                  ) : (
                    <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                  )}
                  {transaksi.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-6">
                <PaymentLink transaksi={transaksi.id_transaksi} status={transaksi.status} /> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTransaksiTable;
