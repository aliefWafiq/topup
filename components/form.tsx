'use client'
import Image from 'next/image'
import { submit } from '@/lib/action'
import { useEffect, useState, useActionState } from 'react'
import { Games } from '@/types/game'
import { SubmitButton } from '@/components/button'

export function Form() {
  const [selectedId, setSelectedId] = useState<string>("")
  const [logo, setLogo] = useState<string>("")
  const [games, setGames] = useState<Games[]>([])
  const [state, formAction] = useActionState(submit, null)

useEffect(() => {
    async function fetchGames(){
        const res = await fetch(`https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.NEXT_PUBLIC_MEMBER_CODE}&signature=${process.env.NEXT_PUBLIC_SIGNATURE_KEY}&id=1`)
        const json = await res.json()
        setGames(json.data)
    }

    async function getLogo(){
      const res = await fetch(`https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.NEXT_PUBLIC_MEMBER_CODE}&signature=${process.env.NEXT_PUBLIC_SIGNATURE_KEY}&id=1`)
      const json = await res.json()
      setLogo(json.data)
    }

    getLogo()
    fetchGames()
}, [])

  return (
    <div>
      <form action={formAction}>
        <div className='flex justify-center'>
          <Image 
            src={logo}
            alt='logo'
            width={200}
            height={200}
            className='mb-4'/>
        </div>

        <div className='mb-4'>
          <select 
          name="nama" 
          className="border w-full py-2 px-3" 
          onChange={(e) => {
            const selected = e.target.value
            setSelectedId(selected)

            const selectedGame = games.find(game => String(game.id) === selected)
            if(selectedGame){
              setLogo(selectedGame.logo || "")
            }
          }}>
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
            type="text"
            name="image"
            placeholder="Logo"
            className='py-2 px-4 rounded-sm border border-gray-400 w-full'
            value={logo}
            readOnly
          />
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

export function FormPayment() {
   return (
      <form action={''} className='flex justify-center flex-col px-24 w-full'>
        <div className='mb-4 pt-2'>
            <input
              type="number"
              name="IdUser"
              placeholder="Masukkan ID User"
              className='py-2 px-4 rounded-sm border border-gray-400 w-full'
            />
          </div>
         <div className='mb-4'>
          <select 
          name="nama" 
          className="border w-full py-2 px-3" >
            <option>
              Asia
            </option>
          </select>
        </div>
          <div className='mb-4 pt-2'>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className='py-2 px-4 rounded-sm border border-gray-400 w-full'
            />
          </div>
          <div className='mb-4 pt-4'>
            <SubmitButton label="submit" />
          </div>
      </form>
   )
}
  

