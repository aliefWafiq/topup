import type { Metadata } from "next"
import GamesTable from "@/components/table/game-table"

export const metadata: Metadata = {
    title: "Games",
}

const GamesPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="max-w-screen-md mx-auto py-10">
            <h1 className="text-2xl font-bold">Game List</h1>
            <GamesTable />
        </div>
    </div>
  )
}

export default GamesPage