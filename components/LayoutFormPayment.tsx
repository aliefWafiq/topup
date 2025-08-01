'use client'
import React from 'react'
import { FormPayment } from '@/components/form'

export default function LayoutFormPayment(
  {onClose, namaProduk, hargaProduk, jenis_id, operator_produk, code} : {
    onClose: () => void,
    namaProduk: string,
    hargaProduk: number,
    jenis_id: string,
    operator_produk: string,
    code: string
  }) {
  return (
    <>
    <div className='z-30 fixed w-full h-full top-0 left-0 flex justify-center items-center hover:cursor-auto'>
        <div className='bg-white w-1/2 h-2/3 p-5 rounded-xl relative flex items-center'>
            <button onClick={onClose} className='hover:cursor-pointer absolute top-3'>X</button>
            <FormPayment 
              namaProduk={namaProduk}
              hargaProduk={hargaProduk}
              jenis_id={jenis_id}
              operator_produk={operator_produk}
              code={code}/>
        </div>
    </div>
    <div className='bg-black opacity-85 fixed z-20 w-full h-full top-0 left-0'> 
    </div>
    </>
  )
}

