import Card from "@/components/card";
import { Games } from "@/types/game";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-32">
      <div className="w-full h-96 px-32">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Carousel className="w-full h-full rounded-lg overflow-hidden flex justify-center items-center">
            <CarouselContent>
              <CarouselItem>
                <div className="w-[1250px] h-[400px] relative">
                  <Image src={"/X.jpg"} fill alt="banner" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-[1250px] h-[400px] relative">
                  <Image src={"/banner-valo.jpg"} fill alt="banner" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-[1250px] h-[400px] relative">
                  <Image src={"/Ninomae.jpg"} fill alt="banner" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="z-20" />
            <CarouselNext className="z-20" />
          </Carousel>
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-4 justify-center mt-8">
        {games.map((game: Games) => (
          <Card key={game.id} data={game} />
        ))}
      </div>
    </div>
  );
}
