import React from 'react'
import { auth } from '@/auth'
import { getGame } from '@/lib/data'
import FormAddIdGame from '@/components/formAddIdGame'

const PageFormGame = async({
    params,
}:{
    params: Promise<{id: string}>,
}) => {
    const {id} = await params
    const game = await getGame(id)
    const session = await auth()

    if(!game.length){
        return <div>Game Tidak Ditemukan</div>
    }

    const namaGame = game[0]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg p-5'>
                <h1 className='text-2xl font-semibold'>{namaGame.operator_nama}</h1>
                <FormAddIdGame 
                    session={session}
                    gameId={namaGame.id}
                    namaGame={namaGame.operator_nama}
                />
            </div>
        </div>
    )
}

export default PageFormGame