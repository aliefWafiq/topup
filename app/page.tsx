"use client";
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";

export default function RootLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div className="w-full h-1/2 px-16 flex flex-col justify-end">
        <h1 className="text-8xl font-bold">Mau topup buat</h1>
        <h1 className="text-9xl font-bold my-4">Beli skin</h1>
        <h1 className="text-4xl font-bold">Tapi bingung dimana?</h1>
      </div>
      <div className="w-1/2 h-1/2 px-16 flex items-center">
        <p className="w-2/3">Disini kami menyediakan top up dari berbagai macam game dengan harga terjangkau dan juga berbagai diskon yang membuat harga menjadi lebih terjangkau</p>
      </div>
      <div className="absolute bottom-0 right-0 w-2/3 h-[700px]">
        <div className="absolute w-[230px] h-[150px] z-20 bottom-5 right-12 hidden">
          <Image
            src={
              "/download__3_-removebg-preview.png"
            }
            className="object-cover"
            fill
            alt="HSR"/>
        </div>
        <Image
          src={
            "/HonkaiStarRail-FireflySkin''Spring Missive''_waifu2x_art_noise2_scale.png"
          }
          className="object-cover"
          fill
          alt="HSR"
        /> 
      </div>
      {/* <Link
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
          </Link> */}
    </div>
  );
}
