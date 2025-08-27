import DiscountTable from '@/components/table/discount-table'
import React from 'react'
import Link from 'next/link'

const DiscountPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex justify-center py-32">
        <div className=" py-10">
            <h1 className="text-2xl font-bold mb-14">Discount List</h1>
            <Link href="/discounts/add" className="bg-blue-600 text-white text-center py-2 px-3 rounded-lg">Add Discount</Link>  
            <DiscountTable />
        </div>
    </div>
  )
}

export default DiscountPage