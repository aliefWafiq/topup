'use client'
import React from 'react'
import { Games } from '@/types/game'
import { useState } from 'react'
import LayoutFormPayment from '@/components/LayoutFormPayment'

function harga(price: number){
    const total = price + 2000
    return total.toLocaleString("id-ID")
}

const MenuCard = ({games}:{games:Games}) => {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <div 
                onClick={() => setShowForm(true)} 
                className='my-2 border-2 border-gray-200 rounded-md w-1/2 p-5 text-start hover:cursor-pointer'>
                <p className="font-semibold">{games.nama_produk}</p>
                <p>Rp {harga(games.price)}</p>
            </div>
            {showForm && (
                <LayoutFormPayment onClose={() => setShowForm(false)}/>
            )}
        </>
    )
}

export default MenuCard
