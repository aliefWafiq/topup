import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getGameRekomendasi } from "@/lib/data";
import { Games } from "@/types/game";

const CardRekomendasi = async () => {
    const gameRekomendasi = await getGameRekomendasi();

    const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
    const res = await fetch(url)
    const json = await res.json()
    const games = await json.data

    if (!gameRekomendasi?.length) {
        return null;
    }

    return (
        <div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full mb-4">
                    <h1 className="text-base lg:text-2xl font-bold">Game Rekomendasi</h1>
                </div>
                <div className="w-full flex">
                    { gameRekomendasi === games.operator_produk ? games.map((game: Games) => ( 
                        <Link 
                        href={`/game/${game.id}`}
                        key={game.id}
                        className="rounded-lg w-1/5 mr-4">
                            tes
                        </Link> 
                    )): null} 
                </div>
            </div>
        </div>
    );
};

export default CardRekomendasi;
