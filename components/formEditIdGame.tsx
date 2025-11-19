"use client"
import { EditIdGameUser } from '@/lib/action'
import React, { useState } from 'react'
import { SubmitButton } from '@/components/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { getUserGameId } from '@/lib/data'
import { useEffect } from 'react'

interface ActionState {
    message?: string | null;
}

const FormEditIdGame = ({
    session,
    namaGame,
    gameId
}:{
    session: any,
    namaGame: string,
    gameId: string
}) => {
    const [state, formAction] = useActionState(EditIdGameUser, null)
    const [IdGameUser, setIdGame] = useState<string>('')

    useEffect(() => {
        const getId = async() => {
            const IdGameUser = await getUserGameId(session?.user.id, gameId)
            setIdGame(IdGameUser || "")
        }
        getId()
    }, [session?.user.id, gameId])

    return (
        <form action={formAction} className='mt-8'>
            <Input type='hidden' defaultValue={session?.user.id} name='userId' />
            <Input type='hidden' defaultValue={namaGame} name='namagame'/>
            <Input type='hidden' defaultValue={gameId} name='gameId' />

            {state?.message && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-red-600 text-sm">{state.message}</p>
                </div>
            )}

            <Label htmlFor='idGameUser' className='mb-2'>Id Game:</Label>
            <Input name='idGameUser' defaultValue={IdGameUser} className='mb-8' required/>

            <SubmitButton label='update'/>
            <Link href='/list-id-game' className='mt-4 flex justify-center items-center p-2.5 border-2 rounded-lg hover:border-blue-500' >Kembali</Link>
        </form>
    )
}

export default FormEditIdGame