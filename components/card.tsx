'use client'

import { gameIdMapping } from '@/lib/gameIdMapping'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { data } from '@/types/data'
import { EditButton, DeleteButton } from '@/components/button'

async function getGameDetail(id: string) {
  const url = `https://api.tokovoucher.net/member/produk/jenis/list?member_code=M250723WMNE3166SS&signature=5dbf3705b0f3982e476f2d1e49e99ad5&id=${id}`

  try {
    const res = await fetch(url)
    const json = await res.json()
    return json.data ?? []
  } catch (err) {
    console.error("Gagal fetch dari API:", err)
    return []
  }
}

const Card = ({ data }: { data: data }) => {
  const [gameDetail, setGameDetail] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGameDetail(data.nama).then((result) => {
        console.log(result)
      if (result.length > 0) {
        setGameDetail(result[0])
      }
      setLoading(false)
    })
  }, [data.nama])

  return (
    <Link href={`/${gameDetail?.id}`} className="border-2 border-gray-300 rounded-lg w-1/5">
      <div className="relative w-full h-64">
          <Image
            src={data.image}
            alt={data.nama}
            priority
            fill
            className="rounded-t-md object-cover"
          />
      </div>
      <div className="h-24 flex text-center items-center">
        <h1 className="text-2xl font-bold w-full">
          {loading ? 'Memuat...' : gameDetail?.operator_nama ?? 'Tidak ditemukan'}
        </h1>
      </div>
    </Link>
  )
}

export default Card
