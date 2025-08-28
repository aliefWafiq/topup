import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { getTransaksi } from "@/lib/data";

const TransaksiTable = async () => {
  const transaksi = await getTransaksi();

  return (
    <div className="overflow-hidden rounded-lg border mt-4">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="px-8">Id Transaksi</TableHead>
            <TableHead>Id User</TableHead>
            <TableHead>Id Game</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaksi?.map((item) => (
            <TableRow key={item.id_transaksi} className="">
              <TableCell className="py-4 px-8">{item.id_transaksi}</TableCell>
              <TableCell className="py-4">{item.id_user}</TableCell>
              <TableCell className="py-4">{item.id_gameUser}</TableCell>
              <TableCell className="py-4">{item.operator_produk}</TableCell>
              <TableCell className="py-4">{item.harga}</TableCell>
              <TableCell className="py-4">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  {item.status === "COMPLETED" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ) : item.status === "PROCESSING" ? (
                    <IconLoader />
                  ): item.status === "PENDING" ? (
                    <IconLoader />
                  ): item.status === "PAID" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ): (
                    <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                  )}
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransaksiTable;
