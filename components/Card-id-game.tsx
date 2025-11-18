import React from 'react'
import { Games } from '@/types/game'
import Link from 'next/link'

const CardIdGame = ({data}:{data: Games}) => {
    if(data.status !== 1) return null

    return (
        <Link href={`/list-id-game/${data?.id}`} className='border-2 rounded-lg p-3 w-64 flex items-center'>
            <h1>{data.nama}</h1>
        </Link>    
    )
}

export default CardIdGame