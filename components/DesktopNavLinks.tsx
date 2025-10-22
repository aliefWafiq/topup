import React from "react";
import Link from "next/link";

const DesktopNavLinks = () => {
    return (
        <ul className="flex flex-row space-x-6">
            <li className=" hover:text-blue-900 hover:font-semibold">
                <Link href="/">Home</Link>
            </li>
            <li className=" hover:text-blue-900 hover:font-semibold">
            <Link href="/">Games</Link>
            </li>
            <li className=" hover:text-blue-900 hover:font-semibold">
            <Link href="/">Promo</Link>
            </li>
            <li>
            <Link
                href="/register"
                className={`border font-semibold px-4 py-2 rounded-lg transition-colors `}
            >
                Register
            </Link>
            </li>
        </ul>
    );
};

export default DesktopNavLinks;
