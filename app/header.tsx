import Link from "next/link"

export default function Header() {
  return (
   <header className="border-b-2 flex items-center space-x-4 w-full p-5 fixed top-0 bg-white z-10">
        <h1 className="text-2xl font-bold">Top Up</h1>
        <Link href="/">Home</Link>
        <Link href="/addGame">Add Game</Link>
   </header>
  )
}