import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className='flex gap-4'>
        <div className='border-2 border-gray-300 rounded-lg w-fit p-4'>
          <h1>Genshin Impact</h1>
          <Link href="/7">Detail</Link>
        </div>
        <div className='border-2 border-gray-300 rounded-lg w-fit p-4'>
          <h1>Honkai Star Rail</h1>
          <Link href="/296">Detail</Link>
        </div>
        <div className='border-2 border-gray-300 rounded-lg w-fit p-4'>
          <h1>Free Fire</h1>
          <Link href="/1">Detail</Link>
        </div>
      </div>
    </div>
  )
}

