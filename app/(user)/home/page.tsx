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

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryValue = searchParams.query ?? "";

  const finalQuery = Array.isArray(queryValue) ? queryValue[0] : queryValue;

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
      <SearchInput />
      <div className="mt-8 w-full">
        <ListGames query={finalQuery} />
      </div>
    </div>
  );
}