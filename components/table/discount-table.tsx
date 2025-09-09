import { getDiscounts } from "@/lib/data";
import { DeleteButton, EditButton } from "@/components/button";
import { DeleteDiscount } from "@/lib/action";
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

const berlaku = (date: Date) => {
  const tgl = new Date(date);
  return tgl.toLocaleDateString("id-ID");
};

const DiscountTable = async () => {
  let discount = (await getDiscounts()) ?? [];

  if (!discount?.length) return <h1 className="text-xl">No Data Found</h1>;

  return (
    <div className="overflow-hidden rounded-lg border mt-4">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="px-8">Id Discount</TableHead>
            <TableHead>Nama Diskon</TableHead>
            <TableHead>Kode Diskon</TableHead>
            <TableHead>Persentase</TableHead>
            <TableHead>Berlaku Hingga</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discount?.map((item) => (
            <TableRow key={item.id} className="">
              <TableCell className="py-4 px-8">{item.id}</TableCell>
              <TableCell className="py-4">{item.nama_diskon}</TableCell>
              <TableCell className="py-4">{item.kode_diskon}</TableCell>
              <TableCell className="py-4">{item.persentase}</TableCell>
              <TableCell className="py-4">{berlaku(item.berlaku_hingga)}</TableCell>
              <TableCell className="py-4">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                  >
                  {item.status === true ? (
                      <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                    ) : (
                      <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                    )}
                    {item.status === true ? "Aktif" : "Tidak aktif"}
                </Badge>
              </TableCell>
              <TableCell className="py-4 flex space-x-2">
                <DeleteButton id={item.id} deleteAction={DeleteDiscount} />
                <EditButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscountTable;
