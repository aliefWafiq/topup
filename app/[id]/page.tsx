import { Games } from "@/types/game"
import MenuCard from "@/components/menuCard"

async function getGame(id: string): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id_jenis=" + id)
    const json = await res.json()
    const games = json.data

    return games
}

export default async function ProductPage({params}:{
    params: Promise<{id:string}>
}) {
    const {id} = await params
    const games = await getGame(id)
    const namaGame = games[0]
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-32">
        <h1 className="text-2xl font-bold mb-4">{namaGame.operator_produk}</h1>
        {games.map((game: Games) => (
            <MenuCard key={game.nama_produk} games={game}/>
            // <button key={game.nama_produk} className="my-2 border-2 border-gray-200 rounded-md w-1/2 p-5">
            //     <h2 className="font-semibold">{game.nama_produk}</h2>
            //     <p>Rp {harga(game.price)}</p>
            // </button>
        ))}
      </div>
    )
}
