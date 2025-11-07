"use client";
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Games } from "@/types/game";
import { NavbarLandingPage } from "@/components/navbar";

export default function RootLayout() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.NEXT_PUBLIC_MEMBER_CODE}&signature=${process.env.NEXT_PUBLIC_SIGNATURE_KEY}&id=1`;
      const res = await fetch(url);
      const json = await res.json();
      setGames(json.data);
    };
    fetchGames();
  }, []);

  const glassCardStyle =
    "absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 text-white";

  return (
    <>
      <NavbarLandingPage />

      <section 
        id="hero"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/bg.jpeg"
          alt="Background"
          fill
          quality={100}
          className="z-0 object-cover"
        />

        <div className="absolute mx-5 md:left-24 top-72 md:top-1/2 -translate-y-1/2 max-w-2xl z-10 text-white">
          <h1 className="text-7xl md:text-9xl font-bold my-4">Top up Murah</h1>
          <h1 className="text-6xl font-bold">No Ribet</h1>
          <h1 className="text-6xl font-bold">No Drama!</h1>
          <p className="mt-8 text-lg text-gray-300 max-w-md">
            Disini kami menyediakan top up dari berbagai macam game dengan harga
            terjangkau dan juga berbagai diskon yang membuat harga menjadi lebih
            terjangkau.
          </p>
        </div>

        <div className="absolute right-[-50px]  bottom-0 w-3/5 md:w-1/2 h-full hidden md:flex items-end justify-center">
          <Image
            src={"/gruop-Photoroom.png"}
            width={600}
            height={600}
            alt="Character"
            className="object-contain"
          />
        </div>

        <div
          className={`${glassCardStyle} top-1/3 right-[30rem] w-64 hidden md:block`}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm">Battle Pass</p>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div
              className="bg-purple-500 h-2.5 rounded-full"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>
        <div
          className={`${glassCardStyle} bottom-80 right-10 md:flex hidden items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">10000 Diamond</p>
        </div>
        <div
          className={`${glassCardStyle} bottom-56 right-[30rem] hidden md:flex items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">1000 Diamond</p>
        </div>
        <div
          className={`${glassCardStyle} bottom-32 right-[10rem] hidden md:flex items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">500 Diamond</p>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white/80 to-transparent"></div>
      </section>

      {/* SECTION MARQUEE GAME */}
      <section
        id="marquee"
        className="w-full flex flex-col py-8 items-center md:px-24 bg-gray-100"
      >
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mb-8">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 md:[&_li]:mx-4 [&_img]:max-w-none animate-[infinite-scroll_200s_linear_infinite]">
            {games.map((g) =>
              g.status !== 0 ? (
                <li
                  key={g.id}
                  className="border-2 p-3 flex flex-col justify-center items-center w-28 h-28 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out bg-white"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={g.logo || "/avatar.jpg"}
                      alt={g.nama}
                      fill
                      priority
                      className="rounded-lg group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="mt-2 text-[10px] text-center">{g.nama}</p>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </section>

      {/* SECTION PROSES TOP UP */}
      <section
        id="proses"
        className="w-full pb-24 flex justify-center items-center bg-gray-100"
      >
        <div className="flex flex-col py-5 md:py-0">
          <p className="text-4xl font-bold">
            Top up <span className="text-yellow-500 text-6xl">Sat Set</span>
          </p>
          <p className="text-4xl font-bold">Langsung Masuk</p>
          <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center items-center">
            <div className="bg-white p-3 pt-10 rounded-lg w-full md:w-64 h-80 shadow-lg">
              <div className="bg-amber-200 rounded-lg h-full p-3">
                <p className="font-bold text-5xl text-amber-800">01</p>
                <div className="flex justify-center mt-6">
                  <div className="relative w-40 h-24">
                    <Image src="/Group 8.png" alt="icon game" fill />
                  </div>
                </div>
                <p className="font-bold text-2xl mt-4">Pilih Game</p>
              </div>
            </div>
            <div className="bg-white p-3 pt-10 rounded-lg w-full md:w-64 h-80 shadow-lg">
              <div className="bg-blue-200 rounded-lg h-full p-3">
                <p className="font-bold text-5xl text-blue-800">02</p>
                <div className="flex justify-center mt-6">
                  <div className="relative w-24 h-24">
                    <Image src="/stel.png" alt="icon game" fill />
                  </div>
                </div>
                <p className="font-bold text-2xl mt-4">Masukkan ID</p>
              </div>
            </div>
            <div className="bg-white p-3 pt-10 rounded-lg w-full md:w-64 h-80 shadow-lg">
              <div className="bg-purple-200 rounded-lg h-full p-3">
                <p className="font-bold text-5xl text-purple-800">03</p>
                <div className="flex justify-center mt-6">
                  <div className="relative w-24 h-24">
                    <Image src="/hi.png" alt="icon game" fill />
                  </div>
                </div>
                <p className="font-bold text-2xl mt-4">Pilih Nominal</p>
              </div>
            </div>
            <div className="bg-white p-3 pt-10 rounded-lg w-full md:w-64 h-80 shadow-lg">
              <div className="bg-teal-200 rounded-lg h-full p-3">
                <p className="font-bold text-5xl text-teal-800">04</p>
                <div className="flex justify-center mt-6">
                  <div className="relative w-24 h-24">
                    <Image src="/avenn.png" alt="icon game" fill />
                  </div>
                </div>
                <p className="font-bold text-2xl mt-4">Bayar & Diamond Masuk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BANNER DISKON */}
      <section
        id="promo"
        className="w-full h-[200px] md:h-[700px] flex justify-center items-center relative"
      >
        <Image
          src="/MASUKKAN KODEMU.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </section>

      {/* SECTION GAME */}
      <section
        id="game"
        className="w-full md:h-screen flex flex-col py-12 items-center bg-gray-100 md:px-24 px-4"
      >
        <div className="w-full md:text-center flex justify-center">
          <h1 className="text-4xl md:text-5xl font-bold md:w-1/2">
            Solusi Top Up Cepat, Aman, dan Terpercaya
          </h1>
        </div>

        <div className="flex flex-wrap justify-center w-full gap-2 md:gap-4 mt-6 md:mt-12 h-3/4">
          {games.map((g) =>
            g.status !== 0 && parseInt(g.id) < 12 ? (
              <div
                key={g.id}
                className="flex md:p-5 flex-col justify-center items-center w-40 md:w-1/6 h-52 md:h-64 group hover:cursor-pointer"
              >
                <div className="relative w-full flex-1 min-h-0 rounded-lg">
                  <Image
                    src={g.logo || "/avatar.jpg"}
                    alt={g.nama}
                    fill
                    priority
                    className="rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out"
                  />
                </div>

                <div className="pt-4 h-16 w-full flex items-center justify-center">
                  <p className="text-lg md:text-xl font-bold text-center">
                    {g.nama}
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* SECTION TESTIMONI */}
      <section
        id="testimoni"
        className="w-full h-screen flex items-center bg-gray-100 p-2 md:p-10"
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-purple-900 rounded-2xl">
          <p className="text-6xl md:text-7xl font-bold text-white">Testimoni</p>
          <p className="mt-4 text-white px-5 text-center">
            Lebih dari 50.000+ gamers sudah percaya TopUpID
          </p>
          <Link
            href={"/register"}
            className=" mt-8 p-3 rounded-lg bg-[#FACC15] hover:bg-purple-900 hover:border-4 hover:border-[#FACC15] hover:text-[#FACC15] transition-all"
          >
            Topup Sekarang
          </Link>
          <div className="flex justify-center gap-8 mt-16 w-full">
            <div className="w-full inline-flex flex-nowrap overflow-hidden md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mb-8">
              <ul className="flex items-center justify-center md:justify-start py-5 [&_li]:mx-4 [&_img]:max-w-none animate-[infinite-scroll_30s_linear_infinite]">
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">King Von</p>
                    </div>
                    <p className="mt-8">
                      “Gila… proses top up di sini cepet banget. Gue cuma klik,
                      bayar, diamond langsung nongol. Kayak cheat tapi legal.
                      Gak bakal pindah tempat lagi sih.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Bryson Tiller</p>
                    </div>
                    <p className="mt-8">
                      “Website ini bikin top up tuh gak ribet sama sekali.
                      UI-nya clean, prosesnya cepat, dan banyak promo. Kayak top
                      up sambil rebahan… nyaman banget.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Baby Keem</p>
                    </div>
                    <p className="mt-8">
                      “Gw sering top up pas tengah malam dan… tetep masuk
                      secepat itu . Nggak ada drama, nggak ada delay. Pokoknya
                      recommended banget buat gamer!”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Mac Miller</p>
                    </div>
                    <p className="mt-8">
                      “Biasanya top up bikin ribet, tapi di sini beda. Simple,
                      responsif, dan yang paling penting — aman. Ngerasa kayak
                      punya toko top up pribadi.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Mac Miller</p>
                    </div>
                    <p className="mt-8">
                      “Biasanya top up bikin ribet, tapi di sini beda. Simple,
                      responsif, dan yang paling penting — aman. Ngerasa kayak
                      punya toko top up pribadi.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Mac Miller</p>
                    </div>
                    <p className="mt-8">
                      “Biasanya top up bikin ribet, tapi di sini beda. Simple,
                      responsif, dan yang paling penting — aman. Ngerasa kayak
                      punya toko top up pribadi.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Mac Miller</p>
                    </div>
                    <p className="mt-8">
                      “Biasanya top up bikin ribet, tapi di sini beda. Simple,
                      responsif, dan yang paling penting — aman. Ngerasa kayak
                      punya toko top up pribadi.”
                    </p>
                  </div>
                </li>
                <li>
                  <div className="bg-white p-5 rounded-lg w-96 h-60 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center">
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-xl ml-3 font-bold">Mac Miller</p>
                    </div>
                    <p className="mt-8">
                      “Biasanya top up bikin ribet, tapi di sini beda. Simple,
                      responsif, dan yang paling penting — aman. Ngerasa kayak
                      punya toko top up pribadi.”
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="h-60 bg-gray-200 pb-12">
          <div className="flex w-full h-full">
            <div className="w-1/2 px-12 flex flex-col justify-center">
              <h1 className="text-5xl font-bold">TopUp</h1>
              <p className="mt-4">Buat proses topup mu <br></br> jadi lebih mudah</p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center md:items-start">
              <div>
                <p className="font-bold mb-2">Links</p>
                <div className="flex flex-col">
                  <a href="#hero">Home</a>
                  <a href="#game">Games</a>
                  <a href="#promo">Promo</a>
                  <a href="#testimoni">Testimoni</a>
                </div>
              </div>
              {/* <p>© 2025 TopUp. All rights reserved.</p> */}
            </div>
          </div>
      </footer>
    </>
  );
}
