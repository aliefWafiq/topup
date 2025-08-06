import { getTransaksi } from "@/lib/data"

const TransaksiTable = async() => {
  const transaksi = await getTransaksi()

  if(!transaksi?.length) return <h1 className="text-xl">No Data Found</h1>

  return (
    <table className='w-full bg-white mt-14'>
        <thead className='border-b border-gray-100'>
            <tr>
                <th className='py-3 px-6 text-left text-sm'>Id Transaksi</th>
                <th className='py-3 px-6 text-left text-sm'>Id User</th>
                <th className='py-3 px-6 text-left text-sm'>Id Game User</th>
                <th className='py-3 px-6 text-left text-sm'>Game</th>
                <th className='py-3 px-6 text-left text-sm'>Server</th>
                <th className='py-3 px-6 text-left text-sm'>Harga</th>
                <th className='py-3 px-6 text-left text-sm'>Status</th>
            </tr>
        </thead>
        <tbody>
            {transaksi.map((transaksi) => (
            <tr key={transaksi.id_transaksi}>
                <td className='py-3 px-6'>{transaksi.id_transaksi}</td>
                <td className='py-3 px-6'>{transaksi.id_user}</td>
                <td className='py-3 px-6'>{transaksi.id_gameUser}</td>
                <td className='py-3 px-6'>{transaksi.operator_produk}</td>
                <td className='py-3 px-6'>{transaksi.server}</td>
                <td className='py-3 px-6'>Rp {transaksi.harga.toLocaleString("id-ID")}</td>
                <td className='py-3 px-6'>{transaksi.status}</td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TransaksiTable