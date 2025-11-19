import React from 'react'
import FormEditIdGame from '@/components/formEditIdGame'
import { auth } from '@/auth'
import { getUserGameId, getNamaGameUser } from '@/lib/data'
import { getGame } from '@/lib/data'

const pageEditIdGame = async({params}:{params: Promise<{id: string}>}) => {
    const {id} = await params
    const session = await auth()
    const namaGame = await getNamaGameUser(session?.user.id || "", id)

    return (
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg p-5'>
                <h1 className='text-2xl font-semibold'>Edit Id Game</h1>
                <FormEditIdGame session={session} namaGame={namaGame || ""} gameId={id}/>
            </div>
        </div>
    )
}

export default pageEditIdGame