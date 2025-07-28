import { Games } from "@/types/game"
import Image from 'next/image';

async function getGame(): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/operator/list?member_code=M250723WMNE3166SS&signature=5dbf3705b0f3982e476f2d1e49e99ad5&id=1")
    const json = await res.json()
    const games = json.data

    return games
}

export default async function page() {
  const games = await getGame()

  console.log(games)

  return (
    <div>
      {games.map((games) => (
        <div key={games.nama}>
        <Image
          src={games.logo}
          alt={games.nama}
          priority
          width={200}
          height={200}
          className="rounded-t-md object-cover"
        />
        
        <p>{games.nama}</p>
        </div>
      ))}
    </div>
  )
}