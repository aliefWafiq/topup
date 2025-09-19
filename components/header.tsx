import Link from "next/link";
import { LogoutButton } from "@/components/button";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/auth";
// import { SidebarTrigger } from "@/components/ui/sidebar"

export default async function Header() {
  const session = await auth();
  return (
    <header className="border-b-2 w-screen bg-white fixed z-40 top-0">
      <div className="flex items-center justify-end lg:justify-between mx-auto p-4 lg:px-8">
        <h1 className="text-2xl font-bold hidden lg:block">Top Up</h1>
        {/* <SidebarTrigger className="-ml-1 lg:hidden" /> */}
        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-4 mr-5 font-semibold text-gray-600">
            {session?.user?.role === "admin" && (
              <li>
                <Link className="hover:text-gray-800" href="/admin">
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link className="hover:text-gray-800" href="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-800" href="/history-transaksi">
                Transaksi
              </Link>
            </li>
            <li>
              {session ? (
                <SessionProvider>
                  <LogoutButton></LogoutButton>
                </SessionProvider>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
          {session && (
            <div className="lg:flex gap-3 items-center hidden">
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-gray-600 text-right capitalize">
                  {session.user.name}
                </span>
                <span className="font-sx text-gray-500 text-right capitalize">
                  {session.user.role}
                </span>
              </div>
              <button type="button">
                <Image
                  src={session.user.image || "/avatar.jpg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
