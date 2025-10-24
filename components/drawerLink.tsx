import React from 'react'
import Link from "next/link";
import { LogoutButton } from "@/components/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Image from "next/image";

export const LandingPageDrawerLink = () => {
    return (
        <ul className="flex flex-col justify-center items-center space-y-4">
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
            <Link href="/">Home</Link>
        </li>
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
            <Link href="/">Games</Link>
        </li>
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
            <Link href="/">Promo</Link>
        </li>
        <li className="mt-4">
            <Link
            href="/register"
            className={`border border-black text-3xl px-4 py-2 rounded-lg transition-colors `}
            >
                Register
            </Link>
        </li>
        </ul>
    )
}

export const HomeDrawerLink = async() => {
    const session = await auth();
    return(
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
    )
}