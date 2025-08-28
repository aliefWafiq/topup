import type { Metadata } from "next"
import GamesTable from "@/components/table/game-table"

export const metadata: Metadata = {
    title: "Games",
}

const GamesPage = () => {
  return (
    <div className="min-h-screen flex justify-center py-14">
        <div className="w-full px-6">
            <h1 className="text-2xl font-bold">Game List</h1>
            <GamesTable />
        </div>
    </div>
  )
}

export default GamesPage