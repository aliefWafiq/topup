import Card from '@/components/card'
import { Games } from '@/types/game'
import { auth } from "@/auth";

export default async function Home() {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`
  const res = await fetch(url)
  const json = await res.json()
  const games = await json.data

  return (
    <div className="flex items-center justify-center min-h-screen w-full py-32">
      <div className="flex flex-wrap w-full gap-4 justify-center">
        {games.map((game: Games) => (
            <Card key={game.id} data={game}/>
        ))}
      </div>
    </div>
  )
}
