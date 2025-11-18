"use client"
import React from 'react'
import { SubmitButton } from '@/components/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { AddIdGameUser } from '@/lib/action'
import { useFormState } from 'react-dom'

const FormAddIdGame = ({
    session,
    gameId,
    namaGame
}:{
    session: any,
    gameId: string,
    namaGame: string
}) => {
    const [state, formAction] = useFormState(AddIdGameUser, null)

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
            <Input name='idGameUser' className='mb-8'required/>

            <SubmitButton label='submit'/>
            <Link href='/list-id-game' className='mt-4 flex justify-center items-center p-2.5 border-2 rounded-lg hover:border-blue-500' >Kembali</Link>
        </form>
    )
}

export default FormAddIdGame