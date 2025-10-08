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
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full mb-4">
            <h1 className="text-base lg:text-2xl font-bold">
              Game Rekomendasi
            </h1>
          </div>
          <Carousel className="w-full h-full rounded-lg overflow-hidden flex justify-center items-center">
            <CarouselContent className="-ml-4 px-2">
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="basis-1/4 w-[400px] mx-2 border-2 bg-white border-gray-300 rounded-lg">
                <Link href={`/`} className="rounded-lg w-[150px]">
                  <div className="relative w-full lg:h-64 h-32">
                    <Image
                      src={"/avatar.jpg"}
                      alt={"nama"}
                      priority
                      fill
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="lg:h-24 h-14 flex text-center items-center">
                    <h1 className="text-base lg:text-2xl font-bold w-full">
                      adsa
                    </h1>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="z-20" />
            <CarouselNext className="z-20" />
          </Carousel>
        </div>
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
