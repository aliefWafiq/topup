import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SearchInput from "@/components/searchInput";
import ListGames from "@/components/ListGames";
import CardRekomendasi from "@/components/cardRekomendasi";
import Card from "@/components/card";
import { Suspense } from "react";
import LoadingCard from "@/components/loadingCard";

// export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const queryValue = resolvedSearchParams.query ?? ""
  const finalQuery = Array.isArray(queryValue) ? queryValue[0] :queryValue;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full md:p-32">
      <div className="w-full h-40  md:h-96 mt-24 md:mt-0">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Carousel className="w-full h-full rounded-lg overflow-hidden flex justify-center items-center">
            <CarouselContent>
              <CarouselItem>
                <div className="md:w-[1250px] md:h-[400px] w-[400px] h-[200px] relative">
                  <Image src={"/X.jpg"} fill alt="banner" priority sizes="(max-width: 768px) 100vw, 80vw" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="md:w-[1250px] md:h-[400px] w-[400px] h-[200px] relative">
                  <Image src={"/banner-valo.jpg"} fill alt="banner" priority sizes="(max-width: 768px) 100vw, 80vw" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="md:w-[1250px] md:h-[400px] w-[400px] h-[200px] relative">
                  <Image src={"/Ninomae.jpg"} fill alt="banner" priority sizes="(max-width: 768px) 100vw, 80vw" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="z-20" />
            <CarouselNext className="z-20" />
          </Carousel>
        </div>
      </div>
      <div className="mt-2 md:mt-8 w-full">
        <Suspense fallback={<LoadingCard/>}>
          <CardRekomendasi/>
        </Suspense>
        <div className="flex justify-center">
          <div className="md:w-1/2 w-full">
              <SearchInput />
          </div>
        </div>
            <Suspense fallback={<LoadingCard/>}>
              <ListGames 
                query={finalQuery}
                renderItem={(game) => <Card key={game.id} data={game} />} 
              />
            </Suspense>
      </div>
    </div>
  );
}
