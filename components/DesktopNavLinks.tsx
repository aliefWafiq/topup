import React from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Image from "next/image";

export const DesktopNavLinks = () => {
    return (
        <ul className="flex flex-row space-x-6">
            <li className="hover:font-semibold">
                <a href="#hero">Home</a>
            </li>
            <li className="hover:font-semibold">
                <a href="#game">Games</a>
            </li>
            <li className="hover:font-semibold">
                <a href="#promo">Promo</a>
            </li>
            <li className="hover:font-semibold">
                <a href="#testimoni">Testimoni</a>
            </li>
            <li>
                <Link
                    href="/register"
                    className={`border font-semibold px-4 py-2 rounded-lg transition-colors `}>
                    Topup Sekarang
                </Link>
            </li>
        </ul>
    )
}

export const DesktopNavLinksHome = async() => {
    const session = await auth();
    return(
        <div className="flex items-center gap-3">
            <ul className="flex items-center gap-4 mr-5 font-semibold text-white">
                {session?.user?.role === "admin" && (
                    <li>
                        <Link className="hover:text-gray-200" href="/admin">
                            Dashboard
                        </Link>
                    </li>
                )}
                {session?.user?.role != "admin" && (
                    <>
                        <li>
                            <Link className="hover:text-gray-200" href="/home">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-gray-200" href="/history-transaksi">
                                Transaksi
                            </Link>
                        </li>
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
                <div className="lg:flex gap-3 items-center hidden">
                    <div className="flex flex-col justify-center -space-y-1 text-white">
                        <span className="font-semibold text-right capitalize">
                            {session.user.name}
                        </span>
                        <span className="font-sx text-right capitalize">
                            {session.user.role}
                        </span>
                    </div>
                    <Link href="/profile">
                        <Image
                            src={session.user.image || "/avatar.jpg"}
                            alt="avatar"
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </Link>
                </div>
            )}
        </div>
    )
}
