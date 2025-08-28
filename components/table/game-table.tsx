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
import { Games } from "@/types/game";
import Image from "next/image";

const GamesTable = async () => {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  if (!games?.length) return <h1 className="text-xl">No User Found</h1>;

  return (
    <div className="overflow-hidden rounded-lg border mt-4">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="px-8">Icon</TableHead>
            <TableHead>Id Jenis</TableHead>
            <TableHead>Nama Game</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((item: Games) => (
            <TableRow key={item.id} className="">
              <TableCell className="py-4 px-8 w-44">
                <Image
                  width={200}
                  height={200}
                  src={item.logo || "/avatar.jpg"}
                  alt="game.nama"
                />
              </TableCell>
              <TableCell className="py-4 px-8">{item.id}</TableCell>
              <TableCell className="py-4">{item.nama}</TableCell>
              <TableCell className="py-4">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  {item.status === 1 ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ) : (
                    <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                  )}
                  {item.status === 1 ? "Aktif" : "Tidak aktif"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GamesTable;
