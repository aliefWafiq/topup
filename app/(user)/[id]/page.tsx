import { Games } from "@/types/game"
import MenuCard from "@/components/menuCard"
import { auth } from "@/auth"

async function getGame(id: string): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/jenis/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id=" + id)
    const json = await res.json()
    const games = json.data

    return games
}

async function getGameProducts(id: string): Promise<Games[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id_jenis=" + id)
    const json = await res.json()
    const gameProduct = json.data

    return gameProduct
}

export default async function ProductPage({params}:{
    params: Promise<{id:string}>,
}) {
    const {id} = await params
    const games = await getGame(id)
    const session = await auth()

    if(!games.length){
        return <div>Game tidak ditemukan</div>
    }

    const namaGame = games[0]

    const productId = namaGame.id
    const gameProducts = await getGameProducts(productId)
    const gameProduct = gameProducts
    
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-32">
    <h1 className="text-2xl font-bold mb-4">{namaGame.operator_nama}</h1>
        {gameProduct.map((game: Games) => (
            <MenuCard 
                key={game.code} 
                games={game} 
                jenis_id={namaGame.id} 
                format_form={namaGame.format_form} 
                id_user={session?.user.id || ""} 
                email={session?.user.email || ""}    
            />
        ))} 
    </div>
    )
}
