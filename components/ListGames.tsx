import React from "react";
import Card from "@/components/card";
import { Games } from "@/types/game";

const ListGames = async ({ query }:{query: string}) => {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  const filteredGames = Array.isArray(games) ? games.filter((game: Games) =>{
    return game.nama.toLowerCase().includes(query.toLowerCase())
  }) : []

  return (
    <div className="flex flex-wrap w-full gap-6 justify-center mt-8">
        {Array.isArray(games) && filteredGames.length > 0 ? filteredGames.map((game: Games) => (
            <Card key={game.id} data={game} />
        )) : <p className="text-center text-xl">No games found</p>}
    </div>
  );
};

export default ListGames;
