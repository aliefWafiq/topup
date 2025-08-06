import { getGames } from "@/lib/data"

const GamesTable = async() => {
  const games = await getGames()

  if(!games?.length) return <h1 className="text-xl">No User Found</h1>

  return (
    <table className='w-full bg-white mt-14'>
        <thead className='border-b border-gray-100'>
            <tr>
                <th className='py-3 px-6 text-left text-sm'>Name</th>
            </tr>
        </thead>
        <tbody>
            {games.map((game) => (
            <tr key={game.jenis_id}>
                <td className='py-3 px-6'>{game.nama}</td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default GamesTable