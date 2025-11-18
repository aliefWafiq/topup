import React from "react";
import { Games } from "@/types/game";

const ListGames = async ({ 
  query,
  renderItem
}:{
  query: string,
  renderItem: (game: Games) => React.ReactNode
}) => {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  const filteredGames = Array.isArray(games) ? games.filter((game: Games) =>{
    return game.nama.toLowerCase().includes(query.toLowerCase())
  }) : []

  return (
    <div className="flex flex-wrap w-full md:gap-6 gap-3 justify-center mt-8">
        {Array.isArray(games) && filteredGames.length > 0 ? filteredGames.map((game: Games) => (
          <React.Fragment key={game.id}>
            {renderItem(game)}
          </React.Fragment>
        )) : <p className="text-center text-xl">No games found</p>}
    </div>
  );
};

export default ListGames;
