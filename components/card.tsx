'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Games } from '@/types/game'

const Card = ({ data }: { data: Games }) => {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, [data.nama])

  if(!mounted) return null

  if(data.status !== 1) return null

  return (
    <Link href={`/${data?.id}`} className="bg-white rounded-lg w-[150px] lg:w-1/5 hover:shadow-lg group overflow-hidden">
      <div className="relative w-full lg:h-64 h-32">
        <Image
            src={data.logo || "/avatar.jpg"}
            alt={data.nama}
            priority
            fill
            className="rounded-t-md object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
          />
      </div>
      <div className="lg:h-24 h-14 flex text-center items-center">
        <h1 className="text-base lg:text-xl font-bold w-full">
          {loading ? 'Memuat...' : data?.nama ?? 'Tidak ditemukan'}
        </h1>
      </div>
    </Link>
  )
}

export default Card
