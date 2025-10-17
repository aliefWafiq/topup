"use client";
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Games } from "@/types/game";

export default function RootLayout() {
  const [navScrolled, setNavScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const section2 = document.getElementById("section2");
      if (!section2) return;

      const triggerPoint = section2.offsetTop - 100;
      if (window.scrollY >= triggerPoint) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glassCardStyle =
    "absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-16 py-4 backdrop-blur-md transition-all duration-300 ${
          navScrolled ? "bg-white/80 text-black" : "bg-transparent text-white"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors duration-300 ${
              navScrolled ? "text-black" : "text-white"
            }`}
          >
            TopUpID
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/games"
              className={`hover:text-lg transition-colors ${
                navScrolled
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Games
            </Link>
            <Link
              href="/promo"
              className={`hover:text-lg transition-colors ${
                navScrolled
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Promo
            </Link>
            <Link
              href="/about"
              className={`hover:text-lg transition-colors ${
                navScrolled
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Tentang Kami
            </Link>
            <Link
              href="/register"
              className={`border font-semibold px-4 py-2 rounded-lg transition-colors ${
                navScrolled
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-white hover:bg-white/20"
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/bg.jpeg"
          alt="Background"
          fill
          quality={100}
          className="z-0 object-cover"
        />

        <div className="absolute left-16 md:left-24 top-1/2 -translate-y-1/2 max-w-2xl z-10 text-white">
          <h1 className="text-7xl md:text-9xl font-bold my-4">Top up Murah</h1>
          <h1 className="text-6xl font-bold">No Ribet</h1>
          <h1 className="text-6xl font-bold">No Drama!</h1>
          <p className="mt-8 text-lg text-gray-300 max-w-md">
            Disini kami menyediakan top up dari berbagai macam game dengan harga
            terjangkau dan juga berbagai diskon yang membuat harga menjadi lebih
            terjangkau.
          </p>
        </div>

        <div className="absolute right-[-50px] bottom-0 w-3/5 md:w-1/2 h-full flex items-end justify-center">
          <Image
            src={"/gruop-Photoroom.png"}
            width={600}
            height={600}
            alt="Character"
            className="object-contain"
          />
        </div>

        <div className={`${glassCardStyle} top-1/3 right-[30rem] w-64`}>
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
          className={`${glassCardStyle} bottom-80 right-10 flex items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">10000 Diamond</p>
        </div>
        <div
          className={`${glassCardStyle} bottom-56 right-[30rem] flex items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">1000 Diamond</p>
        </div>
        <div
          className={`${glassCardStyle} bottom-32 right-[10rem] flex items-center gap-2`}
        >
          <span>💎</span>
          <p className="font-semibold">500 Diamond</p>
        </div>
      </section>

      <section
        id="section2"
        className="w-full flex flex-col py-8 items-center px-24 bg-gray-100"
      >
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mb-8">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-[infinite-scroll_200s_linear_infinite]">
            {/* Render list pertama */}
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

      <section
        id="section3"
        className="w-full flex flex-col py-8 items-center bg-gray-100 px-24"
      >
        <div className="w-full text-center flex justify-center">
          <h1 className="text-6xl font-bold w-1/3">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>

        <div className="flex flex-wrap justify-center w-full gap-4 mt-12 h-3/4">
          {games.map((g) =>
            g.status !== 0 && parseInt(g.id) < 10 ? (
              <div
                key={g.id}
                className="flex p-5 flex-col justify-center items-center w-1/5 h-72 group hover:cursor-pointer"
              >
                <div className="relative w-full h-4/5 rounded-lg">
                  <Image
                    src={g.logo || "/avatar.jpg"}
                    alt={g.nama}
                    fill
                    priority
                    className="rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xl font-bold text-center">{g.nama}</p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      <section
        id="section4"
        className="w-full h-[700px] flex justify-center items-center relative"
      >
        <Image
          src="/MASUKKAN KODEMU.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </section>

      <section
        id="section4"
        className="w-full h-screen flex justify-center items-center bg-gray-100"
      >
        <div className="flex flex-col">
          <p className="text-4xl font-bold">
            Top up <span className="text-yellow-500 text-6xl">Sat Set</span>
          </p>
          <p className="text-4xl font-bold">Langsung Masuk</p>
          <div className="flex gap-8 mt-8">
            <div className="bg-white p-3 pt-10 rounded-lg w-64 h-80 shadow-lg">
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
            <div className="bg-white p-3 pt-10 rounded-lg w-64 h-80 shadow-lg">
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
            <div className="bg-white p-3 pt-10 rounded-lg w-64 h-80 shadow-lg">
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
            <div className="bg-white p-3 pt-10 rounded-lg w-64 h-80 shadow-lg">
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

      <section
        id="section5"
        className="w-full h-screen flex items-center bg-gray-100"
      >
        <div className="flex flex-col items-center w-full">
          <p className="text-4xl font-bold">Testimoni</p>
          <p className="mt-4">Lebih dari 50.000+ gamers sudah percaya TopUpID</p>
          <div className="flex justify-center gap-8 mt-12 w-full">
            <div className="bg-white p-5 pt-10 rounded-lg w-1/5 h-96 shadow-lg">
              <div className="flex items-center">
                <Image 
                  src='/avatar.jpg'
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="text-xl ml-3 font-bold">King Von</p>
              </div>
              <p className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, neque possimus! Repudiandae veritatis laboriosam
                blanditiis adipisci aut, animi natus suscipit atque totam ea.
                Optio ad consectetur id laboriosam facilis fuga aliquam nihil
                fugiat cupiditate dolore quam, eos molestiae ut modi!
              </p>
            </div>
            <div className="bg-white p-5 pt-10 rounded-lg w-1/5 h-96 shadow-lg">
              <div className="flex items-center">
                <Image 
                  src='/avatar.jpg'
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="text-xl ml-3 font-bold">Bryson Tiller</p>
              </div>
              <p className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, neque possimus! Repudiandae veritatis laboriosam
                blanditiis adipisci aut, animi natus suscipit atque totam ea.
                Optio ad consectetur id laboriosam facilis fuga aliquam nihil
                fugiat cupiditate dolore quam, eos molestiae ut modi!
              </p>
            </div>
            <div className="bg-white p-5 pt-10 rounded-lg w-1/5 h-96 shadow-lg">
              <div className="flex items-center">
                <Image 
                  src='/avatar.jpg'
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="text-xl ml-3 font-bold">Baby Keem</p>
              </div>
              <p className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, neque possimus! Repudiandae veritatis laboriosam
                blanditiis adipisci aut, animi natus suscipit atque totam ea.
                Optio ad consectetur id laboriosam facilis fuga aliquam nihil
                fugiat cupiditate dolore quam, eos molestiae ut modi!
              </p>
            </div>
            <div className="bg-white p-5 pt-10 rounded-lg w-1/5 h-96 shadow-lg">
              <div className="flex items-center">
                <Image 
                  src='/avatar.jpg'
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="text-xl ml-3 font-bold">Mac Miller</p>
              </div>
              <p className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, neque possimus! Repudiandae veritatis laboriosam
                blanditiis adipisci aut, animi natus suscipit atque totam ea.
                Optio ad consectetur id laboriosam facilis fuga aliquam nihil
                fugiat cupiditate dolore quam, eos molestiae ut modi!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
