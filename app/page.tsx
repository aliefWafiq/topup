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

  const glassCardStyle =
    "absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 text-white";

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 
                bg-black/40 backdrop-blur-md 
                  shadow-md px-16">
        <div className="w-full mx-auto py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-2xl font-bold">
                TopUpID
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/games"
                className="text-white hover:text-lg transition-colors">
                Games
              </Link>
              <Link
                href="/promo"
                className="text-white hover:text-lg transition-colors">
                Promo
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-lg transition-colors">
                Tentang Kami
              </Link>
              <Link
                href="/register"
                className="bg-white/10 hover:bg-white/20 border border-white/30 
                          text-white font-semibold px-4 py-2 rounded-lg 
                            transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/bg.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />

        <div className="absolute left-16 md:left-24 top-1/2 -translate-y-1/2 max-w-2xl z-10 text-white">
          <div>
            <h1 className="text-7xl md:text-9xl font-bold my-4">
              Top up Murah
            </h1>
            <h1 className="text-6xl md:text-6xl font-bold">No Ribet</h1>
            <h1 className="text-6xl md:text-6xl font-bold">No Drama!</h1>
            <p className="mt-8 text-lg text-gray-300 max-w-md">
              Disini kami menyediakan top up dari berbagai macam game dengan
              harga terjangkau dan juga berbagai diskon yang membuat harga
              menjadi lebih terjangkau.
            </p>
          </div>
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

      <section className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Lorem ipsum dolor sit amet.</h1>
        <p className="w-1/2 mt-8 mb-12 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sed
          dicta tempore maxime laudantium a unde provident, quasi eaque
          assumenda neque eveniet quam labore voluptatem placeat blanditiis
          harum pariatur inventore?
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          {games.map(
            (games: Games) =>
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
