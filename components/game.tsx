import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GameProps {
  nama: string;
  id: string;
  logo: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

const Game : React.FC<GameProps> = ({nama, id, logo, innerRef}) => {
  return (
    <React.Fragment>
      <Link
        ref={innerRef}
        href={`/${id}`}
        className="bg-white rounded-lg w-[150px] lg:w-1/5 hover:shadow-lg group overflow-hidden"
      >
        <div className="relative w-full lg:h-64 h-32">
          <Image
            src={logo || "/avatar.jpg"}
            alt={nama}
            priority
            fill
            className="rounded-t-md object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="lg:h-24 h-14 flex text-center items-center">
          <h1 className="text-base lg:text-xl font-bold w-full">{nama}</h1>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Game;
