import type { Metadata } from "next"
import UserTable from "@/components/table/user-table"
import { SearchParamsProps } from "@/types/searchProps"

export const metadata: Metadata = {
    title: "Users",
}

const UserPage = async({ searchParams }: SearchParamsProps) => {
  const params = await searchParams
  const currentPage = Number(params?.page) || 1

  return (
    <div className="min-h-screen flex justify-center py-14">
        <div className="w-full px-6">
            <h1 className="text-2xl font-bold">User List</h1>
            <UserTable currentPage={currentPage}/>
        </div>
    </div>
  )
}

export default UserPage