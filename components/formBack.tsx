import { Game } from "@/types/game"
import React from 'react'
import {submit} from '@/lib/action'

async function getGames(): Promise<Game[]>{
    const res = await fetch("https://api.tokovoucher.net/member/produk/operator/list?member_code="+ process.env.MEMBER_CODE +"&signature="+ process.env.SIGNATURE_KEY +"&id=1")
    const json = await res.json()
    const games = json.data

    return games
}

export default async function Form() {
    const games = await getGames()
    
    console.log(games)
    return (
        <div>
            <form action={''}>
                <div className='mb-4 pt-2'>
                    <input type="file" name='image' className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full'/>
                </div>
                <select name="nama" className="border">
                    {games.map(game => (
                        <option key={game.id} value={game.nama}>
                            {game.nama}
                        </option>
                    ))}
                </select>
                 <div className='mb-4 pt-2'>
                    <input type="number" name='margin' placeholder='Margin' className='py-2 px-4 rounded-sm border border-gray-400 w-full'/>
                </div>
                <div className='mb-4 pt-4'>
                    <button className='bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600 hover:cursor-pointer'>Submit</button>
                </div>
            </form>
        </div>
    )
}
