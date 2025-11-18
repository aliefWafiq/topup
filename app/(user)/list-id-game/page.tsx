import React from 'react'
import Link from 'next/link'
import { listUserGameId } from '@/lib/data'
import { auth } from '@/auth'
import { id_game_user } from '@/types/id_game_user'
import CardIdGameUser from '@/components/cardIdGameUser'

const PageListIdGame = async() => {
    const session = await auth()
    const dataIdUser = await listUserGameId(session?.user.id || "")
    return (
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg p-5'>
                <div>
                    <h1 className='text-2xl font-semibold'>Id Game</h1>
                    <span className='text-base text-gray-500'>Letak Id Game Kamu Di Sini</span>
                </div>
                <div className='mt-8'>
                    <Link href="/list-id-game/add-id-game" className='bg-blue-500 p-3 rounded-lg hover:bg-blue-600 text-white transition-all ease-in-out'>Tambah Id game</Link>
                </div>
                <div className='mt-8 flex gap-4'>
                    {dataIdUser?.map((game: id_game_user) => (
                        <CardIdGameUser idGame={game.gameId} namaGame={game.namagame} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PageListIdGame