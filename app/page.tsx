"use client";
import Link from "next/link";
import "@/app/globals.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function RootLayout() {
  return (
    <div className="flex items-center justify-center w-full h-screen gap-4">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-screen w-full">
          <CarouselItem className="w-full h-full">
            <div className="w-full h-full flex justify-center">
              <div className="bottom-0 absolute">
                <div className="absolute w-[200px] h-[300px] flex items-end right-0">
                  <div>
                    <p className="absolute translate-x-24">Honkai Star Rail</p>
                    <Image
                      src={"/aset_persona2_hd-removebg-preview.png"}
                      width={250}
                      height={250}
                      alt="icon"
                    />
                  </div>
                </div>
                <Image
                  src={"/f94d834f-ave.png"}
                  width={500}
                  height={500}
                  alt="hsr"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
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
