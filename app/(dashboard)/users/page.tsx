import type { Metadata } from "next"
import UserTable from "@/components/table/user-table"

export const metadata: Metadata = {
    title: "Users",
}

const UserPage = () => {
  return (
    <div className="min-h-screen flex justify-center py-14">
        <div className="w-full px-6">
            <h1 className="text-2xl font-bold">User List</h1>
            <UserTable />
        </div>
    </div>
  )
}

export default UserPage