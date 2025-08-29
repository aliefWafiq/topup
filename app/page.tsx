import FontAwesomeConfig from "@/app/fontawesome";
import Link from "next/link";
import "@/app/globals.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <FontAwesomeConfig />
      </head>
      <body className={`antialiased`}>
        <div className="flex items-center justify-center w-full h-screen gap-4">
          <Link
            className="bg-blue-400 p-4 text-white flex items-center w-24 rounded-lg"
            href="/register"
          >
            Register
          </Link>
          <Link
            className="bg-blue-400 p-4 text-white flex items-center w-24 rounded-lg"
            href="/login"
          >
            Log in
          </Link>
        </div>
      </body>
    </html>
  );
}
