'use client'
import { submit } from '@/lib/action'
import { useEffect, useState, useActionState } from 'react'
import { Games } from '@/types/game'
import { SubmitButton } from '@/components/button'

export default function Form() {
  const [value, setValue] = useState("game")
  const [games, setGames] = useState<Games[]>([])
  const [state, formAction] = useActionState(submit, null)

useEffect(() => {
    async function fetchGames(){
        const res = await fetch(`https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.NEXT_PUBLIC_MEMBER_CODE}&signature=${process.env.NEXT_PUBLIC_SIGNATURE_KEY}&id=1`)
        const json = await res.json()
        setGames(json.data)
    }

    fetchGames()
}, [])

  return (
    <div>
      <form action={formAction}>
        <div className='mb-4 pt-2'>
          <input
            type="file"
            name="image"
            className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full'
          />
          {state?.error?.image && <p className="text-red-500 text-sm">{state?.error.image[0]}</p>}
        </div>

        <div className='mb-4'>
          <select name="nama" className="border w-full py-2 px-3" >
            {games.map(game => (
              <option key={game.id} value={game.id}>
                {game.id} {game.nama}
              </option>
            ))}
          </select>
          {state?.error?.nama && <p className="text-red-500 text-sm">{state?.error.nama[0]}</p>}
        </div>

        <div className='mb-4 pt-2'>
          <input
            type="number"
            name="margin"
            placeholder="Margin"
            className='py-2 px-4 rounded-sm border border-gray-400 w-full'
          />
          {state?.error?.margin && <p className="text-red-500 text-sm">{state?.error.margin[0]}</p>}
        </div>

        <div className='mb-4 pt-4'>
            <SubmitButton label="submit" />
        </div>

        {state?.message && (
          <p className="text-green-600 text-center">{state?.message}</p>
        )}
      </form>
    </div>
  )
}
