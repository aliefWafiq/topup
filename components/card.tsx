'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { data } from '@/types/data'

const Card = ({ data }: { data: data }) => {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, [data.nama])

  if(!mounted) return null

  if(data.status !== 1) return null

  return (
    <Link href={`/${data?.id}`} className="border-2 border-gray-300 rounded-lg w-1/5">
      <div className="relative w-full h-64">
        <Image
            src={data.logo}
            alt={data.nama}
            priority
            fill
            className="rounded-t-md object-cover"
          />
      </div>
      <div className="h-24 flex text-center items-center">
        <h1 className="text-2xl font-bold w-full">
          {loading ? 'Memuat...' : data?.nama ?? 'Tidak ditemukan'}
        </h1>
      </div>
    </Link>
  )
}

export default Card
