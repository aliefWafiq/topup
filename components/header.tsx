import Link from "next/link";
import { LogoutButton } from "@/components/button";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="border-b-2 max-w-screen bg-white">
      <div className="flex items-center justify-between mx-auto p-4">
        <h1 className="text-2xl font-bold">Top Up</h1>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600">
            <li>
              <Link className="hover:text-gray-800" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-800" href="/history-transaksi">
                Transaksi
              </Link>
            </li>
            {session && (
              <>
                {session.user.role === "admin" ? (
                  <>
                    <li>
                      <Link className="hover:text-gray-800" href="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-800" href="/users">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-800" href="/games">
                        Games
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-800" href="/list-transaksi">
                        List Transaksi
                      </Link>
                    </li>
                  </>
                ) : null}
              </>
            )}
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
            <div className="flex gap-3 items-center">
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
