import { getGames } from "@/lib/data"
import Image from "next/image"

const GamesTable = async() => {
  const games = await getGames()

  if(!games?.length) return <h1 className="text-xl">No User Found</h1>

  return (
    <table className='w-full bg-white mt-14'>
        <thead className='border-b border-gray-100'>
            <tr>
                <th className="py-3 px-6">Icon</th>
                <th className='py-3 px-6 text-left text-sm'>Id Jenis</th>
                <th className="py-3 px-6 text-left text-sm">Nama Game</th>
            </tr>
        </thead>
        <tbody>
            {games.map((game) => (
            <tr key={game.jenis_id} className="border-b-2 border-gray-100">
                <td className="py-3 px-6 w-44">
                    <Image width={200} height={200} src={game.image} alt="game.nama" />
                </td>
                <td className='py-3 px-6'>{game.nama}</td>
                <td className="py-3 px-6">{}</td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default GamesTable