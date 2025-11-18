import React from 'react'
import { auth } from '@/auth'
import { SubmitButton } from '@/components/button'
import { getGame } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { AddIdGameUser } from '@/lib/action'

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
                <form action={AddIdGameUser} className='mt-8'>
                    <Input type='hidden' defaultValue={session?.user.id} name='userId' />
                    <Input type='hidden' defaultValue={namaGame.operator_nama} name='namagame'/>
                    <Input type='hidden' defaultValue={namaGame.id} name='gameId' />

                    <Label htmlFor='idGameUser' className='mb-2'>Id Game:</Label>
                    <Input name='idGameUser' className='mb-8'required/>

                    <SubmitButton label='submit'/>
                    <Link href='/list-id-game' className='mt-4 flex justify-center items-center p-2.5 border-2 rounded-lg hover:border-blue-500' >Kembali</Link>
                </form>
            </div>
        </div>
    )
}

export default PageFormGame