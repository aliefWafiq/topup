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
import Link from "next/link";
import CardRekomendasi from "@/components/cardRekomendasi";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const queryValue = resolvedSearchParams.query ?? "";
  const finalQuery = Array.isArray(queryValue) ? queryValue[0] : queryValue;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-32">
      <div className="w-full h-96">
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
      <div className="mt-8 w-full">
        <CardRekomendasi/>
        <div className="flex justify-center">
          <div className="w-1/2">
            <SearchInput />
          </div>
        </div>
        <ListGames query={finalQuery} />
      </div>
    </div>
  );
}
