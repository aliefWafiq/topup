import Card from '@/components/card'
import { getGames } from '@/lib/data'
import { data } from '@/types/data'

export default async function Home() {
  const games = await getGames()

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-wrap w-full gap-4 justify-center my-52">
        {games.map((item: data) => (
          <Card key={item.jenis_id} data={item} />
        ))}
      </div>
    </div>
  )
}
