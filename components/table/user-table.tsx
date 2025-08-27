import { getUsers } from "@/lib/data";
import { DeleteButton, EditButton } from "@/components/button";
import { DeleteUser } from "@/lib/action";

const UserTable = async () => {
  const users = await getUsers();

  if (!users?.length) return <h1 className="text-xl">No Data Found</h1>;

  return (
    <table className="w-full bg-white mt-14">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
          <th className="py-3 px-6 text-left text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.role}</td>
            <td className="flex p-2 space-x-2">
              <DeleteButton id={user.id} deleteAction={DeleteUser}/>
              <EditButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
