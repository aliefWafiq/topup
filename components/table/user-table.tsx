import { getUsers } from "@/lib/data";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControl from "@/components/ui/pagination-control";

const UserTable = async({ currentPage }: { currentPage: number }) => {
  const users = await getUsers(currentPage);

  if (!users?.user.length) return <h1 className="text-xl mt-8">No Data Found</h1>

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="px-8">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.user.map((user: any) => (
              <TableRow key={user.id} className="">
                <TableCell className="py-4 px-8">{user.name}</TableCell>
                <TableCell className="py-4">{user.email}</TableCell>
                <TableCell className="py-4">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-5">
        {/* Pagination Control */}
        <PaginationControl totalPages={users.totalPages} />
      </div>
    </div>
  );
};

export default UserTable;
