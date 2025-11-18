import React from 'react'
import Link from 'next/link'

const CardIdGameUser = ({idGame, namaGame}:{idGame: string, namaGame: string}) => {
    return (
        <Link href={`/list-id-game/${idGame}`} className='border-2 rounded-lg p-3 w-64 flex items-center'>
            <h1>{namaGame}</h1>
        </Link>  
    )
}

export default CardIdGameUser