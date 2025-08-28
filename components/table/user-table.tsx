import { getUsers } from "@/lib/data";
import { DeleteButton, EditButton } from "@/components/button";
import { DeleteUser } from "@/lib/action";
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

const UserTable = async () => {
  const users = await getUsers();

  if (!users?.length) return <h1 className="text-xl">No Data Found</h1>;

  return (
    <div className="overflow-hidden rounded-lg border mt-4">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="px-8">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="">
              <TableCell className="py-4 px-8">{user.name}</TableCell>
              <TableCell className="py-4">{user.email}</TableCell>
              <TableCell className="py-4">{user.role}</TableCell>
              <TableCell className="py-4 flex space-x-2">
                <DeleteButton id={user.id} deleteAction={DeleteUser} />
                <EditButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
