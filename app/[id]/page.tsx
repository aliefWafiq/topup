import { Game } from "@/types/game"

async function getGame(id: string): Promise<Game[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id_jenis=" + id)
    const json = await res.json()
    const games = json.data

    return games
}

export default async function HSR({params}:{
    params: Promise<{id:string}>
}) {
    const {id} = await params
    const games = await getGame(id)
    const namaGame = games[0]

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-32">
        <h1 className="text-2xl font-bold mb-4">{namaGame.nama}</h1>
        {games.map((game) => (
            <div key={game.id} className="my-2 border-2 border-gray-200 rounded-md w-1/2 p-5">
                <h2 className="font-semibold">{game.nama_produk}</h2>
                <p>Rp {game.price.toLocaleString('id-ID')}</p>
            </div>
        ))}
      </div>
    )
}
