import { Games } from "@/types/game"
import MenuCard from "@/components/menuCard"
import { auth } from "@/auth"
import { getGame, getGameProducts } from "@/lib/data"
import { getUserGameId } from "@/lib/data";

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

    const idGameUser = await getUserGameId(session?.user.id || "", String(namaGame.id || ""))
    
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-32 px-8">
        <h1 className="text-4xl font-bold mb-8 text-white">{namaGame.operator_nama}</h1>
        <div className="w-full flex flex-wrap gap-5 justify-center">
            {gameProduct.map((game: Games) => (
                <MenuCard 
                    key={game.code} 
                    games={game} 
                    jenis_id={namaGame.id} 
                    format_form={namaGame.format_form} 
                    id_user={session?.user.id || ""} 
                    email={session?.user.email || ""} 
                    idGameUser={idGameUser || ""}   
                />
            ))} 
        </div>
    </div>
    )
}
