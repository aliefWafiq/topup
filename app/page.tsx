import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Games } from "@/types/game";

export default async function RootLayout() {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center bg-slate-100">
        <div className="w-full h-1/2 px-16 flex flex-col justify-end">
          <h1 className="text-8xl font-bold">Mau topup buat</h1>
          <h1 className="text-9xl font-bold my-4">Beli skin</h1>
          <h1 className="text-4xl font-bold">Tapi bingung dimana?</h1>
        </div>
        <div className="w-1/2 h-1/2 px-16 flex items-center">
          <p className="w-2/3">
            Disini kami menyediakan top up dari berbagai macam game dengan harga
            terjangkau dan juga berbagai diskon yang membuat harga menjadi lebih
            terjangkau
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-2/3 h-[700px]">
          <div className="absolute w-[230px] h-[150px] z-20 bottom-5 right-12 hidden">
            <Image
              src={"/download__3_-removebg-preview.png"}
              className="object-cover"
              fill
              alt="HSR"
            />
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
      </section>
      <section className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Lorem ipsum dolor sit amet.</h1>
        <p className="w-1/2 mt-8 mb-12 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sed dicta tempore maxime laudantium a unde provident, quasi eaque assumenda neque eveniet quam labore voluptatem placeat blanditiis harum pariatur inventore?</p>
        <div className="flex flex-wrap gap-6 justify-center">
          {games.map((games: Games) =>
            // <Card className=" flex" key={games.id}>
            //   <CardContent className="flex">
            games.status !== 0 && parseInt(games.id) < 20 ? (
              <div
                key={games.id}
                className="flex items-center gap-4 border-2 px-5 py-3 rounded-lg"
              >
                <Image
                  src={games.logo || "/avatar.jpg"}
                  alt={games.nama}
                  width={50}
                  height={70}
                />
                <p>{games.nama}</p>
              </div>
            ) : null
            //   </CardContent>
            // </Card>
          )}
        </div>
      </section>
      <section className="w-full h-screen flex justify-center items-center bg-purple-500 relative">
        {/* <div className="w-1/2 h-full flex justify-center items-center z-10">
            <Image
              src={"/Item_Primogem.webp"}
              alt="valo"
              width={100}
              height={100}
              className="absolute z-10 translate-x-48 -translate-y-56"
            />
            <Image
              src={"/vandal.png"}
              alt="valo"
              width={150}
              height={150}
              className="absolute z-10 -translate-x-42 -translate-y-36 -rotate-90"
            />
            <div className="w-2/4 h-2/3 relative rounded-lg overflow-hidden">
              <Image src={"/valorant.png"} alt="valo" fill />
            </div>
          </div> */}
        <div className="w-full h-full flex justify-center items-center text-lime-300 z-10">
          <div className="w-1/2 px-8 flex flex-col items-end">
            <div className="w-2/3">
              <Image
                src={"/logo-valo.png"}
                alt="valo"
                width={100}
                height={100}
              />
              <h1 className="text-5xl font-bold mt-8">Lorem, ipsum</h1>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                exercitationem perferendis, accusantium in eos, ea maiores modi
                laboriosam praesentium, corrupti ipsum? Amet odio non possimus
                laboriosam corporis libero cum quia!
              </p>
            </div>
          </div>
          <div className="w-1/4 bg h-full flex justify-center items-center z-10">
            {/* <Image
                src={"/Item_Primogem.webp"}
                alt="valo"
                width={100}
                height={100}
                className="absolute z-10 translate-x-44 -translate-y-56"
              /> */}
            <Image
              src={"/vandal.png"}
              alt="valo"
              width={150}
              height={150}
              className="absolute z-10 -translate-x-40 -translate-y-36 -rotate-90"
            />
            <div className="w-full h-2/3 relative rounded-lg overflow-hidden">
              <Image src={"/valorant.png"} alt="valo" fill />
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center px-4">
            <h1 className="text-9xl font-bold rotate-90">VALORANT</h1>
          </div>
        </div>
        {/* <Image
            src={
              "/bg3.png"
            }
            className="object-cover"
            fill
            alt="BG"
          /> */}
      </section>
    </>
  );
}
