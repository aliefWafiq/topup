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
    <div className="flex items-center justify-center w-full h-screen">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-screen w-full">
          <CarouselItem className="w-full h-full">
            <div className="w-full h-full flex justify-center">
              <Image
                src={'/A reward with no risk Ill take it._waifu2x_art_noise2_scale.png'}
                fill
                alt="banner"
              />
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
